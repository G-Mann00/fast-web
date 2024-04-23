import { useEffect } from 'react';
import { DocumentTitle } from "../../components/index";
import { useKiosk } from '../../hooks/kiosko';
import kioskoImage from '../../assets/img/FASTKioskImage.png';
import editPencil from '../../assets/img/editIcon.png'
import { InputSection } from '../../components/index';
import { useForm } from 'react-hook-form';
import { useState } from 'react';


const ConfigKiosko = () => {
  const { kiosko } = useKiosk();
  const { register, handleSubmit } = useForm();
  const [mostrarBotones, setMostrarBotones] = useState(false);
  //Estados para determinar los valores de los inputs
  const [editable, setIsEditable] = useState(true);  //Estado para determinar si los inputs son editables o no
  //const [nombreK, setNombreK] = useState(true);
  //const [emailK, setEmailK] = useState(true);
  //const [numeroK, setNumeroK] = useState(true);
  //const [direccionK, setDireccionK] = useState(true);


  DocumentTitle("FAST - Ajustes del Kiosko");

  const onSubmit = (data) => { console.log(data) }; // Funcion para enviar los datos del formulario, aun tengo que implementarla para actualizar los datos del kiosko

  /*const datosKiosko = () => {

  }*/

  const handleImageClick = () => {
    if (mostrarBotones) {
      setMostrarBotones(false);
      setIsEditable(true);
    } else {
      setMostrarBotones(true);
      setIsEditable(false);
    }
  };

  useEffect(() => {
    if (kiosko) {
      console.log('Objeto kiosko:', kiosko);

    }
  }, [kiosko]);

  return (
    <div>

      {/* Encabezado de la pagina */}
      <div className="flex flex-col">
        <h2 className="text-2xl pb-3 text-FAST-Text font-bold">Ajustes del kiosko</h2>
        <div className="flex items-center"> {/* Add this line */}
          <p className="text-lg">Configura la foto del kiosko y sus datos aqui</p> {/* Adjusted text size */}
          <img className="h-[20px] w-[20px] ml-2 cursor-pointer" src={editPencil} alt="editar" onClick={handleImageClick} />  {/* Add margin-left for spacing */}
          <span className="text-sm text-FAST-DarkBlue bg-black rounded opacity-0 hover:opacity-100 transition-opacity duration-200">Edita tu kiosko</span>
        </div> {/* Add this line */}
      </div>

      {/* Contenido de la pagina */}
      <div className="flex flex-col">

        {/* Formulario de datos del kiosko */}
        <form className="flex flex-col pt-[80px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-start">
            <div className="flex flex-col">
              {/* Primeros 2 campos */}
              <div className="flex items-center">
                <div className="flex flex-col pr-12 w-[380px]">
                  <InputSection tipo="text" frase="FAST" etiqueta="Nombre del kiosko" register={register} name="nombreKiosko" isEditable={editable} />
                </div>
                <div className="flex flex-col pl-12 w-[380px]">
                  <InputSection tipo="email" frase="fast@gmail.com" etiqueta="Correo electrónico del kiosko" register={register} name="emailKiosko" isEditable={editable} />
                </div>
              </div>

              {/* Segundos campos */}
              <div className="flex items-center pt-6 pb-10">
                <div className="flex flex-col pr-12 w-[230px]">
                  <InputSection tipo="tel" frase="78223176" etiqueta="Número de teléfono" register={register} name="telefonoKiosko" isEditable={editable} />
                </div>

                <div className="flex flex-col pl-[195px] w-[531px]">
                  <InputSection tipo="text" frase="FAST" etiqueta="Direccion" register={register} name="direccionKiosko" isEditable={editable} />
                </div>
              </div>
            </div> {/* Add this line */}

            {/* Imagen del kiosko */}
            <div className="grid place-items-center pb-[100px] pl-[150px]">
              <img className="w-[180px] h-[180px] " src={kioskoImage} alt="Kiosko pic" />
              {mostrarBotones ? <button className="text-xl h-[40px] bg-FAST-Orange text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg  mt-4 cursor-pointer hover:bg-[#ed6d1f]">Actualizar foto</button> : null}
            </div>
          </div>
          {mostrarBotones ?
            <button className="h-[40px] w-[230px] bg-FAST-DarkBlue rounded-lg font-bold text-[10x] text-[#FFFFFF] hover:bg-[#2B3045] mx-auto" type="submit">Guardar Cambios</button> : null
          }
        </form>
      </div>

    </div>
  );
};

export default ConfigKiosko;