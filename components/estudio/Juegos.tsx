// Los juegos del estudio: la ficha del Capítulo 1 (se juega), sus capturas y la ficha del
// Capítulo 2 (en desarrollo). Cuando haya otro juego, se agrega otra ficha.

import Image from 'next/image';
import Link from 'next/link';
import type { Idioma } from '@/lib/idiomas';
import type { TextosEstudio } from '@/lib/textos-estudio';
import { IconoFlecha, IconoPlay } from '../Iconos';

export default function Juegos({ t, lang }: { t: TextosEstudio; lang: Idioma }) {
  const j = t.juegos;
  const m = j.mansion;
  const c2 = j.capitulo2;
  return (
    <section id="juegos" aria-labelledby="t-juegos" className="estudio-seccion">
      <div className="contenedor juegos">
        <div className="juegos__cabeza">
          <h2 id="t-juegos" className="juegos__titulo">{j.titulo}</h2>
          <p className="juegos__cantidad">{j.cantidad}</p>
        </div>

        <article aria-labelledby="t-mansion" className="ficha">
          <div className="ficha__imagen">
            <Image src="/img/jefe_stalker.jpg" alt={m.imagenAlt} fill sizes="(max-width: 860px) 100vw, 760px" className="ficha__foto" />
          </div>
          <div className="ficha__texto">
            <ul className="ficha__chips">
              <li className="ficha__disponible">{m.disponible}</li>
              {m.generos.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <div>
              <h3 id="t-mansion" className="ficha__nombre">{m.nombre}</h3>
              <p className="ficha__capitulo">{m.capitulo}</p>
            </div>
            <p className="ficha__descripcion">{m.texto}</p>
            <div className="ficha__acciones">
              <Link href={`/${lang}/mansion#jugar`} className="boton boton--chico">
                <IconoPlay />
                {m.jugar}
              </Link>
              <Link href={`/${lang}/mansion`} className="enlace-flecha">
                {m.ver}
                <IconoFlecha />
              </Link>
            </div>
          </div>
        </article>

        <ul aria-label={j.capturasAria} className="galeria">
          {j.capturas.map((c) => (
            <li key={c.imagen}>
              <figure>
                <Image src={c.imagen} alt={c.alt} width={854} height={480} sizes="(max-width: 760px) 100vw, 420px" />
                <figcaption>{c.pie}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <article aria-labelledby="t-capitulo2" className="ficha ficha--proxima">
          <div className="ficha__imagen">
            <Image src="/img/capitulo2.jpg" alt={c2.imagenAlt} fill sizes="(max-width: 860px) 100vw, 760px" className="ficha__foto" />
          </div>
          <div className="ficha__texto ficha__texto--centro">
            <ul className="ficha__chips">
              <li>{c2.estado}</li>
            </ul>
            <div>
              <h3 id="t-capitulo2" className="ficha__nombre">{c2.nombre}</h3>
              <p className="ficha__capitulo">{c2.capitulo}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
