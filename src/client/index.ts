//Funció de mostra per ensenyar com podria el codi de client cridar a el servidor a través de una ruta de API
//Aixo es una prova
const form = document.getElementById("login") as HTMLFormElement;
const usernameInput = document.getElementById("uName") as HTMLInputElement;
const passwordInput = document.getElementById("uPassword") as HTMLInputElement;
const msgSpot = document.getElementById("msgSpot") as HTMLInputElement;

async function sendData() {
  // Associate the FormData object with the form element
  // Create (1) and convert (2) the FormData entries into a plain object
  resetPasswordField();

  const formData = new FormData(form);
  const loginData = Object.fromEntries(formData.entries());

  if (!verifyCredentialValidity(loginData)) {
    usernameInput.classList.add('error-vibracion');
    passwordInput.classList.add('error-vibracion');
    msgSpot.innerText = "Si us plau, omple els camps requerits.";
    return;
  }

  try{
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      window.location.href = "/academia"
    } else {
      resetPasswordField();
      const result = await response.json();
      msgSpot.innerText = result.error || "Usuari o contrasenya incorrectes";
    }
  } catch (error) {
    console.error("No es pot conectar amb el servidor", error);
    msgSpot.innerText = "Error de connexió amb el servidor";
  }
}

// Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});

function resetPasswordField() {
  usernameInput.classList.add('error-vibracion');
  passwordInput.classList.add('error-vibracion');
  passwordInput.value = "";
}

function verifyCredentialValidity(credentials: any ) :boolean {
  if (!credentials.uName || !credentials.uPassword){
    return false;
  }
  return true;
} 