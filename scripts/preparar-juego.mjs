// Prepara la exportación de Construct 2 que está en public/juego para publicarla en la web.
// Se corre después de copiar una exportación nueva:  npm run preparar-juego
//
// Qué hace:
//  1. Arregla el nombre de la fuente: Construct exporta "creepster-regular.ttf" en minúsculas,
//     pero creepster.css la pide con mayúsculas. En el servidor (Linux) eso no la encuentra.
//  2. Pone el nombre del juego en el título de la pestaña y en el manifiesto.
//  3. Reemplaza los íconos y el logo de carga de Construct por la cruz del juego.
//  4. Copia la licencia de la fuente Creepster (SIL OFL), que tiene que acompañar a la fuente.
//  5. Arregla el juego sin internet (para la app instalada). El service worker de Construct guarda la
//     página del juego con el nombre de "la primera ventana" que encuentra, y adentro de la web esa suele
//     ser la página de afuera (/es/jugar, /es/mansion), no el juego: sin internet, el juego no abría.
//     Se agrega index.html a la lista de offline.js (subiendo el número de versión para que se vuelva a
//     guardar) y el service worker busca la página sin mirar lo que va después del "?" (?tactil=1, ?idioma=en).

import { readFileSync, writeFileSync, readdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const JUEGO = join(process.cwd(), 'public', 'juego');
const ICONOS = join(process.cwd(), 'scripts', 'juego-iconos');
const NOMBRE = 'Sobrevive en la mansión';

// 1. Fuente
const ttf = readdirSync(JUEGO).find((f) => f.toLowerCase() === 'creepster-regular.ttf');
if (ttf) {
  const css = join(JUEGO, 'creepster.css');
  writeFileSync(css, readFileSync(css, 'utf8').replace(/url\('[^']*'\)/, `url('${ttf}')`));
  console.log('Fuente: creepster.css apunta a', ttf);
}

// 2. Título y manifiesto
const index = join(JUEGO, 'index.html');
writeFileSync(index, readFileSync(index, 'utf8').replace(/<title>.*<\/title>/, `<title>${NOMBRE}</title>`));
const manifiesto = join(JUEGO, 'appmanifest.json');
const datos = JSON.parse(readFileSync(manifiesto, 'utf8').replace(/^﻿/, ''));
datos.name = NOMBRE;
datos.short_name = 'La mansión';
writeFileSync(manifiesto, JSON.stringify(datos, null, 2));
console.log('Título y manifiesto:', NOMBRE);

// 3. Íconos
for (const f of readdirSync(ICONOS)) {
  copyFileSync(join(ICONOS, f), join(JUEGO, f));
}
console.log('Íconos reemplazados por la cruz.');

// 4. Licencia de la fuente
copyFileSync(join(process.cwd(), 'public', 'fuentes', 'LICENCIA_OFL.txt'), join(JUEGO, 'LICENCIA_OFL.txt'));
console.log('Licencia de Creepster copiada.');

// 5. Sin internet
const offline = join(JUEGO, 'offline.js');
const lista = JSON.parse(readFileSync(offline, 'utf8').replace(/^\uFEFF/, ''));
if (!lista.fileList.includes('index.html')) {
  lista.fileList.unshift('index.html');
  lista.version += 1;
  // Mismo formato que exporta Construct (BOM, tabulaciones y saltos de línea de Windows).
  writeFileSync(offline, '\uFEFF' + JSON.stringify(lista, null, '\t').replace(/\n/g, '\r\n'));
  console.log('offline.js: se agregó index.html (versión', lista.version + ')');
}
const sw = join(JUEGO, 'sw.js');
const textoSw = readFileSync(sw, 'utf8');
const buscar = 'const cachedResponse = await cache.match(event.request);';
const reemplazo = 'const cachedResponse = await cache.match(event.request, { ignoreSearch: event.request.mode === "navigate" });';
if (textoSw.includes(buscar)) {
  writeFileSync(sw, textoSw.replace(buscar, reemplazo));
  console.log('sw.js: la página del juego se busca sin mirar ?tactil ni ?idioma.');
} else if (!textoSw.includes(reemplazo)) {
  throw new Error('sw.js de Construct cambió: revisar el paso 5 de preparar-juego.');
}

