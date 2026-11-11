import Image from 'next/image';
import type { Textos } from '@/lib/textos-mansion';

const iconosConsejos = [
  { src: '/img/llave_1.png', ancho: 38, alto: 22 },
  { src: '/img/corazon.png', ancho: 34, alto: 32 },
  { src: '/img/puerta_final.png', ancho: 38, alto: 56 },
];

export default function ComoSeJuega({ t }: { t: Textos }) {
  const c = t.como;
  return (
    <section id="como-se-juega" aria-labelledby="t-como" className="seccion seccion--linea">
      <div className="contenedor dos-columnas">
        <div className="columna-texto">
          <p className="etiqueta">{c.etiqueta}</p>
          <h2 id="t-como" className="titulo">{c.titulo}</h2>
          <dl className="teclas">
            {c.teclas.map((fila) => (
              <div key={fila.accion} className="teclas__fila">
                <dt>
                  {fila.teclas.map((k) => (
                    <kbd key={k} className={k.length > 1 ? 'tecla tecla--ancha' : 'tecla'}>{k}</kbd>
                  ))}
                </dt>
                <dd>{fila.accion}</dd>
              </div>
            ))}
          </dl>
          <p className="teclas__tactil">{c.tactil}</p>
        </div>
        <ul aria-label={c.consejosAria} className="consejos">
          {c.consejos.map((texto, i) => (
            <li key={texto}>
              <Image src={iconosConsejos[i].src} alt="" width={iconosConsejos[i].ancho} height={iconosConsejos[i].alto} />
              <span>{texto}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
