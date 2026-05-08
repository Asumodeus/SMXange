interface Crypto {
    name: string;
    price: number;
    change24h: number;
    logo: string;
}

async function cargarCriptos(): Promise<void> {
    const respuesta = await fetch("/api/cryptos");
    const datos: Crypto[] = await respuesta.json();

    const tbody = document.querySelector(".crypto-table tbody") as HTMLTableSectionElement;
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
}

cargarCriptos();
