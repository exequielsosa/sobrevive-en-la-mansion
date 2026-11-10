import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { esIdioma } from '@/lib/idiomas';
import { textos } from '@/lib/textos-mansion';
import Nav from '@/components/mansion/Nav';
import Portada from '@/components/mansion/Portada';
import Historia from '@/components/mansion/Historia';
import Personajes from '@/components/mansion/Personajes';
import Jefes from '@/components/mansion/Jefes';
import ComoSeJuega from '@/components/mansion/ComoSeJuega';
import Jugar from '@/components/mansion/Jugar';
import Creditos from '@/components/mansion/Creditos';
import DatosEstructurados from '@/components/DatosEstructurados';
import { datosMansion } from '@/lib/datos-estructurados';
import { NOMBRE_ESTUDIO } from '@/lib/sitio';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!esIdioma(lang)) return {};
  const t = textos[lang].meta;
  return {
    title: t.titulo,
    description: t.descripcion,
    alternates: { canonical: `/${lang}/mansion`, languages: { es: '/es/mansion', en: '/en/mansion', 'x-default': '/es/mansion' } },
    openGraph: {
      title: t.titulo,
      description: t.descripcion,
      url: `/${lang}/mansion`,
      siteName: NOMBRE_ESTUDIO,
      images: [{ url: '/og.jpg', width: 1200, height: 630 }],
      locale: lang === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
    },
  };
}

export default async function Pagina({ params }: Props) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const t = textos[lang];

  return (
    <>
      <Nav t={t} lang={lang} />
      <main>
        <Portada t={t} />
        <Historia t={t} />
        <Personajes t={t} />
        <Jefes t={t} />
        <ComoSeJuega t={t} />
        <Jugar t={t} />
      </main>
      <Creditos t={t} lang={lang} />
      <DatosEstructurados datos={datosMansion(lang, t.meta.descripcion)} />
    </>
  );
}
