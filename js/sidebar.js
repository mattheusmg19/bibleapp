const menuButton = document.querySelector('.menu');
const sidebar = document.getElementById('sidebar');
const closeButton = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');

menuButton.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.classList.add('active');
});

closeButton.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

// Clicou fora do menu? Fecha também
overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});
