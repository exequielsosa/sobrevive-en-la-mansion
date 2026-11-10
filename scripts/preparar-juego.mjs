// Prepara la exportación de Construct 2 que está en public/juego para publicarla en la web.
// Se corre después de copiar una exportación nueva:  npm run preparar-juego
//
// Qué hace:
//  1. Arregla el nombre de la fuente: Construct exporta "creepster-regular.ttf" en minúsculas,
//     pero creepster.css la pide con mayúsculas. En el servidor (Linux) eso no la encuentra.
//  2. Pone el nombre del juego en el título de la pestaña y en el manifiesto.
//  3. Reemplaza los íconos y el logo de carga de Construct por la cruz del juego.

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
