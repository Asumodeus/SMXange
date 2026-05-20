import { db } from "./db_connection.ts";

const DEBUG = true; // Toggle this to enable/disable server-side logs

interface translationObject {
    ids: string[],
    targetLang: string,
}

export async function getLiterals(req: Request) {
    const log = (msg: string) => DEBUG && console.log(`[Translate API] ${msg}`);

    try {
        const { targetLang, ids } = (await req.json()) as translationObject;
        
        if (!ids || !Array.isArray(ids) || ids.length === 0 || !targetLang) {
            log("Error: Invalid payload received");
            return Response.json({ error: "Invalid request" }, { status: 400 });
        }

        log(`Request: lang="${targetLang}", count=${ids.length}`);

        // We use db() as a function to escape the column name and the IN array correctly
        const db_dictionary = await db`
            SELECT nom, ${db(targetLang)} 
            FROM Literal 
            WHERE nom IN ${db(ids)}
        `;
            
        const response_dictionary = Object.fromEntries(
            db_dictionary.map((entry: Record<string, string>) => [entry.nom, entry[targetLang]])
        );

        log(`Result: Found ${db_dictionary.length}/${ids.length} matches`);

        return Response.json(response_dictionary);

    } catch (error) {
        log(`Critical: ${error instanceof Error ? error.message : "Internal Error"}`);
        return Response.json({ error: "Internal Server error" }, { status: 500 });
    }
}
