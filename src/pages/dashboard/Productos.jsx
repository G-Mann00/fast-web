import DocumentTitle from "../../components/DocumentTitle";
import ProductTable from "../../components/ProductTable";
import { cargarProductos, mapearProductos } from "../../services/database/index";
import { useKiosk } from '../../hooks/kiosko';
import { useEffect, useCallback, useState } from 'react';




const Productos = () => {
  DocumentTitle("FAST - Productos");
  const { kiosko } = useKiosk();
  const [productosArray, setProductosArray] = useState([]);
  //

  const manejarCargaProductos = useCallback(async () => {
    console.log('Objeto kiosko en productos:', kiosko.id);
    const productos = await cargarProductos(kiosko.id);
    const productosMapeados = await mapearProductos(productos);
    setProductosArray(productosMapeados);
  }, [kiosko]);

  // useEffect para mostrar el objeto kiosko en consola
  useEffect(() => {
    if (kiosko) {
      manejarCargaProductos();
    }
  }, [kiosko, manejarCargaProductos]);

  return (
    <div>

      {/* Encabezado de la pagina */}
      <div className="flex flex-col">
        <h2 className="text-2xl pb-3 text-FAST-Text font-bold">Gestión de Productos</h2>
        <p className="text-FAST-Text text-xl">Gestiona el catálogo de productos que ofrece tu Kiosko</p>
      </div>

      {/* Tabla de productos */}
      <div className="px-4 py-5">
        <ProductTable tableRows={productosArray} />
      </div>
      
    </div>
  )
}

export default Productos
