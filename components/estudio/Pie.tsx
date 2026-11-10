// El pie del estudio: "EMI STUDIO" gigante (la idea del afiche) y una fila con links.

import Link from 'next/link';
import type { Idioma } from '@/lib/idiomas';
import type { TextosEstudio } from '@/lib/textos-estudio';
import Marca from './Marca';

export default function Pie({ t, lang }: { t: TextosEstudio; lang: Idioma }) {
  const otro: Idioma = lang === 'es' ? 'en' : 'es';
  return (
    <footer className="pie">
      <div className="pie__dentro">
        {/* El nombre ya lo leen los lectores de pantalla en la barra; acá es solo para ver. */}
        <div aria-hidden="true" className="pie__marca">
          <Marca gigante />
        </div>
        <div className="pie__abajo">
          <span>{t.pie.derechos}</span>
          <div className="pie__links">
            <a href="#juegos">{t.barra.juegos}</a>
            <a href="#estudio">{t.barra.estudio}</a>
            <Link href={`/${otro}`} hrefLang={otro}>{t.pie.otroIdioma}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
