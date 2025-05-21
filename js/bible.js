  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js")
      .then(() => console.log("Service Worker registrado!"))
      .catch(error => console.error("Erro ao registrar Service Worker:", error));
  }
  
  // Definir versão padrão
// Definir versão padrão ou recuperar do localStorage
let versaoSelecionada = localStorage.getItem("bibliaVersao") || "arc";
let biblia = [];

// Atualizar o `<select>` com a versão salva
document.getElementById("version").value = versaoSelecionada;

document.getElementById("title-app").innerHTML = "Versão: " + versaoSelecionada.toLocaleUpperCase();

// Evento para detectar mudança na versão selecionada
document.getElementById("version").addEventListener("change", function () {
    versaoSelecionada = this.value;
    localStorage.setItem("bibliaVersao", versaoSelecionada); // Salva preferência do usuário
    document.getElementById("title-app").innerHTML = "Versão: " + versaoSelecionada.toLocaleUpperCase();
    carregarBiblia();
});


// Função para carregar a Bíblia com base na versão escolhida
function carregarBiblia() {
    fetch(`./versions/${versaoSelecionada}.json`)
        .then(response => response.json())
        .then(data => {
            biblia = data;
            carregarLivros();
        })
        .catch(error => console.error("Erro ao carregar o JSON:", error));
}

// Chama a função ao iniciar a página
carregarBiblia();

function mostrarTela(id) {
    document.querySelectorAll('.tela').forEach(tela => tela.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');
}

function carregarLivros() {
    const container = document.getElementById('tela-livros');
    container.innerHTML = '';

    if (!biblia.length) {
        container.innerHTML = "<p>Erro ao carregar os livros. Verifique o JSON.</p>";
        return;
    }

    biblia.forEach((livro, index) => {
        const div = document.createElement('div');
        div.className = 'livro';
        
        const idDiv = document.createElement('div');
        idDiv.className = 'livro-id';
        idDiv.textContent = livro.id.toUpperCase();

        const infoDiv = document.createElement('div');
        infoDiv.className = 'livro-info';
        infoDiv.innerHTML = `<h2>${livro.name}</h2><small>Capítulos: ${livro.chapters.length}</small>`;

        idDiv.style.backgroundColor = livro.testamento === "at" ? "#BB86FC" : "#03DAC5";

        div.appendChild(idDiv);
        div.appendChild(infoDiv);
        div.onclick = () => carregarCapitulos(index);
        container.appendChild(div);
    });

    mostrarTela('tela-livros');
}

let livroSelecionado = 0;

function carregarCapitulos(index) {
    livroSelecionado = index;
    const livro = biblia[index];

    if (!livro || !livro.chapters) {
        console.error("Erro: Livro ou capítulos não encontrados.");
        return;
    }

    const titulo = document.getElementById('titulo-livro');
    const container = document.getElementById('lista-capitulos');

    titulo.textContent = `${livro.name}`;
    container.innerHTML = '';

    livro.chapters.forEach((_, i) => {
        const botao = document.createElement('div');
        botao.className = 'capitulo';
        botao.textContent = i + 1;

        botao.style.backgroundColor = livro.testamento === "at" ? "#BB86FC" : "#03DAC5";

        botao.onclick = () => carregarVersiculos(i);
        container.appendChild(botao);
    });

    mostrarTela('tela-capitulos');
}

function carregarVersiculos(capIndex) {
    const livro = biblia[livroSelecionado];
    if (!livro || !livro.chapters || !livro.chapters[capIndex]) {
        console.error("Erro: Capítulo não encontrado.");
        return;
    }

    const versiculos = livro.chapters[capIndex];
    const container = document.getElementById('versiculos');
    const titulo = document.getElementById('titulo-capitulo');

    titulo.textContent = `${livro.name} ${capIndex + 1}`;
    container.innerHTML = '';

    versiculos.forEach((texto, i) => {
        // Adicionar formatação especial às palavras entre aspas (palavras de Jesus)
        const textoFormatado = texto.replace(/"([^"]+)"/g, '<span class="palavras-jesus">"$1"</span>');

        const p = document.createElement('p');
        p.innerHTML = `${i + 1}. ${textoFormatado}`; // Usando innerHTML para aplicar a formatação
        container.appendChild(p);
    });

    mostrarTela('tela-versiculos');
}


function voltarParaLivros() {
    mostrarTela('tela-livros');
}

function voltarParaCapitulos() {
    mostrarTela('tela-capitulos');
}
