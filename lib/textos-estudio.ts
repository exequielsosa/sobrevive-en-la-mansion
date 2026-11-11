// Textos de la portada de Emi Studio (la página del estudio), en español y en inglés.
// Para cambiar una frase, se cambia acá; los componentes solo la muestran.

import type { Idioma } from './idiomas';

type Captura = { imagen: string; alt: string; pie: string };

export type TextosEstudio = {
  meta: { titulo: string; descripcion: string };
  encabezado: string;
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
    capitulo2: { estado: string; nombre: string; capitulo: string; imagenAlt: string };
  };
  estudio: { etiqueta: string; titulo: string; parrafos: string[]; imagenAlt: string; pie: string };
  pie: { derechos: string; otroIdioma: string };
};

export const textosEstudio: Record<Idioma, TextosEstudio> = {
  es: {
    meta: {
      titulo: 'Emi Studio — Juegos para jugar en el navegador',
      descripcion:
        'Emi Studio es un estudio independiente de videojuegos. Su primer juego, Sobrevive en la mansión, se juega gratis en el navegador.',
    },
    encabezado: 'Emi Studio: estudio independiente de videojuegos',
    barra: { aria: 'Principal', inicio: 'Emi Studio, inicio', juegos: 'Juegos', estudio: 'Estudio', idioma: 'Idioma' },
    destacado: {
      aria: 'Juego destacado',
      etiqueta: 'Nuevo juego · Ya se puede jugar',
      logoAlt: 'Sobrevive en la mansión — Capítulo 1',
      fondoAlt: 'Jonathan levanta la cruz frente a la puerta abierta de la mansión',
      bajada: 'Te despertaste en una mansión que no conocés. Tres pisos. Tres llaves. Una sola salida.',
      jugar: 'Jugar gratis',
      ver: 'Ver el juego',
      datos: 'Plataformas 2D · Terror · En el navegador · Compu o celular',
    },
    juegos: {
      titulo: 'Juegos',
      cantidad: '1 disponible · 1 en desarrollo',
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
      capitulo2: {
        estado: 'En desarrollo',
        nombre: 'Sobrevive en la mansión',
        capitulo: 'Capítulo 2 · Próximamente',
        imagenAlt: 'Arte del Capítulo 2: Jonathan escapa corriendo de la mansión, perseguido por la Sombra, el Psicópata y otros monstruos',
      },
    },
    estudio: {
      etiqueta: 'Estudio',
      titulo: 'Un estudio independiente.',
      parrafos: [
        'Emi Studio es un estudio independiente de videojuegos fundado por Emi, director creativo y de arte. Escribe las historias, diseña los personajes y dirige el arte de cada juego.',
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
        'Emi Studio is an independent video game studio. Its first game, Sobrevive en la mansión (Survive the Mansion), is free to play in your browser.',
    },
    encabezado: 'Emi Studio: independent video game studio',
    barra: { aria: 'Main', inicio: 'Emi Studio, home', juegos: 'Games', estudio: 'Studio', idioma: 'Language' },
    destacado: {
      aria: 'Featured game',
      etiqueta: 'New game · Play it now',
      logoAlt: 'Sobrevive en la mansión (Survive the Mansion) — Chapter 1',
      fondoAlt: 'Jonathan raises the cross in front of the open door of the mansion',
      bajada: 'You wake up in a mansion you have never seen. Three floors. Three keys. One way out.',
      jugar: 'Play for free',
      ver: 'See the game',
      datos: '2D platformer · Horror · In your browser · Computer or phone',
    },
    juegos: {
      titulo: 'Games',
      cantidad: '1 available · 1 in development',
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
      capitulo2: {
        estado: 'In development',
        nombre: 'Sobrevive en la mansión',
        capitulo: 'Survive the Mansion · Chapter 2 · Coming soon',
        imagenAlt: 'Chapter 2 art: Jonathan runs away from the mansion, chased by the Shadow, the Psycho and other monsters',
      },
    },
    estudio: {
      etiqueta: 'Studio',
      titulo: 'An independent studio.',
      parrafos: [
        'Emi Studio is an independent video game studio founded by Emi, creative and art director. He writes the stories, designs the characters and directs the art of every game.',
      ],
      imagenAlt: 'The Psycho, with a pumpkin face, a chainsaw and a knife, looming over Jonathan',
      pie: 'The Psycho, final boss of Sobrevive en la mansión.',
    },
    pie: { derechos: '© 2026 Emi Studio', otroIdioma: 'Español' },
  },
};
