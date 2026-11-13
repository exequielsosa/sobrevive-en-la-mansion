'use client';

// El juego en el celular. Ocupa toda la pantalla: el juego en el medio y los botones en las
// franjas de los costados, para que no tapen nada.
//
// Los botones no están adentro del juego: cada uno le "aprieta una tecla" al juego (la misma que
// en la compu), mandándole un evento de teclado al iframe. Por eso el juego no necesita reglas
// nuevas para jugar en el celular. El juego se abre con ?tactil=1 para que cambie los textos que
// hablan de teclas (eso lo hace el juego desde la versión 21).
//
// Para saber en qué pantalla está el juego (y si está en pausa) la página le pregunta al motor de
// Construct 2 (cr_getC2Runtime). Los botones de caminar, saltar y pegar solo aparecen en los pisos;
// en la pausa aparecen SEGUIR y MENÚ encima del juego. Mientras se ve una historieta (desde la
// versión 22: variable escena > 0) no hay botones: se pasa de viñeta tocando el juego.

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as EventoPuntero } from 'react';
import type { Textos } from '@/lib/textos-mansion';

type Tecla = 'izquierda' | 'derecha' | 'saltar' | 'cruz' | 'gomera' | 'pausa' | 'menu';

// keyCode es lo que lee el teclado de Construct 2 (A = 65, D = 68, Espacio = 32, J = 74, K = 75, Esc = 27, M = 77).
const TECLAS: Record<Tecla, { keyCode: number; key: string; code: string }> = {
  izquierda: { keyCode: 65, key: 'a', code: 'KeyA' },
  derecha: { keyCode: 68, key: 'd', code: 'KeyD' },
  saltar: { keyCode: 32, key: ' ', code: 'Space' },
  cruz: { keyCode: 74, key: 'j', code: 'KeyJ' },
  gomera: { keyCode: 75, key: 'k', code: 'KeyK' },
  pausa: { keyCode: 27, key: 'Escape', code: 'Escape' },
  menu: { keyCode: 77, key: 'm', code: 'KeyM' },
};

type VentanaJuego = Window & typeof globalThis & { cr_getC2Runtime?: () => unknown };
type Motor = { running_layout?: { name?: unknown } | null; all_global_vars?: { name: string; data: unknown }[] };

// "cargando": el juego todavía no arrancó. "leido": sabemos la pantalla y la pausa.
// "desconocido": el motor existe pero no se puede leer (por ejemplo, si se exportó minificado):
// entonces los botones se muestran siempre y la pausa la lleva la página.
type Estado = { modo: 'cargando' | 'leido' | 'desconocido'; enPiso: boolean; pausa: boolean; historieta: boolean };

function leerJuego(w: VentanaJuego | null | undefined): Estado {
  try {
    const motor = w?.cr_getC2Runtime?.() as Motor | undefined;
    if (!motor) return { modo: 'cargando', enPiso: false, pausa: false, historieta: false };
    if (!('running_layout' in motor)) return { modo: 'desconocido', enPiso: true, pausa: false, historieta: false };
    const pantalla = motor.running_layout?.name;
    if (typeof pantalla !== 'string') return { modo: 'cargando', enPiso: false, pausa: false, historieta: false };
    const enPiso = pantalla.startsWith('Piso');
    const variable = (nombre: string) => motor.all_global_vars?.find((v) => v.name === nombre)?.data;
    const pausa = enPiso && variable('pausa') === 1;
    const historieta = enPiso && Number(variable('escena')) > 0;
    return { modo: 'leido', enPiso, pausa, historieta };
  } catch {
    return { modo: 'cargando', enPiso: false, pausa: false, historieta: false };
  }
}

// Pantalla completa y celular acostado (en Android; el iPhone no deja, ahí avisa "Girá el celular").
// Se llama desde el toque en "Tocá para jugar", porque el navegador solo lo permite después de un toque.
export function abrirPantallaCompleta() {
  try {
    const pedido = document.documentElement.requestFullscreen?.({ navigationUI: 'hide' });
    pedido
      ?.then(() => (screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> }).lock?.('landscape'))
      .catch(() => {});
  } catch {
    // sin pantalla completa: el juego igual ocupa toda la ventana
  }
}

export function cerrarPantallaCompleta() {
  try {
    screen.orientation?.unlock?.();
  } catch {}
  if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
}

