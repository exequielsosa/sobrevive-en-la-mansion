import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { esIdioma } from '@/lib/idiomas';
import { textos } from '@/lib/textos-mansion';
import SoloJuego from '@/components/mansion/SoloJuego';

// /es/jugar y /en/jugar: el juego solo, a pantalla completa. Es lo que abre la app instalada
// (manifest-es / manifest-en). No va en el sitemap ni en los buscadores: la página para
// compartir sigue siendo /mansion.

type Props = { params: Promise<{ lang: string }> };

const NOMBRE_CORTO = { es: 'La mansión', en: 'The Mansion' } as const;

export const viewport: Viewport = { themeColor: '#000000', viewportFit: 'cover' };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!esIdioma(lang)) return {};
  return {
    title: { absolute: textos[lang].meta.titulo },
    description: textos[lang].meta.descripcion,
    robots: { index: false, follow: false },
    manifest: `/manifest-${lang}.webmanifest`,
    // Al poner íconos acá, Next ya no agrega app/icon.png: por eso va también el de la pestaña.
    icons: { icon: [{ url: '/app/icono-192.png', sizes: '192x192', type: 'image/png' }], apple: '/app/icono-apple-180.png' },
    appleWebApp: { capable: true, title: NOMBRE_CORTO[lang], statusBarStyle: 'black-translucent' },
  };
}

export default async function Pagina({ params }: Props) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  return <SoloJuego t={textos[lang].jugar} lang={lang} conServiceWorker={process.env.NODE_ENV === 'production'} />;
}
