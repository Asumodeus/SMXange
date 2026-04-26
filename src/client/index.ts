//Funció de mostra per ensenyar com podria el codi de client cridar a el servidor a través de una ruta de API
//Aixo es una prova
const form = document.getElementById("login") as HTMLFormElement;

async function sendData() {
  // Associate the FormData object with the form element
  // Create (1) and convert (2) the FormData entries into a plain object
  const formData = new FormData(form);
  const loginData = Object.fromEntries(formData.entries());

  if (verifyCredentialValidity(loginData) === true) {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });

    // Extraiem les dades de la resposta (message o error)
    const result = await response.json();
    const msg = result.message || result.error || response.statusText;
    
    document.getElementById("msgSpot")!.innerText = msg;

    // Espai per a logica basada en codis d'estat (redireccions, etc.)
    if (response.ok) {
        // window.location.href = "/Portada.html"; // Exemple de redirecció
    } else {
        console.error(`Error de login: ${response.status}`);
    }
  }
}

// Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});


function verifyCredentialValidity(credentials: any ) :boolean {
  //Meter verificación de login (¡LISANDRO!)

  return true;
} 
