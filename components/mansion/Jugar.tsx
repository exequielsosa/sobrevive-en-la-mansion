'use client';

// La sección para jugar. El juego (la exportación de Construct 2 que está en public/juego)
// se carga recién cuando el jugador hace clic: así la página no descarga los ~45 MB del juego
// si nadie va a jugar, y el navegador deja que suene el audio porque hubo un clic.
// En celulares y tablets el juego se abre en pantalla completa con botones a los costados (JuegoTactil).

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Textos } from '@/lib/textos-mansion';
import type { Idioma } from '@/lib/idiomas';
import { LOGO_JUEGO } from '@/lib/logos';
import { captura } from '@/lib/capturas';
import { IconoPantallaCompleta, IconoPlay } from '../Iconos';
import JuegoTactil, { abrirPantallaCompleta, cerrarPantallaCompleta, direccionJuego, pausarSiJuega } from './JuegoTactil';
import type { VentanaJuego } from './JuegoTactil';

export default function Jugar({ t, lang }: { t: Textos; lang: Idioma }) {
  const j = t.jugar;
  const [jugando, setJugando] = useState(false);
  const [tactil, setTactil] = useState(false);
  const [jugandoTactil, setJugandoTactil] = useState(false);
  const juego = useRef<HTMLIFrameElement>(null);
  const sinPausa = useRef(false); // el clic en "Pantalla completa" no pausa

  // Celulares y tablets: pantalla táctil, sin mouse.
  useEffect(() => {
    setTactil(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  function empezar() {
    if (tactil) {
      abrirPantallaCompleta();
      setJugandoTactil(true);
    } else {
      setJugando(true);
    }
  }

  function salirTactil() {
    cerrarPantallaCompleta();
    setJugandoTactil(false);
  }

  // Cuando el juego termina de cargar, le damos el foco para que reciba el teclado.
  // Si después pierde el foco (clic afuera del juego, otra ventana), queda en PAUSA: ver pausarSiJuega.
  function alCargar() {
    juego.current?.focus();
    const w = juego.current?.contentWindow as VentanaJuego | null;
    w?.focus();
    w?.addEventListener('blur', () => {
      if (sinPausa.current) {
        sinPausa.current = false;
        return;
      }
      pausarSiJuega(w);
    });
  }

  function pantallaCompleta() {
    juego.current?.requestFullscreen?.();
    juego.current?.contentWindow?.focus();
    sinPausa.current = false;
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
              src={direccionJuego(lang, false)}
              title={j.iframeTitulo}
              allow="autoplay; fullscreen"
              allowFullScreen
              onLoad={alCargar}
              className="jugar__juego"
            />
          ) : (
            <>
              <Image src={captura(lang, 3)} alt="" fill sizes="(max-width: 1100px) 100vw, 1100px" className="jugar__fondo" />
              <div className="jugar__portada">
                <Image src={LOGO_JUEGO[lang].src} alt="" width={LOGO_JUEGO[lang].ancho} height={LOGO_JUEGO[lang].alto} className="jugar__logo" />
                <button type="button" className="boton boton--grande" onClick={empezar}>
                  <IconoPlay />
                  {tactil ? j.tactil.boton : j.boton}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="jugar__notas">
          {(tactil ? j.tactil.notas : j.notas).map((n) => (
            <span key={n}>{n}</span>
          ))}
          {jugando && (
            <button type="button" className="boton-texto" onPointerDown={() => (sinPausa.current = true)} onClick={pantallaCompleta}>
              <IconoPantallaCompleta />
              {j.pantallaCompleta}
            </button>
          )}
        </div>
      </div>
      {jugandoTactil && <JuegoTactil t={j} lang={lang} onSalir={salirTactil} />}
    </section>
  );
}
