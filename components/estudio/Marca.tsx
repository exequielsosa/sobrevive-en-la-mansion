// El nombre del estudio escrito con letras: "EMI" gruesa y "GAMES" finita y separada.
// Se usa chico en la barra y gigante en el pie. (Si Emi dibuja un logo, se cambia acá.)

export default function Marca({ gigante = false }: { gigante?: boolean }) {
  return (
    <span className={gigante ? 'marca marca--gigante' : 'marca'}>
      <span className="marca__emi">EMI</span>
      <span className="marca__games">GAMES</span>
    </span>
  );
}
