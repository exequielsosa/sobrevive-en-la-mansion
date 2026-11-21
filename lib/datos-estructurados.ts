// Lo que dice la ficha invisible para Google de cada página (ver components/DatosEstructurados).

import type { Idioma } from './idiomas';
import { NOMBRE_ESTUDIO, URL_SITIO } from './sitio';
import { captura } from './capturas';

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
  es: { nombre: 'Sobrevive en la mansión — Capítulo 1', otroNombre: 'Survive the Mansion — Chapter 1', generos: ['Plataformas', 'Terror'], plataforma: 'Navegador web (compu con teclado o celular)' },
  en: { nombre: 'Survive the Mansion — Chapter 1', otroNombre: 'Sobrevive en la mansión — Capítulo 1', generos: ['Platformer', 'Horror'], plataforma: 'Web browser (computer with keyboard, or phone)' },
};

// Página de la mansión: el videojuego.
export function datosMansion(lang: Idioma, descripcion: string) {
  const t = textosJuego[lang];
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: t.nombre,
    alternateName: t.otroNombre,
    description: descripcion,
    url: `${URL_SITIO}/${lang}/mansion`,
    image: `${URL_SITIO}/og.jpg`,
    screenshot: ([1, 2, 3] as const).map((piso) => `${URL_SITIO}${captura(lang, piso)}`),
    genre: t.generos,
    gamePlatform: t.plataforma,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Windows, macOS, Linux, Android, iOS',
    playMode: 'SinglePlayer',
    numberOfPlayers: { '@type': 'QuantitativeValue', value: 1 },
    // Desde la versión 27-07 el juego está en español y en inglés (la página en inglés lo abre en inglés).
    inLanguage: ['es', 'en'],
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'ARS', availability: 'https://schema.org/OnlineOnly' },
    author: estudio,
    publisher: estudio,
  };
}
