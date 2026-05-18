interface Crypto {
    name: string;
    price: number;
    change24h: number;
    logo: string;
}

async function cargarCriptos(): Promise<void> {
    try {
        const respuesta = await fetch("/api/cryptos");

        if (!respuesta.ok) {
            const texto = await respuesta.text();
            console.error("Error en /api/cryptos:", respuesta.status, texto);
            return;
        }

        const contentType = respuesta.headers.get("content-type") || "";
        let datos: Crypto[] = [];

        if (contentType.includes("application/json")) {
            datos = await respuesta.json();
        } else {
            // Intentamos leer el texto para depurar respuestas inesperadas
            const texto = await respuesta.text();
            try {
                datos = JSON.parse(texto);
            } catch (err) {
                console.error("Respuesta inválida de /api/cryptos (no JSON):", texto);
                return;
            }
        }

        const tbody = document.querySelector(".crypto-table tbody") as HTMLTableSectionElement;
        if (!tbody) return;
        tbody.innerHTML = "";

        datos.forEach((coin: Crypto) => {
            tbody.innerHTML += `
            <tr>
                <td class="coin-name">
                    <img src="${coin.logo}" alt="">
                    ${coin.name}
                </td>
                <td>$${coin.price}</td>
                <td class="${coin.change24h >= 0 ? 'positive' : 'negative'}">
                    ${coin.change24h}%
                </td>
            </tr>
        `;
        });
    } catch (err) {
        console.error("Error cargando criptos:", err);
    }
}

cargarCriptos();
