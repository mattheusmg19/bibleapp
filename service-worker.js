self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("biblia-harpa-cache").then(cache => {
      return cache.addAll([
        "./index.html",
        "./style.css",
        "./script.js",
        "./manifest.json",
        "./logo192.png",
        "./logo512.png"
      ]).catch(error => console.error("Erro ao adicionar ao cache:", error));
    })
  );
});
