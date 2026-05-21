import { db } from "./db_connection.ts";

// Funcion para recivir una solicitud de front con el token Sha256 para despues enviar los datos del usuario a front
export async function authVerification(req: Request) {
    try {
        const cookieHeader = req.headers.get("cookie");
        let clientToken = null;
        if (cookieHeader) {
            const match = cookieHeader.match(/(?:^|;\s*)token=([^;]*)/);
            if (match) clientToken = match[1];
        }

        // Comprobamos si el front-end nos ha enviado el token
        if (!clientToken) {
            return Response.json(
                { error: "Token no proporcionado" },
                { status: 400 }
            );
        }

        // Buscamos en la base de datos el usuario que tenga ese mismo token SHA-256.
        const dbUser: any = await db`SELECT * FROM Usuari WHERE Token = ${clientToken}`;

        // Si la base de datos no devuelve ninguna fila, significa que el token es inválido o expiró
        if (!dbUser[0]) {
            return Response.json(
                { success: false, error: "Token inválido o sesión expirada" },
                { status: 401 }
            );
        }

        const usuarioCompleto = dbUser[0];

        // Por seguridad, eliminamos la contraseña antes de enviarlo al front-end
        if (usuarioCompleto.Password) {
            delete usuarioCompleto.Password;
        }

        // log de seguimiento para el servidor
        console.log(`[AUTH] Usuario autenticado correctamente vía Token: ${usuarioCompleto.FKusername || usuarioCompleto.id}`);

        // Enviamos al front-end todos los datos almacenados en la tabla del usuario
        return Response.json({
            success: true,
            message: "Autenticación exitosa",
            user: usuarioCompleto
        }, { status: 200 });

    } catch (error) {
        // Capturamos cualquier error inesperado
        console.error("Error en el proceso de autenticación:", error);
        return Response.json(
            { success: false, error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}

