import Image from 'next/image';
import type { Textos } from '@/lib/textos';
import { IconoPlay } from './Iconos';

export default function Portada({ t }: { t: Textos }) {
  return (
    <section id="inicio" aria-label={t.portada.aria} className="portada">
      <Image src="/img/hero_puerta.jpg" alt={t.portada.fondoAlt} fill priority sizes="100vw" className="portada__fondo" />
      <div aria-hidden="true" className="portada__sombra" />
      <div className="contenedor portada__contenido">
        <Image src="/img/logo.png" alt={t.portada.logoAlt} width={705} height={358} priority className="portada__logo" />
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
