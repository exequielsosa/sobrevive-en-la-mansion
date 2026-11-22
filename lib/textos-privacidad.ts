// La política de privacidad (/es/privacidad y /en/privacidad). Google Play la pide para publicar la app.
// Qué es cierto hoy (revisado el 2026-11-22):
// - el juego guarda el progreso solo en el aparato (claves lamansion_ del navegador o de la app);
// - no hay cuentas, publicidad, compras, analíticas, cookies ni servicios de terceros;
// - la app de Android trae el juego adentro y no manda nada; pide vibración e internet.
// Si algo de esto cambia, hay que cambiar este texto y la fecha.

import type { Idioma } from './idiomas';

// Mail de contacto para consultas de privacidad (Google Play exige uno). Lo dio Exequiel el 2026-11-22.
export const CONTACTO_PRIVACIDAD = 'exequielsosa@gmail.com';

type Seccion = { titulo: string; parrafos: string[] };
export type TextosPrivacidad = {
  meta: { titulo: string; descripcion: string };
  etiqueta: string;
  titulo: string;
  alcance: string;
  fecha: string;
  secciones: Seccion[];
  contacto: string;
  contactoPendiente: string;
  volver: string;
};

export const textosPrivacidad: Record<Idioma, TextosPrivacidad> = {
  es: {
    meta: {
      titulo: 'Política de privacidad — Sobrevive en la mansión',
      descripcion: 'Qué datos usa Sobrevive en la mansión, en la web y en la app de Android: ninguno personal.',
    },
    etiqueta: 'Emi Studio',
    titulo: 'Política de privacidad',
    alcance: 'Sobrevive en la mansión — Capítulo 1, en la web (emistudio.com.ar) y en la app de Android.',
    fecha: 'Última actualización: 22 de noviembre de 2026.',
    secciones: [
      {
        titulo: 'En pocas palabras',
        parrafos: [
          'El juego no pide ni junta datos personales. No hay cuentas, publicidad, compras, analíticas ni servicios de otras empresas dentro del juego.',
        ],
      },
      {
        titulo: 'Qué se guarda y dónde',
        parrafos: [
          'El progreso (logros, mejores tiempos, historietas vistas, volumen de la música y de los efectos y si ya se vio el tutorial) se guarda solo en tu aparato, en el navegador o en la app. No se manda a ningún lado.',
          'Se borra si borrás los datos del navegador o desinstalás la app.',
        ],
      },
      {
        titulo: 'La app de Android',
        parrafos: [
          'La app trae el juego adentro, funciona sin internet y no envía información.',
          'Pide dos permisos: vibración, para que el celular vibre con algunos golpes, e internet, que lo necesita la tecnología con la que está hecha la app. El juego no se conecta a internet.',
        ],
      },
      {
        titulo: 'La web',
        parrafos: [
          'La web no usa cookies ni herramientas de medición. Como pasa con cualquier página, el servicio que la aloja (Vercel) recibe datos técnicos de la conexión, como la dirección IP, para mostrarla y por seguridad.',
        ],
      },
      {
        titulo: 'Chicos',
        parrafos: ['El juego es para todo público, desde los 9 años. Como no junta datos personales, tampoco junta datos de chicos.'],
      },
      {
        titulo: 'Cambios',
        parrafos: ['Si algo cambia, se actualiza esta página y su fecha.'],
      },
    ],
    contacto: 'Consultas sobre privacidad:',
    contactoPendiente: 'pronto vamos a publicar un mail de contacto.',
    volver: 'Volver a Sobrevive en la mansión',
  },
  en: {
    meta: {
      titulo: 'Privacy policy — Survive the Mansion',
      descripcion: 'What data Survive the Mansion uses, on the web and in the Android app: no personal data.',
    },
    etiqueta: 'Emi Studio',
    titulo: 'Privacy policy',
    alcance: 'Survive the Mansion — Chapter 1, on the web (emistudio.com.ar) and in the Android app.',
    fecha: 'Last updated: November 22, 2026.',
    secciones: [
      {
        titulo: 'In short',
        parrafos: ['The game does not ask for or collect personal data. There are no accounts, ads, purchases, analytics or third-party services in the game.'],
      },
      {
        titulo: 'What is saved and where',
        parrafos: [
          'Your progress (achievements, best times, comics already watched, music and sound volume, and whether you have seen the tutorial) is saved only on your device, in the browser or in the app. It is never sent anywhere.',
          'It is deleted if you clear your browser data or uninstall the app.',
        ],
      },
      {
        titulo: 'The Android app',
        parrafos: [
          'The app includes the whole game, works offline and does not send any information.',
          'It asks for two permissions: vibration, so the phone vibrates on some hits, and internet, which the technology the app is built with requires. The game does not connect to the internet.',
        ],
      },
      {
        titulo: 'The website',
        parrafos: [
          'The website does not use cookies or analytics tools. As with any website, the hosting service (Vercel) receives technical connection data, such as your IP address, to serve the page and for security.',
        ],
      },
      {
        titulo: 'Children',
        parrafos: ['The game is for everyone aged 9 and up. Since it does not collect personal data, it does not collect data from children either.'],
      },
      {
        titulo: 'Changes',
        parrafos: ['If anything changes, this page and its date will be updated.'],
      },
    ],
    contacto: 'Privacy questions:',
    contactoPendiente: 'a contact email will be published soon.',
    volver: 'Back to Survive the Mansion',
  },
};
