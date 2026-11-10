// Quién hace los juegos: unas líneas sobre Emi y una imagen de su arte.

import Image from 'next/image';
import type { TextosEstudio } from '@/lib/textos-estudio';

export default function SobreEstudio({ t }: { t: TextosEstudio }) {
  const e = t.estudio;
  return (
    <section id="estudio" aria-labelledby="t-estudio" className="estudio-seccion estudio-seccion--linea">
      <div className="contenedor sobre">
        <div className="sobre__texto">
          <p className="sobre__etiqueta">{e.etiqueta}</p>
          <h2 id="t-estudio" className="sobre__titulo">{e.titulo}</h2>
          {e.parrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <figure className="sobre__imagen">
          <Image src="/img/jefe_psicopata.jpg" alt={e.imagenAlt} width={1708} height={960} sizes="(max-width: 960px) 100vw, 600px" />
          <figcaption>{e.pie}</figcaption>
        </figure>
      </div>
    </section>
  );
}
