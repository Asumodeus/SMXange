import landingPage from "../client/Portada.html"
import loginPage from "../client/index.html";
import forgotPswd from "../client/forgotPswd.html"
import registerPage from "../client/register.html"
import academiaPage from "../client/academia.html"
import * as api from "./api/api_index"


//Aixó es el core del servidor web
Bun.serve({
    port:80,
    development:true,

    //Cada Entrada dicta que tiene que hacer este servidor cuando reciva una solicitud de GET o POST en esa dirección desde el cliente
    routes: {
        //Paginas
        "/": landingPage,

        //API (La Application Programing Interface permite que el servidor interactue con el cliente, haciendo cosas como guardar o traer datos de la Base de Datos)
        "/login":loginPage,

        "/forgotPswd": forgotPswd,

        "/register":  registerPage,

        "/academia":  academiaPage,

        "/api/login": async (req) => {
            return await api.loginVerification(req);
        },

        "/api/register": async (req) => {
            return await api.registerRequest(req);
        },

        "/api/forgotPswd": async (req) => {
    return await api.forgotPasswordRequest(req);
},

        //Servim el favicon (El incone de la página) quan el servidor el demana
        "/favicon.ico": Bun.file("./src/client/assets/favicon.ico"),

        //Fallback por si se llama una ruta que no encaja
        "/*": new Response("404 Not Found, Sorry", { status: 404 }),
    }
});
