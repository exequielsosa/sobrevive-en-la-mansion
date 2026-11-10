import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // El sitio vive en /es y /en. Al entrar sin idioma, se elige el del navegador:
  // si el navegador está en inglés va a /en, y si no, a /es.
  // Lo mismo con /mansion, que es el link corto para compartir el juego.
  async redirects() {
    const ingles = [{ type: 'header' as const, key: 'accept-language', value: '^en.*' }];
    return [
      { source: '/', has: ingles, destination: '/en', permanent: false },
      { source: '/', destination: '/es', permanent: false },
      { source: '/mansion', has: ingles, destination: '/en/mansion', permanent: false },
      { source: '/mansion', destination: '/es/mansion', permanent: false },
    ];
  },
};

export default nextConfig;
