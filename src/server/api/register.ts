// Per a implementar la base de dades quan la tinguem 
import { password } from "bun";
import {db} from "./db_connection.ts";

export async function registerRequest(req: Request) {

  const registerParameters = await req.json();

  //Comprobem desde la base de dades si les dades existeixen
  //Aixó provoca un camp dintre del array userExists anomenat exist que será 0 si no existeix i 1 si sí
  const userExists = await db`
  SELECT EXISTS(
    SELECT 1 FROM Usuari
    WHERE Username = ${registerParameters.Usuario}
  ) AS exist;`;

  //Si el valor és 0, l'usuari no existeix, i per a tant podem inserir els valors a la base de dades
  if (userExists[0].exist === 0) {

    if (!(registerParameters.passwordOnce === registerParameters.passwordTwice)) {
      return Response.json(
        {error:"Contrasenya Invlalida"},
        {status:400}
      );
    }
    
    const user = {
      Nom: registerParameters.user,
      Cognom: registerParameters.Apellido,
      Numero_de_telefon: registerParameters.Telefono,
      Username: registerParameters.Usuario,
      Password: registerParameters.passwordOnce,
      Mail: registerParameters.email,
    }

    await db`INSERT INTO Usuari ${db(user)}`;
    
    return Response.json(
      {message:"Usuari Registrat"},
      {status:200}
      );
    }

  //Si el valor no és 0, podem considerar l'usuari com a registrart.
  return Response.json(
    {error:"L'usuari ja existeix"},
    {status:400}
  );
};