import DocumentTitle from "../../components/DocumentTitle";

const Productos = () => {
  DocumentTitle("FAST - Productos");
  return (
    <div>

      {/* Encabezado de la pagina */}
      <div className= "flex flex-col">
        <p2 className= "text-3xl pb-3 text-FAST-Text font-bold">Gestion de Productos</p2>
        <p className="text-FAST-Text text-xl">Gestiona el catalogo de productos que ofrece tu Kiosko</p>
      </div>

    </div>
  )
}

export default Productos
