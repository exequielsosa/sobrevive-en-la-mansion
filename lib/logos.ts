// Los logos del sitio.
// - El del juego cambia con el idioma: en /en se ve "Survive the Mansion" (el logo en inglés de Emi).
// - Los de Emi Studio (dibujados por Emi): el horizontal va en la barra y el vertical en el pie.
// ancho y alto son las medidas del archivo; el tamaño en pantalla lo pone el CSS de cada lugar.

import type { Idioma } from './idiomas';

export type Logo = { src: string; ancho: number; alto: number };

export const LOGO_JUEGO: Record<Idioma, Logo> = {
  es: { src: '/img/logo.png', ancho: 705, alto: 358 },
  en: { src: '/img/logo_en.png', ancho: 705, alto: 399 },
};

export const LOGO_ESTUDIO: Record<'horizontal' | 'vertical', Logo> = {
  horizontal: { src: '/img/emi_studio_horizontal.png', ancho: 480, alto: 232 },
  vertical: { src: '/img/emi_studio_vertical.png', ancho: 600, alto: 688 },
};

// Medidas para un lugar donde el logo se muestra con un alto fijo (la barra) o un ancho fijo (el pie de la página del juego).
export function conAlto(logo: Logo, alto: number) {
  return { width: Math.round((logo.ancho * alto) / logo.alto), height: alto };
}

export function conAncho(logo: Logo, ancho: number) {
  return { width: ancho, height: Math.round((logo.alto * ancho) / logo.ancho) };
}
