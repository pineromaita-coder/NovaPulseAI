const CACHE="novapulse-v1";

const FILES=[
"./",
"./index.html",
"./style.css",
"./app.js",
"./market.js",
"./radar.js",
"./voice.js",
"./terminal.js",
"./sidepanel.js",
"./particles.js",
"./jarvis.js",
"./v4.css"
];

self.addEventListener("install",e=>{
e.waitUntil(
caches.open(CACHE).then(c=>c.addAll(FILES))
);
});

self.addEventListener("fetch",e=>{
e.respondWith(
caches.match(e.request).then(r=>r||fetch(e.request))
);
});