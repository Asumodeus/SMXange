import { createHash } from "crypto";
import { db } from "./db_connection.ts";

function md5(text: string): string {
  return createHash("md5").update(text).digest("hex");
}

export async function forgotPasswordRequest(req: Request) {
  const data = await req.json();

  if (!data.Usuario || !data.newPassword) {
    return Response.json(
      { error: "Falten dades" },
      { status: 400 }
    );
  }

  if (data.newPassword.length < 6) {
    return Response.json(
      { error: "La contrasenya ha de tenir com a mínim 6 caràcters" },
      { status: 400 }
    );
  }

  const userExists = await db`
    SELECT EXISTS(
      SELECT 1 FROM Usuari
      WHERE FKusername = ${data.Usuario}
    ) AS exist;
  `;

  if (userExists[0].exist === 0) {
    return Response.json(
      { error: "Aquest usuari no existeix" },
      { status: 404 }
    );
  }

  const hashedPassword = md5(data.newPassword);

  await db`
    UPDATE Usuari
    SET Password = ${hashedPassword}
    WHERE FKusername = ${data.Usuario};
  `;

  return Response.json(
    { message: "Contrasenya actualitzada correctament" },
    { status: 200 }
  );
}