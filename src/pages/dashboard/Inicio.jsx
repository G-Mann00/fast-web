import DocumentTitle from "../../components/DocumentTitle";

const Inicio = () => {
  DocumentTitle("FAST - Inicio");
  return (
    <div>

    {/* Encabezado de la pagina */}
    <div className="flex flex-col">
      <h2 className="text-2xl pb-3 text-FAST-Text font-bold">Inicio</h2>
      <p className="text-FAST-Text text-xl">Aquí puedes ver tus datos generales</p>
    </div>

  </div>
  )
}

export default Inicio
