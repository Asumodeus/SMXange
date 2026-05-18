import { db } from "./db_connection.ts";

/**
 * Esta función es la que "cocina" los datos. 
 * Va a la base de datos, elige el idioma y lo prepara para el Front-end.
 */
export const obtenerTextos = async (lang: string) => {
    // 1. SEGURIDAD: Validamos el idioma
    // tocamos los nombres de COLUMNAS, hay que estar seguros de que el idioma es uno de los tres que existen (cat, esp, eng).
    const idiomasValidos = ["cat", "esp", "eng"];
    const columnaSeleccionada = idiomasValidos.includes(lang) ? lang : "esp";

    try {
        // 2. LA QUERY (CONSULTA)
        // Usamos las comillas invertidas de Bun SQL.
        // ${db.column(...)} le dice a Bun que "columnaSeleccionada" es el nombre de la columna.
        const filas = await db`
            SELECT nom, ${db.columna(columnaSeleccionada)} AS texto
            FROM Literal
        `;

        // 3. EL MAPEO (FORMATO)
        // La DB nos da una lista de filas. Nosotros queremos un "diccionario"
        // para que sea fácil de usar: { "login_titol": "Bienvenido", ... }
        const diccionario: Record<string, string> = {};
        
        filas.forEach((fila: any) => {
            diccionario[fila.nom] = fila.texto;
        });

        return diccionario;
    } catch (error) {
        console.error("Error al leer la tabla Literal:", error);
        return { error: "No se pudieron cargar los idiomas" };
    }
};

// Este codigo ts se modificara luego, no es definitivo esto