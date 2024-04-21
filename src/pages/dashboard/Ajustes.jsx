import DocumentTitle from "../../components/DocumentTitle";
import { useUser } from '../../hooks/user';
import { useEffect, useRef } from 'react';
import userIcon from '../../assets/img/fast-default-user-icon.png';

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

      {/* Encabezado de la pagina */}
      <div className= "flex flex-col">
        <p2 className= "text-3xl pb-3 text-FAST-Text font-bold">Ajustes de usuario</p2>
        <p className="text-FAST-Text text-xl">Configura tu foto y datos personales aqui</p>
      </div>

      {/* Contenido de la pagina */}
      <div className="flex flex-col">

        {/* Formulario de datos del kiosko */}
        <form className="flex flex-col pt-10">

          {/* Imagen de perfil */}
          <div className="flex items-center pb-10">
            <img className="w-fit max-w-[150px] h-fit max-h-[150px] mr-8" src={userIcon} alt="Imagen de perfil"/>
            <button className="text-xl bg-FAST-Orange text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg mt-4 cursor-pointer hover:bg-[#ed6d1f]">Actualizar foto</button>
          </div>

          {/* Primeros 2 campos */}
          <div className="flex items-center">

            <div className="flex flex-col pr-12 w-[380px]">
              <h2 className="text-left pb-1 font-bold text-xl">Nombre Completo</h2>
              <input className="h-[50px] rounded-lg text-xl bg-[#A0A5BA]/20 p-3" placeholder="Walter Hartwell White"/>
            </div>

            <div className="flex flex-col w-[380px]">
              <h2 className="text-left pb-1 font-bold text-xl">Nombre de usuario</h2>
              <input className="h-[50px] rounded-lg text-xl bg-[#A0A5BA]/20 p-3" placeholder="xXHeisenBergXx"/>
            </div>

          </div>

            {/* Segundos campos */}
          <div className="flex items-center pt-10 pb-10">

            <div className="flex flex-col pr-12 w-[380px]">
              <h2 className="text-left pb-1 font-bold text-xl">Correo Electronico</h2>
              <input className="h-[50px] rounded-lg text-xl bg-[#A0A5BA]/20 p-3" placeholder="heisenberg@gmail.com"/>
            </div>

          </div>

          <button className="h-[50px] w-[230px] bg-FAST-DarkBlue rounded-lg font-bold text-xl text-[#FFFFFF] hover:bg-[#2B3045]">Guardar Cambios</button>

        </form>

      </div>

    </div>
  )
}

export default Ajustes
