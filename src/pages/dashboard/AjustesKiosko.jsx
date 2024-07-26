import { useEffect } from 'react';

import { DocumentTitle } from "../../components/index";

import { useKiosk } from '../../hooks/kiosko';

import editPencil from '../../assets/img/editIcon.png'

import useSuccessState from '../../hooks/modal';

import { 
  InputSection, 
  ImageUpload, 
  TextArea,
  ProductoExitoso } 
  from '../../components/index';

import { useForm } from 'react-hook-form';

import { useState, useRef } from 'react';

import { 
  generarUrlImagen, 
  handleImageFileChange, 
  isBigger } 
  from "../../utils/index";

import { checkKiosko } from '../../services/validacion';

import { 
  verificarNumero, 
  verificarEmail, 
  editarKiosko } 
  from '../../services/database/index';

import { 
  numberFormat, 
  compareObjetcs, 
  trimSpaces 
} from '../../utils/index';


const ConfigKiosko = () => {
  const { kiosko } = useKiosk();
  const { register, handleSubmit, setValue } = useForm();
  const [mostrarBotones, setMostrarBotones] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  //States to handle the inputs
  const [editable, setIsEditable] = useState(true);  
  const [file, setFile] = useState(null);
  const [nombreK, setNombreK] = useState(false);
  const [emailK, setEmailK] = useState(false);
  const [numeroK, setNumeroK] = useState(false);
  const [direccionK, setDireccionK] = useState(false);
  const [changeM, setChangeM] = useState(false); 
  const [imageChange, setImageChange] = useState(false); 
  ///States to handle the copy of the kiosko object
  const kioskoCopyRef = useRef(null);
  const [mensajeModal, setMensajeModal] = useState(""); 
  const [succesOpenEdit, handleSuccesOpenEdit, handleSuccesCloseEdit] = useSuccessState(false, 'fue editado exitosamente', setMensajeModal);


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
      setNombreK("El nombre del kiosco no puede quedar vacío");
      return;
    }
    setNombreK(null);
    return true;
  }

  const checkNumberInput = async (telefono) => {
    const checkNumber = await verificarNumero(telefono);
    const fNumber = numberFormat(telefono, setNumeroK);
    if (!checkNumber && kiosko.telefono != telefono) {
      setNumeroK("Este número de teléfono ya pertenece a otro kiosco");
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
      setEmailK("El correo electrónico ya pertenece a otro kiosco");
      return false;
    }
    return true;
  }

  const checkDescripcionInput = (descripcion) => {
    const fDireccion = isBigger(descripcion, "descripcion", setDireccionK);
    if (fDireccion) {
      return false;
    }
    return true;
  }
  const checkCampos = async (data) => {
    const respuesta = await checkKiosko(data.nombreKiosko, "edit");
    const checkedNumber = await checkNumberInput(data.telefonoKiosko);
    const checkedEmail = await checkEmailInput(data.emailKiosko);
    const checkedDescripcion = checkDescripcionInput(data.descripcionKiosko);

    if (respuesta && kiosko.nombre != data.nombreKiosko) {
      setNombreK("El nombre del kiosko ya existe");
      return;
    } else if (!checkedNumber) {
      return;
    } else if (!checkedEmail) {
      return;
    } else if (!checkedDescripcion) {
      return;
    }
    else {
      return true;
    }
  }

  function renombrarObjeto(objeto2, imageChange) {
    const objeto = {};
    const { nombreKiosko, emailKiosko, telefonoKiosko, descripcionKiosko } = objeto2;
    objeto.nombre = nombreKiosko;
    objeto.correo = emailKiosko;
    objeto.telefono = telefonoKiosko;
    objeto.descripcion = descripcionKiosko;
    objeto.imagen = imageChange;
    return objeto;

  }

  const onSubmit = async (data) => {
    setChangeM('');
    const dataTrim = trimSpaces(data);
    const resultado = await checkCampos(dataTrim);
    if (!resultado) { 
      return;
    }
    checkVacios(dataTrim);
    const objeto = renombrarObjeto(dataTrim, imageChange);
    //console.log("kioskocurret: ", kioskoCopyRef.current);
    const result = compareObjetcs(objeto, kioskoCopyRef.current, setChangeM);
    if (!result) {
      return;
    }
    const res = await editarKiosko(kiosko.id, dataTrim, file);
    if (res) {
      handleSuccesOpenEdit();
    }
  }; // Funcion para enviar los datos del formulario, aun tengo que implementarla para actualizar los datos del kiosko

  function enableOrNotEnable( ) {
    limpiarCampos();
    if (mostrarBotones) {
      setMostrarBotones(false);
      setIsEditable(true);
    } else {
      setMostrarBotones(true);
      setIsEditable(false);
    }
  }

  const handleImageClick = () => {
    enableOrNotEnable();

  };

  const uploadImage = (file) => { 
    console.log("file: ", file);
    handleImageFileChange(file, setImageUrl, setFile);
    setImageChange(file.name);
  };

   const cancelarOperacion = () =>  { 
    enableOrNotEnable();
    cargarDatosKiosko();
    }

  useEffect(() => {
    if (kiosko && !kioskoCopyRef.current) {
      //Copiar el objeto kiosko, por medio de una desestructuración, se crea una copia por valor del objeto, no una referencia
      const { 
        nombre, 
        correo, 
        telefono, 
        descripcion, 
        imagen } = kiosko;

      kioskoCopyRef.current = { 
        nombre, 
        correo, 
        telefono, 
        descripcion, 
        imagen };

        cargarDatosKiosko();

    }
  }, [kiosko, setValue]);

  useEffect(() => {
    const imagenURL = generarUrlImagen(kiosko, 'imagen');
    setImageUrl(imagenURL);
    setImageChange(kiosko.imagen);
   }, [imageChange]);

  function cargarDatosKiosko() {
    setValue('nombreKiosko', kiosko.nombre);
    setValue('emailKiosko', kiosko.correo);
    setValue('telefonoKiosko', kiosko.telefono);
    setValue('descripcionKiosko', kiosko.descripcion);
    const imagenURL = generarUrlImagen(kiosko, 'imagen');
    setImageUrl(imagenURL);
    setImageChange(kiosko.imagen);
    console.log("kiosko: ", kiosko.image);
  }

  return (
    <div>
      {/* Encabezado de la pagina */}
      <div className="flex flex-col">
        <h2 className="text-2xl pb-3 text-FAST-Text font-bold">Ajustes del kiosco</h2>
        <div className="flex items-center"> 
          <p className="text-lg">Configura la foto del kiosco y sus datos aqui</p> 
          <img 
          className="h-[20px] w-[20px] ml-2 cursor-pointer" 
          src={editPencil} alt="editar" onClick={handleImageClick} />  
          <span className="text-sm bg-#D3D3D3 rounded p-2 opacity-0 hover:opacity-100 transition-opacity duration-200">Edita tu kiosko</span>
        </div> 
      </div>
      <><ProductoExitoso 
      sujeto={"kiosco"} 
      exitosoOpen={succesOpenEdit} 
      mensaje={mensajeModal} 
      handleExitosoClose={handleSuccesCloseEdit} 
      productName={kiosko.nombre} />
      </>
      {/* Contenido de la pagina */}
      <div className="flex flex-col">
        {changeM ? <p className="text-[#FF0400]" >{changeM}</p> : null}
        {/* Formulario de datos del kiosko */}
        <form className="flex flex-col pt-10 pl-9 size-fit" onSubmit={handleSubmit(onSubmit)}>
          <h3 className= "text-xl text-FAST-Text font-bold">Datos del kiosco</h3>
          <div className="flex justify-start mt-0">
            <div className="flex flex-col">
              {/* Primeros 2 campos */}
              <div className="flex items-center pt-4">
                <div className="flex flex-col pr-12 w-[380px]">
                  <InputSection 
                  tipo="text" 
                  frase="FAST" 
                  etiqueta="Nombre del kiosco" 
                  register={register} 
                  name="nombreKiosko" 
                  isEditable={editable} 
                  mensaje={nombreK ? nombreK : " "} 
                  />
                </div>
                <div className="flex flex-col pl-12 w-[380px]">
                  <InputSection 
                  tipo="email" 
                  frase="fast@gmail.com" 
                  etiqueta="Correo electrónico del kiosco" 
                  register={register} 
                  name="emailKiosko" 
                  isEditable={editable} 
                  mensaje={emailK ? emailK : " "} />
                </div>
              </div>

              {/* Segundos campos */}
              <div className="flex items-center pt-4 ">
                <div className="flex flex-col pr-12 pb-[55px] w-[230px]">
                  <InputSection 
                  tipo="tel" 
                  frase="78223176" 
                  etiqueta="Número de teléfono" 
                  register={register} 
                  name="telefonoKiosko" 
                  isEditable={editable} 
                  mensaje={numeroK ? numeroK : " "} 
                  />
                </div>

                <div className="flex flex-col pt-2 pl-[195px] w-[531px]">
                  <TextArea 
                  frase="FAST" 
                  etiqueta="Descripción del kiosco" 
                  register={register} 
                  name="descripcionKiosko" 
                  isEditable={editable} 
                  mensaje={direccionK ? direccionK : " "} />
                </div>
              </div>
            </div>

            {/* Imagen del kiosko */}
            <div className="grid place-items-center pb-4 pl-[150px]">
              <ImageUpload 
              defaultImageUrl={imageUrl} 
              onChange={uploadImage} 
              name="fotoKiosko" 
              register={register} 
              mostrarBotones={mostrarBotones} />
            </div>
          </div>
          {mostrarBotones ?
          <div className='flex w-auto self-center'>
            <button className="h-[40px] w-[230px] bg-FAST-DarkBlue rounded-lg font-bold text-[10x] text-[#FFFFFF]" onClick={handleSubmit(onSubmit)}>Guardar Cambios</button> 
            <button className="h-[40px] w-[230px] bg-FAST-Orange rounded-lg font-bold text-[10x] text-[#FFFFFF] ml-4" onClick={cancelarOperacion}>Cancelar</button> </div>
            : null
          }
        </form>
      </div>

    </div>
  );
};

export default ConfigKiosko;