import { 
  useEffect, 
  useRef, 
  useState, 
  useCallback 
} from 'react';
import { 
  DocumentTitle, 
  ProductTable, 
  SpinnerFAST 
} from "../../components/index";

import { buscarRegistroCajero } from "../../services/database/index";
import { useKiosk } from '../../hooks/kiosko';

const Cajeros = () => {
  DocumentTitle("FAST - Cajeros");
  const { kiosko } = useKiosk();
  const [loadingS, setLoadingS] = useState(true);
  //Estados para manejar la data que se va a cargar en la tabla de cajeros
  const [cajerosArray, setCajerosArray] = useState([]);
  //Constante con las cabezeras de la tabla
  const TABLE_HEAD = ['Usuario','Nombre', ' ','Apellido', ''];
  const titulos = ["Tus cajeros", "Estos son los cajeros que tienes registrados", "Buscar cajero", "Agregar cajero"];
    //Estados para manejat los modales
  const [createOpen, setCreateOpen] = useState(false); // Mostrar modal para crear producto
  const [deleteOpen, setDeleteOpen] = useState(false); // Mostrar modal para eliminar producto
  const [editOpen, setEditOpen] = useState(false); // Mostrar modal para editar producto
  const modalStates = {
    createOpen,
    deleteOpen,
    editOpen,
  };

  const handleModalOpen = (modalType) => {
    if (modalType === 'create') {
      setCreateOpen(!createOpen);
      manejarCargaCajeros();
    } else if (modalType === 'delete') {
      setDeleteOpen(!deleteOpen);
      manejarCargaCajeros();
    } else if (modalType === 'edit') {
      setEditOpen(!editOpen);
      manejarCargaCajeros();
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
  const manejarCargaCajeros = useCallback(async () => {
    const cajeros = await buscarRegistroCajero(kiosko.id);
    setCajerosArray(cajeros);
  }, [kiosko]);

  useEffect(() => {
    // Definimos una función asíncrona fetchProductos dentro del useEffect.
    const fetchCajeros = async () => {
      // Establecemos el estado de loadingS a true. Esto muestra un spinner en la interfaz de usuario.
      setLoadingS(true);

      // Esperamos a que se complete la función manejarCargaProductos. Esta función probablemente realiza una solicitud la base de datos para obtener datos de productos.
      await manejarCargaCajeros();

      // Una vez que se han cargado los productos, establecemos el estado de loadingS a false. Esto oculta el indicador de carga en la interfaz de usuario.
      setLoadingS(false);
    };

    // Si kiosko es verdadero (indica que hay un objeto kiosko en el sistema), llamamos a la función fetchProductos.
    if (kiosko) {
      fetchCajeros();
    }

    // El array de dependencias [kiosko, manejarCargaProductos] significa que este useEffect se ejecutará cada vez que el valor de kiosko o la referencia de la función manejarCargaProductos cambie.
  }, [kiosko, manejarCargaCajeros]);
 



  return (
    <div>

      {/* Encabezado de la pagina */}
      <div className="flex flex-col">
        <h2 className="text-2xl pb-3 text-FAST-Text font-bold">Gestión de Cajeros</h2>
        <p className="text-FAST-Text text-xl">Gestiona los datos de tus cajeros aquí</p>
      </div>

      {/* Tabla de productos */}
      <div className="px-4 py-5">
        <div style={{ position: 'relative' }}>
          <ProductTable 
          tableRows={cajerosArray} 
          handleModalOpen={handleModalOpen} 
          modalStates={modalStates}  
          TABLE_HEAD={TABLE_HEAD} 
          titulos={titulos} 
          tipo='cajeros'
          />
          { loadingS && (
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

export default Cajeros
