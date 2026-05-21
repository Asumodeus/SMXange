import { db } from "./db_connection.ts"; 

export async function getActivitatDinamica(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!id) {
            console.log("[Academia API] Request missing activity ID");
            return Response.json({ success: false, message: "Falta l'ID de l'activitat" }, { status: 400 });
        }

        const rows: any = await db`SELECT id, titol_exercici, descripcio, pregunta, opcions, respostaCorrecta FROM Activitat WHERE id = ${id}`;
        
        if (!rows[0]) {
            console.log(`[Academia API] Activity ID ${id} not found in DB`);
            return Response.json({ success: false, message: "L'activitat no existeix a la base de dades" }, { status: 404 });
        }

        const activitatDB = rows[0];

        const safeParse = (field: string, data: any) => {
            if (typeof data === 'string') {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    console.error(`[Academia API] Error parsing ${field} JSON for activity ${id}:`, e);
                    console.error(`[Academia API] Malformed data:`, data);
                    throw e; // Re-throw to be caught by the outer catch block
                }
            }
            return data;
        };

        const respuestaFormateada = {
            success: true,
            id: activitatDB.id,
            titol: activitatDB.titol_exercici,
            descripcio: safeParse('descripcio', activitatDB.descripcio),
            pregunta: activitatDB.pregunta,
            opcions: safeParse('opcions', activitatDB.opcions),
            respostaCorrecta: activitatDB.respostaCorrecta,
        };

        console.log(`[Academia API] Loaded activity ID: ${activitatDB.id} | Títol: ${activitatDB.titol_exercici}`);
        return Response.json(respuestaFormateada, { status: 200 });

    } catch (error) {
        console.error("[Academia API] Error intern al buscar l'activitat:", error);
        return Response.json({ success: false, message: "Error intern al buscar l'activitat" }, { status: 500 });
    }
}

export async function getAllActivitats(req: Request) {
    try {
        const rows: any = await db`SELECT id, titol_exercici FROM Activitat ORDER BY id ASC`;
        
        console.log(`[Academia API] Fetched list of all activities, total: ${rows.length}`);
        return Response.json({ success: true, activitats: rows }, { status: 200 });

    } catch (error) {
        console.error("[Academia API] Error intern al llistar activitats:", error);
        return Response.json({ success: false, message: "Error intern al llistar activitats" }, { status: 500 });
    }
}