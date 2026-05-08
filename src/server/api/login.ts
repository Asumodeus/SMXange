import { createHash } from "crypto";
import { db } from "./db_connection.ts";


function md5(text: string): string {
  return createHash("md5").update(text).digest("hex");
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
      SELECT Password FROM Login 
      WHERE Username = ${credentials.uName}
    `;

    // Si l'usuari no existeix
    if (loginData.length === 0) {
      return Response.json(
        { error: "Credencials Invàlides" },
        { status: 401 }
      );
    }

    const hashed_DB_Password = loginData[0].Password;
    const hashed_Password = md5(credentials.uPassword);

    //Console logs for debugging purposes
    console.log(`[LOGIN] User: ${credentials.uName} | Match: ${hashed_Password === hashed_DB_Password}`);

    //We check if the db password matches
    if (hashed_Password === hashed_DB_Password) {
      return Response.json(
        { message: "Login exitós" },
        { status: 200 }
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