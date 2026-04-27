//Aquest script és practicament copiat de la página per a login, ja que la funcionalitat per a registrar és bastant semblant
const form = document.getElementById("register") as HTMLFormElement;

async function sendData() {
  // Associate the FormData object with the form element
  // Create (1) and convert (2) the FormData entries into a plain object
  const formData = new FormData(form);
  const registerData = Object.fromEntries(formData.entries());

  if (verifyCredentialValidity(registerData) === true) {
    const datosToSend = {
      user: registerData.user,
      Apellido: registerData.Apellido,
      Usuario: registerData.Usuario,
      Telefono: registerData. Telefono,
      email: registerData.email,
      password: registerData.passwordOnce
    };
    
    try {
    const response = await fetch("/api/register", { //Llamar a la puerta del servidor
      method: "POST", //Crear o guardar algo nuevo
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosToSend),
    });

    const msg = response.ok ? "Usuari Registrat" : `Registre fallit`;
    document.getElementById("msgSpot")!.innerText = msg;

    if (response.ok) {
      setTimeout(() => {
        window.location.href = "/login.html";
      }, 1000);
    }

  }catch (error){
     console.error("Error de connexió", error);
     document.getElementById("msgSpot")!.innerText= "Error de connexió amb el servidor.";
    }
  }
}

// Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("msgSpot")!.innerText = "";
  sendData();
});


function verifyCredentialValidity(credentials: any ) :boolean {
  //Meter verificación de login (¡LISANDRO!)
  //Aquí, aixó incou verificar que les dos contrasenyes siguin iguals i retornar només una.
  //Avisa al gerard quan així sigui per a actualizar la api de registre
  if (credentials.passwordOnce !== credentials.passwordTwice) {
    document.getElementById("msgSpot")!.innerText = "Les contrasenyes no coincideixen.";
    return false;
  }

  if (credentials.passwordOnce.length < 6) {
    document.getElementById("msgSpot")!.innerText = "La contrasenya ha de tenir almenys 6 caràcters.";
    return false;
  }
  return true;
}
