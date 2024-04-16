import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import logo from "../assets/img/fast-logo.svg";
import DocumentTitle from "../components/DocumentTitle";
import InputSection from "../components/InputSection";
import ImageUpload from "../components/ImageUpload";
import kioskImage from '../assets/img/kiosko.png';
import { useForm } from 'react-hook-form';
import { createUser, isUsernameAvailable, isKioskonameAvailable } from "../lib/database/users";


const RegistroCompleto = () => {

  DocumentTitle("Registro");
    // State to store the image URL
    const [imageUrl, setImageUrl] = useState(null); 
    const [showErrorMessage, setErrorMessage] = useState(false);
    const { register, handleSubmit } = useForm();
    const [passwordTooShort, setPasswordTooShort] = useState(false); //estado para mostrar mensaje de contraseña muy corta
    const [passwordMismatch, setPasswordMismatch] = useState(false); //estado para mostrar mensaje de contraseñas no coinciden
    const [userExist, setUserExist] = useState(false); //estado para mostrar mensaje de usuario ya existente
    const [kioskoExist, setKioskoExist] = useState(false); //estado para mostrar mensaje de kiosko ya existente

    // State to store the file
    // eslint-disable-next-line no-unused-vars
    const [file, setFile] = useState(null); 

      // Define handleImageUrlChange function outside of useEffect
      const handleImageFileChange = (file) => {
        setImageUrl(URL.createObjectURL(file)); // Opcional: para mostrar la imagen subida
        setFile(file); // Guarda el archivo en el estado
    };

  useEffect(() => {
    // Cleanup function
    return () => {
      setImageUrl(null);
    };
  }, []);

   // Función para verificar si todos los campos han sido llenados
   const allFieldsFilled = (data) => {
    return Object.values(data).every(value => value !== '' && value !== null);
};

// Función para verificar si las contraseñas coinciden
function passwordMatch(data) {
  if (data.password.length < 5) {
      setPasswordTooShort(true);
      setPasswordMismatch(false);
      return false;
  } else if (data.password !== data.confirmarPassword) {
      setPasswordMismatch(true);
      setPasswordTooShort(false);
      return false;
  } else {
      setPasswordTooShort(false);
      setPasswordMismatch(false);
      return true;
  }
}

const checkUser = async (nomUser) => {
  // Verifica si el nombre de usuario ya existe
  const isAvailable = await isUsernameAvailable(nomUser);
  
  if (isAvailable) {
      // El nombre de usuario está disponible
      return true;
  } else {
      // El nombre de usuario ya existe
      setUserExist(true);
      return false;
  }
};

const checkKiosko = async (nomKiosko) => {
  // Verifica si el nombre de usuario ya existe
  const isAvailable = await isKioskonameAvailable(nomKiosko);
  
  if (isAvailable) {
      // El nombre de kiosko está disponible
      return true;
  } else {
      // El nombre de usuario ya existe
      setKioskoExist(true);
      return false;
  }
};


const onSubmit = async (data) => {
  if (allFieldsFilled(data) && file) {
      if (passwordMatch(data)) {
        const userAvailable = await checkUser(data.nomUsuario);
        const kioskoAvailable = await checkKiosko(data.nomKiosko);
          if (userAvailable && kioskoAvailable) {
              createUser(data, file);
          } 
      }
  } else {
      setErrorMessage(true);
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
            <form className="w-11/12 h-full rounded-3xl bg-FAST-WhiteCream pt-6 pb-9"onSubmit={handleSubmit(onSubmit)}>
            <div className="pl-[75px] grid grid-cols-3 md:grid-cols-3 gap-[70px] w-auto" >
                <div>
                <p className={`left-0 text-left  text-FAST-WhiteCream ${userExist ? '' : 'hidden'}`}>Nombre de usuario no disponible</p>
                <InputSection tipo="text" frase="Nombre" etiqueta="Nombre Completo" register={register} name="nombreCompleto" />
                <p className={`left-0 text-left  text-FAST-WhiteCream ${kioskoExist ? '' : 'hidden'}`}>Nombre de kiosko no disponible</p>
                <InputSection tipo="email" frase="lia@gmail.com" etiqueta="Correo electrónico"  register={register} name="email" />
                <p className={`left-0 text-left text-[#FF0400] ${passwordTooShort ? '' : 'hidden'}`}>La contraseña es demasiado corta (mínimo 5 caracteres)</p>
                <p className={`left-0 text-left  text-FAST-WhiteCream ${passwordMismatch ? '' : 'hidden'}`}>Las contraseñas no coinciden</p>
                <InputSection tipo="password" frase="contraseña" etiqueta="Contraseña"  register={register} name="password" />
                </div>
                <div>
                <p className={`left-0 text-left text-[#FF0400] ${userExist ? '' : 'hidden'}`}>Nombre de usuario no disponible</p>
                <InputSection tipo="text" frase="Ene" etiqueta="Nombre de Usuario" register={register} name="nomUsuario" />
                <p className={`left-0 text-left text-[#FF0400] ${kioskoExist ? '' : 'hidden'}`}>Nombre de kiosko no disponible</p>
                <InputSection tipo="text" frase="Delicias Lia" etiqueta="Nombre del kiosko"  register={register} name="nomKiosko" />
                <p className={`left-0 text-left text-FAST-WhiteCream ${passwordTooShort ? '' : 'hidden'}`}>La contraseña es demasiado corta (mínimo 5 caracteres)</p>
                <p className={`left-0 text-left text-[#FF0400] ${passwordMismatch ? '' : 'hidden'}`}>Las contraseñas no coinciden</p>
                <InputSection tipo="password" frase="Contraseña" etiqueta="Confirmar Contraseña" register={register} name="confirmarPassword" />
                </div>
                <div>
                    {/* Use ImageUpload component */}
                    <ImageUpload defaultImageUrl={imageUrl || kioskImage} onChange={handleImageFileChange}  register={register} name="foto"/>
                </div>
            </div>
             {/*Button*/}
           <div className="pt-6 flex justify-center">
            <div className="grid items-center ">
              <p className={`pb-6 left-0 text-left text-[#FF0400] ${showErrorMessage ? '' : 'hidden'}`}>No todos los campos han sido llenados</p>
              <button type="submit" className="w-72 h-[40px] bg-FAST-Orange text-FAST-WhiteCream cursor-pointer hover:bg-[#ed6d1f] font-bold uppercase rounded-lg">Registrarme</button>
            </div>
           </div>

              
            </form>
        </section>
    </main>
  )
}

export default RegistroCompleto