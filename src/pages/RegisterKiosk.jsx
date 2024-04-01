import { useState, useEffect } from 'react';
import logo from "../assets/img/fast-logo.svg";
import ImageUpload from "../components/ImageUpload";
import kioskImage from '../assets/img/kiosko.png';

const RegisterKiosk = () => {
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
    <main className="flex justify-between align-center h-screen w-screen bg-FAST-DarkBlue px-2 py-6 sm:px-8 sm:py-10">
      <div className="place-self-start">
        <img className='w-fit max-w-[220px] h-fit max-h-[60px]' src={logo} alt="Fast logo" />
      </div>
      
      <div className="place-self-center space-y-2">
        <p className="text-FAST-WhiteCream text-2xl font-bold sm:text-3xl text-center">Registrate para administrar tu kiosko</p>
        <p className="text-FAST-WhiteCream font-bold text-lg text-center">Datos del Kiosko</p>
        
        <form className="w-full h-full rounded-3xl bg-FAST-WhiteCream p-5">
          <div className="grid grid-cols-2 gap-20">
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="mt-8 w-72">
                <h2 className="text-left pb-1 font-bold">Nombre Completo</h2>
                <input className="mt-1 h-[40px] w-full rounded-lg bg-[#A0A5BA]/20 p-3" type="kioskName" placeholder="Kiosko del che" />
              </div>
              <div className="mt-8 w-72">
                <h2 className="text-left pb-1 font-bold">Número de teléfono</h2>
                <input className="h-[40px] w-full rounded-lg bg-[#A0A5BA]/20 p-3" type="phoneNumber" placeholder="56712333" />
              </div>
              <div className="mt-8 w-72">
                <h2 className="text-left pb-1 font-bold">Correo del kiosko</h2>
                <input className="h-[40px] w-full rounded-lg bg-[#A0A5BA]/20 p-3" type="kioskEmail" placeholder="kioskoche@gmail.com" />
              </div>
            </div>
            <div className="w-60 flex flex-col items-center">
              {/* Use ImageUpload component */}
              <ImageUpload defaultImageUrl={imageUrl || kioskImage} onChange={handleImageUrlChange} />
            </div>
          </div>
          
          <div className="mt-5 flex justify-center"> 
            <button type="button" className="w-72 h-10 bg-FAST-Orange text-FAST-WhiteCream cursor-pointer hover:bg-[#ed6d1f] font-bold uppercase rounded-lg">Siguiente</button>
          </div>
        </form>
      </div>
      
      <div className="flex justify-self-end">
        <p className="text-FAST-WhiteCream font-bold">¿Ya tienes una cuenta?</p>
        <a href="/Login" className="font-bold uppercase text-FAST-Orange pl-1 cursor-pointer hover:underline">Iniciar sesión →</a>
      </div>
    </main>
  );
}

export default RegisterKiosk;
