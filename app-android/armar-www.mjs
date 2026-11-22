// Arma app-android/www: lo que va adentro de la app de Android.
// Se corre con "npm run armar" (que después corre "npx cap sync android").
//
// - app.js y app.css: la pantalla del juego solo (components/mansion/SoloJuego.tsx), la misma de /jugar.
// - juego/: copia de public/juego (la exportación de Construct 2). En la copia se apaga el service worker
//   de Construct: en la app no hace falta (todo viene adentro) y podría dejar una versión vieja guardada
//   después de actualizar la app.
// - img/ y fuentes/: las imágenes y la fuente que usan la portada y los botones táctiles.

import { build } from 'esbuild';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(AQUI, '..');
const WWW = join(AQUI, 'www');
const PUBLICO = join(RAIZ, 'public');

rmSync(WWW, { recursive: true, force: true });
mkdirSync(WWW, { recursive: true });

// 1. La página (React + CSS).
await build({
  entryPoints: { app: join(AQUI, 'src', 'main.tsx') },
  bundle: true,
  outdir: WWW,
  minify: true,
  target: 'es2020',
  jsx: 'automatic',
  tsconfig: join(AQUI, 'tsconfig.json'),
  define: { 'process.env.NODE_ENV': '"production"' },
  loader: { '.woff': 'file', '.woff2': 'file' },
  assetNames: 'fuentes/[name]-[hash]',
  external: ['/img/*', '/fuentes/*'],
  logLevel: 'warning',
});

// 2. El juego, con el service worker de Construct apagado.
cpSync(join(PUBLICO, 'juego'), join(WWW, 'juego'), { recursive: true });
const indexJuego = join(WWW, 'juego', 'index.html');
const html = readFileSync(indexJuego, 'utf8');
// (el export de Construct viene con saltos de línea de Windows: la búsqueda no depende de eso)
const registro = /window\.C2_RegisterSW = function C2_RegisterSW\(\)\s*\{/g;
if ((html.match(registro) || []).length !== 1) throw new Error('No encontré C2_RegisterSW en juego/index.html: revisar el export.');
writeFileSync(indexJuego, html.replace(registro, (m) => m + ' return; /* app de Android: sin service worker */'));

// 3. Imágenes y fuente.
mkdirSync(join(WWW, 'img'), { recursive: true });
for (const f of ['logo.png', 'logo_en.png', 'captura_piso3.jpg', 'captura_piso3_en.jpg', 'boton.png', 'boton_presionado.png', 'boton_cruz.png']) {
  cpSync(join(PUBLICO, 'img', f), join(WWW, 'img', f));
}
mkdirSync(join(WWW, 'fuentes'), { recursive: true });
for (const f of ['creepster.ttf', 'LICENCIA_OFL.txt']) cpSync(join(PUBLICO, 'fuentes', f), join(WWW, 'fuentes', f));

// 4. index.html
writeFileSync(
  join(WWW, 'index.html'),
  `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#000000" />
<link rel="icon" href="data:," />
<title>Sobrevive en la mansión</title>
<link rel="stylesheet" href="app.css" />
</head>
<body>
<div id="raiz"></div>
<script src="app.js"></script>
</body>
</html>
`,
);

for (const f of ['index.html', 'app.js', 'app.css', 'juego/index.html', 'juego/c2runtime.js', 'img/boton_cruz.png']) {
  if (!existsSync(join(WWW, f))) throw new Error('Falta www/' + f);
}
console.log('www armado en', WWW);
