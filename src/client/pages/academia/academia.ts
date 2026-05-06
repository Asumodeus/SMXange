document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.querySelector("form") as HTMLFormElement;

  if (!quizForm) return;

  // Mapa de respuestas: usamos solo el número del módulo para evitar fallos de ruta
  const correctAnswers: { [key: string]: string } = {
    "1_1": "b",
    "1_2": "b",
    "1_3": "b",
    "1_4": "a",
  };

  // Obtenemos la URL actual
  const url = window.location.pathname;

  quizForm.addEventListener("submit", (event) => {
    // Obtenemos la respuesta seleccionada
    const formData = new FormData(quizForm);
    const selectedAnswer = formData.get("resposta");

    // Identificamos en qué página estamos buscando el patrón en la URL
    let pageKey = "";
    if (url.includes("1_1")) pageKey = "1_1";
    else if (url.includes("1_2")) pageKey = "1_2";
    else if (url.includes("1_3")) pageKey = "1_3";
    else if (url.includes("1_4")) pageKey = "1_4";

    console.log(
      "Validant Mòdul:",
      pageKey,
      "| Resposta seleccionada:",
      selectedAnswer,
    );

    // Si encontramos la página y la respuesta es incorrecta
    if (pageKey && selectedAnswer !== correctAnswers[pageKey]) {
      event.preventDefault(); // Bloquea el avance
      alert("❌ Resposta incorrecta. Torna-ho a intentar!");
    } else {
      // Si es correcta, el formulario seguirá al 'action' definido en el HTML
      console.log("✅ Correcte! Avançant...");
    }
  });
});
