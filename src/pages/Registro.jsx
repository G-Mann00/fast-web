import { Link } from "react-router-dom";
import logo from "../assets/img/fast-logo.svg";
import DocumentTitle from "../components/DocumentTitle";

const handleClick = () => {
  window.location.href = '/RegistroKiosko';
};

const Registro = () => {
  DocumentTitle("Registro de usuario");
  return (
    <main className="flex justify-between align-center h-screen w-screen bg-FAST-DarkBlue px-2 py-6 sm:px-8 sm:py-10">
      
      {/*logo*/}
      <Link to="/">
        <div className="place-self-start">
          <img className='w-fit max-w-[220px] h-fit max-h-[60px]' src={logo} alt="Fast logo" />
        </div>
      </Link>
      {/* Register Container */}
      <div className="place-self-center space-y-2">
        {/* Register and data message */}
        <p className="text-FAST-WhiteCream text-2xl font-bold sm:text-3xl text-center">Registrate para administrar tu kiosko</p>
        <p className="text-FAST-WhiteCream font-bold text-lg text-center">Datos Personales</p>
        {/* Formulario de registro */}
        <form className="w-full h-full rounded-3xl bg-FAST-WhiteCream p-5">
           {/* Complete Name and User name label */}
           <div className="grid grid-cols-2 gap-5">
           <h2 className="text-left font-bold">Nombre Completo</h2>
           <h2 className="text-left font-bold">Nombre de Usuario</h2>
           </div>
            {/* Complete name and user name input*/}
           <div className="mt-1 grid grid-cols-2 gap-5">
            <input className="h-[40px] w-72 rounded-lg bg-[#A0A5BA]/20 p-3" type="firstName" placeholder="John" />
            <input className="h-[40px] w-72 rounded-lg bg-[#A0A5BA]/20 p-3" type="lastName" placeholder="Smith" />
           </div>
            {/* Label and Email Input */}
           <div className="mt-5"> 
             <h2 className="text-left pb-1 font-bold">Correo electrónico</h2>
             <input className="h-[40px] w-full rounded-lg bg-[#A0A5BA]/20 p-3" type="email" placeholder="fast@gmail.com" />
           </div>
            {/* Password label*/}
            <div className="mt-5 grid grid-cols-2 gap-5">
             <h2 className="text-left font-bold">Contraseña</h2>
             <h2 className="text-left font-bold">Confirmar Contraseña</h2>
            </div>
            {/* Password Input */}
             <div className="mt-1 grid grid-cols-2 gap-5">
             <input className="h-[40px] w-72 rounded-lg bg-[#A0A5BA]/20 p-3" type="password"placeholder="* * * * * * * *" />
            <input className="h-[40px] w-72 rounded-lg bg-[#A0A5BA]/20 p-3" type="lastName" placeholder="* * * * * * * *" />
           </div>
           {/*Button*/}
           <div className="mt-5 flex justify-center"> 
              <button type="button" className="w-72 h-10 bg-FAST-Orange text-FAST-WhiteCream cursor-pointer hover:bg-[#ed6d1f] font-bold uppercase rounded-lg"onClick={handleClick}>Siguiente</button>
           </div>
        </form>
      </div>
      {/* Link to Login page */}
      <div className="flex justify-self-end">
        <p className="text-FAST-WhiteCream font-bold">¿Ya tienes una cuenta?</p>
        <a href="/Login" className="font-bold uppercase text-FAST-Orange pl-1 cursor-pointer hover:underline">Iniciar sesión →</a>
      </div>
    </main>
  );
}

export default Registro;


