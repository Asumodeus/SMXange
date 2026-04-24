import { db } from "../db_connection"; // Importem la connexió que ja teniu creada

//Funció per obtenir tots els cursos de la base de dades
 
// Consulta SQL per seleccionar tots els cursos
        // Aquesta taula Cursos ha d'existir a la DB per funcionar

    export const getCursos = async () => {
        try { //Si tot va bé fa aquesta funció
        const [rows] = await db.query("SELECT * FROM Cursos");
        
        return {
            success: true,
            data: rows
        };
    } catch (error) { //Si hi hs un error la web no es penja i mostra el error
        console.error("Error al recuperar els cursos:", error);
        return {
            success: false,
            message: "No s'han pogut carregar els cursos"
        };
    }
};

//Funció per obtenir un curs específic per ID 

export const getCursoById = async (id: number) => {
    try {
        const [rows] = await db.query("SELECT * FROM Cursos WHERE id = ?", [id]); // Surten les columnes de els cursos //L¡ La interrogació evita atacs de furoners// rows serveix per extreure nomes les dades
        return {
            success: true,
            data: rows[0]
        };
    } catch (error) {
        return {
            success: false,
            message: "Error en buscar el curs"
        };
    }
};