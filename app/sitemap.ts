// /sitemap.xml: la lista de páginas del sitio, para Google. Cada página dice cuál es
// su versión en el otro idioma. Cuando haya un juego nuevo, se agrega su ruta acá.

import type { MetadataRoute } from 'next';
import { URL_SITIO } from '@/lib/sitio';

const rutas = ['', '/mansion'];

export default function sitemap(): MetadataRoute.Sitemap {
  return rutas.flatMap((ruta) =>
    (['es', 'en'] as const).map((lang) => ({
      url: `${URL_SITIO}/${lang}${ruta}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          es: `${URL_SITIO}/es${ruta}`,
          en: `${URL_SITIO}/en${ruta}`,
          'x-default': `${URL_SITIO}/es${ruta}`,
        },
      },
    })),
  );
}
