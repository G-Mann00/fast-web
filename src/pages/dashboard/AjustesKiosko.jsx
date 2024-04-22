import { useEffect } from 'react';
import { DocumentTitle } from "../../components/index";
import { useKiosk } from '../../hooks/kiosko';
import kioskoImage from '../../assets/img/FASTKioskImage.png';

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

      {/* Encabezado de la pagina */}
      <div className= "flex flex-col">
        <h2 className= "text-2xl pb-3 text-FAST-Text font-bold">Ajustes del kiosko</h2>
        <p className="text-FAST-Text text-xl">Configura la foto del kiosko y sus datos aqui</p>
      </div>

      {/* Contenido de la pagina */}
      <div className="flex flex-col">

        {/* Formulario de datos del kiosko */}
        <form className="flex flex-col pt-10">

          {/* Imagen del kiosko */}
          <div className="flex items-center pb-10">
            <img className="w-fit max-w-[150px] h-fit max-h-[150px] mr-8" src={kioskoImage} alt="Kiosko pic"/>
            <button className="text-xl bg-FAST-Orange text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg mt-4 cursor-pointer hover:bg-[#ed6d1f]">Actualizar foto</button>
          </div>
          
          {/* Primeros 2 campos */}
          <div className="flex items-center">

            <div className="flex flex-col pr-12 w-[380px]">
              <h2 className="text-left pb-1 font-bold text-xl">Nombre del kiosko</h2>
              <input className="h-[50px] rounded-lg text-xl bg-[#A0A5BA]/20 p-3" placeholder="FAST"/>
            </div>

            <div className="flex flex-col w-[380px]">
              <h2 className="text-left pb-1 font-bold text-xl">Correo electrónico del kiosko</h2>
              <input className="h-[50px] rounded-lg text-xl bg-[#A0A5BA]/20 p-3" placeholder="fast@gmail.com"/>
            </div>

          </div>

          {/* Segundos campos */}
          <div className="flex items-center pt-10 pb-10">

            <div className="flex flex-col pr-12 w-[230px]">
              <h2 className="text-left pb-1 font-bold text-xl">Numero de telefono</h2>
              <input className="h-[50px] w-[200px] rounded-lg text-xl bg-[#A0A5BA]/20 p-3" placeholder="78223176"/>
            </div>

            <div className="flex flex-col w-[531px]">
              <h2 className="text-left pb-1 font-bold text-xl">Direccion</h2>
              <input className="h-[50px] rounded-lg text-xl bg-[#A0A5BA]/20 p-3" placeholder="Del foodcourt, doblando a la izquierda"/>
            </div>

          </div>

          <button className="h-[50px] w-[230px] bg-FAST-DarkBlue rounded-lg font-bold text-xl text-[#FFFFFF] hover:bg-[#2B3045]">Guardar Cambios</button>

        </form>
      </div>

    </div>
  );
};

export default ConfigKiosko;
