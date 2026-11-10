'use client';

// Barra de arriba. En la compu muestra todos los links; en el celu, el logo, el idioma
// y un botón "menú" que abre los links hacia abajo.

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Idioma } from '@/lib/idiomas';
import type { Textos } from '@/lib/textos-mansion';

export default function Nav({ t, lang }: { t: Textos; lang: Idioma }) {
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  return (
    <header className="nav">
      <nav aria-label={t.nav.aria} className="nav__dentro">
        <a href="#inicio" className="nav__logo" onClick={cerrar}>
          <Image src="/img/logo.png" alt={t.portada.logoAlt} width={87} height={44} priority />
        </a>
        <div id="nav-links" className={abierto ? 'nav__links nav__links--abierto' : 'nav__links'}>
          <a href="#historia" onClick={cerrar}>{t.nav.historia}</a>
          <a href="#personajes" onClick={cerrar}>{t.nav.personajes}</a>
          <a href="#como-se-juega" onClick={cerrar}>{t.nav.como}</a>
          <a href="#creditos" onClick={cerrar}>{t.nav.creditos}</a>
        </div>
        <div className="nav__acciones">
          <div role="group" aria-label={t.nav.idioma} className="idioma">
            <Link href="/es/mansion" aria-current={lang === 'es' ? 'true' : undefined} hrefLang="es">ES</Link>
            <Link href="/en/mansion" aria-current={lang === 'en' ? 'true' : undefined} hrefLang="en">EN</Link>
          </div>
          <a href="#jugar" className="boton boton--chico nav__jugar">{t.nav.jugar}</a>
          <button
            type="button"
            className="nav__menu"
            aria-expanded={abierto}
            aria-controls="nav-links"
            aria-label={t.nav.menu}
            onClick={() => setAbierto(!abierto)}
          >
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {abierto ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 6h16M3 11h16M3 16h16" />}
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
