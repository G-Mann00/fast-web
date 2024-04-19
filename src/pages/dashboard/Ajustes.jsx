import DocumentTitle from "../../components/DocumentTitle";
import { useUser } from '../../hooks/user';
import { useEffect, useRef } from 'react';

const Ajustes = () => {
  DocumentTitle("FAST - Ajustes");
  const { user } = useUser();

  // Usa un useRef para almacenar el valor anterior de `user`
  const previousUserRef = useRef();

  // useEffect para verificar si el objeto `user` ha cambiado
  useEffect(() => {
    if (user && previousUserRef.current !== user) {
      // Si `user` ha cambiado desde el valor anterior, muestra el objeto `user` en consola
      console.log('Objeto Usuario en ajustes:', user);
      // Actualiza la referencia con el valor actual de `user`
      previousUserRef.current = user;
    }
  }, [user]);
  return (
    <div>
      <h1>Configuración del Usuario</h1>
      {user ? (
        <div>
          <p>Nombre: {user.name}</p>
          <p>Nombre de Usuario: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No se encontró la información del kiosko.</p>
      )}
    </div>
  )
}

export default Ajustes
