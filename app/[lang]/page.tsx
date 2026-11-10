import { notFound } from 'next/navigation';
import { esIdioma, textos } from '@/lib/textos';
import Nav from '@/components/Nav';
import Portada from '@/components/Portada';
import Historia from '@/components/Historia';
import Personajes from '@/components/Personajes';
import Jefes from '@/components/Jefes';
import ComoSeJuega from '@/components/ComoSeJuega';
import Jugar from '@/components/Jugar';
import Creditos from '@/components/Creditos';

export default async function Pagina({ params }: { params: Promise<{ lang: string }> }) {
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
      <Creditos t={t} />
    </>
  );
}
