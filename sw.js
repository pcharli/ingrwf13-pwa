const version = 2.5
const CACHE_NAME = `demo-${version}`

const files = [
    "./",
    './index.html',
    "./style.css",
    "./main.js",
    "./js/install.js",
    "./js/register-sw.js",
    "./icons/favicon-16x16.png",
    "./icons/favicon-256x256.png",
    "./favicon.ico",
    "./manifest.json",
    "./icons/favicon-32x32.png",
    "./icons/favicon-96x96.png",
    //"./screenshots/desktop.png",
    "./screenshots/mobile.png",
    "https://ingrwf13-default-rtdb.europe-west1.firebasedatabase.app/todos.json"
]

self.addEventListener('install', e => {
    console.log('sw', "installation")
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(files))
    )
    self.skipWaiting();
})

self.addEventListener('activate', e => {
    console.log('sw', "activate")
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                const delCaches = []
                cacheNames.forEach((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        delCaches.push(caches.delete(cacheName));
                    }
                })
                return Promise.all(delCaches)
            })
    )
    self.clients.claim()
})

const update = async (request) => {
    const response = await fetch(request)

    const cache = await caches.open(CACHE_NAME)
    await cache.put(request, response.clone())

    return response
}

const cacheFirst = async (request) => {

    const responseFromCache = await caches.match(request);

    if (responseFromCache) {
        return responseFromCache;
    }

    const responseFromNetwork = await fetch(request);

    const cache = await caches.open(CACHE_NAME);

    await cache.put(
        request,
        responseFromNetwork.clone()
    );

    return responseFromNetwork;
};

const networkFirst = async (request) => {
    try {
        return await update(request)
    }
    catch {
        return caches.match(request)
    }
}

self.addEventListener("fetch", (e) => {
    //récup de l'url
    const url = new URL(e.request.url);

    // On ignore ce qui n'est pas HTTP/HTTPS
    if (url.protocol !== "http:" && url.protocol !== "https:") {
        return;
    }

    if (!e.request.url.includes("firebase")) {
        e.respondWith(
            cacheFirst(e.request)
        );
    } else {
        e.respondWith(
            networkFirst(e.request)
        );
    }
});