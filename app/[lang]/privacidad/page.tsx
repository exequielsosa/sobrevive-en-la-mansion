import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { esIdioma } from '@/lib/idiomas';
import { CONTACTO_PRIVACIDAD, textosPrivacidad } from '@/lib/textos-privacidad';

// /es/privacidad y /en/privacidad: la política de privacidad del juego (web y app de Android).
// Es el link que se pone en la ficha de Google Play. Los textos están en lib/textos-privacidad.ts.

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!esIdioma(lang)) return {};
  const t = textosPrivacidad[lang];
  return {
    title: { absolute: t.meta.titulo },
    description: t.meta.descripcion,
    alternates: { canonical: `/${lang}/privacidad`, languages: { es: '/es/privacidad', en: '/en/privacidad' } },
  };
}

export default async function Pagina({ params }: Props) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const t = textosPrivacidad[lang];
  return (
    <main className="seccion">
      <div className="contenedor contenedor--angosto privacidad">
        <p className="etiqueta">{t.etiqueta}</p>
        <h1 className="titulo">{t.titulo}</h1>
        <p className="gris-claro">{t.alcance}</p>
        <p className="gris">{t.fecha}</p>
        {t.secciones.map((s) => (
          <section key={s.titulo}>
            <h2 className="subtitulo">{s.titulo}</h2>
            {s.parrafos.map((p) => (
              <p key={p} className="gris-claro">{p}</p>
            ))}
          </section>
        ))}
        <p className="gris-claro">
          {t.contacto}{' '}
          {CONTACTO_PRIVACIDAD ? <a href={`mailto:${CONTACTO_PRIVACIDAD}`}>{CONTACTO_PRIVACIDAD}</a> : t.contactoPendiente}
        </p>
        <p>
          <Link href={`/${lang}/mansion`}>{t.volver}</Link>
        </p>
      </div>
    </main>
  );
}
