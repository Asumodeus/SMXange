document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.querySelector("form") as HTMLFormElement;
    if (!quizForm) return;

    const correctAnswers: { [key: string]: string } = {
        "1_1": "b",
        "1_2": "b",
        "1_3": "b",
        "1_4": "a",
    };

    // Lista de módulos
    const modules: string[] = ["1_1", "1_2", "1_3", "1_4"];

    const url = window.location.pathname;
    const isLastModule = url.includes("1_4");

    // === PASO 1: Limpiar historial ===
    history.replaceState(null, "", window.location.href);

    // === PASO 2: Bloquear botón atrás ===
    history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
        history.pushState(null, "", window.location.href);
    });

    // === CONTROL DE PROGRESO ===
    let currentModule = "";

    if (url.includes("1_1")) currentModule = "1_1";
    else if (url.includes("1_2")) currentModule = "1_2";
    else if (url.includes("1_3")) currentModule = "1_3";
    else if (url.includes("1_4")) currentModule = "1_4";

    const unlockedModule =
        localStorage.getItem("unlockedModule") || "1_1";

    // Bloquear acceso a módulos no desbloqueados
    if (
        modules.indexOf(currentModule) >
        modules.indexOf(unlockedModule)
    ) {
        alert("❌ Has de completar el mòdul anterior correctament.");
        window.location.href = "/1_1";
    }

    quizForm.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const formData = new FormData(quizForm);
        const selectedAnswer = formData.get("resposta") as string | null;

        let pageKey = "";

        if (url.includes("1_1")) pageKey = "1_1";
        else if (url.includes("1_2")) pageKey = "1_2";
        else if (url.includes("1_3")) pageKey = "1_3";
        else if (url.includes("1_4")) pageKey = "1_4";

        console.log(
            `Módulo: ${pageKey} | Seleccionado: ${selectedAnswer}`
        );

        // VALIDACIÓN 0
        if (!pageKey) {
            alert("❌ Error: no s'ha pogut determinar el mòdul actual.");
            return;
        }

        // VALIDACIÓN 1
        if (!selectedAnswer || selectedAnswer.trim() === "") {
            alert("❌ Has de seleccionar una resposta per continuar.");
            return;
        }

        // VALIDACIÓN 2
        if (selectedAnswer !== correctAnswers[pageKey]) {
            alert("❌ Resposta incorrecta. Torna-ho a intentar!");
            history.replaceState(null, "", window.location.href);
            return;
        }

        // VALIDACIÓN 3
        if (isLastModule) {
            alert("✅ Has completat tots els mòduls!");
            return;
        }

        // === DESBLOQUEAR SIGUIENTE MÓDULO ===
        const currentIndex = modules.indexOf(pageKey);

        if (currentIndex < modules.length - 1) {
            localStorage.setItem(
                "unlockedModule",
                modules[currentIndex + 1] as string
            );
        }

        console.log(
            "✅ Resposta correcta - Avançant al següent mòdul"
        );

        quizForm.submit();
    });
});