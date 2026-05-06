import landingPage from "../client/Portada.html"
import loginPage from "../client/index.html"
import forgotPswd from "../client/forgotPswd.html"
import registerPage from "../client/register.html"
import pagina_principal from "../client/pagina_principal.html"
import academiaPage from "../client/academia_1_1.html"
import academiaPage2 from "../client/academia_1_2.html"
import academiaPage3 from "../client/academia_1_3.html"
import academiaPage4 from "../client/academia_1_4.html"
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

        "/principal": pagina_principal,

        "/academia_1_1":  academiaPage,
        "/academia_1_2":  academiaPage2,
        "/academia_1_3":  academiaPage3,
        "/academia_1_4":  academiaPage4,

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
