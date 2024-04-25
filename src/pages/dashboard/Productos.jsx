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
  const [createOpen, setCreateOpen] = useState(false); // Mostrar modal para crear producto
  const [deleteOpen, setDeleteOpen] = useState(false); // Mostrar modal para eliminar producto

  const modalStates = {
    createOpen,
    deleteOpen,
  };

  const handleModalOpen = (modalType) => {
    if (modalType === 'create') {
      setCreateOpen(!createOpen);
      manejarCargaProductos();
    } else if (modalType === 'delete') {
      setDeleteOpen(!deleteOpen);
      manejarCargaProductos();
    } else if (modalType === 'openCreate') {
      setCreateOpen(!createOpen);
    } else if (modalType === 'openDelete') {
      setDeleteOpen(!deleteOpen);
    } else if (modalType === 'canceledCreate') {
      setCreateOpen(false);
    } else if (modalType === 'canceledDelete') {
      setDeleteOpen(false);
    }
  };


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
        <ProductTable tableRows={productosArray} handleModalOpen={handleModalOpen} modalStates={modalStates} />
      </div>

    </div>
  )
}

export default Productos
