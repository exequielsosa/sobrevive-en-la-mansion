import Image from 'next/image';
import type { IdJefe, Textos } from '@/lib/textos-mansion';

// La barra de vida se compara con el jefe más fuerte (el Psicópata, 70).
const jefes: { id: IdJefe; img: string; vida: number }[] = [
  { id: 'sombra', img: '/img/jefe_sombra.jpg', vida: 30 },
  { id: 'stalker', img: '/img/jefe_stalker.jpg', vida: 50 },
  { id: 'psicopata', img: '/img/jefe_psicopata.jpg', vida: 70 },
];
const VIDA_MAXIMA = 70;

export default function Jefes({ t }: { t: Textos }) {
  return (
    <section aria-labelledby="t-jefes" className="seccion seccion--alterna seccion--sin-arriba">
      <div className="contenedor pila pila--media">
        <h3 id="t-jefes" className="subtitulo">{t.jefes.titulo}</h3>
        {jefes.map((jefe, i) => {
          const f = t.jefes.lista[jefe.id];
          return (
            <article key={jefe.id} aria-labelledby={`t-${jefe.id}`} className={i % 2 === 1 ? 'jefe jefe--invertido' : 'jefe'}>
              <Image src={jefe.img} alt={f.alt} width={1708} height={960} sizes="(max-width: 900px) 100vw, 760px" className="jefe__imagen" />
              <div className="jefe__texto">
                <p className="etiqueta etiqueta--gris">{f.piso}</p>
                <h4 id={`t-${jefe.id}`} className="nombre nombre--jefe">{f.nombre}</h4>
                <p className="jefe__miedo">{f.etiqueta}</p>
                <p className="gris-claro">{f.texto}</p>
                <div className="vida">
                  <div className="vida__fila">
                    <span>{t.jefes.vida}</span>
                    <span>{f.datos}</span>
                  </div>
                  <div aria-hidden="true" className="vida__barra">
                    <div style={{ width: `${Math.round((jefe.vida / VIDA_MAXIMA) * 100)}%` }} />
                  </div>
                  <p className="dato">{f.ataque}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
