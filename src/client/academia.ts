// Afegeix la declaració global per evitar errors de Typescript
declare global {
    interface Window {
        translatePage: (force?: boolean) => Promise<void>;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    // DOM Elements
    const sidebarList = document.getElementById("sidebarList") as HTMLDivElement;
    const progressBar = document.getElementById("progressBar") as HTMLDivElement;
    const progressPercent = document.getElementById("progressPercent") as HTMLSpanElement;
    
    const loadingOverlay = document.getElementById("loadingOverlay") as HTMLDivElement;
    const mainContent = document.getElementById("mainContent") as HTMLElement;
    
    const activityTitle = document.getElementById("activityTitle") as HTMLHeadingElement;
    const activityDescription = document.getElementById("activityDescription") as HTMLDivElement;
    const activityQuestion = document.getElementById("activityQuestion") as HTMLParagraphElement;
    const optionsContainer = document.getElementById("optionsContainer") as HTMLDivElement;
    
    const quizForm = document.getElementById("quizForm") as HTMLFormElement;
    const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
    const statusMessage = document.getElementById("statusMessage") as HTMLDivElement;
    
    // State
    let completedActivities: number[] = [];
    let allActivities: any[] = [];
    let currentActivityId: number | null = null;
    let isCurrentCompleted = false;

    // Fetch data
    async function init() {
        try {
            // 1. Fetch Progress
            const progressRes = await fetch("/api/academia/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}) // Token goes via cookies automatically
            });
            
            if (progressRes.ok) {
                const pData = await progressRes.json();
                if (pData.success) {
                    completedActivities = pData.completed;
                }
            } else if (progressRes.status === 400 || progressRes.status === 401) {
                alert("Sessió caducada o invàlida. Si us plau, torna a iniciar sessió.");
                window.location.href = "/login";
                return;
            }

            // 2. Fetch List of Activities
            const listRes = await fetch("/api/academia/list");
            if (listRes.ok) {
                const lData = await listRes.json();
                if (lData.success) {
                    allActivities = lData.activitats;
                }
            }

            // 3. Render Sidebar
            await renderSidebar();

            // 4. Determine which activity to load
            const urlParams = new URLSearchParams(window.location.search);
            const idParam = urlParams.get("id");
            
            if (idParam) {
                currentActivityId = parseInt(idParam);
            } else {
                // Find first incomplete
                const firstIncomplete = allActivities.find(a => !completedActivities.includes(a.id));
                currentActivityId = firstIncomplete ? firstIncomplete.id : allActivities[0]?.id;
            }



            if (currentActivityId) {
                await loadActivity(currentActivityId);
            }

        } catch (err) {
            console.error("Error al inicializar la academia:", err);
            alert("Error de connexió.");
            loadingOverlay.style.display = "none";
        }
    }

    async function renderSidebar() {
        sidebarList.innerHTML = "";
        
        let percentage = allActivities.length > 0 
            ? Math.round((completedActivities.length / allActivities.length) * 100) 
            : 0;
            
        progressBar.style.width = `${percentage}%`;
        progressPercent.textContent = `${percentage}% Completat`;

        allActivities.forEach((act, index) => {
            const isCompleted = completedActivities.includes(act.id);
            const isActive = currentActivityId === act.id;
            
            const a = document.createElement("a");
            a.href = `/academia?id=${act.id}`;
            a.className = `module-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;
            
            const icon = document.createElement("span");
            icon.className = "icon";
            icon.textContent = isCompleted ? "✓" : (isActive ? "●" : "○");
            
            const span = document.createElement("span");
            span.setAttribute("data-db-id", act.titol_exercici);
            span.style.opacity = "0"; // Hide until translated
            span.textContent = `Carregant títol...`; 
            
            a.appendChild(icon);
            a.appendChild(span);
            sidebarList.appendChild(a);
        });

        if (window.translatePage) {
            try {
                await window.translatePage(true);
            } catch (e) {
                console.error(e);
            }
        }
        
        // Always reveal text after attempting translation
        sidebarList.querySelectorAll("span[data-db-id]").forEach(el => {
            (el as HTMLElement).style.opacity = "1";
        });
    }

    async function loadActivity(id: number) {
        loadingOverlay.style.display = "flex";
        mainContent.style.display = "none";
        statusMessage.style.display = "none";

        try {
            const res = await fetch(`/api/pregunta_academia?id=${id}`);
            const data = await res.json();
            
            if (data.success) {
                // Update DOM
                activityTitle.setAttribute("data-db-id", data.titol);
                activityTitle.textContent = "";

                activityDescription.innerHTML = "";
                const descArray = Array.isArray(data.descripcio) ? data.descripcio : [data.descripcio];
                descArray.forEach((parId: string) => {
                    const p = document.createElement("p");
                    p.setAttribute("data-db-id", parId);
                    activityDescription.appendChild(p);
                });

                activityQuestion.setAttribute("data-db-id", data.pregunta);
                activityQuestion.textContent = "";

                optionsContainer.innerHTML = "";
                const opcions = data.opcions || {};
                
                for (const [key, val] of Object.entries(opcions)) {
                    const label = document.createElement("label");
                    label.className = "opcio";
                    
                    const input = document.createElement("input");
                    input.type = "radio";
                    input.name = "resposta";
                    input.value = key;
                    input.required = true;
                    
                    const span = document.createElement("span");
                    span.setAttribute("data-db-id", val as string);
                    
                    label.appendChild(input);
                    label.appendChild(span);
                    optionsContainer.appendChild(label);
                }

                // Handle completion state
                isCurrentCompleted = completedActivities.includes(id);
                if (isCurrentCompleted) {
                    submitBtn.disabled = true;
                    submitBtn.style.opacity = "0.5";
                    submitBtn.style.cursor = "not-allowed";
                    
                    statusMessage.style.display = "block";
                    statusMessage.style.backgroundColor = "rgba(34, 197, 94, 0.2)";
                    statusMessage.style.color = "#4ade80";
                    statusMessage.style.border = "1px solid rgba(34, 197, 94, 0.3)";
                    statusMessage.textContent = "Ja has completat aquesta activitat correctament.";
                    
                    // Optional: pre-select correct answer if you want, but we might not have it in the client
                } else {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = "1";
                    submitBtn.style.cursor = "pointer";
                }

                // Force translation update
                if (window.translatePage) {
                    await window.translatePage(true);
                }
                
                loadingOverlay.style.display = "none";
                mainContent.style.display = "flex";
                
                // Update active state in sidebar
                currentActivityId = id;
                renderSidebar();
                
            } else {
                alert("Error al carregar l'activitat.");
            }
        } catch (err) {
            console.error(err);
            alert("Error al carregar l'activitat.");
        } finally {
            loadingOverlay.style.display = "none";
        }
    }

    quizForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (isCurrentCompleted) return;

        const formData = new FormData(quizForm);
        const selectedAnswer = formData.get("resposta");

        if (!selectedAnswer) {
            alert("Selecciona una resposta.");
            return;
        }

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = "Comprovant...";
            
            const res = await fetch("/api/academia/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: currentActivityId,
                    answer: selectedAnswer
                })
            });

            const data = await res.json();
            
            statusMessage.style.display = "block";

            if (data.success) {
                // Correct!
                statusMessage.style.backgroundColor = "rgba(34, 197, 94, 0.2)";
                statusMessage.style.color = "#4ade80";
                statusMessage.style.border = "1px solid rgba(34, 197, 94, 0.3)";
                statusMessage.textContent = "Resposta correcta! ✅";
                
                if (currentActivityId && !completedActivities.includes(currentActivityId)) {
                    completedActivities.push(currentActivityId);
                }
                
                isCurrentCompleted = true;
                renderSidebar();

                submitBtn.textContent = "Avançar al següent mòdul";
                submitBtn.disabled = false;
                
                // Change submit action to navigate
                quizForm.onsubmit = (e2) => {
                    e2.preventDefault();
                    const currentIndex = allActivities.findIndex(a => a.id === currentActivityId);
                    if (currentIndex < allActivities.length - 1) {
                        window.location.href = `/academia?id=${allActivities[currentIndex + 1].id}`;
                    } else {
                        alert("Has completat tots els mòduls de l'Acadèmia!");
                        window.location.href = "/principal";
                    }
                };

            } else {
                // Incorrect
                statusMessage.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
                statusMessage.style.color = "#f87171";
                statusMessage.style.border = "1px solid rgba(239, 68, 68, 0.3)";
                statusMessage.textContent = "Resposta incorrecta. Torna-ho a intentar! ❌";
                
                // Clean reset
                quizForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = "Comprovar i Avançar";
                
                // Re-translate placeholder strings via global mechanism just in case
                if (window.translatePage) {
                    window.translatePage(true);
                }
            }

        } catch (err) {
            console.error(err);
            alert("Error al enviar la resposta.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Comprovar i Avançar";
        }
    });

    // Toggle Sidebar
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebar = document.querySelector(".sidebar");
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
        });
    }

    // Start
    init();
});