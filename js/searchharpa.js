document.addEventListener("DOMContentLoaded", () => {
    const searchButtonHarpa = document.querySelector(".search-harpa");
    const searchInputHarpa = document.getElementById("search-input-harpa");
  
    searchButtonHarpa.addEventListener("click", (event) => {
      searchInputHarpa.style.display = "block";
      searchInputHarpa.focus();
      event.stopPropagation();
    });
  
    document.addEventListener("click", (event) => {
      if (
        searchInputHarpa.style.display === "block" &&
        !searchButtonHarpa.contains(event.target) &&
        !searchInputHarpa.contains(event.target)
      ) {
        searchInputHarpa.style.display = "none";
        searchInputHarpa.value = ""; 
      }
    });
  
    searchInputHarpa.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        filtrarHinos();
      }
    });
  });
  
  function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
  
  function filtrarHinos() {
    const termoBusca = removerAcentos(document.getElementById("search-input-harpa").value);
    const container = document.getElementById("tela-hinos");
    container.innerHTML = "";
  
    Object.keys(harpa).forEach(hinoNum => {
      const hino = harpa[hinoNum];
      const nomeHinoSemNumero = hino.hino.replace(/^\d+\s*-\s*/, ""); 
  
      if (removerAcentos(nomeHinoSemNumero).includes(termoBusca) || hinoNum.includes(termoBusca)) {
        const div = document.createElement("div");
        div.className = "hino";
        div.setAttribute("data-hino", hinoNum);
  
        const idDiv = document.createElement("div");
        idDiv.className = "hino-id";
        idDiv.textContent = hinoNum;
  
        const infoDiv = document.createElement("div");
        infoDiv.className = "hino-info";
        infoDiv.innerHTML = `<h2>${nomeHinoSemNumero}</h2>`;
  
        div.appendChild(idDiv);
        div.appendChild(infoDiv);
        div.onclick = () => carregarLetra(hinoNum);
  
        container.appendChild(div);
      }
    });
  }
  
  function voltarParaHinos() {
    const searchInputHarpa = document.getElementById("search-input-harpa");
    searchInputHarpa.style.display = "none"; // Esconde o input ao voltar
    searchInputHarpa.value = ""; // Limpa o campo
    carregarHinos(); // Recarrega todos os hinos
    mostrarTela("tela-hinos");
  }
  