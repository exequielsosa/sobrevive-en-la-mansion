import Image from 'next/image';
import Link from 'next/link';
import type { Idioma } from '@/lib/idiomas';
import type { Textos } from '@/lib/textos-mansion';

export default function Creditos({ t, lang }: { t: Textos; lang: Idioma }) {
  const c = t.creditos;
  return (
    <footer id="creditos" aria-labelledby="t-creditos" className="creditos">
      <div className="contenedor pila">
        <div className="creditos__arriba">
          <div>
            <h2 id="t-creditos" className="etiqueta">{c.etiqueta}</h2>
            <p className="creditos__titulo">{c.titulo}</p>
            <p className="gris-claro">{c.detalle}</p>
          </div>
          <Image src="/img/logo.png" alt={t.portada.logoAlt} width={260} height={132} className="creditos__logo" />
        </div>
        <div className="creditos__abajo">
          <span>{c.capitulo}</span>
          {/* Vuelve a la portada del estudio. */}
          <Link href={`/${lang}`} className="creditos__estudio">Emi Studio</Link>
        </div>
      </div>
    </footer>
  );
}
