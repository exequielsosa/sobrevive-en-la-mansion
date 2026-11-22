'use client';

// El juego solo, a pantalla completa: es la página /es/jugar y /en/jugar, la que abre la app instalada
// (y la que va adentro de la app de Android). No tiene barra ni links a otras páginas.
//
// - Primero muestra una portada con "Tocá para jugar" / "Hacé clic para jugar": hace falta un toque o
//   un clic para que el navegador deje sonar el audio y pasar a pantalla completa.
// - En el celular usa JuegoTactil, el mismo de la página de la mansión (botones a los costados).
// - En la compu el juego ocupa toda la ventana y se juega con el teclado; si la ventana pierde el foco,
//   el juego queda en pausa (igual que en la página de la mansión).
// - Si se le pasa conServiceWorker, registra /jugar-sw.js para que la página abra sin internet
//   (el juego lo guarda aparte el service worker de Construct 2, en /juego/).

import { useEffect, useRef, useState } from 'react';
import type { Textos } from '@/lib/textos-mansion';
import type { Idioma } from '@/lib/idiomas';
import { LOGO_JUEGO } from '@/lib/logos';
import { captura } from '@/lib/capturas';
import { IconoPlay } from '../Iconos';
import JuegoTactil, { abrirPantallaCompleta, cerrarPantallaCompleta, direccionJuego, pausarSiJuega } from './JuegoTactil';
import type { VentanaJuego } from './JuegoTactil';

type Modo = 'portada' | 'compu' | 'tactil';

export default function SoloJuego({ t, lang, conServiceWorker = false }: { t: Textos['jugar']; lang: Idioma; conServiceWorker?: boolean }) {
  const [modo, setModo] = useState<Modo>('portada');
  const [tactil, setTactil] = useState<boolean | null>(null); // null: todavía no se sabe
  const juego = useRef<HTMLIFrameElement>(null);

  // Celulares y tablets: pantalla táctil, sin mouse.
  useEffect(() => {
    setTactil(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (conServiceWorker) registrarServiceWorker(lang);
  }, [conServiceWorker, lang]);

  function empezar() {
    if (tactil) {
      abrirPantallaCompleta();
      setModo('tactil');
    } else {
      setModo('compu');
    }
  }

  function salirTactil() {
    cerrarPantallaCompleta();
    setModo('portada');
  }

  // En la compu: foco al juego para que reciba el teclado, y pausa si después lo pierde.
  function alCargar() {
    const w = juego.current?.contentWindow as VentanaJuego | null;
    juego.current?.focus();
    w?.focus();
    w?.addEventListener('blur', () => pausarSiJuega(w));
  }

  if (modo === 'tactil') return <JuegoTactil t={t} lang={lang} onSalir={salirTactil} />;

  if (modo === 'compu') {
    return (
      <div className="solo">
        <iframe ref={juego} src={direccionJuego(lang, false)} title={t.iframeTitulo} allow="autoplay; fullscreen" allowFullScreen onLoad={alCargar} className="solo__juego" />
      </div>
    );
  }

  const logo = LOGO_JUEGO[lang];
  return (
    <div className="solo">
      <img src={captura(lang, 3)} alt="" className="solo__fondo" />
      <div className="solo__portada">
        <img src={logo.src} alt={t.iframeTitulo} width={logo.ancho} height={logo.alto} className="solo__logo" />
        {tactil !== null && (
          <>
            <button type="button" className="boton boton--grande" onClick={empezar}>
              <IconoPlay />
              {tactil ? t.tactil.boton : t.boton}
            </button>
            <p className="solo__notas">
              {(tactil ? t.tactil.notas : t.notas).map((n) => (
                <span key={n}>{n}</span>
              ))}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// El service worker guarda la página para abrir sin internet. Como se registra después de que la página
// cargó, la página le pasa la lista de lo que ya bajó, así queda todo guardado desde la primera visita.
function registrarServiceWorker(lang: Idioma) {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker
    .register('/jugar-sw.js', { scope: `/${lang}/jugar` })
    .then(() => navigator.serviceWorker.ready)
    .then((registro) => {
      const urls = new Set<string>([location.pathname]);
      for (const e of performance.getEntriesByType('resource')) {
        const u = new URL(e.name);
        if (u.origin === location.origin && !u.pathname.startsWith('/juego/') && u.pathname !== '/jugar-sw.js') urls.add(u.pathname + u.search);
      }
      document.querySelectorAll<HTMLLinkElement>('link[rel="manifest"], link[rel="apple-touch-icon"]').forEach((l) => urls.add(new URL(l.href).pathname));
      registro.active?.postMessage({ tipo: 'guardar', urls: [...urls] });
    })
    .catch(() => {});
}
