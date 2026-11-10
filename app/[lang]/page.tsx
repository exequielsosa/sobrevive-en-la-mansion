// Portada de Emi Studio: el estudio y sus juegos. Cada juego tiene su propia página
// adentro (por ahora, /mansion).

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { esIdioma } from '@/lib/idiomas';
import { textosEstudio } from '@/lib/textos-estudio';
import Barra from '@/components/estudio/Barra';
import Destacado from '@/components/estudio/Destacado';
import Juegos from '@/components/estudio/Juegos';
import SobreEstudio from '@/components/estudio/SobreEstudio';
import Pie from '@/components/estudio/Pie';
import DatosEstructurados from '@/components/DatosEstructurados';
import { datosEstudio } from '@/lib/datos-estructurados';
import { NOMBRE_ESTUDIO } from '@/lib/sitio';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!esIdioma(lang)) return {};
  const t = textosEstudio[lang].meta;
  return {
    title: { absolute: t.titulo },
    description: t.descripcion,
    alternates: { canonical: `/${lang}`, languages: { es: '/es', en: '/en', 'x-default': '/es' } },
    openGraph: {
      title: t.titulo,
      description: t.descripcion,
      url: `/${lang}`,
      siteName: NOMBRE_ESTUDIO,
      images: [{ url: '/og-estudio.jpg', width: 1200, height: 630 }],
      locale: lang === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
    },
  };
}

export default async function PortadaEstudio({ params }: Props) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const t = textosEstudio[lang];

  return (
    <div className="estudio-pagina">
      <Barra t={t} lang={lang} />
      <main>
        {/* El título principal de la página. No se ve (el nombre ya está en la barra y el pie),
            pero lo leen Google y los lectores de pantalla. */}
        <h1 className="solo-lectores">{t.encabezado}</h1>
        <Destacado t={t} lang={lang} />
        <Juegos t={t} lang={lang} />
        <SobreEstudio t={t} />
      </main>
      <Pie t={t} lang={lang} />
      <DatosEstructurados datos={datosEstudio(lang, t.meta.descripcion)} />
    </div>
  );
}
