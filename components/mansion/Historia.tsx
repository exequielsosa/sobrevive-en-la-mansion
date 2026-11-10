import Image from 'next/image';
import type { Textos } from '@/lib/textos-mansion';

const llaves = ['/img/llave_1.png', '/img/llave_2.png', '/img/llave_3.png'];
const capturas = ['/img/captura_piso3.jpg', '/img/captura_piso2.jpg', '/img/captura_piso1.jpg'];

export default function Historia({ t }: { t: Textos }) {
  const h = t.historia;
  return (
    <section id="historia" aria-labelledby="t-historia" className="seccion">
      <div className="contenedor dos-columnas">
        <div className="columna-texto">
          <p className="etiqueta">{h.etiqueta}</p>
          <h2 id="t-historia" className="titulo">{h.titulo}</h2>
          {h.parrafos.map((p) => (
            <p key={p} className="texto-grande">{p}</p>
          ))}
        </div>

        <ol aria-label={h.caminoAria} className="camino">
          {h.pisos.map((piso, i) => (
            <li key={piso.numero} className="camino__paso">
              <span className="camino__numero">{piso.numero}</span>
              <span className="camino__texto">
                <strong>{piso.nombre}</strong>
                <span>{piso.detalle}</span>
              </span>
              <Image src={llaves[i]} alt={piso.llaveAlt} width={58} height={34} />
            </li>
          ))}
          <li className="camino__paso">
            <Image src="/img/puerta_final.png" alt={h.puerta.alt} width={64} height={94} className="camino__puerta" />
            <span className="camino__texto">
              <strong className="acento">{h.puerta.nombre}</strong>
              <span>{h.puerta.detalle}</span>
            </span>
          </li>
        </ol>
      </div>

      <div className="contenedor capturas">
        {h.capturas.map((c, i) => (
          <figure key={c.pie} className="captura">
            <Image src={capturas[i]} alt={c.alt} width={854} height={480} sizes="(max-width: 760px) 100vw, 420px" />
            <figcaption>{c.pie}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
