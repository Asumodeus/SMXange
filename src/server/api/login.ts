import { createHash } from "crypto";
import { db } from "./db_connection.ts";

/** * He añadido esta función para generar el hash en SHA-256 --> Lisandro
 * Esto permite crear un token más robusto que el simple MD5 --> Lisandro
 */
function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

export async function loginVerification(req: Request) {
  try {
    const credentials = await req.json();

    if (!credentials.uName || !credentials.uPassword) {
      return Response.json(
        { error: "Credencials buides" },
        { status: 400 }
      );
    }

    /**
     * Ahora seleccionamos también el Username de la base de datos para asegurar la integridad de los datos --> Lisandro
     */
    const loginData = await db`
      SELECT Username, Password FROM Login 
      WHERE Username = ${credentials.uName}
    `;

    if (loginData.length === 0) {
      return Response.json(
        { error: "Credencials Invàlides" },
        { status: 401 }
      );
    }

    console.log(`[LOGIN] Intent de login per usuari: ${credentials.uName}`);

    const hashed_DB_Password = loginData[0].Password;
    const db_Username = loginData[0].Username; // Nombre de usuario extraído directamente de la DB --> Lisandro
    
    const hashed_Input_Password = createHash("md5").update(credentials.uPassword).digest("hex");

    if (hashed_Input_Password === hashed_DB_Password) {
      
      /** * En esta sección, logré que el token se genere sumando el usuario y la contraseña que ya están guardados en la base de datos --> Lisandro
       * De esta forma, el token se basa en la información oficial de nuestro sistema y no solo en lo que envía el cliente --> Lisandro
       */
      const tokenData = db_Username + hashed_DB_Password;
      const sessionToken = sha256(tokenData);

      const currentDate = new Date();ç
      //"YYYY-MM-DD" usando split e ISOString --> Lisandro
      const formattedDate = currentDate.toISOString().split('T')[0];
      await db`
        UPDATE Login 
        SET UltimLogin = ${currentDate}
        WHERE Username = ${db_Username}
      `;

      console.log(`[LOGIN] Login exitós per: ${db_Username}. Token generat.`);

      return Response.json(
        { 
          message: "Login exitós",
          token: sessionToken 
        },
        { status: 200 }
      );
    }

    return Response.json(
      { error: "Credencials Invàlides" },
      { status: 401 }
    );
    

  } catch (error) {
    console.error("[LOGIN ERROR]", error);

    return Response.json(
      { error: "Error intern del servidor" },
      { status: 500 }
    );
  }
}