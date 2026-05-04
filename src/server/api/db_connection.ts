import { SQL } from "bun";

//Aquí Declarem la conexió amb la base de dades, que la usarem després
export const db = new SQL({
    adapter: "mysql",
    hostname: "db",     //Aquí podem usar db, que cridará el servei de docker de la db com a host ja que les reds (de docker) están connectades internament pel nom de servei
    port: "3306",
    database: "smxchange",
    username: "user",
    password: "password"
});
