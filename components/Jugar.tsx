'use client';

// La sección para jugar. El juego (la exportación de Construct 2 que está en public/juego)
// se carga recién cuando el jugador hace clic: así la página no descarga los ~45 MB del juego
// si nadie va a jugar, y el navegador deja que suene el audio porque hubo un clic.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Textos } from '@/lib/textos';
import { IconoPantallaCompleta, IconoPlay } from './Iconos';

export default function Jugar({ t }: { t: Textos }) {
  const j = t.jugar;
  const [jugando, setJugando] = useState(false);
  const [sinTeclado, setSinTeclado] = useState(false);
  const juego = useRef<HTMLIFrameElement>(null);

  // En celulares y tablets (pantalla táctil, sin mouse) el juego no se puede jugar.
  useEffect(() => {
    setSinTeclado(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  // Cuando el juego termina de cargar, le damos el foco para que reciba el teclado.
  function alCargar() {
    juego.current?.focus();
    juego.current?.contentWindow?.focus();
  }

  function pantallaCompleta() {
    juego.current?.requestFullscreen?.();
  }

  return (
    <section id="jugar" aria-labelledby="t-jugar" className="seccion seccion--alterna seccion--linea">
      <div className="contenedor contenedor--angosto jugar">
        <p className="etiqueta">{j.etiqueta}</p>
        <h2 id="t-jugar" className="titulo">{j.titulo}</h2>

        <div className="jugar__marco">
          {jugando ? (
            <iframe
              ref={juego}
              src="/juego/index.html"
              title={j.iframeTitulo}
              allow="autoplay; fullscreen"
              allowFullScreen
              onLoad={alCargar}
              className="jugar__juego"
            />
          ) : (
            <>
              <Image src="/img/captura_piso3.jpg" alt="" fill sizes="(max-width: 1100px) 100vw, 1100px" className="jugar__fondo" />
              <div className="jugar__portada">
                <Image src="/img/logo.png" alt="" width={705} height={358} className="jugar__logo" />
                {sinTeclado ? (
                  <p className="jugar__aviso">{j.celular}</p>
                ) : (
                  <button type="button" className="boton boton--grande" onClick={() => setJugando(true)}>
                    <IconoPlay />
                    {j.boton}
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        <div className="jugar__notas">
          {j.notas.map((n) => (
            <span key={n}>{n}</span>
          ))}
          {jugando && (
            <button type="button" className="boton-texto" onClick={pantallaCompleta}>
              <IconoPantallaCompleta />
              {j.pantallaCompleta}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
