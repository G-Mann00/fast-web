import DocumentTitle from "../../components/DocumentTitle";
import { ProductTable, SpinnerFAST } from "../../components/index"
import { cargarProductosYmapear } from "../../services/database/index";
import { useKiosk } from '../../hooks/kiosko';
import { useEffect, useCallback, useState } from 'react';

const Productos = () => {
  DocumentTitle("FAST - Productos");
  const { kiosko } = useKiosk();
  const [productosArray, setProductosArray] = useState([]);
  //Estados para manejat los modales
  const [createOpen, setCreateOpen] = useState(false); // Mostrar modal para crear producto
  const [deleteOpen, setDeleteOpen] = useState(false); // Mostrar modal para eliminar producto
  const [editOpen, setEditOpen] = useState(false); // Mostrar modal para editar producto
  //Estado para menejar el Spinner de carga
  const [loadingS, setLoadingS] = useState(true);
  const TABLE_HEAD = ["Producto", "Descripción", "Precio C$", "Categoria", ""]; // Encabezado de la tabla de productos
  const titulos = ["Gestión de productos", "Estos son los productos que tu kiosco ofrece", "Buscar Producto", "Agregar producto"];
  const modalStates = {
    createOpen,
    deleteOpen,
    editOpen,
  };

  const handleModalOpen = (modalType) => {
    if (modalType === 'create') {
      setCreateOpen(!createOpen);
      manejarCargaProductos();
    } else if (modalType === 'delete') {
      setDeleteOpen(!deleteOpen);
      manejarCargaProductos();
    } else if (modalType === 'edit') {
      setEditOpen(!editOpen);
      manejarCargaProductos();
    }
    else if (modalType === 'openCreate') {
      setCreateOpen(!createOpen);
    } else if (modalType === 'openDelete') {
      setDeleteOpen(!deleteOpen);
    } else if (modalType === 'openEdit') {
      setEditOpen(!editOpen);
    }
    else if (modalType === 'canceledCreate') {
      setCreateOpen(false);
    } else if (modalType === 'canceledDelete') {
      setDeleteOpen(false);
    } else if (modalType === 'canceledEdit') {
      setEditOpen(false);
    }
  };

  const manejarCargaProductos = useCallback(async () => {
    const productos = await cargarProductosYmapear(kiosko.id);
    const prods = productos.map(producto => Object.values(producto) );
    setProductosArray(prods);

  }, [kiosko]);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoadingS(true);

      await manejarCargaProductos();
      setLoadingS(false);
    };

    
    if (kiosko) {
      fetchProductos();
    }

  }, [kiosko, manejarCargaProductos]);


  return (
    <div>
      {/* Tabla de productos */}
      <div className="px-4 py-5">
        <div style={{ position: 'relative' }}>
          <ProductTable 
          tableRows={productosArray} 
          handleModalOpen={handleModalOpen} 
          modalStates={modalStates} 
          TABLE_HEAD={TABLE_HEAD} 
          titulos={titulos} 
          tipo={"productos"}/>
          {loadingS && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <SpinnerFAST />
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Productos
