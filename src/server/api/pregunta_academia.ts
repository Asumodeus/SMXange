import { db } from "./db_connection.ts"; 

// Funcion para Hacer dinamico el contenido de las actividades
export async function getActivitatDinamica(req: Request) {
    try {
        // Extraemos los parametros de la url para saber que ID tenemos que cojer
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        // Comprovamos la valideza del ID
        if (!id) {
            return Response.json(
                { success: false, message: "Falta l'ID de l'activitat" },
                { status: 400 }
            );
        }

        // Extraemos de la base de dades los datos de la actividad con el ID que hemos cojido
        const rows: any = await db`
        SELECT id, titol_exercici, descripcio, pregunta, opcions, respostaCorrecta 
        FROM Activitat 
        WHERE id = ${id}`;
        
        // Comprovamos que la base de dades devuelve la actividad correctamente
        if (!rows[0]) {
            return Response.json(
                { success: false, message: "L'activitat no existeix a la base de dades" },
                { status: 404 }
            );
        }

        const activitatDB = rows[0];

        // Formateamos las dades para que front-end las pueda leer correctamente
        const respuestaFormateada = {
            success: true,
            id: activitatDB.id,
            titol: activitatDB.titol_exercici,
            descripcio: activitatDB.descripcio,
            pregunta: activitatDB.pregunta,
            // Si las opcions de la base de dades vienen como text/string, hacemos el JSON.parse, si no, les passem directament
            opcions: typeof activitatDB.opcions === 'string' ? JSON.parse(activitatDB.opcions) : activitatDB.opcions,
            respostaCorrecta: activitatDB.respostaCorrecta,
        };

        // Log de control para ver que se esta enviando al front
        console.log(`[ACADEMIA] Carregada activitat ID: ${activitatDB.id} | Títol: ${activitatDB.titol_exercici}`);

        return Response.json(respuestaFormateada, { status: 200 });

    } catch (error) {
        console.error("Error intern al buscar l'activitat:", error);
        return Response.json(
            { success: false, message: "Error intern al buscar l'activitat" },
            { status: 500 }
        );
    }
}