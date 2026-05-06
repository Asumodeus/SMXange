function getCookie(nombre: string) {
  const valor = `; ${document.cookie}`;
  const partes = valor.split(`; ${nombre}=`);
  if (partes.length === 2) return partes.pop()!.split(";").shift();
}

const banner = document.getElementById("cookie-banner")!;
const btn = document.getElementById("aceptar")!;

if (!getCookie("cookiesAceptadas")) {
  banner.style.display = "block";
}

btn.addEventListener("click", () => {
  document.cookie = "cookiesAceptadas=true; path=/;";
  banner.style.display = "none";
});
