//Aquest script és practicament copiat de la página per a login, ja que la funcionalitat per a registrar és bastant semblant
const form = document.getElementById("register") as HTMLFormElement;

function mostrarFinestra(missatge: string, urlRedireccio?: string) {
  const finestra = document.getElementById("finestraEmergent") as HTMLElement;
  const textFinestra = document.getElementById("textFinestra") as HTMLParagraphElement;
  const btnAceptar = document.getElementById("btnAceptarFinestra") as HTMLButtonElement;

  textFinestra.innerText = missatge;
  finestra.style.display = "flex";

  btnAceptar.onclick = () => {
    finestra.style.display = "none";
    if (urlRedireccio){
      window.location.href = urlRedireccio;
    }
  }
}


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
      Telefono: registerData.Telefono,
      email: registerData.email,
      passwordOnce: registerData.passwordOnce,
      passwordTwice: registerData.passwordTwice
    };
    
    try {
    const response = await fetch("/api/register", { //Llamar a la puerta del servidor
      method: "POST", //Crear o guardar algo nuevo
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosToSend),
    });

    if (response.ok) {
      mostrarFinestra("Compte creat amb èxit", "/login");
    }else{
      const result = await response.json();
      mostrarFinestra(result.error || "Registre fallit. Verifica les dades i torna a intentar-ho.")
    }

  }catch (error){
     console.error("Error de connexió", error);
     mostrarFinestra("Error de connexió amb el servidor.")
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
  //Aquí, aixó incou verificar que les dos contrasenyes siguin iguals i retornar només una.
  //Avisa al gerard quan així sigui per a actualizar la api de registre
  if (credentials.passwordOnce !== credentials.passwordTwice) {
    mostrarFinestra("Les contrasenyes no coincideixen.");
    return false;
  }

  if (credentials.passwordOnce.length < 6) {
    mostrarFinestra("La contrasenya ha de tenir al menys 6 caràcters.")
    return false;
  }
  return true;
}
