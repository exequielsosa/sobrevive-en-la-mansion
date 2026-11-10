// Lo que dice la ficha invisible para Google de cada página (ver components/DatosEstructurados).

import type { Idioma } from './idiomas';
import { NOMBRE_ESTUDIO, URL_SITIO } from './sitio';

const estudio = {
  '@type': 'Organization',
  '@id': `${URL_SITIO}/#estudio`,
  name: NOMBRE_ESTUDIO,
  url: `${URL_SITIO}/es`,
};

// Portada: el estudio y su sitio.
export function datosEstudio(lang: Idioma, descripcion: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      estudio,
      {
        '@type': 'WebSite',
        '@id': `${URL_SITIO}/#sitio`,
        name: NOMBRE_ESTUDIO,
        url: `${URL_SITIO}/${lang}`,
        description: descripcion,
        inLanguage: lang,
        publisher: { '@id': `${URL_SITIO}/#estudio` },
      },
    ],
  };
}

const textosJuego = {
  es: { generos: ['Plataformas', 'Terror'], plataforma: 'Navegador web (PC con teclado)' },
  en: { generos: ['Platformer', 'Horror'], plataforma: 'Web browser (PC with keyboard)' },
};

// Página de la mansión: el videojuego.
export function datosMansion(lang: Idioma, descripcion: string) {
  const t = textosJuego[lang];
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'Sobrevive en la mansión — Capítulo 1',
    alternateName: 'Survive the Mansion — Chapter 1',
    description: descripcion,
    url: `${URL_SITIO}/${lang}/mansion`,
    image: `${URL_SITIO}/og.jpg`,
    screenshot: [1, 2, 3].map((piso) => `${URL_SITIO}/img/captura_piso${piso}.jpg`),
    genre: t.generos,
    gamePlatform: t.plataforma,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Windows, macOS, Linux',
    playMode: 'SinglePlayer',
    numberOfPlayers: { '@type': 'QuantitativeValue', value: 1 },
    // El juego en sí está en español (los textos de la página están en los dos idiomas).
    inLanguage: 'es',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'ARS', availability: 'https://schema.org/OnlineOnly' },
    author: estudio,
    publisher: estudio,
  };
}
