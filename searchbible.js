document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".search");
  const searchInput = document.getElementById("search-input");

  searchButton.addEventListener("click", (event) => {
      searchInput.style.display = "block";
      searchInput.focus();
      event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
      if (
          searchInput.style.display === "block" &&
          !searchButton.contains(event.target) &&
          !searchInput.contains(event.target)
      ) {
          searchInput.style.display = "none";
          searchInput.value = "";
      }
  });

  searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
          filtrarLivros();
      }
  });
});

function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function filtrarLivros() {
  const termoBusca = removerAcentos(document.getElementById("search-input").value);
  const container = document.getElementById("tela-livros");
  container.innerHTML = "";

  biblia.forEach((livro, index) => {
      if (removerAcentos(livro.name).includes(termoBusca)) {
          const div = document.createElement("div");
          div.className = "livro";

          const idDiv = document.createElement("div");
          idDiv.className = "livro-id";
          idDiv.textContent = livro.id.toUpperCase();

          const infoDiv = document.createElement("div");
          infoDiv.className = "livro-info";
          infoDiv.innerHTML = `<h2>${livro.name}</h2><small>Capítulos: ${livro.chapters.length}</small>`;

          div.appendChild(idDiv);
          div.appendChild(infoDiv);
          div.onclick = () => carregarCapitulos(index);

          container.appendChild(div);
      }
  });
}

function voltarParaLivros() {
  const searchInput = document.getElementById("search-input");
  searchInput.style.display = "none"; // Esconde o input ao voltar
  searchInput.value = ""; // Limpa o campo
  carregarLivros(); // Recarrega todos os livros
  mostrarTela("tela-livros");
}
