import { db } from "./db_connection.ts";

export async function getUserProgress(req: Request) {
    try {
        const cookieHeader = req.headers.get("cookie");
        let clientToken = null;
        if (cookieHeader) {
            const match = cookieHeader.match(/(?:^|;\s*)token=([^;]*)/);
            if (match) clientToken = match[1];
        }

        if (!clientToken) {
            console.log("[Academia Progress] Request missing token");
            return Response.json({ error: "Token no proporcionado" }, { status: 400 });
        }

        const dbUser: any = await db`SELECT IDusuari FROM Usuari WHERE Token = ${clientToken}`;

        if (!dbUser[0]) {
            console.log("[Academia Progress] Invalid token provided");
            return Response.json({ error: "Token inválido" }, { status: 401 });
        }

        const userId = dbUser[0].IDusuari;
        
        const progress: any = await db`SELECT ID_Act FROM Usuari_Activitats WHERE ID_Usuari = ${userId}`;
        
        const completedIds = progress.map((row: any) => row.ID_Act);
        console.log(`[Academia Progress] Fetched progress for User ID ${userId}: [${completedIds}]`);

        return Response.json({ success: true, completed: completedIds }, { status: 200 });

    } catch (error) {
        console.error("[Academia Progress Error]", error);
        return Response.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

export async function submitAnswer(req: Request) {
    try {
        const cookieHeader = req.headers.get("cookie");
        let clientToken = null;
        if (cookieHeader) {
            const match = cookieHeader.match(/(?:^|;\s*)token=([^;]*)/);
            if (match) clientToken = match[1];
        }

        const body = await req.json();
        const activityId = body.id;
        const answer = body.answer;

        if (!clientToken || !activityId || !answer) {
            console.log("[Academia Submit] Request missing token, id, or answer");
            return Response.json({ error: "Faltan datos en la petición" }, { status: 400 });
        }

        const dbUser: any = await db`SELECT IDusuari FROM Usuari WHERE Token = ${clientToken}`;

        if (!dbUser[0]) {
            console.log("[Academia Submit] Invalid token provided");
            return Response.json({ error: "Token inválido" }, { status: 401 });
        }

        const userId = dbUser[0].IDusuari;

        const activity: any = await db`SELECT respostaCorrecta FROM Activitat WHERE id = ${activityId}`;
        if (!activity[0]) {
            console.log(`[Academia Submit] Activity ID ${activityId} not found`);
            return Response.json({ error: "Activitat no trobada" }, { status: 404 });
        }

        const correct = activity[0].respostaCorrecta;
        
        if (correct !== answer) {
            console.log(`[Academia Submit] User ID ${userId} submitted incorrect answer for Activity ${activityId}`);
            return Response.json({ success: false, message: "Resposta incorrecta" }, { status: 200 });
        }

        // We use IGNORE in case it was already inserted
        await db`INSERT IGNORE INTO Usuari_Activitats (ID_Usuari, ID_Act) VALUES (${userId}, ${activityId})`;

        console.log(`[Academia Submit] User ID ${userId} successfully completed Activity ${activityId}`);
        return Response.json({ success: true, message: "Resposta correcta!" }, { status: 200 });

    } catch (error) {
        console.error("[Academia Submit Error]", error);
        return Response.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
