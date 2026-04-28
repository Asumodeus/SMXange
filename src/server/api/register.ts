// Per a implementar la base de dades quan la tinguem 
import { password } from "bun";
import { createHash } from "crypto";
import {db} from "./db_connection.ts";

function md5(text: string): string {
  return createHash("md5").update(text).digest("hex");
}

export async function registerRequest(req: Request) {

  const registerParameters = await req.json();

  //Comprobem desde la base de dades si les dades existeixen
  //Aixó provoca un camp dintre del array userExists anomenat exist que será 0 si no existeix i 1 si sí
  const userExists = await db`
  SELECT EXISTS(
    SELECT 1 FROM Usuari
    WHERE FKusername = ${registerParameters.Usuario}
  ) AS exist;`;

  //Si el valor és 0, l'usuari no existeix, i per a tant podem inserir els valors a la base de dades
  if (userExists[0].exist === 0) {

    if (!(registerParameters.passwordOnce === registerParameters.passwordTwice)) {
      return Response.json(
        {error:"Contrasenya Invlalida"},
        {status:400}
      );
    }
    
    const hashedPassword = md5(registerParameters.passwordOnce);
    console.log(`[REGISTER] User: ${registerParameters.Usuario} | Password hash: ${hashedPassword}`);
    const user = {
      Nom: registerParameters.user,
      Cognom: registerParameters.Apellido,
      Numero_de_telefon: registerParameters.Telefono,
      FKusername: registerParameters.Usuario,
      Password: hashedPassword,
      Mail: registerParameters.email,
    }

    await db`
      INSERT INTO Usuari (Nom, Cognom, Numero_de_telefon, FKusername, Password, Mail)
      VALUES (${user.Nom}, ${user.Cognom}, ${user.Numero_de_telefon}, ${user.FKusername}, ${user.Password}, ${user.Mail})
    `;
    
    return Response.json(
      {message:"Usuari Registrat"},
      {status:200}
      );
    }

  //Si el valor no és 0, podem considerar l'usuari com a registrart.
  return Response.json(
    {error:"Ja existeix un compte amb aquest usuari"},
    {status:400}
  );
};