import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import logo from "../assets/img/fast-logo.svg";
import DocumentTitle from "../components/DocumentTitle";
import InputSection from "../components/InputSection";
import ImageUpload from "../components/ImageUpload";
import kioskImage from '../assets/img/kiosko.png';

const RegistroCompleto = () => {
  DocumentTitle("Registro");
    // State to store the image URL
    const [imageUrl, setImageUrl] = useState(null); 
      // Define handleImageUrlChange function outside of useEffect
  const handleImageUrlChange = (url) => {
    setImageUrl(url);
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      setImageUrl(null);
    };
  }, []);
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
           <div className="pb-6 width-full grid justify-items-center pt-10 ">
            <p className="text-FAST-WhiteCream text-2xl font-bold sm:text-3xl text-center">Registrate para empezar a administrar tu kiosko</p>
           </div>
        <section className="pt-4 flex justify-center h-5/6">
            <form className="w-11/12 h-full rounded-3xl bg-FAST-WhiteCream pt-6 pb-9">
            <div className="pl-[75px] grid grid-cols-3 md:grid-cols-3 gap-[70px] w-auto" >
                <div>
                <InputSection tipo="text" frase="Nombre" etiqueta="Nombre Completo"/>
                <InputSection tipo="email" frase="lia@gmail.com" etiqueta="Correo electrónico"/>
                <InputSection tipo="password" frase="contraseña" etiqueta="Confirmar Contraseña"/>
                </div>
                <div>
                <InputSection tipo="text" frase="Ene" etiqueta="Nombre de Usuario"/>
                <InputSection tipo="text" frase="One-Piece" etiqueta="Nombre del kiosko"/>
                 <InputSection tipo="password" frase="contraseña" etiqueta="Confirmar Contraseña"/>
                </div>
                <div>
                    {/* Use ImageUpload component */}
                    <ImageUpload defaultImageUrl={imageUrl || kioskImage} onChange={handleImageUrlChange} />
                </div>
            </div>
             {/*Button*/}
           <div className="pt-6 flex justify-center"> 
              <button type="button" className="w-72 h-[40px] bg-FAST-Orange text-FAST-WhiteCream cursor-pointer hover:bg-[#ed6d1f] font-bold uppercase rounded-lg">Registrarme</button>
           </div>

              
            </form>
        </section>
    </main>
  )
}

export default RegistroCompleto