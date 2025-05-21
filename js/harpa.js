let harpa = [];

fetch('./harpa/harpa.json')
  .then(response => response.json())
  .then(data => {
    harpa = data;
    carregarHinos();
  })
  .catch(error => console.error("Erro ao carregar o JSON:", error));

function mostrarTela(id) {
  document.querySelectorAll('.tela').forEach(tela => tela.classList.remove('ativa'));
  document.getElementById(id).classList.add('ativa');
}

function carregarHinos() {
  const container = document.getElementById('tela-hinos');
  container.innerHTML = '';

  if (!harpa || Object.keys(harpa).length === 0) {
    container.innerHTML = "<p>Erro ao carregar os hinos. Verifique o JSON.</p>";
    return;
  }

  Object.keys(harpa).forEach(hinoNum => {
    const hino = harpa[hinoNum];

    const div = document.createElement('div');
    div.className = 'hino';

    const idDiv = document.createElement('div');
    idDiv.className = 'hino-id';
    idDiv.textContent = hinoNum;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'hino-info';

    // Remove o número do título na tela inicial
    const nomeHino = hino.hino.replace(/^\d+\s*-\s*/, ""); 
    infoDiv.innerHTML = `<h2>${nomeHino}</h2>`;

    div.appendChild(idDiv);
    div.appendChild(infoDiv);
    div.onclick = () => carregarLetra(hinoNum);
    container.appendChild(div);
  });

  mostrarTela('tela-hinos');
}

function carregarLetra(hinoNum) {
  const hino = harpa[hinoNum];

  if (!hino) {
    console.error("Erro: Hino não encontrado.");
    return;
  }

  const titulo = document.getElementById('titulo-hino');
  const versiculosDiv = document.getElementById('versiculos');

  // Mantém o número no título da tela interna
  titulo.textContent = hino.hino; 
  versiculosDiv.innerHTML = '<h3></h3>';

  Object.keys(hino.verses).forEach(num => {
    const p = document.createElement('p');
    p.innerHTML = `${num}. ${hino.verses[num].replace(/<br>/g, "")}`;
    versiculosDiv.appendChild(p);

    // Adiciona o coro abaixo de cada verso
    const coroP = document.createElement('p');
    coroP.className = 'coro'; 
    coroP.innerHTML = `<em><strong></strong> ${hino.coro.replace(/<br>/g, "")}</em>`;
    versiculosDiv.appendChild(coroP);
  });

  mostrarTela('tela-letra');
}

function voltarParaHinos() {
  mostrarTela('tela-hinos');
}