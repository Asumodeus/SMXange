// atencióClient.ts

interface SolicitudData {
  nom: string;
  cognoms: string;
  usuari: string;
  correu: string;
  categoria: string;
  descripcio: string;
}

const API_URL = "/api/suport/solicitud";

function getFormData(): SolicitudData | null {
  const inputs = document.querySelectorAll<HTMLInputElement>("#sc-form input");
  const select = document.querySelector<HTMLSelectElement>("#sc-form select");
  const textarea =
    document.querySelector<HTMLTextAreaElement>("#sc-form textarea");

  const nom = inputs[0]?.value.trim();
  const cognoms = inputs[1]?.value.trim();
  const usuari = inputs[2]?.value.trim();
  const correu = inputs[3]?.value.trim();
  const categoria = select?.value ?? "";
  const descripcio = textarea?.value.trim() ?? "";

  if (
    !nom ||
    !cognoms ||
    !usuari ||
    !correu ||
    !categoria ||
    categoria === "Categoria del problema" ||
    !descripcio
  ) {
    return null;
  }

  return { nom, cognoms, usuari, correu, categoria, descripcio };
}

async function send(): Promise<void> {
  const data = getFormData();

  if (!data) {
    alert("Si us plau, omple tots els camps abans d'enviar.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    document.getElementById("sc-form")!.style.display = "none";
    document.getElementById("sc-ok")!.classList.add("show");
  } catch (err) {
    console.error("Error enviant la sol·licitud:", err);
    alert(
      "Hi ha hagut un error en enviar la sol·licitud. Torna-ho a intentar.",
    );
  }
}

function reset(): void {
  const form = document.getElementById("sc-form")!;
  const ok = document.getElementById("sc-ok")!;

  form.style.display = "block";
  ok.classList.remove("show");
  form
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")
    .forEach((e) => (e.value = ""));

  const select = form.querySelector<HTMLSelectElement>("select");
  if (select) select.selectedIndex = 0;
}

function pill(el: HTMLElement): void {
  document
    .querySelectorAll(".sc-pill")
    .forEach((p) => p.classList.remove("act"));
  el.classList.add("act");
}

function faq(btn: HTMLElement): void {
  const item = btn.closest(".sc-fi")!;
  const isOpen = item.classList.contains("open");
  document
    .querySelectorAll(".sc-fi.open")
    .forEach((i) => i.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}
