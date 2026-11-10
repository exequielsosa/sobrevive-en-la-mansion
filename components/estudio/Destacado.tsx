// La portada del estudio: el juego destacado, con su arte de fondo y el botón para jugar.

import Image from 'next/image';
import Link from 'next/link';
import type { Idioma } from '@/lib/idiomas';
import type { TextosEstudio } from '@/lib/textos-estudio';
import { IconoPlay } from '../Iconos';

export default function Destacado({ t, lang }: { t: TextosEstudio; lang: Idioma }) {
  const d = t.destacado;
  return (
    <section id="inicio" aria-label={d.aria} className="destacado">
      <Image src="/img/hero_puerta.jpg" alt={d.fondoAlt} fill priority sizes="100vw" className="destacado__fondo" />
      <div aria-hidden="true" className="destacado__sombra" />
      <div className="contenedor destacado__contenido">
        <div className="destacado__texto">
          <p className="destacado__etiqueta">{d.etiqueta}</p>
          <Image src="/img/logo.png" alt={d.logoAlt} width={705} height={358} priority className="destacado__logo" />
          <p className="destacado__bajada">{d.bajada}</p>
          <div className="botones">
            <Link href={`/${lang}/mansion#jugar`} className="boton">
              <IconoPlay />
              {d.jugar}
            </Link>
            <Link href={`/${lang}/mansion`} className="boton boton--borde">{d.ver}</Link>
          </div>
          <p className="destacado__datos">{d.datos}</p>
        </div>
      </div>
    </section>
  );
}
