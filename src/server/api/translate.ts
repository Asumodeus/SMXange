import { db } from "./db_connection.ts";

interface translationObject {
    ids: string[],
    targetLang: string,
}

export async function getLiterals(req: Request) {
    try {
    const reqContent = (await req.json()) as translationObject;
    const { ids, targetLang } = reqContent;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0 || !targetLang) {
        return Response.json(
            { error:"Invalid request"},
            { status:400 }
        )
    }

    const db_dictionary = await db`
    SELECT nom, ${targetLang} 
    FROM Literals 
    WHERE nom IN (${ids})
    `;
        
    const response_dictionary = Object.fromEntries(
        db_dictionary.map((entry: Record<string, string>) => [entry.nom, entry[targetLang]])
    );

    return Response.json(response_dictionary);

    } catch {
        return Response.json(
            { error:"Internal Server error"},
            { status:500 }
        )
    }
}