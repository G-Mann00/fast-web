import { useEffect } from 'react';
import { DocumentTitle } from "../../components/index";
import { useKiosk } from '../../hooks/kiosko';

const ConfigKiosko = () => {
  const { kiosko } = useKiosk();
  DocumentTitle("FAST - Ajustes del Kiosko");

  // useEffect para mostrar el objeto kiosko en consola
  useEffect(() => {
    if (kiosko) {
      console.log('Objeto kiosko:', kiosko);
    }
  }, [kiosko]);

  return (
    <div>
      <h1>Configuración del Kiosko</h1>
      {kiosko ? (
        <div>
          <p>Nombre del Kiosko: {kiosko.nombre}</p>
          <p>Dirección: {kiosko.direccion}</p>
          <p>Teléfono: {kiosko.telefono}</p>
          <p>Correo electrónico: {kiosko.correo}</p>
          {/* Agrega otras propiedades que quieras mostrar */}
        </div>
      ) : (
        <p>No se encontró la información del kiosko.</p>
      )}
    </div>
  );
};

export default ConfigKiosko;