export default function JuegoTactil({ t, onSalir }: { t: Textos['jugar']; onSalir: () => void }) {
  const b = t.tactil;
  const juego = useRef<HTMLIFrameElement>(null);
  const [estado, setEstado] = useState<Estado>({ modo: 'cargando', enPiso: false, pausa: false, historieta: false });
  const estadoActual = useRef(estado);
  const pausaPropia = useRef(false); // solo se usa en el modo "desconocido"
  const dedos = useRef(new Map<number, Tecla | null>()); // cada dedo apoyado y el botón que tiene abajo
  const apretadas = useRef(new Set<Tecla>());
  const [marcadas, setMarcadas] = useState<Tecla[]>([]);
  const salirActual = useRef(onSalir);
  salirActual.current = onSalir;

  // ---------- teclas para el juego
  const mandar = useCallback((tipo: 'keydown' | 'keyup', tecla: Tecla) => {
    const w = juego.current?.contentWindow as VentanaJuego | null;
    if (!w) return;
    const { keyCode, key, code } = TECLAS[tecla];
    const evento = new w.KeyboardEvent(tipo, { key, code, bubbles: true, cancelable: true });
    // Construct 2 lee "which" / "keyCode", que los eventos creados a mano traen en 0.
    Object.defineProperty(evento, 'keyCode', { get: () => keyCode });
    Object.defineProperty(evento, 'which', { get: () => keyCode });
    w.document.dispatchEvent(evento);
  }, []);

  const tocar = useCallback(
    (tecla: Tecla) => {
      mandar('keydown', tecla);
      mandar('keyup', tecla);
    },
    [mandar],
  );

  const actualizarApretadas = useCallback(() => {
    const ahora = new Set<Tecla>();
    dedos.current.forEach((tecla) => tecla && ahora.add(tecla));
    apretadas.current.forEach((tecla) => !ahora.has(tecla) && mandar('keyup', tecla));
    ahora.forEach((tecla) => !apretadas.current.has(tecla) && mandar('keydown', tecla));
    apretadas.current = ahora;
    setMarcadas([...ahora]);
  }, [mandar]);

  const soltarTodo = useCallback(() => {
    dedos.current.clear();
    actualizarApretadas();
  }, [actualizarApretadas]);

  // ---------- qué está pasando en el juego
  useEffect(() => {
    const id = window.setInterval(() => {
      const leido = leerJuego(juego.current?.contentWindow as VentanaJuego | null);
      const nuevo = leido.modo === 'desconocido' ? { ...leido, pausa: pausaPropia.current } : leido;
      const viejo = estadoActual.current;
      if (viejo.modo !== nuevo.modo || viejo.enPiso !== nuevo.enPiso || viejo.pausa !== nuevo.pausa || viejo.historieta !== nuevo.historieta) {
        estadoActual.current = nuevo;
        setEstado(nuevo);
      }
    }, 120);
    return () => window.clearInterval(id);
  }, []);

  const conBotones = estado.enPiso && !estado.pausa && !estado.historieta;
  // Si los botones se esconden (pausa, historieta, menú, muerte), se sueltan todas las teclas.
  useEffect(() => {
    if (!conBotones) soltarTodo();
  }, [conBotones, soltarTodo]);

  const pausar = useCallback(() => {
    const e = estadoActual.current;
    if (!e.enPiso || e.pausa || e.historieta) return;
    soltarTodo();
    pausaPropia.current = true;
    tocar('pausa');
  }, [soltarTodo, tocar]);

  function seguir() {
    pausaPropia.current = false;
    tocar('pausa');
  }

  function irAlMenu() {
    pausaPropia.current = false;
    tocar('menu');
  }

  // Si gira el celular a vertical o se va a otra app -> pausa sola.
  useEffect(() => {
    const vertical = window.matchMedia('(orientation: portrait)');
    const alGirar = () => vertical.matches && pausar();
    const alOcultar = () => document.hidden && pausar();
    vertical.addEventListener('change', alGirar);
    document.addEventListener('visibilitychange', alOcultar);
    return () => {
      vertical.removeEventListener('change', alGirar);
      document.removeEventListener('visibilitychange', alOcultar);
    };
  }, [pausar]);

  // La página no se mueve mientras se juega.
  useEffect(() => {
    document.documentElement.classList.add('con-juego');
    return () => document.documentElement.classList.remove('con-juego');
  }, []);

  // El botón "atrás" del celular cierra el juego en vez de irse de la página.
  const atrasAgregado = useRef(false);
  useEffect(() => {
    if (!atrasAgregado.current) {
      window.history.pushState({ ...window.history.state, juego: true }, '');
      atrasAgregado.current = true;
    }
    const alVolver = () => salirActual.current();
    window.addEventListener('popstate', alVolver);
    return () => window.removeEventListener('popstate', alVolver);
  }, []);

  // Construct 2 cancela los toques sobre el juego, así que los botones del menú (JUGAR, VOLVER...)
  // no reciben el clic. Cuando se toca el juego, la página le manda un clic de mouse en ese lugar.
  function alCargar() {
    const w = juego.current?.contentWindow as VentanaJuego | null;
    const doc = w?.document;
    if (!w || !doc) return;
    const raton = (tipo: string, x: number, y: number, botones: number) => {
      const destino = doc.elementFromPoint(x, y) ?? doc.body;
      destino.dispatchEvent(new w.MouseEvent(tipo, { clientX: x, clientY: y, button: 0, buttons: botones, bubbles: true, cancelable: true, view: w }));
    };
    doc.addEventListener(
      'pointerdown',
      (e) => {
        if (e.pointerType === 'mouse') return;
        raton('mousemove', e.clientX, e.clientY, 0);
        raton('mousedown', e.clientX, e.clientY, 1);
      },
      true,
    );
    const levantar = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      raton('mouseup', e.clientX, e.clientY, 0);
      raton('mousemove', -1000, -1000, 0); // que no quede un botón "con el mouse encima"
    };
    doc.addEventListener('pointerup', levantar, true);
    doc.addEventListener('pointercancel', levantar, true);
  }

  // ---------- los dedos sobre los botones de los costados
  // Se puede deslizar el dedo de un botón a otro (por ejemplo, de la flecha izquierda a la derecha).
  // Cada botón agarra unos píxeles de más alrededor, para que sea fácil acertarle con el dedo.
  const raiz = useRef<HTMLDivElement>(null);
  function teclaEn(x: number, y: number): Tecla | null {
    const margen = 8;
    for (const el of raiz.current?.querySelectorAll<HTMLElement>('[data-tecla]') ?? []) {
      const r = el.getBoundingClientRect();
      if (r.width && x >= r.left - margen && x <= r.right + margen && y >= r.top - margen && y <= r.bottom + margen) {
        return el.dataset.tecla as Tecla;
      }
    }
    return null;
  }
  function alApoyar(e: EventoPuntero) {
    if (raiz.current?.classList.contains('tactil--quieto')) return; // botones escondidos
    const tecla = teclaEn(e.clientX, e.clientY);
    if (!tecla) return;
    e.preventDefault();
    dedos.current.set(e.pointerId, tecla);
    actualizarApretadas();
  }
  function alMover(e: EventoPuntero) {
    if (!dedos.current.has(e.pointerId)) return;
    const tecla = teclaEn(e.clientX, e.clientY);
    if (dedos.current.get(e.pointerId) === tecla) return;
    dedos.current.set(e.pointerId, tecla);
    actualizarApretadas();
  }
  function alLevantar(e: EventoPuntero) {
    if (!dedos.current.delete(e.pointerId)) return;
    actualizarApretadas();
  }

  const clase = (tecla: Tecla, extra = '') =>
    `tactil__boton${extra}${marcadas.includes(tecla) ? ' tactil__boton--apretado' : ''}`;
  const verSalir = !estado.enPiso || estado.pausa;

  return (
    <div
      ref={raiz}
      className={conBotones ? 'tactil' : 'tactil tactil--quieto'}
      onPointerDown={alApoyar}
      onPointerMove={alMover}
      onPointerUp={alLevantar}
      onPointerCancel={alLevantar}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="tactil__columna">
        <div className="tactil__arriba">
          {verSalir && (
            <button type="button" className="tactil__boton tactil__boton--chico" aria-label={b.salir} onClick={() => window.history.back()}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          )}
        </div>
        <div className="tactil__fila tactil__mando">
          <button type="button" className={clase('izquierda')} data-tecla="izquierda" aria-label={b.izquierda}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className={clase('derecha')} data-tecla="derecha" aria-label={b.derecha}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="tactil__centro">
        <div className="tactil__pantalla">
          <iframe
            ref={juego}
            src="/juego/index.html?tactil=1"
            title={t.iframeTitulo}
            allow="autoplay; fullscreen"
            onLoad={alCargar}
            className="tactil__juego"
          />
          {estado.pausa && (
            <div className="tactil__pausa">
              <button type="button" className="tactil__piedra" onClick={seguir}>{b.seguir}</button>
              <button type="button" className="tactil__piedra" onClick={irAlMenu}>{b.menu}</button>
            </div>
          )}
        </div>
      </div>

      <div className="tactil__columna">
        <div className="tactil__arriba">
          {conBotones && (
            <button type="button" className="tactil__boton tactil__boton--chico" aria-label={b.pausa} onClick={pausar}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M9 5v14M15 5v14" />
              </svg>
            </button>
          )}
        </div>
        <div className="tactil__acciones tactil__mando">
          <div className="tactil__fila">
            <button type="button" className={clase('cruz')} data-tecla="cruz" aria-label={b.cruz}>
              <img src="/img/boton_cruz.png" alt="" width={48} height={48} draggable={false} />
            </button>
            <button type="button" className={clase('gomera')} data-tecla="gomera" aria-label={b.gomera}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-9M12 13L6 3M12 13l6-10M6 3q6 6 12 0" />
              </svg>
            </button>
          </div>
          <button type="button" className={clase('saltar', ' tactil__boton--grande')} data-tecla="saltar" aria-label={b.saltar}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20V5M6 11l6-6 6 6" />
            </svg>
            <span aria-hidden="true">{b.saltar}</span>
          </button>
        </div>
      </div>

      <div className="tactil__girar">
        <svg aria-hidden="true" width="120" height="120" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="22" y="8" width="20" height="34" rx="3" />
          <path d="M29 37h6" />
          <rect x="12" y="44" width="40" height="14" rx="3" strokeDasharray="3 3" />
          <path d="M48 20c6 5 7 13 3 19" />
          <path d="M47 35l4 4 4-4" />
        </svg>
        <h2>{b.girarTitulo}</h2>
        <p>{b.girarTexto}</p>
        <p className="tactil__girar-detalle">{b.girarDetalle}</p>
        <button type="button" className="boton-texto" onClick={() => window.history.back()}>{b.salir}</button>
      </div>
    </div>
  );
}
