//Funció de mostra per ensenyar com podria el codi de client cridar a el servidor a través de una ruta de API
//Aixo es una prova
const form = document.getElementById("login") as HTMLFormElement;
const usernameInputField = document.getElementById("uName") as HTMLInputElement;
const passwordInputField = document.getElementById("uPassword") as HTMLInputElement;
const msgSpot = document.getElementById("msgSpot") as HTMLInputElement;

async function sendData() {
  // Associate the FormData object with the form element
  // Create (1) and convert (2) the FormData entries into a plain object
  const formData = new FormData(form);
  const loginData = Object.fromEntries(formData.entries());

  if (!verifyCredentialValidity(loginData)) {
    resetPasswordField();
    msgSpot.innerText = "Si us plau, omple els camps requerits.";
    return;
  }

  try{
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      window.location.href = "/principal"
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
  usernameInputField.classList.add('error-vibracion');
  passwordInputField.classList.add('error-vibracion');
  passwordInputField.value = "";
}

function verifyCredentialValidity(credentials: any ) :boolean {
  if (!credentials.uName || !credentials.uPassword){
    return false;
  }
  return true;
} 