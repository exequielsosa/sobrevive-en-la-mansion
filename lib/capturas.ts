// Las capturas del juego que usa la web. Las de inglés se sacaron del juego en inglés (FLOOR, ESC: PAUSE).

import type { Idioma } from './idiomas';

export function captura(lang: Idioma, piso: 1 | 2 | 3): string {
  return `/img/captura_piso${piso}${lang === 'en' ? '_en' : ''}.jpg`;
}
