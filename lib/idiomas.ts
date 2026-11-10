// Los idiomas del sitio. Toda página vive en /es/... y en /en/...

export const idiomas = ['es', 'en'] as const;
export type Idioma = (typeof idiomas)[number];

export function esIdioma(valor: string): valor is Idioma {
  return (idiomas as readonly string[]).includes(valor);
}
