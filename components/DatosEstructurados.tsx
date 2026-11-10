// La "ficha invisible" para Google (datos estructurados en formato JSON-LD):
// le cuenta qué es cada página con el vocabulario de schema.org. No se ve en la página.

export default function DatosEstructurados({ datos }: { datos: object }) {
  return (
    <script
      type="application/ld+json"
      // Se cambia "<" por su código para que el texto nunca pueda cerrar la etiqueta <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos).replace(/</g, '\\u003c') }}
    />
  );
}
