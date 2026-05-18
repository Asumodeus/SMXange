import { createHash, createHmac, randomUUID } from "crypto";
import { db } from "./db_connection.ts";

const SESSION_COOKIE_NAME = "smx_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = {
  sub: number;
  username: string;
  iat: number;
  exp: number;
  jti: string;
};

function md5(text: string): string {
  return createHash("md5").update(text).digest("hex");
}

function getSessionSecret(): string {
  return Bun.env.SESSION_SECRET || "smxchange-dev-session-secret";
}

function encodeBase64Url(value: string): string {
  return Buffer.from(value).toString("base64url");
}

function signToken(value: string): string {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function createSessionToken(payload: SessionPayload): string {
  const header = encodeBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = encodeBase64Url(JSON.stringify(payload));

  return `${header}.${body}.${signToken(`${header}.${body}`)}`;
}

function createSessionCookie(token: string, secure: boolean): string {
  const attributes = [
    `${SESSION_COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_DURATION_SECONDS}`,
  ];

  if (secure) {
    attributes.push("Secure");
  }

  return attributes.join("; ");
}


//Verifica les credencials de l'usuari comparant la contrasenya proporcionada
//amb la que hi ha a la taula 'Login' de la base de dades. 
export async function loginVerification(req: Request) {
  try {
    const credentials = await req.json();

    if (!credentials.uName || !credentials.uPassword) {
      return Response.json(
        { error: "Credencials buides" },
        { status: 400 }
      );
    }

    // Busquem l'usuari a la taula Login
    const loginData = await db`
      SELECT IDlogin, Username, Password FROM Login 
      WHERE Username = ${credentials.uName}
    `;

    // Si l'usuari no existeix
    if (loginData.length === 0) {
      return Response.json(
        { error: "Credencials Invàlides" },
        { status: 401 }
      );
    }

console.log(`[LOGIN] Intent de login per usuari: ${credentials.uName}`);

    const hashed_DB_Password = loginData[0].Password;
    const hashed_Password = md5(credentials.uPassword);

    //Console logs for debugging purposes
    console.log(`[LOGIN] User: ${credentials.uName} | Match: ${hashed_Password === hashed_DB_Password}`);

    //We check if the db password matches
    if (hashed_Password === hashed_DB_Password) {
      const issuedAt = Math.floor(Date.now() / 1000);
      const sessionToken = createSessionToken({
        sub: loginData[0].IDlogin,
        username: loginData[0].Username,
        iat: issuedAt,
        exp: issuedAt + SESSION_DURATION_SECONDS,
        jti: randomUUID(),
      });
      const sessionCookie = createSessionCookie(
        sessionToken,
        new URL(req.url).protocol === "https:"
      );

      return Response.json(
        { message: "Login exitós" },
        {
          status: 200,
          headers: {
            "Set-Cookie": sessionCookie,
          },
        }
      );
    }

    return Response.json(
      { error: "Credencials Invàlides" },
      { status: 401 }
    );
    

  } catch (error) {
    //Console logs for debugging purposes
    console.error("[LOGIN ERROR]", error);

    return Response.json(
      { error: "Error intern del servidor" },
      { status: 500 }
    );
  }
}