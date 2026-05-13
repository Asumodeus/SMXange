import { db } from "./db_connection"; 

export const getActivitat = async () => { 
    try {
        const [rows]: any = await db.query("SELECT id, titol_exercici, descripcio, pregunta, opcions, respostaCorrecta FROM Activitat"); 
        
        if (rows.length === 0) {
            return Response.json(
                { success: false, message: "No s'ha trobat cap activitat" },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            data: rows
        }, { status: 200 });

    } catch (error) { 
        console.error("Error al llistar activitats:", error);
        return Response.json(
            { success: false, message: "Error al carregar activitats" },
            { status: 500 }
        );
    }
};
 
export const getActivitatById = async (id: number) => {
    try {
        const [rows]: any = await db.query("SELECT * FROM Activitat WHERE id = ?", [id]);
        
        if (rows.length === 0) { 
            return Response.json(
                { success: false, message: "L'activitat no existeix" },
                { status: 404 }
            );
        }

        const activitatDB = rows[0];

        //formateamos las opciones para que front las pueda leer
        const respuestaFormateada = {
            success: true,
            data: {
                exercici: {
                    titol: activitatDB.titol_exercici,
                    descripcio: activitatDB.descripcio,
                    pregunta: activitatDB.pregunta,
                    //pasamos las opciones a formato json
                    opcions: typeof activitatDB.opcions === 'string' ? JSON.parse(activitatDB.opcions) : activitatDB.opcions,
                    respostaCorrecta: activitatDB.respostaCorrecta,
                    botoComprovar: "Comprovar resposta",
                    missatgeCorrecte: "Molt bé! Resposta correcta.",
                    missatgeIncorrecte: "Torna-ho a intentar."
                }
            }
        };

        return Response.json(respuestaFormateada, { status: 200 });

    } catch (error) {
        console.error("Error al seleccionar l'activitat:", error);
        return Response.json(
            { success: false, message: "Error intern al buscar l'activitat" },
            { status: 500 }
        );
    }
};