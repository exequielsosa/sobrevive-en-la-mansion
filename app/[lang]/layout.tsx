import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/im-fell-english/400.css';
import '@fontsource/im-fell-english/400-italic.css';
import '../globals.css';
import { esIdioma, idiomas, textos } from '@/lib/textos';

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

// Solo existen /es y /en: cualquier otro idioma da "página no encontrada".
export const dynamicParams = false;
export function generateStaticParams() {
  return idiomas.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: '#0d0c0b' };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!esIdioma(lang)) return {};
  const t = textos[lang].meta;
  // En Vercel, VERCEL_PROJECT_PRODUCTION_URL es el dominio publicado; sirve para armar
  // la dirección completa de la imagen que aparece al compartir el link en redes.
  const dominio = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return {
    metadataBase: new URL(dominio ? `https://${dominio}` : 'http://localhost:3000'),
    title: t.titulo,
    description: t.descripcion,
    alternates: { languages: { es: '/es', en: '/en' } },
    openGraph: {
      title: t.titulo,
      description: t.descripcion,
      images: [{ url: '/og.jpg', width: 1200, height: 630 }],
      locale: lang === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
    },
  };
}

export default async function Layout({ children, params }: Props) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
