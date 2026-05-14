import { db } from "./db_connection"; // Importa la conexió

// 1. OBTENIR TOTS ELS CURSOS
 // Serveix per a que el front-end pugui mostrar la taula amb totes les opcions.
 
export const getCursos = async () => { // El "async" defineix que la funció és asíncrona.
    try { //Si tot va bé fa aquesta funció
        // Fem la consulta a la taula "Cursos"
        const [rows] = await db`SELECT id, nom, descripcio FROM Cursos`; // El "await" atura l'execució fins a rebre la dada.
        
       // STATUS 404: Si la taula està buida
        if (rows.length === 0) {
            return Response.json(
                { message: "No s'ha trobat cap curs a la base de dades" },
                { status: 404 }
            );
        }

        // STATUS 200: Tot correcte
        return Response.json(rows, { status: 200 })

} catch (error) { 
        console.error("Error al llistar cursos:", error);
        
        // STATUS 500: Error de servidor (la base de dades no respon)
        return Response.json(
            { message: "No s'ha pogut carregar la llista de cursos" },
            { status: 500 }
        );
    }
};


 // 2. OBTENIR UN CURS PER ID
 // Serveix per quan l'usuari clica en un curs concret de la taula.
 
export const getCursoById = async (id: number) => {
    try {
        // Fem servir el '?' per seguretat (evita SQL Injection)
        const [rows] = await db`SELECT * FROM Cursos WHERE id = ${id}`; // Surten les columnes de els cursos //La interrogació evita atacs de furoners// rows serveix per extreure nomes les dades
        
// STATUS 404: Si l'ID no existeix
        if (rows.length === 0) { // El lenght ens diu quants elemsents hi ha a la taula, si és 0 vol dir que no existeix cap curs amb aquest ID
            return Response.json(
                { message: "El curs amb aquest ID no existeix" },
                { status: 404 }
            );
        }

        // STATUS 200: Tot correcte, envia la primera fila
        return Response.json(rows[0], { status: 200 });

    } catch (error) {
        console.error("Error al seleccionar el curs:", error);
        
        // STATUS 500: Error de servidor
        return Response.json(
            { message: "Error intern al buscar el curs seleccionat" },
            { status: 500 }
        );
    }
};