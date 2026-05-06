import { db } from "./db_connection";

// 1. OBTENIR TOTS ELS CURSOS
export const getCursos = async () => {
  try {
    // Fem la consulta a la taula "Cursos" usant el client de Bun:sql
    const rows = await db`SELECT ID_Cursos, Nom, Hores FROM Cursos`;

    // Si la taula està buida
    if (rows.length === 0) {
      return Response.json(
        { message: "No s'ha trobat cap curs a la base de dades" },
        { status: 404 },
      );
    }

    // Tot correcte
    return Response.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error al llistar cursos:", error);
    return Response.json(
      { message: "No s'ha pogut carregar la llista de cursos" },
      { status: 500 },
    );
  }
};

// 2. OBTENIR UN CURS PER ID
export const getCursoById = async (id: number) => {
  try {
    // Bun:sql s'encarrega automàticament de la seguretat contra SQL Injection amb els tagged templates
    const rows = await db`SELECT * FROM Cursos WHERE ID_Cursos = ${id}`;

    // Si l'ID no existeix
    if (rows.length === 0) {
      return Response.json(
        { message: "El curs amb aquest ID no existeix" },
        { status: 404 },
      );
    }

    // Tot correcte, envia la primera fila
    return Response.json(rows[0], { status: 200 });
  } catch (error) {
    console.error("Error al seleccionar el curs:", error);
    return Response.json(
      { message: "Error intern al buscar el curs seleccionat" },
      { status: 500 },
    );
  }
};
