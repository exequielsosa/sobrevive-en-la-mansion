# Ficha de Google Play — borrador para revisar

Lo armó Claude el 2026-11-22. **Nada de esto está cargado en Play Console**: lo carga Exequiel cuando tenga la cuenta.
Todo lo que dice el texto está comprobado en el juego 27-14; lo que falta decidir está marcado con **FALTA**.

## Datos de la app

| Campo | Valor |
|---|---|
| Nombre (castellano) | Sobrevive en la mansión (23 de 30 caracteres) |
| Nombre (inglés) | Survive the Mansion (19 de 30). Nombre corto en el celular: The Mansion (Exequiel: «Ok»). |
| Paquete | `ar.com.emistudio.mansion` (no se puede cambiar después de la primera subida) |
| Nombre del desarrollador | Emi Studio. Play muestra además el nombre legal de Exequiel, el país y el mail de desarrollador. |
| Tipo | Juego, categoría Aventura (Exequiel: «ok», 2026-11-22). Etiquetas: plataformas, terror. |
| Precio | Gratis. Sin anuncios y sin compras. |
| Política de privacidad | `https://www.emistudio.com.ar/es/privacidad` (y `/en/privacidad`). Contacto: exequielsosa@gmail.com. |
| Idioma principal de la ficha | Español (Latinoamérica), con la traducción en inglés (Estados Unidos). |

## Textos

### Castellano
**Descripción breve** (80 de 80):
Escapá de una mansión llena de miedos: tres pisos, tres jefes y una sola salida.

**Descripción completa:**
Jonathan se despierta en una mansión que no conoce. Tres pisos. Tres llaves. Una sola salida.

Sobrevive en la mansión es un juego de plataformas y terror de Emi. Empezás en el tercer piso y tenés que bajar hasta la puerta grande. Cada piso guarda una llave, y cada llave la tiene uno de los peores miedos de Jonathan: la Sombra, el Stalker y el Psicópata.

• Una cruz para defenderte de cerca y una gomera para pelear de lejos. En el piso más oscuro, apenas una linterna.
• Tres dificultades: Fácil, Normal y Pesadilla.
• Seis logros y tu mejor tiempo en cada dificultad.
• Historietas que cuentan la historia entre piso y piso.
• Se juega con el celular acostado, con botones a los costados.
• Funciona sin internet.
• Sin anuncios y sin compras.
• En castellano y en inglés, según el idioma del teléfono.

Un juego de Emi: idea, historia, personajes y dirección de arte. Este es el Capítulo 1.

### Inglés
**Short description** (75 de 80):
Escape a mansion full of fears: three floors, three bosses and one way out.

**Full description:**
Jonathan wakes up in a mansion he has never seen. Three floors. Three keys. One way out.

Survive the Mansion is a horror platformer by Emi. You start on the third floor and must make your way down to the great door. Each floor hides a key, and each key is held by one of Jonathan's worst fears: the Shadow, the Stalker and the Psycho.

• A cross for close combat and a slingshot to fight from afar. On the darkest floor, only a flashlight.
• Three difficulty levels: Easy, Normal and Nightmare.
• Six achievements and your best time on each difficulty.
• Comics that tell the story between floors.
• Played with your phone sideways, with buttons on both sides.
• Works offline.
• No ads and no in-app purchases.
• In English and Spanish, depending on your phone's language.

A game by Emi: concept, story, characters and art direction. This is Chapter 1.

Los nombres de los jefes en inglés (the Shadow, the Stalker, the Psycho) son los de la web (`lib/textos-mansion.ts`).

## Gráficos

| Pieza | Estado |
|---|---|
| Ícono 512×512 | **FALTA**: sale de ARTE-0006 (elige Emi). Claude lo arma con `herramientas/iconos_android.py` y para la web. |
| Gráfico destacado 1024×500 | **FALTA**: no se puede armar bien recortando la portada (tiene los marcos de los botones). Propuesta: pedido de arte ARTE-0007 a Codex, después del ícono. |
| Capturas del teléfono | 6 por idioma en `capturas/es` y `capturas/en`: menú, dificultad, piso 3, piso 2, logros (1920×1080) y el juego con los botones táctiles (1920×960, 2:1). Sacadas del juego 27-14 con el motor. Los logros y el mejor tiempo de esa captura están puestos a mano para que se vean. Se pueden reemplazar por capturas propias del celular. |

La captura del piso 1 no va: en la prueba automática (Chrome sin ventana) la oscuridad del piso 1 no se dibuja, así que no muestra cómo se ve de verdad.

## Contenido de la app (lo que pregunta Play Console)

Datos para responder; las respuestas las elige Exequiel.

- **Público objetivo:** para todos, chicos incluidos (Exequiel, 2026-11-22: «Sí, B (Recomendado)»), desde los 9 años: franjas 9-12, 13-15, 16-17 y 18 o más. Se aplican las reglas de Familias.
- **Anuncios:** no tiene.
- **Acceso a la app:** no hace falta usuario ni contraseña.
- **Seguridad de los datos:** no recopila ni comparte datos. El progreso queda solo en el aparato. No se conecta a internet.
- **Cuestionario de clasificación (IARC), hechos del juego:**
  - violencia de fantasía con personajes de dibujo: el nene golpea monstruos con una cruz y les tira piedras con una gomera; los monstruos lo golpean; el Psicópata tira cuchillos;
  - sustos y tema de terror: luces que parpadean, una sombra que cruza, un cuadro que se cae, jefes que dan miedo;
  - en la pantalla de derrota del Psicópata se ven una motosierra y un cuchillo; no hay sangre en las 4 pantallas de derrota (revisadas);
  - sin lenguaje fuerte, sin sexo, sin drogas, sin apuestas, sin chat ni contacto con otros jugadores, sin compras, sin ubicación.
- **Permisos:** vibración e internet (el segundo lo pide Capacitor; el juego no lo usa).
