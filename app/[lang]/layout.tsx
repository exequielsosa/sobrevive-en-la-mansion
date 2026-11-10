import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/im-fell-english/400.css';
import '@fontsource/im-fell-english/400-italic.css';
import '@fontsource-variable/archivo/wdth.css';
import '../globals.css';
import '../estudio.css';
import { esIdioma, idiomas } from '@/lib/idiomas';

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

// Solo existen /es y /en: cualquier otro idioma da "página no encontrada".
export const dynamicParams = false;
export function generateStaticParams() {
  return idiomas.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: '#0b0b0c' };

// Lo que comparten todas las páginas. El título y la descripción los pone cada página.
// En Vercel, VERCEL_PROJECT_PRODUCTION_URL es el dominio publicado; sirve para armar
// la dirección completa de la imagen que aparece al compartir el link en redes.
const dominio = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const metadata: Metadata = {
  metadataBase: new URL(dominio ? `https://${dominio}` : 'http://localhost:3000'),
  title: { default: 'Emi Games', template: '%s | Emi Games' },
};

export default async function Layout({ children, params }: Props) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
