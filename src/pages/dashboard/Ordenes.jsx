import DocumentTitle from "../../components/DocumentTitle";

const Ordenes = () => {
  DocumentTitle("FAST - Ordenes");
  return (
    <div>

      {/* Encabezado de la pagina */}
      <div className="flex flex-col">
        <h2 className="text-2xl pb-3 text-FAST-Text font-bold">Gestión de Órdenes</h2>
        <p className="text-FAST-Text text-xl">Gestiona los pedidos que llegan a tu Kiosco</p>
      </div>

    </div>
  )
}

export default Ordenes
