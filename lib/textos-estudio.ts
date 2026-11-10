// Textos de la portada de Emi Studio (la página del estudio), en español y en inglés.
// Para cambiar una frase, se cambia acá; los componentes solo la muestran.

import type { Idioma } from './idiomas';

type Captura = { imagen: string; alt: string; pie: string };

export type TextosEstudio = {
  meta: { titulo: string; descripcion: string };
  barra: { aria: string; inicio: string; juegos: string; estudio: string; idioma: string };
  destacado: {
    aria: string;
    etiqueta: string;
    logoAlt: string;
    fondoAlt: string;
    bajada: string;
    jugar: string;
    ver: string;
    datos: string;
  };
  juegos: {
    titulo: string;
    cantidad: string;
    mansion: {
      disponible: string;
      generos: string[];
      nombre: string;
      capitulo: string;
      texto: string;
      imagenAlt: string;
      jugar: string;
      ver: string;
    };
    capturasAria: string;
    capturas: Captura[];
  };
  estudio: { etiqueta: string; titulo: string; parrafos: string[]; imagenAlt: string; pie: string };
  pie: { derechos: string; otroIdioma: string };
};

export const textosEstudio: Record<Idioma, TextosEstudio> = {
  es: {
    meta: {
      titulo: 'Emi Studio — Juegos para jugar en el navegador',
      descripcion:
        'Emi Studio: los videojuegos de Emi, gratis para jugar en el navegador. Empezando por Sobrevive en la mansión.',
    },
    barra: { aria: 'Principal', inicio: 'Emi Studio, inicio', juegos: 'Juegos', estudio: 'Estudio', idioma: 'Idioma' },
    destacado: {
      aria: 'Juego destacado',
      etiqueta: 'Nuevo juego · Ya se puede jugar',
      logoAlt: 'Sobrevive en la mansión — Capítulo 1',
      fondoAlt: 'Jonathan levanta la cruz frente a la puerta abierta de la mansión',
      bajada: 'Te despertaste en una mansión que no conocés. Tres pisos. Tres llaves. Una sola salida.',
      jugar: 'Jugar gratis',
      ver: 'Ver el juego',
      datos: 'Plataformas 2D · Terror · En el navegador · PC con teclado',
    },
    juegos: {
      titulo: 'Juegos',
      cantidad: '01 juego · gratis en el navegador',
      mansion: {
        disponible: 'Disponible',
        generos: ['Plataformas 2D', 'Terror'],
        nombre: 'Sobrevive en la mansión',
        capitulo: 'Capítulo 1 · 2026',
        texto:
          'Jonathan se despierta en una mansión que no conoce. Tiene que encontrar una llave en cada piso, sobrevivir a los monstruos y vencer a tres jefes para abrir la puerta de salida.',
        imagenAlt: 'El Stalker estira sus brazos larguísimos hacia Jonathan',
        jugar: 'Jugar',
        ver: 'Ver la página',
      },
      capturasAria: 'Capturas de Sobrevive en la mansión',
      capturas: [
        { imagen: '/img/captura_piso3.jpg', alt: 'Captura del piso 3: Jonathan en el pasillo y una Cabeza', pie: 'Piso 3 · El comienzo' },
        { imagen: '/img/captura_piso2.jpg', alt: 'Captura del piso 2: una Cabeza, una Barrada y un 444', pie: 'Piso 2 · Más miedos' },
        { imagen: '/img/captura_piso1.jpg', alt: 'Captura del piso 1: Jonathan con la linterna frente a una manada de 444', pie: 'Piso 1 · A oscuras' },
      ],
    },
    estudio: {
      etiqueta: 'Estudio',
      titulo: 'El estudio de videojuegos de Emi.',
      parrafos: [
        'Emi inventa las historias, crea los personajes y dirige el arte de cada juego. Cada monstruo empieza en un dibujo suyo, en papel.',
        'Los juegos se juegan gratis en el navegador, sin instalar nada.',
      ],
      imagenAlt: 'El Psicópata, con cara de calabaza, una motosierra y un cuchillo, sobre Jonathan',
      pie: 'El Psicópata, jefe final de Sobrevive en la mansión.',
    },
    pie: { derechos: '© 2026 Emi Studio', otroIdioma: 'English' },
  },

  en: {
    meta: {
      titulo: 'Emi Studio — Games you play in your browser',
      descripcion:
        "Emi Studio: Emi's video games, free to play right in your browser. Starting with Sobrevive en la mansión (Survive the Mansion).",
    },
    barra: { aria: 'Main', inicio: 'Emi Studio, home', juegos: 'Games', estudio: 'Studio', idioma: 'Language' },
    destacado: {
      aria: 'Featured game',
      etiqueta: 'New game · Play it now',
      logoAlt: 'Sobrevive en la mansión (Survive the Mansion) — Chapter 1',
      fondoAlt: 'Jonathan raises the cross in front of the open door of the mansion',
      bajada: 'You wake up in a mansion you have never seen. Three floors. Three keys. One way out.',
      jugar: 'Play for free',
      ver: 'See the game',
      datos: '2D platformer · Horror · In your browser · PC with keyboard',
    },
    juegos: {
      titulo: 'Games',
      cantidad: '01 game · free in your browser',
      mansion: {
        disponible: 'Available',
        generos: ['2D platformer', 'Horror'],
        nombre: 'Sobrevive en la mansión',
        capitulo: 'Survive the Mansion · Chapter 1 · 2026',
        texto:
          'Jonathan wakes up in a mansion he has never seen. He has to find a key on every floor, survive the monsters and defeat three bosses to open the way out.',
        imagenAlt: 'The Stalker reaches out its very long arms toward Jonathan',
        jugar: 'Play',
        ver: 'See the page',
      },
      capturasAria: 'Screenshots of Sobrevive en la mansión',
      capturas: [
        { imagen: '/img/captura_piso3.jpg', alt: 'Floor 3 screenshot: Jonathan in the hallway and a Head', pie: 'Floor 3 · The beginning' },
        { imagen: '/img/captura_piso2.jpg', alt: 'Floor 2 screenshot: a Head, a Barrada and a 444', pie: 'Floor 2 · More fears' },
        { imagen: '/img/captura_piso1.jpg', alt: 'Floor 1 screenshot: Jonathan with his flashlight facing a pack of 444s', pie: 'Floor 1 · In the dark' },
      ],
    },
    estudio: {
      etiqueta: 'Studio',
      titulo: "Emi's video game studio.",
      parrafos: [
        'Emi comes up with the stories, creates the characters and directs the art of every game. Every monster starts as one of his drawings, on paper.',
        'The games are free to play in your browser, with nothing to install.',
      ],
      imagenAlt: 'The Psycho, with a pumpkin face, a chainsaw and a knife, looming over Jonathan',
      pie: 'The Psycho, final boss of Sobrevive en la mansión.',
    },
    pie: { derechos: '© 2026 Emi Studio', otroIdioma: 'Español' },
  },
};
