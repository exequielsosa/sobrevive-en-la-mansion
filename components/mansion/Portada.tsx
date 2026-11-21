import Image from 'next/image';
import type { Idioma } from '@/lib/idiomas';
import type { Textos } from '@/lib/textos-mansion';
import { LOGO_JUEGO } from '@/lib/logos';
import { IconoPlay } from '../Iconos';

export default function Portada({ t, lang }: { t: Textos; lang: Idioma }) {
  const logo = LOGO_JUEGO[lang];
  return (
    <section id="inicio" aria-label={t.portada.aria} className="portada">
      <Image src="/img/hero_puerta.jpg" alt={t.portada.fondoAlt} fill priority sizes="100vw" className="portada__fondo" />
      <div aria-hidden="true" className="portada__sombra" />
      <div className="contenedor portada__contenido">
        <h1 className="portada__titulo">
          <Image src={logo.src} alt={t.portada.logoAlt} width={logo.ancho} height={logo.alto} priority className="portada__logo" />
        </h1>
        <p className="portada__bajada">{t.portada.bajada}</p>
        <div className="botones">
          <a href="#jugar" className="boton">
            <IconoPlay />
            {t.portada.jugar}
          </a>
          <a href="#personajes" className="boton boton--borde">{t.portada.personajes}</a>
        </div>
        <p className="portada__datos">{t.portada.datos}</p>
      </div>
    </section>
  );
}
