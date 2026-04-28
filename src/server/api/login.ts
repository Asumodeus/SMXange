import {db} from "./db_connection.ts";

//Aquesta funció agafa la solicitud del front-end i comproba si la constrasenya del usuari especificat en el login és igual a la contrasenya del usuari amb el mateix nom a la base de dades.
//Aquest codi, tot i que funcional, és quasi un proof of concept, ja que falta la implementació de la base de dades
export async function loginVerification(req: Request){

    //Extraiem les credencials de la solicitud
    const credentials = await req.json();

    //Comprobem si aquestes credencials existeixen/són valides
    if (!credentials.uName || !credentials.uPassword) {
        return Response.json(
            {error:"Credencials vuides"},
             {status: 400}
            );
    } 

    //Extraiem de la base de dades la constrasenya del usuari que el front-end ens ha dit que validem
            const dbPassword = await db`SELECT Password FROM Usuari WHERE Username = ${credentials.uName}`
    
    //Comprobem que la base de dades haigi extret una contrasenya, si no es el cas, vol dir que l'usuari no existeix
    //Peró no volem dir si el que falla és la contrasenya o el usuari, així que retornem el mateix error que si la contrasenya és incorrecte (mirar el final d'aquest script)
    if (!dbPassword[0]) {
        return Response.json(
        { error: "Credencials Invalides" }, 
        { status: 401 }
        );
    }
    
    //Finalment, comprobem si la contrasenya del front-end és igual a la de la base de dades.
    //Si ho és, retornem un éxit
    //Aquesta és la part que necesitará encriptació, junt amb la base de dades.
    if (dbPassword[0].Password === credentials.uPassword) {
        return Response.json(
            {message:"Login exitos"}, 
            {status: 200}
        );
    }
    console.log("asd")

    //Si les credencials són incorrectes, retornem un error
    return Response.json(
        { error: "Credencials Invalides" }, 
        { status: 401 }
        );
}