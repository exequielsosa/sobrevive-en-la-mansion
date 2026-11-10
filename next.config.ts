import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // La página vive en /es y /en. Al entrar a la raíz, se elige el idioma del navegador:
  // si el navegador está en inglés va a /en, y si no, a /es.
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'header', key: 'accept-language', value: '^en.*' }],
        destination: '/en',
        permanent: false,
      },
      { source: '/', destination: '/es', permanent: false },
    ];
  },
};

export default nextConfig;
