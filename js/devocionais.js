let devocionais = [];

function carregarDevocionais() {
    fetch('./devocionais/devocionais.json')
        .then(response => response.json())
        .then(data => {
            devocionais = data;
            exibirDevocionais();
        })
        .catch(error => console.error("Erro ao carregar os devocionais:", error));
}

function exibirDevocionais() {
    const container = document.getElementById("devocional-container");
    container.innerHTML = "";

    devocionais.forEach((dev, index) => {
        const card = document.createElement("div");
        card.className = "devocional-card";

        // Adicionando numeração dinâmica antes do tema
        card.innerHTML = `
            <div class="numero">${index + 1}</div>
            <div class="conteudo">
                <h3>${dev.tema}</h3>
                <p>${dev.versiculo}</p>
            </div>
        `;
        card.onclick = () => abrirDevocional(dev.id);
        container.appendChild(card);
    });

    mostrarTela("devocional-container");
}


function abrirDevocional(id) {
    const devocional = devocionais.find(dev => dev.id === id);
    if (!devocional) return;

    document.getElementById("titulo-devocional").textContent = devocional.tema;
    document.getElementById("conteudo-devocional").innerHTML = `
        <p><strong>Versículo:</strong> ${devocional.versiculo}</p>
        <p><strong>Meditação:</strong> ${devocional.meditacao}</p>
        <p><strong>Oração:</strong> ${devocional.oracao}</p>
        <p><strong>Louvor:</strong> ${devocional.louvor}</p>
    `;

    mostrarTela("tela-devocional"); // Agora, os cartões serão ocultados
}

function voltarParaDevocionais() {
    mostrarTela("devocional-container"); // Retorna à tela inicial dos cartões
}

function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(tela => tela.style.display = "none");
    document.getElementById(id).style.display = "block";
}

// Chama a função ao iniciar a página
carregarDevocionais();
