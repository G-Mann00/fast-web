import DocumentTitle from "../../components/DocumentTitle";
import ProductTable from "../../components/ProductTable";

const Productos = () => {
  DocumentTitle("FAST - Productos");
  return (
    <div>

      {/* Encabezado de la pagina */}
      <div className= "flex flex-col">
        <h2 className= "text-2xl pb-3 text-FAST-Text font-bold">Gestion de Productos</h2>
        <p className="text-FAST-Text text-xl">Gestiona el catalogo de productos que ofrece tu Kiosko</p>
      </div>

      {/* Tabla de productos */}
      <div className="px-4 py-5">

      </div>

      <ProductTable />

    </div>
  )
}

export default Productos
