// La página que va adentro de la app de Android: la misma pantalla de /jugar (SoloJuego),
// pero sin service worker (la app ya trae todo adentro).
// Idioma (decisión de Exequiel, 2026-11-22): castellano si el teléfono está en castellano; si no, inglés.

import { createRoot } from 'react-dom/client';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/im-fell-english/400.css';
import '@/app/globals.css';
import SoloJuego from '@/components/mansion/SoloJuego';
import { textos } from '@/lib/textos-mansion';
import type { Idioma } from '@/lib/idiomas';

const lang: Idioma = (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
document.documentElement.lang = lang;
document.title = textos[lang].meta.titulo;

const raiz = document.getElementById('raiz');
if (raiz) createRoot(raiz).render(<SoloJuego t={textos[lang].jugar} lang={lang} />);
