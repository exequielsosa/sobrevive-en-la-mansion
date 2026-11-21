// El logo de Emi Studio, dibujado por Emi: el horizontal (chico) en la barra y el vertical (grande) en el pie.
// No lleva texto alternativo: en la barra el link ya dice "Emi Studio, inicio" y en el pie es solo para ver.

import Image from 'next/image';
import { LOGO_ESTUDIO } from '@/lib/logos';

export default function Marca({ gigante = false }: { gigante?: boolean }) {
  const logo = gigante ? LOGO_ESTUDIO.vertical : LOGO_ESTUDIO.horizontal;
  return (
    <Image
      src={logo.src}
      alt=""
      width={logo.ancho}
      height={logo.alto}
      priority={!gigante}
      sizes={gigante ? '(max-width: 600px) 70vw, 360px' : '220px'}
      className={gigante ? 'marca marca--gigante' : 'marca'}
    />
  );
}
