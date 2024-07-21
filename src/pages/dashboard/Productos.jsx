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
  const titulos = ["Tu Catálogo", "Estos son los productos que tu kiosko ofrece", "Buscar Producto", "Agregar producto"];
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

  // useEffect es un hook de React que permite realizar efectos secundarios en componentes funcionales.
  // Se ejecuta después de que se hayan realizado todas las mutaciones del DOM.
  useEffect(() => {
    // Definimos una función asíncrona fetchProductos dentro del useEffect.
    const fetchProductos = async () => {
      // Establecemos el estado de loadingS a true. Esto muestra un spinner en la interfaz de usuario.
      setLoadingS(true);

      // Esperamos a que se complete la función manejarCargaProductos. Esta función probablemente realiza una solicitud la base de datos para obtener datos de productos.
      await manejarCargaProductos();

      // Una vez que se han cargado los productos, establecemos el estado de loadingS a false. Esto oculta el indicador de carga en la interfaz de usuario.
      setLoadingS(false);
    };

    // Si kiosko es verdadero (indica que hay un objeto kiosko en el sistema), llamamos a la función fetchProductos.
    if (kiosko) {
      fetchProductos();
    }

    // El array de dependencias [kiosko, manejarCargaProductos] significa que este useEffect se ejecutará cada vez que el valor de kiosko o la referencia de la función manejarCargaProductos cambie.
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
