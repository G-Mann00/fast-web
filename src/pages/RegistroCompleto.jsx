import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { handleImageFileChange } from "../utils/index";

import logo from "../assets/img/fast-logo.svg";
import FASTKioskImage2 from '../assets/img/FASTKioskImage2.png';

import { DocumentTitle, InputSection, ImageUpload } from "../components/index";
import AlertCustomStyles from '../components/alerta';
import { checkUser, checkKiosko, nombreUsuarioValido } from "../services/validacion/index";
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

  // State to store the file
  const [file, setFile] = useState(null);

  /*const handleImageFileChange = (file) => {
    setImageUrl(URL.createObjectURL(file)); // Opcional: para mostrar la imagen subida
    setFile(file); // Guarda el archivo en el estado
  };*/

  const uploadImage = (file) => {
    handleImageFileChange(file, setImageUrl, setFile);
  }

  useEffect(() => {
    // Cleanup function
    return () => {
      setImageUrl(null);
    };
  }, []);

  // Efecto de React para manejar la navegación al dashboard cuando `userCreated` cambie
  useEffect(() => {
    if (userCreated) {
      // Espera un momento antes de redirigir al usuario
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // Tiempo en milisegundos (2 segundos)
    }
  }, [userCreated, navigate]);

  // Función para verificar si todos los campos han sido llenados
  const allFieldsFilled = (data) => {
    return Object.values(data).every(value => value !== '' && value !== null);
  };

  // Función para verificar si las contraseñas coinciden
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
    // Verifica si el nombre de usuario está disponible
    const userAvailable = await checkUser(data.nomUsuario);
    // Si el nombre de usuario ya existe, actualiza el estado de `setUserExist` a `true`
    if (!userAvailable) {
      setMensajeUser("Nombre de usuario no disponible");
    }

    // Verifica si el nombre del kiosko está disponible
    const kioskoAvailable = await checkKiosko(data.nomKiosko, 'create');
    // Si el nombre del kiosko ya existe, actualiza el estado de `setKioskoExist` a `true`
    if (!kioskoAvailable) {
      setKioskoExist('Nombre de kiosko no disponible');
    }

    // Retorna `true` solo si ambos `userAvailable` y `kioskoAvailable` son `true`
    return userAvailable && kioskoAvailable;
  };

  // Función para verificar si todos los campos están llenos y hay un archivo
  const validarCampos = (data, file) => {
    return allFieldsFilled(data) && file;
  };

  // Función para manejar la creación del usuario
  const manejarCreacionUsuario = async (data, file) => {
    try {
      // Crea el usuario y obtiene los datos del usuario recién creado
      const newUser = await createUser(data, file);
      // Si `newUser` se crea con éxito, actualiza el contexto del usuario
      if (newUser) {
        loginUser(newUser);
        setUserCreated(true);
      } else {
        // Si `createUser` retorna false, cambia el estado de `setEmailExist` a true
        setEmailExist('Este email ya está relacionado con otro usuario');
      }
    } catch (error) {
      // Si hay un error creando el usuario, muestra un mensaje de error
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
    estadosFalsos();
    const formatoValido = nombreUsuarioValido(data.nomUsuario);
    console.log(data)
    if (formatoValido) {
      setMensajeUser("El nombre de usuario debe tener al menos 4 caracteres y no contener espacios");
      return;
    }

    if (!validarCampos(data, file)) {
      // Si los campos no están llenos o falta el archivo, muestra un mensaje de error
      setErrorMessage(true);
      return;
    }
    if (passwordMatch(data)) {
      const nombresDisponibles = await checkNombres(data);
      if (nombresDisponibles) {
        await manejarCreacionUsuario(data, file);
      }
    }
  };

  return (
    <main className="flex flex-col align-center h-screen w-screen bg-FAST-DarkBlue px-2 py-6 sm:px-8 sm:py-10">
      {/*logo y mensaje de si y tienes cuenta registrate*/}
      <section className="w-full flex xl:flex-row flex-col justify-between h-[60px]">
        <div>
          <Link to="/">
            <img src={logo} alt="Fast logo" className="h-[60px] w-[300px] pt-6" />
          </Link>
        </div>
        <div className="flex pt-6">
          <p className="text-FAST-WhiteCream font-bold">¿Ya tienes una cuenta?</p>
          <a href="/Login" className="font-bold uppercase text-FAST-Orange pl-1 cursor-pointer hover:underline">Iniciar sesión →</a>
        </div>
      </section>
      <div className="pb-6 width-full grid justify-items-center">
        <p className="text-FAST-WhiteCream text-2xl font-bold sm:text-3xl text-center">Registrate para empezar a administrar tu kiosko</p>
      </div>
      <section className="pt-4 flex justify-center h-5/6">
        <form className="w-11/12 h-[550px] rounded-3xl bg-FAST-WhiteCream pt-6 pb-9" onSubmit={handleSubmit(onSubmit)}>
          {userCreated ? <AlertCustomStyles mensaje="Usuario creado correctamente" /> : ''}
          <div className="pl-[75px] grid grid-cols-3 md:grid-cols-3 gap-[70px] w-auto" >
            <div>
              <InputSection tipo="text" frase="Nombre" etiqueta="Nombre Completo" register={register} name="nombreCompleto" />
              <InputSection tipo="email" frase="lia@gmail.com" etiqueta="Correo electrónico" register={register} name="email" mensaje={emailExist ? emailExist : ''} />
              <InputSection tipo="password" frase="Contraseña" etiqueta="Contraseña" register={register} name="password" mensaje={passwordTooShort ? passwordTooShort : ''} />
            </div>
            <div>

              <InputSection tipo="text" frase="Ene" etiqueta="Nombre de Usuario" register={register} name="nomUsuario" mensaje={mensajeUser ? mensajeUser : ''} />
              <InputSection tipo="text" frase="Delicias Lia" etiqueta="Nombre del kiosko" register={register} name="nomKiosko" mensaje={kioskoExist ? kioskoExist : ''} />
              <InputSection tipo="password" frase="Contraseña" etiqueta="Confirmar Contraseña" register={register} name="confirmarPassword" mensaje={passwordMismatch ? passwordMismatch : ''} />
            </div>
            <div>
              {/* Use ImageUpload component */}
              <ImageUpload defaultImageUrl={imageUrl || FASTKioskImage2} onChange={uploadImage} register={register} name="foto" />
            </div>
          </div>
          {/*Button*/}
          <div className="pt-6 flex justify-center">
            <div className="grid items-center ">
              <button type="submit" className="w-72 h-[40px] bg-FAST-Orange text-FAST-WhiteCream cursor-pointer hover:bg-[#ed6d1f] font-bold uppercase rounded-lg">Registrarme</button>
              <p className={`pb-6 left-0 text-left text-[#FF0400] ${showErrorMessage ? '' : 'hidden'}`}>No todos los campos han sido llenados</p>
            </div>
          </div>


        </form>
      </section>
    </main>
  )
}

export default RegistroCompleto

