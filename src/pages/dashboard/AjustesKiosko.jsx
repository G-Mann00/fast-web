import { useEffect } from 'react';
import { DocumentTitle } from "../../components/index";
import { useKiosk } from '../../hooks/kiosko';
//import kioskoImage from '../../assets/img/FASTKioskImage.png';
import editPencil from '../../assets/img/editIcon.png'
import { InputSection, ImageUpload, TextArea } from '../../components/index';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import { generarUrlImagen, handleImageFileChange, isBigger } from "../../utils/index";
import { checkKiosko } from '../../services/validacion';
import { verificarNumero, verificarEmail, editarKiosko } from '../../services/database/index';
import { numberFormat, compareObjetcs } from '../../utils/index';

const ConfigKiosko = () => {
  const { kiosko } = useKiosk();
  const { register, handleSubmit, setValue } = useForm();
  const [mostrarBotones, setMostrarBotones] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  //States to handle the inputs
  const [editable, setIsEditable] = useState(true);  //Estado para determinar si los inputs son editables o no
  const [file, setFile] = useState(null);
  const [nombreK, setNombreK] = useState(false);
  const [emailK, setEmailK] = useState(false);
  const [numeroK, setNumeroK] = useState(false);
  const [direccionK, setDireccionK] = useState(false);
  const [changeM, setChangeM] = useState(false); //State to handle the change of the data 
  const [imageChange, setImageChange] = useState(false); //State to handle the change of the image
  ///States to handle the copy of the kiosko object
  const kioskoCopyRef = useRef(null);

  DocumentTitle("FAST - Ajustes del Kiosko");

  const limpiarCampos = () => {
    setNombreK(null);
    setNumeroK(null);
    setEmailK(null);
    setDireccionK(null);
    setChangeM(null);
  };

  const checkVacios = (data) => {
    if (data.nombreKiosko === "") {
      setNombreK("El nombre del kiosko no puede quedar vacío");
      return;
    }
    setNombreK(null);
    return true;
  }

  const checkNumberInput = async (telefono) => {
    const checkNumber = await verificarNumero(telefono);
    const fNumber = numberFormat(telefono, setNumeroK);
    if (!checkNumber && kiosko.telefono != telefono) {
      setNumeroK("El número de teléfono ya existe");
      return false;
    } else if (fNumber) {
      return false;
    } else {
      return true;
    }
  }

  const checkEmailInput = async (email) => {
    const checkEmail = await verificarEmail(email);
    if (!checkEmail && kiosko.correo != email) {
      setEmailK("El correo electrónico ya pertenece a otro kiosko");
      return false;
    }
    return true;
  }

  const checkDireccionInput = (direccion) => {
    const fDireccion = isBigger(direccion, "dirección", setDireccionK);
    //console.log('Direccion: ', fDireccion);
    if (fDireccion) {
      return false;
    }
    return true;
  }
  const checkCampos = async (data) => {
    const respuesta = await checkKiosko(data.nombreKiosko, "edit");
    const checkedNumber = await checkNumberInput(data.telefonoKiosko);
    const checkedEmail = await checkEmailInput(data.emailKiosko);
    const checkedDireccion = checkDireccionInput(data.direccionKiosko);
    //console.log('Kiosko:', kiosko);
    if (respuesta && kiosko.nombre != data.nombreKiosko) {
      setNombreK("El nombre del kiosko ya existe");
    } else if (!checkedNumber) {
      return;
    } else if (!checkedEmail) {
      return;
    } else if (!checkedDireccion) {
      return;
    }
    else {
      return true;
    }
  }

  function renombrarObjeto(objeto2, imageChange) {
    const objeto = {};
    const { nombreKiosko, emailKiosko, telefonoKiosko, direccionKiosko } = objeto2;
    objeto.nombre = nombreKiosko;
    objeto.correo = emailKiosko;
    objeto.telefono = telefonoKiosko;
    objeto.direccion = direccionKiosko;
    objeto.imagen = imageChange;
    return objeto;

  }

  const onSubmit = async (data) => {
    await checkCampos(data);
    checkVacios(data);
    const objeto = renombrarObjeto(data, imageChange);
    //console.log("kioskocurret: ", kioskoCopyRef.current);
    const result = compareObjetcs(objeto, kioskoCopyRef.current, setChangeM);
    if (!result) {
      return;
    }
    const res = await editarKiosko(kiosko.id, data, file);
    //console.log('ImageChange en Resultado:', imageChange);
    //console.log('File en Resultado:', file);
    if (res) {
      setChangeM("Cambios guardados correctamente");
    }
  }; // Funcion para enviar los datos del formulario, aun tengo que implementarla para actualizar los datos del kiosko

  const handleImageClick = () => {
    limpiarCampos();
    if (mostrarBotones) {
      setMostrarBotones(false);
      setIsEditable(true);
    } else {
      setMostrarBotones(true);
      setIsEditable(false);
    }
  };
  const uploadImage = (file) => { //Función para subir la imagen del producto
    handleImageFileChange(file, setImageUrl, setFile);
    setImageChange(file.name)
  }
  useEffect(() => {
    console.log('Kiosko:', kiosko)
    if (kiosko && !kioskoCopyRef.current) {
      //console.log('Objeto kiosko:', kiosko);
      //Copiar el objeto kiosko, por medio de una desestructuración, se crea una copia por valor del objeto, no una referencia
      const { nombre, correo, telefono, direccion, imagen } = kiosko;
      kioskoCopyRef.current = { nombre, correo, telefono, direccion, imagen };
      //console.log('Copia:', kioskoCopyRef.current);
      setValue('nombreKiosko', kiosko.nombre);
      setValue('emailKiosko', kiosko.correo);
      setValue('telefonoKiosko', kiosko.telefono);
      setValue('direccionKiosko', kiosko.direccion);
      const imagenURL = generarUrlImagen(kiosko, 'imagen');
      setImageUrl(imagenURL);
      setImageChange(kiosko.imagen);
      setFile(kiosko.imagen);

      ///Obtener valor original de los inputs
    }
  }, [kiosko, setValue]);

  return (
    <div>

      {/* Encabezado de la pagina */}
      <div className="flex flex-col">
        <h2 className="text-2xl pb-3 text-FAST-Text font-bold">Ajustes del kiosko</h2>
        <div className="flex items-center"> {/* Add this line */}
          <p className="text-lg">Configura la foto del kiosko y sus datos aqui</p> {/* Adjusted text size */}
          <img className="h-[20px] w-[20px] ml-2 cursor-pointer" src={editPencil} alt="editar" onClick={handleImageClick} />  {/* Add margin-left for spacing */}
          <span className="text-sm text-white bg-FAST-DarkBlue rounded opacity-0 hover:opacity-100 transition-opacity duration-200">Edita tu kiosko</span>
        </div> {/* Add this line */}
      </div>

      {/* Contenido de la pagina */}
      <div className="flex flex-col">
        {changeM ? <p className="text-[#FF0400]" >{changeM}</p> : null}
        {/* Formulario de datos del kiosko */}
        <form className="flex flex-col pt-[80px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-start">
            <div className="flex flex-col">
              {/* Primeros 2 campos */}
              <div className="flex items-center pt-4">
                <div className="flex flex-col pr-12 w-[380px]">
                  <InputSection tipo="text" frase="FAST" etiqueta="Nombre del kiosko" register={register} name="nombreKiosko" isEditable={editable} mensaje={nombreK ? nombreK : " "} />
                </div>
                <div className="flex flex-col pl-12 w-[380px]">
                  <InputSection tipo="email" frase="fast@gmail.com" etiqueta="Correo electrónico del kiosko" register={register} name="emailKiosko" isEditable={editable} mensaje={emailK ? emailK : " "} />
                </div>
              </div>

              {/* Segundos campos */}
              <div className="flex items-center pt-4 ">
                <div className="flex flex-col pr-12 pb-[55px] w-[230px]">
                  <InputSection tipo="tel" frase="78223176" etiqueta="Número de teléfono" register={register} name="telefonoKiosko" isEditable={editable} mensaje={numeroK ? numeroK : " "} />
                </div>

                <div className="flex flex-col pt-2 pl-[195px] w-[531px]">
                  <TextArea frase="FAST" etiqueta="Direccion" register={register} name="direccionKiosko" isEditable={editable} mensaje={direccionK ? direccionK : " "} />
                </div>
              </div>
            </div> {/* Add this line */}

            {/* Imagen del kiosko */}
            <div className="grid place-items-center pb-4 pl-[150px]">
              <ImageUpload defaultImageUrl={imageUrl} onChange={uploadImage} name="fotoKiosko" register={register} mostrarBotones={mostrarBotones} />
            </div>
          </div>
          {mostrarBotones ?
            <button className="h-[40px] w-[230px] bg-FAST-DarkBlue rounded-lg font-bold text-[10x] text-[#FFFFFF] hover:bg-[#2B3045] mx-auto" onClick={handleSubmit(onSubmit)}>Guardar Cambios</button> : null
          }
        </form>
      </div>

    </div>
  );
};

export default ConfigKiosko;