import DocumentTitle from "../../components/DocumentTitle";
import { useUser } from '../../hooks/user';
import useSuccessState from '../../hooks/modal';
import { 
   useEffect, 
   useRef,
   useState 
  } from 'react';
import { useForm } from 'react-hook-form';
import editPencil from '../../assets/img/editIcon.png'
import { 
  InputSection,
  ImageUpload,
  ProductoExitoso
  } from "../../components";
import { 
  generarUrlImagen,
  handleImageFileChange,
  trimSpaces,
  compareObjetcs
} from "../../utils";
import { editarUsuario } from "../../services/database";

let imagenUsuario = '';
let fotoPerfil = null;

const Ajustes = () => {
  DocumentTitle("FAST - Ajustes de Usuario");
  const { user } = useUser();
  const { register, handleSubmit, setValue } = useForm();
  const [ imgUrl, setImgUrl ] = useState('');
  const previousUserRef = useRef();
  const [imageChange, setImageChange] = useState(false);
  const [mostrarBotones, setMostrarBotones] = useState(false);
  const [ isEditable, setIsEditable ] = useState(true);
  const [file, setFile] = useState(null);
  const [changeM, setChangeM] = useState(''); 
  const [mensajeModal, setMensajeModal] = useState(""); 
  const [succesOpenEdit, handleSuccesOpenEdit, handleSuccesCloseEdit] = useSuccessState(false, 'fue editado exitosamente. Inicie sesión nuevamente para ver los cambios', setMensajeModal);

  function limpiarCampos() { 
    cargarDatosUsuario();
    setChangeM('');
  }

  function cargarDatosUsuario() { 
    setValue('nameUser', user.name);
    fotoPerfil = generarUrlImagen(user, 'avatar');
  }

  function checkVacios(data) {
    if (data.nameUser === '' || data.emailUser === '') {
      setChangeM('No puedes dejar campos vacíos');
      return false;
    }
    return true
  }


  function enableOrNotEnable( ) {
    if (mostrarBotones) {
      limpiarCampos();
      setMostrarBotones(false);
      setIsEditable(true);
    } else {
      
      setMostrarBotones(true);
      setIsEditable(false);
    }
  }

  const uploadImage = (file) => { 
    handleImageFileChange(file, setImgUrl, setFile);
    imagenUsuario = file.name;
  };

  useEffect(() => {
    const imagenURL = generarUrlImagen(user, 'avatar');
    setImgUrl(imagenURL);
    setImageChange(user.avatar);
   }, [imageChange]);

  useEffect(() => {
    if (user && !previousUserRef.current) {
      previousUserRef.current = {
        name: user.name,
        avatar: user.avatar
      };
      cargarDatosUsuario();
    }
    imagenUsuario = user.avatar;
  }, [user, setValue]);
  
  const cancelarOperacion = () =>  { 
    setChangeM('');
    enableOrNotEnable();
    cargarDatosUsuario();
    }

  function renombrarObjeto(objeto2, imageChange) {
    const objeto = {
      name: objeto2.nameUser,
      avatar: imageChange
    };
    return objeto
  }

  const onSubmit = async (data) => {
    setChangeM('');
    const dataTrim = trimSpaces(data);
    const objeto = renombrarObjeto(dataTrim, imagenUsuario);
    const result = compareObjetcs(previousUserRef.current, objeto, setChangeM);
    console.log(result);
    if (!result) {
      return;
    }
    if (!checkVacios(dataTrim)) {
      return;
    }; 
    const res = await editarUsuario(user.id, dataTrim, file);
    if (res) {
      previousUserRef.current = objeto;
      handleSuccesOpenEdit();
      enableOrNotEnable();

    } 
    else if (!res) {
      setChangeM('Este correo ya está en uso');
    }
    
    else {
      setChangeM('Error al guardar los cambios');
    }
  };

  return (
    <div className="overflow-hidden">

      {/* Encabezado de la pagina */}
      <div className= "flex flex-col">
        <h2 className= "text-xl text-FAST-Text font-bold">Ajustes de usuario</h2>
        <div className="flex items-center"> 
          <p className="text-lg">Configura tu foto y datos de usuario aquí</p> 
          <img 
          className="h-[20px] w-[20px] ml-2 cursor-pointer" 
          src={editPencil} onClick={() => enableOrNotEnable()} alt="editar" />  
          <span className="text-sm bg-#D3D3D3 rounded p-2 opacity-0 hover:opacity-100 transition-opacity duration-200">Edita tus datos</span>
        </div>
      </div>
      <><ProductoExitoso 
      sujeto={"Usuario"} 
      exitosoOpen={succesOpenEdit} 
      mensaje={mensajeModal} 
      handleExitosoClose={handleSuccesCloseEdit} 
      productName={""} />
      </>
      {/* Contenido de la pagina */}
        <form className="flex flex-col ml-5 self-center" onSubmit={handleSubmit(onSubmit)}>
          {changeM ? <p className="text-[#FF0400] absolute" >{changeM}</p> : null}
          <div className="items-center">
            <div className="flex flex-col gap-[15px] items-center w-auto mr-5">
            <ImageUpload
               defaultImageUrl={fotoPerfil}
               onChange={uploadImage}
               name={'fotoUsuario'}
               mostrarBotones={mostrarBotones}
               register={register}
              />
              <InputSection 
                tipo="text"
                frase="Nombre"
                etiqueta="Nombre Completo"
                register={register}
                name="nameUser"
                isEditable={isEditable}
              />
            </div>
          </div>
          {mostrarBotones ?
          <div className='flex w-auto self-center mt-8'>
            <button 
             className="h-[40px] w-[230px] bg-FAST-DarkBlue rounded-lg font-bold text-[10x] text-[#FFFFFF]" 
             onClick={handleSubmit(onSubmit)}
           >
              Guardar Cambios
            </button> 
            <button 
             className="h-[40px] w-[230px] bg-FAST-Orange rounded-lg font-bold text-[10x] text-[#FFFFFF] ml-4" 
             onClick={cancelarOperacion}
            >
              Cancelar
            </button> 
          </div>
            : null
          }
        </form>
    </div>
  )
}

export default Ajustes
