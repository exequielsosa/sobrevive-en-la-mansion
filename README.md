# Sobrevive en la mansión — página del juego

Página web de **Sobrevive en la mansión — Capítulo 1**, un juego de Emi hecho con Construct 2.
Tiene la historia, los personajes, cómo se juega y el juego para jugar en el navegador.
Está en español (`/es`) y en inglés (`/en`).

## Cómo correrla

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # para revisar que compila antes de publicar
```

La raíz `/` manda a `/en` si el navegador está en inglés, y a `/es` en cualquier otro caso (`next.config.ts`).

## Dónde está cada cosa

| Carpeta | Qué hay |
|---|---|
| `lib/textos.ts` | **Todos los textos**, en español y en inglés. Para cambiar una frase, se cambia acá. |
| `components/` | Una pieza por sección: `Nav`, `Portada`, `Historia`, `Personajes`, `Jefes`, `ComoSeJuega`, `Jugar`, `Creditos`. |
| `app/[lang]/` | La página y el layout (idioma, título y vista previa para redes). |
| `app/globals.css` | Todo el estilo. Los colores están arriba de todo, como variables. |
| `public/img/` | El arte de Emi que usa la página. |
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
