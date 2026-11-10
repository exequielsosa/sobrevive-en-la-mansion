// Barra de arriba del estudio: el nombre, los links de la página y el idioma.
// En el celu se esconden los links (la página es corta) y queda todo en una fila.

import Link from 'next/link';
import type { Idioma } from '@/lib/idiomas';
import type { TextosEstudio } from '@/lib/textos-estudio';
import Marca from './Marca';

export default function Barra({ t, lang }: { t: TextosEstudio; lang: Idioma }) {
  return (
    <header className="barra">
      <nav aria-label={t.barra.aria} className="barra__dentro">
        <a href="#inicio" aria-label={t.barra.inicio} className="barra__marca">
          <Marca />
        </a>
        <div className="barra__links">
          <a href="#juegos">{t.barra.juegos}</a>
          <a href="#estudio">{t.barra.estudio}</a>
        </div>
        <div role="group" aria-label={t.barra.idioma} className="idioma">
          <Link href="/es" aria-current={lang === 'es' ? 'true' : undefined} hrefLang="es">ES</Link>
          <Link href="/en" aria-current={lang === 'en' ? 'true' : undefined} hrefLang="en">EN</Link>
        </div>
      </nav>
    </header>
  );
}
