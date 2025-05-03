const CACHE_NAME = "biblia-harpa-cache-v1";
const FILES_TO_CACHE = [
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./logo192.png",
    "./logo512.png"
];

self.addEventListener("install", (event) => {
    console.log("Service Worker instalado.");

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Adicionando arquivos ao cache...");
            return cache.addAll(FILES_TO_CACHE);
        }).catch(error => console.error("Erro ao adicionar ao cache:", error))
    );
});

self.addEventListener("fetch", (event) => {
    console.log("Interceptando request para:", event.request.url);

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(error => console.error("Erro ao buscar do cache ou da rede:", error))
    );
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker ativado.");

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Removendo cache antigo:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
