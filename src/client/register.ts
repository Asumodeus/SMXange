//Aquest script és practicament copiat de la página per a login, ja que la funcionalitat per a registrar és bastant semblant
const form = document.getElementById("register") as HTMLFormElement;

async function sendData() {
  // Associate the FormData object with the form element
  // Create (1) and convert (2) the FormData entries into a plain object
  const formData = new FormData(form);
  const registerData = Object.fromEntries(formData.entries());

  if (verifyCredentialValidity(registerData) === true) {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(registerData),
    });

    const msg = response.ok ? "Usuari Registrat" : `Registre fallit`;
    document.getElementById("msgSpot")!.innerText = msg;
  }
}

// Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});


function verifyCredentialValidity(credentials: any ) :boolean {
  //Meter verificación de login (¡LISANDRO!)
  //Aquí, aixó incou verificar que les dos contrasenyes siguin iguals i retornar només una.
  //Avisa al gerard quan així sigui per a actualizar la api de registre

  return true;
} 
