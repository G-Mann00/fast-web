import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { handleImageFileChange } from "../utils/index";

import logo from "../assets/img/fast-logo.svg";
import FASTKioskImage2 from '../assets/img/FASTKioskImage2.png';

import { 
  DocumentTitle, 
  InputSection, 
  ImageUpload 
} from "../components/index";

import { trimSpaces } from "../utils/index";

import { 
  checkUser, 
  checkKiosko, 
  numeroTelefonoValido 
} from "../services/validacion/index";

import { createUser } from "../services/database/index";

import { useUser } from '../hooks/user';


const RegistroCompleto = () => {

  DocumentTitle("Registro");
  // State to store the image URL
  const [imageUrl, setImageUrl] = useState(null);
  const [showErrorMessage, setErrorMessage] = useState(false);
  const { register, handleSubmit } = useForm();
  const [passwordTooShort, setPasswordTooShort] = useState(false); //estado para mostrar mensaje de contraseña muy corta
  const [passwordMismatch, setPasswordMismatch] = useState(false); //estado para mostrar mensaje de contraseñas no coinciden
  const [mensajeUser, setMensajeUser] = useState(false); //estado para mostrar mensaje de usuario ya existente
  const [kioskoExist, setKioskoExist] = useState(false); //estado para mostrar mensaje de kiosko ya existente
  const [emailExist, setEmailExist] = useState(false); //estado para mostrar mensaje si el email ya esta relacionado con otro usuario
  const [userCreated, setUserCreated] = useState(false); //estado para mostrar mensaje si el usuario fue creado correctamente
  const { loginUser } = useUser(); // Importar el hook `useUser` del contexto de usuario
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const uploadImage = (file) => {
    handleImageFileChange(file, setImageUrl, setFile);
  }

  useEffect(() => {

    return () => {
      setImageUrl(null);
    };
  }, []);

  useEffect(() => {
    if (userCreated) {
      setTimeout(() => {
        navigate('/SolicitudEnviada');
      }, 500); 
    }
  }, [userCreated, navigate]);


  const allFieldsFilled = (data) => {
    return Object.values(data).every(value => value !== '' && value !== null);
  };

  
  function passwordMatch(data) {
    if (data.password.length < 5) {
      setPasswordTooShort('La contraseña es demasiado corta (mínimo 5 caracteres)');
      setPasswordMismatch(false);
      return false;
    } else if (data.password !== data.confirmarPassword) {
      setPasswordMismatch('Las contraseñas no coinciden');
      setPasswordTooShort(false);
      return false;
    } else {
      setPasswordTooShort(false);
      setPasswordMismatch(false);
      return true;
    }
  }

  const checkNombres = async (data) => {
    
    const userAvailable = await checkUser(data.numeroTelefono);
    
    if (!userAvailable) {
      setMensajeUser("Este número de teléfono ya está relacionado con otro kiosco");
    }

    
    const kioskoAvailable = await checkKiosko(data.nomKiosko, 'create');

    if (!kioskoAvailable) {
      setKioskoExist('Nombre de kiosko no disponible');
    }

    return userAvailable && kioskoAvailable;
  };

  const validarCampos = (data, file) => {
    return allFieldsFilled(data) && file;
  };

  const manejarCreacionUsuario = async (data, file) => {
    try {
      const newUser = await createUser(data, file);
      if (newUser) {
        loginUser(newUser);
        setUserCreated(true);
      } else {
        setEmailExist('Este email ya está relacionado con otro usuario');
      }
    } catch (error) {

      console.error('Error creando el usuario:', error);
    }
  };

  const estadosFalsos = () => {
    setMensajeUser(false);
    setKioskoExist(false);
    setEmailExist(false);
    setErrorMessage(false);
  };

  const onSubmit = async (data) => {
    const dataTrimmed = trimSpaces(data);
    estadosFalsos();
    if (!validarCampos(dataTrimmed, file)) {
      setErrorMessage(true);
      return;
    }

    const formatoValido = numeroTelefonoValido(dataTrimmed.numeroTelefono);
    const nombresDisponibles = await checkNombres(dataTrimmed);

    if (!formatoValido) {
      setMensajeUser("El número de teléfono debe seguir el siguiente formato: 12345678");
      return;
    }
    else if (nombresDisponibles) {
        await manejarCreacionUsuario(dataTrimmed, file);
      }
  };

  return (
    <main className="h-svh flex flex-col align-center justify-center bg-FAST-DarkBlue">
      {/*logo y mensaje de si y tienes cuenta registrate*/}
      <section className="w-full flex xl:flex-row flex-col justify-between">
        <div className="mb-14">
          <Link to="/">
            <img 
            src={logo} 
            alt="Fast logo" 
            className="h-[60px] w-[200px] ml-6" />
          </Link>
        </div>
        <div className="flex mr-10 mt-6">
          <p className="text-FAST-WhiteCream font-bold">¿Ya tienes una cuenta?</p>
          <a href="/Login" className="font-bold uppercase text-FAST-Orange pl-1 cursor-pointer hover:underline">Iniciar sesión →</a>
        </div>
      </section>
      <div className="mt-0">
        <p className="text-FAST-WhiteCream text-2xl font-bold sm:text-3xl text-center">Registrate para empezar a administrar tu kiosco</p>
      </div>
      <section className="mt-4 flex justify-center h-fit">
        <form className="w-auto h-max rounded-3xl bg-FAST-WhiteCream p-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-auto2 mb-6" >
            <div className="flex flex-col ml-4 gap-[15px] ">
              <InputSection 
              tipo="text" 
              frase="Nombre" 
              etiqueta="Nombre del propietario" 
              register={register} 
              name="nombreCompleto" />

              <InputSection 
              tipo="email" 
              frase="lia@gmail.com" 
              etiqueta="Correo electrónico" 
              register={register} 
              name="email" 
              mensaje={emailExist ? emailExist : ''} />
              <InputSection 
              tipo="tel" 
              frase="Ene" 
              etiqueta="Teléfono del kiosco" 
              register={register} 
              name="numeroTelefono" 
              mensaje={mensajeUser ? mensajeUser : ''} />

              <InputSection
               tipo="text" 
               frase="Delicias Lia" 
               etiqueta="Nombre del kiosco" 
               register={register} 
               name="nomKiosko" 
               mensaje={kioskoExist ? kioskoExist : ''} />
              
            </div>
            <div className="ml-28 mt-6">
              {/* Use ImageUpload component */}
              <ImageUpload 
              defaultImageUrl={imageUrl || FASTKioskImage2} 
              onChange={uploadImage} 
              register={register} 
              name="foto" />
            </div>
          </div>
          {/*Button*/}
          <div className="flex justify-center">
            <div className="grid items-center ">
              <button 
              type="submit" 
              className="w-72 h-[40px] bg-FAST-Orange text-FAST-WhiteCream cursor-pointer hover:bg-[#ed6d1f] font-bold uppercase rounded-lg">Registrarme</button>
              <p className={`left-0 text-left text-[#FF0400] ${showErrorMessage ? '' : 'hidden'}`}>No todos los campos han sido llenados</p>
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}

export default RegistroCompleto

