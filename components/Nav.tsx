import Image from 'next/image';
import Link from 'next/link';
import type { Idioma, Textos } from '@/lib/textos';

export default function Nav({ t, lang }: { t: Textos; lang: Idioma }) {
  return (
    <header className="nav">
      <nav aria-label={t.nav.aria} className="nav__dentro">
        <a href="#inicio" className="nav__logo">
          <Image src="/img/logo.png" alt={t.portada.logoAlt} width={87} height={44} priority />
        </a>
        <div className="nav__links">
          <a href="#historia">{t.nav.historia}</a>
          <a href="#personajes">{t.nav.personajes}</a>
          <a href="#como-se-juega">{t.nav.como}</a>
          <a href="#creditos">{t.nav.creditos}</a>
        </div>
        <div className="nav__acciones">
          <div role="group" aria-label={t.nav.idioma} className="idioma">
            <Link href="/es" aria-current={lang === 'es' ? 'true' : undefined} hrefLang="es">ES</Link>
            <Link href="/en" aria-current={lang === 'en' ? 'true' : undefined} hrefLang="en">EN</Link>
          </div>
          <a href="#jugar" className="boton boton--chico">{t.nav.jugar}</a>
        </div>
      </nav>
    </header>
  );
}
