import DocumentTitle from "../../components/DocumentTitle";
import { useUser } from '../../hooks/user';
import { 
   useEffect, 
   useRef 
  } from 'react';
import userIcon from '../../assets/img/fast-default-user-icon.png';
import { 
  InputSection,
  ImageUpload
  } from "../../components";

const Ajustes = () => {
  DocumentTitle("FAST - Ajustes");
  const { user } = useUser();

  const previousUserRef = useRef();
  useEffect(() => {
    if (user && previousUserRef.current !== user) {
      
      console.log('Objeto Usuario en ajustes:', user);
      
      previousUserRef.current = user;
    }
  }, [user]);
  return (
    <div className="overflow-hidden">

      {/* Encabezado de la pagina */}
      <div className= "flex flex-col">
        <h2 className= "text-xl text-FAST-Text font-bold">Ajustes de usuario</h2>
        <p className="text-lg">Configura la foto del kiosco y sus datos aqui</p> 
      </div>
      {/* Contenido de la pagina */}
        <form className="flex flex-col ml-5 self-center">
          <div className="items-center">
            <div className="flex flex-col gap-[15px] items-center w-auto mr-5">
            <ImageUpload
               defaultImageUrl={userIcon}
               mostrarBotones={true} />
              <InputSection 
                tipo="text"
                frase="Nombre"
                etiqueta="Nombre"
                name="name"
                isEditable={false}
              />
               <InputSection 
                 tipo="email"
                 frase="elChante@gmail.com"
                 etiqueta="Correo Electrónico"
                 name="correo"
                 isEditable={false}
               />
            </div>
          </div>
          <button className="h-[50px] w-[230px] bg-FAST-DarkBlue rounded-lg mt-6 font-bold text-xl text-[#FFFFFF] self-center hover:bg-[#2B3045] ">Guardar Cambios</button>
        </form>
    </div>
  )
}

export default Ajustes
