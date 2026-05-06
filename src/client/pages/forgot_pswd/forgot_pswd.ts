const form = document.getElementById("forgotForm") as HTMLFormElement;
const msgSpot = document.getElementById("msgSpot") as HTMLParagraphElement;
const cancelButton = document.getElementById("cancelButton") as HTMLButtonElement;

cancelButton.addEventListener("click", () => {
  window.location.href = "/login";
});

async function sendData() {
  const formData = new FormData(form);
  const forgotData = Object.fromEntries(formData.entries());

  if (!forgotData.Usuario || !forgotData.newPassword) {
    msgSpot.innerText = "Si us plau, omple tots els camps.";
    return;
  }

  if (forgotData.newPassword.toString().length < 6) {
    msgSpot.innerText = "La contrasenya ha de tenir com a mínim 6 caràcters.";
    return;
  }

  try {
    const response = await fetch("/api/forgotPswd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(forgotData),
    });

    const result = await response.json();

    if (response.ok) {
      msgSpot.innerText = result.message || "Contrasenya actualitzada correctament.";

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      msgSpot.innerText = result.error || "No s'ha pogut actualitzar la contrasenya.";
    }
  } catch (error) {
    console.error("Error de connexió", error);
    msgSpot.innerText = "Error de connexió amb el servidor.";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});