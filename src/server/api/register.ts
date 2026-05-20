import { createHash } from "crypto";
import { db } from "./db_connection.ts";

function md5(text: string): string {
  return createHash("md5").update(text).digest("hex");
}

//Gestiona la petició de registre de nou usuari, inserint dades a les taules 'Login' i 'Usuari'.
export async function registerRequest(req: Request) {
  try {
    const data = await req.json();

    // Validació bàsica de dades
    if (!data.Usuario || !data.passwordOnce || !data.email || !data.user || !data.Apellido) {
      return Response.json(
        { error: "Falten dades obligatòries" },
        { status: 400 }
      );
    }

    if (data.passwordOnce !== data.passwordTwice) {
      return Response.json(
        { error: "Les contrasenyes no coincideixen" },
        { status: 400 }
      );
    }

    // Comprovem si l'usuari o el correu ja existeixen
    const existingUser = await db`
      SELECT 
        (SELECT COUNT(*) FROM Login WHERE Username = ${data.Usuario}) as userCount,
        (SELECT COUNT(*) FROM Usuari WHERE Mail = ${data.email}) as mailCount
    `;

    if (existingUser[0].userCount > 0) {
      return Response.json(
        { error: "El nom d'usuari ja està en ús" },
        { status: 400 }
      );
    }

    if (existingUser[0].mailCount > 0) {
      return Response.json(
        { error: "El correu electrònic ja està registrat" },
        { status: 400 }
      );
    }

    const hashed_Password = md5(data.passwordOnce);

    const loginResult = await db`
      INSERT INTO Login (Username, Password)
      VALUES (${data.Usuario}, ${hashed_Password})
    `;

    const idLogin = loginResult.insertId;

    // Inserim a la taula Usuari
    await db`
      INSERT INTO Usuari (Nom, Cognom, Numero_de_telefon, Mail, IDLogin)
      VALUES (${data.user}, ${data.Apellido}, ${data.Telefono}, ${data.email}, ${idLogin}, '')
    `;

    console.log(`[REGISTER] Nou usuari registrat: ${data.Usuario} (ID: ${idLogin})`);

    return Response.json(
      { message: "Usuari registrat amb èxit" },
      { status: 200 }
    );

  } catch (error) {
    console.error("[REGISTER ERROR]", error);
    return Response.json(
      { error: "Error en processar el registre" },
      { status: 500 }
    );
  }
}