// Todos los textos de la página, en español y en inglés.
// Para cambiar una frase, se cambia acá; los componentes solo la muestran.

export const idiomas = ['es', 'en'] as const;
export type Idioma = (typeof idiomas)[number];

export function esIdioma(valor: string): valor is Idioma {
  return (idiomas as readonly string[]).includes(valor);
}

export type IdEnemigo = 'cabeza' | 'cuatro' | 'barrada';
export type IdJefe = 'sombra' | 'stalker' | 'psicopata';

type Ficha = { etiqueta: string; nombre: string; texto: string; datos: string; alt: string };
type FichaJefe = Ficha & { piso: string; ataque: string };

export type Textos = {
  meta: { titulo: string; descripcion: string };
  nav: { aria: string; historia: string; personajes: string; como: string; creditos: string; jugar: string; idioma: string };
  portada: { aria: string; logoAlt: string; fondoAlt: string; bajada: string; jugar: string; personajes: string; datos: string };
  historia: {
    etiqueta: string;
    titulo: string;
    parrafos: string[];
    caminoAria: string;
    pisos: { numero: string; nombre: string; detalle: string; llaveAlt: string }[];
    puerta: { nombre: string; detalle: string; alt: string };
    capturas: { alt: string; pie: string }[];
  };
  personajes: {
    etiqueta: string;
    titulo: string;
    jonathan: {
      rol: string;
      texto: string;
      alt: string;
      datos: string[];
      equipoAria: string;
      equipo: { nombre: string; texto: string }[];
    };
    enemigosTitulo: string;
    enemigos: Record<IdEnemigo, Ficha>;
  };
  jefes: { titulo: string; vida: string; lista: Record<IdJefe, FichaJefe> };
  como: {
    etiqueta: string;
    titulo: string;
    teclas: { teclas: string[]; accion: string }[];
    consejosAria: string;
    consejos: string[];
  };
  jugar: {
    etiqueta: string;
    titulo: string;
    boton: string;
    iframeTitulo: string;
    pantallaCompleta: string;
    notas: string[];
    celular: string;
  };
  creditos: { etiqueta: string; titulo: string; detalle: string; hecho: string; capitulo: string };
};

