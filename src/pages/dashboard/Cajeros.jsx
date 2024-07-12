import { useUser } from '../../hooks/user';
import { useEffect, useRef, useState, useCallback } from 'react';
import { DocumentTitle, ProductTable, SpinnerFAST } from "../../components/index";
import { cargarProductosYmapear } from "../../services/database/index";
import { useForm } from 'react-hook-form';
import { useKiosk } from '../../hooks/kiosko';

const Cajeros = () => {
  DocumentTitle("FAST - Cajeros");
  const { kiosko } = useKiosk();
  const { user } = useUser();
  const { register, handleSubmit } = useForm();
  // Usa un useRef para almacenar el valor anterior de `user`
  const previousUserRef = useRef();
  const [loadingS, setLoadingS] = useState(true);
  //Constante con las cabezeras de la tabla
  const TABLE_HEAD = ['Nombre', 'Apellido','Contraseña', ' ', ' '];
  const titulos = ["Tus cajeros", "Estos son los cajeros que tienes registrados", "Buscar cajero", "Agregar cajero"];

  const manejarCargaProductos = useCallback(async () => {
    const productos = await cargarProductosYmapear(kiosko.id);
    setProductosArray(productos);
  }, [kiosko]);

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
 
  const [productosArray, setProductosArray] = useState([]);


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
          <ProductTable tableRows={productosArray} TABLE_HEAD={TABLE_HEAD} titulos={titulos} />
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
