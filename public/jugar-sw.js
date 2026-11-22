// Service worker de la página del juego solo (/es/jugar y /en/jugar), la que abre la app instalada.
// Guarda la página y sus archivos para que la app abra sin internet.
// El juego (/juego/...) no pasa por acá: lo guarda el service worker de Construct 2 (/juego/sw.js).
//
// - La página: primero se pide a internet (así siempre está la última versión); sin internet, la guardada.
// - Los archivos de Next (/_next/static/...): no cambian nunca de contenido (el nombre lleva un código),
//   así que se usan los guardados.
// - El resto (imágenes, íconos, manifest): se usa el guardado y se actualiza por detrás.
// Para borrar lo guardado en todos los aparatos, se cambia CACHE (jugar-v2, jugar-v3...).

const CACHE = 'jugar-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    (async () => {
      const nombres = await caches.keys();
      await Promise.all(nombres.filter((n) => n.startsWith('jugar-') && n !== CACHE).map((n) => caches.delete(n)));
      await self.clients.claim();
    })(),
  );
});

// La página manda la lista de lo que ya cargó antes de que este service worker existiera.
self.addEventListener('message', (evento) => {
  if (!evento.data || evento.data.tipo !== 'guardar' || !Array.isArray(evento.data.urls)) return;
  evento.waitUntil(guardar(evento.data.urls));
});

async function guardar(urls) {
  const cache = await caches.open(CACHE);
  const todas = new Set(urls.filter((u) => typeof u === 'string' && u.startsWith('/') && !u.startsWith('/juego/')));
  // Los íconos del manifest también.
  for (const u of [...todas]) {
    if (!u.endsWith('.webmanifest')) continue;
    try {
      const manifest = await (await fetch(u)).json();
      for (const i of manifest.icons || []) if (typeof i.src === 'string' && i.src.startsWith('/')) todas.add(i.src);
    } catch {}
  }
  await Promise.all(
    [...todas].map(async (u) => {
      try {
        const respuesta = await fetch(u, { cache: 'no-cache' });
        if (respuesta.ok) await cache.put(u, respuesta);
      } catch {}
    }),
  );
}

// Pide a internet y deja una copia para guardar (la copia se hace antes de entregar la respuesta).
function pedirConCopia(pedido) {
  return fetch(pedido).then((respuesta) => [respuesta, respuesta.ok ? respuesta.clone() : null]);
}

function guardarCopia(clave, red) {
  return red
    .then(async ([, copia]) => {
      if (copia) await (await caches.open(CACHE)).put(clave, copia);
    })
    .catch(() => {});
}

self.addEventListener('fetch', (evento) => {
  const pedido = evento.request;
  if (pedido.method !== 'GET') return;
  const url = new URL(pedido.url);
  if (url.origin !== location.origin || url.pathname.startsWith('/juego/')) return;

  // La página: internet primero; sin internet, la guardada.
  if (pedido.mode === 'navigate') {
    const red = pedirConCopia(pedido);
    evento.respondWith(red.then(([respuesta]) => respuesta).catch(async () => (await caches.match(url.pathname)) || Response.error()));
    evento.waitUntil(guardarCopia(url.pathname, red));
    return;
  }

  // Archivos de Next: el guardado; si no está, internet (y se guarda).
  if (url.pathname.startsWith('/_next/static/')) {
    evento.respondWith(
      caches.match(pedido).then((guardada) => {
        if (guardada) return guardada;
        const red = pedirConCopia(pedido);
        evento.waitUntil(guardarCopia(pedido, red));
        return red.then(([respuesta]) => respuesta);
      }),
    );
    return;
  }

  // El resto: el guardado enseguida, y se actualiza por detrás.
  const red = pedirConCopia(pedido);
  evento.waitUntil(guardarCopia(pedido, red));
  evento.respondWith(
    caches.match(pedido).then((guardada) => guardada || red.then(([respuesta]) => respuesta).catch(() => Response.error())),
  );
});