export const textos: Record<Idioma, Textos> = {
  es: {
    meta: {
      titulo: 'Sobrevive en la mansión — Capítulo 1',
      descripcion:
        'Jonathan se despierta en una mansión que no conoce. Tres pisos, tres llaves y una sola salida. Un juego de plataformas y terror de Emi, para jugar en el navegador.',
    },
    nav: {
      aria: 'Principal',
      historia: 'Historia',
      personajes: 'Personajes',
      como: 'Cómo se juega',
      creditos: 'Créditos',
      jugar: 'Jugar',
      idioma: 'Idioma',
    },
    portada: {
      aria: 'Portada',
      logoAlt: 'Sobrevive en la mansión — Capítulo 1',
      fondoAlt: 'Jonathan levanta la cruz frente a la puerta abierta de la mansión',
      bajada: 'Te despertaste en una mansión que no conocés. Tres pisos. Tres llaves. Una sola salida.',
      jugar: 'Jugar ahora',
      personajes: 'Conocé a los personajes',
      datos: 'Plataformas 2D · Terror · Un jugador · PC con teclado',
    },
    historia: {
      etiqueta: 'La historia',
      titulo: 'Despertó en un lugar que no conoce. Y quiere volver a casa.',
      parrafos: [
        'Jonathan se despierta en una mansión desconocida. No sabe cómo llegó ni por qué está ahí. Tiene miedo, pero quiere una sola cosa: escapar y volver con su familia.',
        'La mansión no lo va a dejar ir tan fácil. Cada piso guarda una llave, y cada llave está en manos de uno de sus peores miedos. Jonathan empieza en el tercer piso y tiene que bajar hasta la puerta grande, con una cruz para defenderse de cerca, una gomera para pelear de lejos y, en el piso más oscuro, apenas una linterna.',
      ],
      caminoAria: 'El camino de Jonathan',
      pisos: [
        { numero: '3', nombre: 'Piso 3', detalle: 'Lo espera la Sombra', llaveAlt: 'Llave redonda' },
        { numero: '2', nombre: 'Piso 2', detalle: 'Lo espera el Stalker', llaveAlt: 'Llave cuadrada' },
        { numero: '1', nombre: 'Piso 1', detalle: 'A oscuras. Lo espera el Psicópata', llaveAlt: 'Llave triangular' },
      ],
      puerta: { nombre: 'La puerta grande', detalle: 'Tres candados. Tres llaves. La salida.', alt: 'La puerta grande con tres candados' },
      capturas: [
        { alt: 'Captura del piso 3: Jonathan en el pasillo y una Cabeza', pie: 'Piso 3 · El comienzo' },
        { alt: 'Captura del piso 2: una Cabeza, una Barrada y un 444', pie: 'Piso 2 · Más miedos' },
        { alt: 'Captura del piso 1: Jonathan con la linterna frente a una manada de 444', pie: 'Piso 1 · A oscuras' },
      ],
    },
    personajes: {
      etiqueta: 'Personajes',
      titulo: 'Cada enemigo es un miedo.',
      jonathan: {
        rol: 'El protagonista',
        texto: 'Se despertó en la mansión sin saber por qué. Está asustado, pero no se rinde: quiere volver a casa.',
        alt: 'Jonathan levantando la cruz encendida',
        datos: ['5 corazones', '3 vidas', 'Doble salto'],
        equipoAria: 'Equipo de Jonathan',
        equipo: [
          { nombre: 'Cruz', texto: 'Golpe especial de cerca. Quita 5 y tarda 5 segundos en volver.' },
          { nombre: 'Gomera', texto: 'De lejos, también en el aire. Quita 1 y recarga en 1 segundo.' },
          { nombre: 'Linterna', texto: 'En el piso 1, lo único que lo separa de la oscuridad.' },
        ],
      },
      enemigosTitulo: 'Enemigos',
      enemigos: {
        cabeza: {
          etiqueta: 'El engaño',
          nombre: 'Cabeza',
          texto: 'Parece inofensiva. Pero cuando te descuidás, toma envión y te embiste de cabeza.',
          datos: 'Vida 4 · Embestida: 1 corazón',
          alt: 'La Cabeza: un esqueleto de cabeza enorme con ojos en cruz',
        },
        cuatro: {
          etiqueta: 'La muerte',
          nombre: '444',
          texto: 'En chino, el 4 suena igual que "muerte". Lento, resistente y perseverante: nunca deja de avanzar. Y casi nunca viene solo.',
          datos: 'Vida 6 · Viene en manada',
          alt: 'El 444: una criatura encorvada con púas en la espalda',
        },
        barrada: {
          etiqueta: 'La tripofobia',
          nombre: 'Barrada',
          texto: 'El miedo que te barre. Espera quieta, tiembla… y cruza el pasillo de punta a punta, golpeando todo a su paso. Solo se le puede pegar cuando frena.',
          datos: 'Vida 5 · Al tocarte: 1 corazón',
          alt: 'La Barrada: una masa llena de agujeros con ojos',
        },
      },
    },
    jefes: {
      titulo: 'Jefes',
      vida: 'Vida',
      lista: {
        sombra: {
          piso: 'Piso 3 · Jefe',
          etiqueta: 'El miedo a la oscuridad',
          nombre: 'La Sombra',
          texto: 'Lenta y pesada. Cuando te tiene cerca, toma envión y se lanza con todo. Llama a Cabezas y 444 para que la ayuden.',
          datos: '30',
          ataque: 'Embestida: 1,5 corazones',
          alt: 'La Sombra se cierne sobre Jonathan, que levanta la cruz',
        },
        stalker: {
          piso: 'Piso 2 · Jefe',
          etiqueta: 'El miedo a los monstruos',
          nombre: 'El Stalker',
          texto: 'Te sigue a todas partes. Echa el brazo atrás y lanza un golpe que llega lejísimos. Después del golpe queda agotado: ese es tu momento.',
          datos: '50',
          ataque: 'Puñetazo: 1,5 corazones',
          alt: 'El Stalker estira sus brazos larguísimos hacia Jonathan',
        },
        psicopata: {
          piso: 'Piso 1 · Jefe final',
          etiqueta: 'El yo malvado de Jonathan',
          nombre: 'El Psicópata',
          texto: 'Corre detrás tuyo y nada lo frena. Cuando se detiene, lanza tres cuchillos, y solo ahí se le puede pegar. Llama a cualquiera, y a muchos.',
          datos: '70',
          ataque: 'Cada cuchillo: 1 corazón',
          alt: 'El Psicópata, con cara de calabaza, una motosierra y un cuchillo, sobre Jonathan',
        },
      },
    },
    como: {
      etiqueta: 'Cómo se juega',
      titulo: 'Cinco teclas para sobrevivir.',
      teclas: [
        { teclas: ['A', 'D'], accion: 'Caminar' },
        { teclas: ['Espacio'], accion: 'Saltar. Dos veces: doble salto' },
        { teclas: ['J'], accion: 'Cruz, de cerca' },
        { teclas: ['K'], accion: 'Gomera, de lejos' },
        { teclas: ['Esc'], accion: 'Pausa' },
      ],
      consejosAria: 'Consejos',
      consejos: [
        'Vencé al jefe de cada piso para conseguir su llave.',
        'Algunos enemigos dejan corazones. Agarralos.',
        'Con las tres llaves se abre la puerta grande.',
      ],
    },
    jugar: {
      etiqueta: 'Jugar',
      titulo: '¿Te animás a entrar?',
      boton: 'Hacé clic para jugar',
      iframeTitulo: 'Sobrevive en la mansión: el juego',
      pantallaCompleta: 'Pantalla completa',
      notas: ['Se juega en computadora, con teclado', 'Usá auriculares', 'Esc para pausar'],
      celular: 'Este juego necesita teclado. Abrilo en una computadora.',
    },
    creditos: {
      etiqueta: 'Créditos',
      titulo: 'Un juego de Emi',
      detalle: 'Idea, historia, personajes y dirección de arte.',
      hecho: 'Hecho con Construct 2',
      capitulo: 'Capítulo 1 · 2026',
    },
  },

  en: {
    meta: {
      titulo: 'Survive the Mansion — Chapter 1',
      descripcion:
        'Jonathan wakes up in a mansion he has never seen. Three floors, three keys and one way out. A horror platformer by Emi, playable in your browser.',
    },
    nav: {
      aria: 'Main',
      historia: 'Story',
      personajes: 'Characters',
      como: 'How to play',
      creditos: 'Credits',
      jugar: 'Play',
      idioma: 'Language',
    },
    portada: {
      aria: 'Home',
      logoAlt: 'Sobrevive en la mansión (Survive the Mansion) — Chapter 1',
      fondoAlt: 'Jonathan raises the cross in front of the open door of the mansion',
      bajada: 'You wake up in a mansion you have never seen. Three floors. Three keys. One way out.',
      jugar: 'Play now',
      personajes: 'Meet the characters',
      datos: '2D platformer · Horror · Single player · PC with keyboard',
    },
    historia: {
      etiqueta: 'The story',
      titulo: 'He woke up somewhere he does not know. And he wants to go home.',
      parrafos: [
        "Jonathan wakes up in a strange mansion. He doesn't know how he got there or why. He is scared, but he wants only one thing: to escape and get back to his family.",
        "The mansion won't let him go that easily. Every floor hides a key, and every key is guarded by one of his worst fears. Jonathan starts on the third floor and must make his way down to the great door, armed with a cross for close combat, a slingshot to fight from afar and, on the darkest floor, nothing but a flashlight.",
      ],
      caminoAria: "Jonathan's path",
      pisos: [
        { numero: '3', nombre: 'Floor 3', detalle: 'The Shadow is waiting', llaveAlt: 'Round key' },
        { numero: '2', nombre: 'Floor 2', detalle: 'The Stalker is waiting', llaveAlt: 'Square key' },
        { numero: '1', nombre: 'Floor 1', detalle: 'In the dark. The Psycho is waiting', llaveAlt: 'Triangle key' },
      ],
      puerta: { nombre: 'The great door', detalle: 'Three locks. Three keys. The way out.', alt: 'The great door with three padlocks' },
      capturas: [
        { alt: 'Floor 3 screenshot: Jonathan in the hallway and a Head', pie: 'Floor 3 · The beginning' },
        { alt: 'Floor 2 screenshot: a Head, a Barrada and a 444', pie: 'Floor 2 · More fears' },
        { alt: 'Floor 1 screenshot: Jonathan with his flashlight facing a pack of 444s', pie: 'Floor 1 · In the dark' },
      ],
    },
    personajes: {
      etiqueta: 'Characters',
      titulo: 'Every enemy is a fear.',
      jonathan: {
        rol: 'The hero',
        texto: 'He woke up in the mansion with no idea why. He is terrified, but he won’t give up: he wants to go home.',
        alt: 'Jonathan holding up the glowing cross',
        datos: ['5 hearts', '3 lives', 'Double jump'],
        equipoAria: "Jonathan's gear",
        equipo: [
          { nombre: 'Cross', texto: 'A close-range special attack. Deals 5 damage, 5-second cooldown.' },
          { nombre: 'Slingshot', texto: 'Ranged, even mid-air. Deals 1 damage, 1-second reload.' },
          { nombre: 'Flashlight', texto: 'On floor 1, the only thing between him and the dark.' },
        ],
      },
      enemigosTitulo: 'Enemies',
      enemigos: {
        cabeza: {
          etiqueta: 'Deception',
          nombre: 'Head',
          texto: 'It looks harmless. The moment you drop your guard, it charges you head-first.',
          datos: 'Health 4 · Charge: 1 heart',
          alt: 'The Head: a skeleton with a huge skull and crossed-out eyes',
        },
        cuatro: {
          etiqueta: 'Death',
          nombre: '444',
          texto: 'In Chinese, the number 4 sounds just like "death". Slow, tough and relentless, it never stops coming. And it rarely comes alone.',
          datos: 'Health 6 · Hunts in packs',
          alt: 'The 444: a hunched creature with spikes on its back',
        },
        barrada: {
          etiqueta: 'Trypophobia',
          nombre: 'Barrada',
          texto: 'The fear that sweeps you away. It waits, it trembles… then tears across the hallway, hitting everything in its path. You can only hurt it when it stops.',
          datos: 'Health 5 · Touch: 1 heart',
          alt: 'The Barrada: a mass full of holes with eyes',
        },
      },
    },
    jefes: {
      titulo: 'Bosses',
      vida: 'Health',
      lista: {
        sombra: {
          piso: 'Floor 3 · Boss',
          etiqueta: 'Fear of the dark',
          nombre: 'The Shadow',
          texto: 'Slow and heavy. When you get close, it gathers itself and lunges with everything it has. It summons Heads and 444s to its side.',
          datos: '30',
          ataque: 'Lunge: 1.5 hearts',
          alt: 'The Shadow looms over Jonathan, who raises the cross',
        },
        stalker: {
          piso: 'Floor 2 · Boss',
          etiqueta: 'Fear of monsters',
          nombre: 'The Stalker',
          texto: 'It follows you everywhere. It pulls its arm back and throws a punch with terrifying reach. After the blow it is exhausted: that is your chance.',
          datos: '50',
          ataque: 'Punch: 1.5 hearts',
          alt: 'The Stalker reaches for Jonathan with its endless arms',
        },
        psicopata: {
          piso: 'Floor 1 · Final boss',
          etiqueta: "Jonathan's evil self",
          nombre: 'The Psycho',
          texto: 'He runs after you and nothing can stop him. When he finally halts he throws three knives, and only then can he be hurt. He summons anything, and plenty of it.',
          datos: '70',
          ataque: 'Each knife: 1 heart',
          alt: 'The Psycho, with a pumpkin face, a chainsaw and a knife, standing over Jonathan',
        },
      },
    },
    como: {
      etiqueta: 'How to play',
      titulo: 'Five keys to survive.',
      teclas: [
        { teclas: ['A', 'D'], accion: 'Walk' },
        { teclas: ['Space'], accion: 'Jump. Twice: double jump' },
        { teclas: ['J'], accion: 'Cross, close range' },
        { teclas: ['K'], accion: 'Slingshot, ranged' },
        { teclas: ['Esc'], accion: 'Pause' },
      ],
      consejosAria: 'Tips',
      consejos: [
        "Defeat each floor's boss to take its key.",
        'Some enemies drop hearts. Grab them.',
        'Three keys open the great door.',
      ],
    },
    jugar: {
      etiqueta: 'Play',
      titulo: 'Dare to go in?',
      boton: 'Click to play',
      iframeTitulo: 'Survive the Mansion: the game',
      pantallaCompleta: 'Full screen',
      notas: ['Play on a computer with a keyboard', 'Headphones recommended', 'Esc to pause', 'In-game text is in Spanish'],
      celular: 'This game needs a keyboard. Open it on a computer.',
    },
    creditos: {
      etiqueta: 'Credits',
      titulo: 'A game by Emi',
      detalle: 'Concept, story, characters and art direction.',
      hecho: 'Made with Construct 2',
      capitulo: 'Chapter 1 · 2026',
    },
  },
};
