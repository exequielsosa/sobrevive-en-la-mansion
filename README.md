# Emi Studio — sitio del estudio

Sitio de **Emi Studio**, el estudio de Emi. Tiene dos páginas, en español (`/es`) y en inglés (`/en`):

| Dirección | Qué es |
|---|---|
| `/es`, `/en` | La portada del estudio: el juego destacado, la lista de juegos y quién es Emi. |
| `/es/mansion`, `/en/mansion` | La página de **Sobrevive en la mansión — Capítulo 1**: historia, personajes, cómo se juega y el juego para jugar en el navegador. |

Cada juego nuevo va a tener su propia página adentro, como `/mansion`.

## Cómo correrla

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # para revisar que compila antes de publicar
```

Las direcciones sin idioma (`/` y `/mansion`) mandan a la versión en inglés si el navegador está en
inglés, y a la española en cualquier otro caso (`next.config.ts`). Por eso `/mansion` sirve como
link corto para compartir el juego.

## Dónde está cada cosa

| Carpeta | Qué hay |
|---|---|
| `lib/textos-estudio.ts` | **Los textos de la portada del estudio**, en español y en inglés. |
| `lib/textos-mansion.ts` | **Los textos de la página de la mansión**, en español y en inglés. |
| `lib/idiomas.ts` | Los idiomas del sitio (`es` y `en`). |
| `lib/sitio.ts` | La dirección pública del sitio y el nombre del estudio. |
| `app/sitemap.ts`, `app/robots.ts` | Arman `/sitemap.xml` (la lista de páginas para Google) y `/robots.txt`. **Cuando haya un juego nuevo, se agrega su ruta en `sitemap.ts`.** |
| `lib/datos-estructurados.ts` | La "ficha invisible" para Google de cada página (qué es el estudio, qué es el juego). |
| `components/estudio/` | Las piezas de la portada: `Barra`, `Destacado`, `Juegos`, `SobreEstudio`, `Pie` y `Marca` (el nombre "EMI STUDIO"). |
| `components/mansion/` | Las piezas de la página del juego: `Nav`, `Portada`, `Historia`, `Personajes`, `Jefes`, `ComoSeJuega`, `Jugar`, `Creditos`. |
| `app/[lang]/` | El layout (idioma y fuentes), la portada (`page.tsx`) y la página del juego (`mansion/page.tsx`). Cada página pone su título y su vista previa para redes. |
| `app/globals.css` | El estilo de la mansión ("Vela") y las piezas comunes, como los botones. |
| `app/estudio.css` | El estilo de la portada del estudio ("Sala"): oscuro y neutro, cada juego trae su color. |
| `public/img/` | El arte de Emi que usan las páginas. |
| `public/og.jpg`, `public/og-estudio.jpg` | Las imágenes que aparecen al compartir el link (la del juego y la del estudio). |
| `public/juego/` | El juego exportado desde Construct 2. |
| `scripts/preparar-juego.mjs` | Ajusta una exportación nueva del juego para la web. |

## Cómo actualizar el juego

1. En Construct 2: **File → Export project → HTML5 website**, con la plantilla **Embed style**.
   (Si aparece el aviso del "minifier" de Java, se puede aceptar: el juego funciona igual.)
2. Borrar el contenido de `public/juego/` y copiar ahí todo lo que exportó Construct.
3. Correr `npm run preparar-juego`. Arregla el nombre de la fuente (Construct la exporta en
   minúsculas y en el servidor no la encuentra), pone el nombre del juego en la pestaña y cambia
   los íconos de Construct por la cruz.
4. Revisar que en la pantalla de Créditos del juego diga lo que corresponde.

El juego se carga recién cuando alguien toca **"Hacé clic para jugar"**: así la página abre rápido
y el navegador deja que suene el audio.
