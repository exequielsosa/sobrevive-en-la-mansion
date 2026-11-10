import Image from 'next/image';
import type { IdEnemigo, Textos } from '@/lib/textos';
import { IconoLinterna } from './Iconos';

// Imagen y tamaño de cada enemigo (no cambian con el idioma).
const enemigos: { id: IdEnemigo; img: string; ancho: number; alto: number }[] = [
  { id: 'cabeza', img: '/img/cabeza.png', ancho: 114, alto: 187 },
  { id: 'cuatro', img: '/img/cuatro.png', ancho: 141, alto: 204 },
  { id: 'barrada', img: '/img/barrada.png', ancho: 126, alto: 145 },
];

export default function Personajes({ t }: { t: Textos }) {
  const p = t.personajes;
  const j = p.jonathan;
  const iconosEquipo = [
    <Image key="cruz" src="/img/cruz.png" alt="" width={40} height={40} />,
    <Image key="piedra" src="/img/piedrita.png" alt="" width={22} height={17} />,
    <span key="linterna" className="acento"><IconoLinterna /></span>,
  ];

  return (
    <section id="personajes" aria-labelledby="t-personajes" className="seccion seccion--alterna">
      <div className="contenedor pila">
        <div>
          <p className="etiqueta">{p.etiqueta}</p>
          <h2 id="t-personajes" className="titulo">{p.titulo}</h2>
        </div>

        <article aria-labelledby="t-jonathan" className="jonathan">
          <div className="jonathan__imagen">
            <Image src="/img/nene_cruz.png" alt={j.alt} width={211} height={256} />
          </div>
          <div className="jonathan__texto">
            <p className="etiqueta etiqueta--gris">{j.rol}</p>
            <h3 id="t-jonathan" className="nombre nombre--grande">Jonathan</h3>
            <p className="texto-grande">{j.texto}</p>
            <div className="jonathan__datos">
              <span className="corazones">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Image key={n} src="/img/corazon.png" alt="" width={22} height={21} />
                ))}
                <span>{j.datos[0]}</span>
              </span>
              <span>{j.datos[1]}</span>
              <span>{j.datos[2]}</span>
            </div>
            <ul aria-label={j.equipoAria} className="equipo">
              {j.equipo.map((e, i) => (
                <li key={e.nombre}>
                  <span className="equipo__icono">{iconosEquipo[i]}</span>
                  <span>
                    <strong>{e.nombre}</strong>
                    <span className="gris">{e.texto}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="pila pila--chica">
          <h3 className="subtitulo">{p.enemigosTitulo}</h3>
          <div className="tarjetas">
            {enemigos.map((e) => {
              const f = p.enemigos[e.id];
              return (
                <article key={e.id} aria-labelledby={`t-${e.id}`} className="tarjeta">
                  <div className={e.id === 'barrada' ? 'tarjeta__imagen tarjeta__imagen--centro' : 'tarjeta__imagen'}>
                    <Image src={e.img} alt={f.alt} width={e.ancho} height={e.alto} />
                  </div>
                  <div className="tarjeta__texto">
                    <p className="etiqueta">{f.etiqueta}</p>
                    <h4 id={`t-${e.id}`} className="nombre">{f.nombre}</h4>
                    <p>{f.texto}</p>
                    <p className="dato">{f.datos}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
