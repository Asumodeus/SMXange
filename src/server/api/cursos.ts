import { db } from "./db_connection"; // Corregit el path d'importació

// Funció per obtenir tots els cursos de la base de dades
// Aquesta taula Cursos ha d'existir a la DB per funcionar
export const getCursos = async () => {
    try {
        // Ús de la sintaxi de Bun SQL (tagged templates)
        const rows = await db`SELECT * FROM Cursos`;
        
        return {
            success: true,
            data: rows
        };
    } catch (error) {
        console.error("Error al recuperar els cursos:", error);
        return {
            success: false,
            message: "No s'han pogut carregar els cursos"
        };
    }
};

// Funció per obtenir un curs específic per ID 
export const getCursoById = async (id: number) => {
    try {
        // La sintaxi de Bun SQL gestiona automàticament la protecció contra injecció amb ${id}
        const rows = await db`SELECT * FROM Cursos WHERE id = ${id}`;
        
        return {
            success: true,
            data: rows[0]
        };
    } catch (error) {
        console.error("Error en buscar el curs:", error);
        return {
            success: false,
            message: "Error en buscar el curs"
        };
    }
};
