import Image from 'next/image';
import Link from 'next/link';
import type { Idioma } from '@/lib/idiomas';
import type { Textos } from '@/lib/textos-mansion';
import { LOGO_ESTUDIO, LOGO_JUEGO, conAncho } from '@/lib/logos';

export default function Creditos({ t, lang }: { t: Textos; lang: Idioma }) {
  const c = t.creditos;
  return (
    <footer id="creditos" aria-labelledby="t-creditos" className="creditos">
      <div className="contenedor pila">
        <div className="creditos__arriba">
          <div>
            <h2 id="t-creditos" className="etiqueta">{c.etiqueta}</h2>
            {/* El logo de Emi Studio en lugar del título; el texto alternativo dice el título ("Un juego de Emi"). */}
            <Image src={LOGO_ESTUDIO.horizontal.src} alt={c.titulo} {...conAncho(LOGO_ESTUDIO.horizontal, 240)} sizes="240px" className="creditos__marca" />
            <p className="gris-claro">{c.detalle}</p>
          </div>
          <Image src={LOGO_JUEGO[lang].src} alt={t.portada.logoAlt} {...conAncho(LOGO_JUEGO[lang], 260)} className="creditos__logo" />
        </div>
        <div className="creditos__abajo">
          <span>{c.capitulo}</span>
          {/* La política de privacidad (la pide Google Play para la app). */}
          <Link href={`/${lang}/privacidad`} className="creditos__estudio">{lang === 'es' ? 'Privacidad' : 'Privacy'}</Link>
          {/* Vuelve a la portada del estudio. */}
          <Link href={`/${lang}`} className="creditos__estudio">Emi Studio</Link>
        </div>
      </div>
    </footer>
  );
}
