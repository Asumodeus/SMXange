//Funció de mostra per ensenyar com podria el codi de client cridar a el servidor a través de una ruta de API
//Aixo es una prova
const form = document.getElementById("login") as HTMLFormElement;
const userInput = document.getElementById("uName") as HTMLInputElement;
const passInput = document.getElementById("uPassword") as HTMLInputElement;
const msgSpot = document.getElementById("msgSpot") as HTMLInputElement;

async function sendData() {
  // Associate the FormData object with the form element
  // Create (1) and convert (2) the FormData entries into a plain object
  userInput.classList.remove('error-vibracion');
  passInput.classList.remove('error-vibracion');
  msgSpot.innerText = "";
  void userInput.offsetWidth;
  void passInput.offsetWidth;

  const formData = new FormData(form);
  const loginData = Object.fromEntries(formData.entries());

  if (verifyCredentialValidity(loginData) === true) {
    try{
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          'Contentent-Type': 'application/json'
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        window.location.href = "/"
      }else{
        userInput.classList.add('error-vibracion');
        passInput.classList.add('error-vibracion');
        passInput.value = "";

        try {
          const result = await response.json();
          msgSpot.innerText = result.message || result.error || "Usuari o contrasenya incorrectes";
        }catch{
          msgSpot.innerText = "Usuari o contrasenya incorrectes";
        }
      }
    }catch (error){
      console.error("No es pot conectar amb el servidor", error);
      msgSpot.innerText = "Error de connexió amb el servidor";
    }
  }else{
    userInput.classList.add('error-vibracion');
    passInput.classList.add('error-vibracion');
    msgSpot.innerText = "Si us plau, omple els camps requerits.";
  }
}

// Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});


function verifyCredentialValidity(credentials: any ) :boolean {
  if (!credentials.uName || !credentials.uPassword){
    return false;
  }

  return true;
} 