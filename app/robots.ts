// /robots.txt: les dice a los buscadores que pueden recorrer todo el sitio
// y dónde está la lista de páginas.

import type { MetadataRoute } from 'next';
import { URL_SITIO } from '@/lib/sitio';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${URL_SITIO}/sitemap.xml`,
  };
}
