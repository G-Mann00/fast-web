import DocumentTitle from "../components/DocumentTitle";
import logo from "../assets/img/fast-logo.svg";
import PasswordInput from "../components/PasswordInput";
import pb from "../lib/database/pocketbase";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { Link} from "react-router-dom";
import Registro from "./Registro";


const Login = () => {

  DocumentTitle("Inicio de sesion");
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState('');
  const {register, handleSubmit} = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = pb.authStore && pb.authStore.model && pb.authStore.model.isValid;
 

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);

};
const [showErrorMessage, setErrorMessage] = useState(false);
  async function login(data) {
    setIsLoading(true);
    try{
      console.log(data);
      console.log(pb);
      setErrorMessage(false)
      // eslint-disable-next-line no-unused-vars
      const authData = await pb.collection('usersAdmin').authWithPassword(data.email, data.password);
      window.open("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7jmwoYw40828KRP7F49YTdtifEEjxn6JZ41PdwTWRfA&s", "_blank");

    } catch (error) {
      setErrorMessage(true);
    }
    setIsLoading(false);
  }

  if (isLoggedIn) {
    return alert(pb.authStore.model.email);
  }

  return (
    <>
      <main className="flex h-svh bg-FAST-DarkBlue justify-center px-2 py-6 sm:px-8 sm:py-10">
        <div className="flex max-h-[500px] flex-col items-center space-y-6">
          <Link to="/">
            <img className='w-fit max-w-[220px] h-fit max-h-[60px]' src={logo} alt="Fast logo"/>
          </Link>
          <p className="text-FAST-WhiteCream text-2xl font-bold sm:text-3xl">Te damos la bienvenida</p>

          {/*Contenedor del login*/ }
          <form className="flex size-full flex-col items-center justify-around rounded-3xl bg-FAST-WhiteCream p-5 text-left" onSubmit={handleSubmit(login)}>
          <p className={`left-0 text-left text-[#FF0400] ${showErrorMessage ? '' : 'hidden'}`}>Correo o clave inválidos</p>

               {/*Campo de correo electronico*/}
            <div className="flex w-full flex-col">
              <h2 className="text-left pb-1 font-bold">Correo electrónico</h2>
              <input className="h-[40px] w-full rounded-lg bg-[#A0A5BA]/20 p-3" placeholder="fast@gmail.com" {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}/>

            </div>

            {/*Campo de clave*/ }
            <div className="flex w-full flex-col">
              <h2 className="text-left pb-1 font-bold">Contraseña</h2>
              <PasswordInput onPasswordChange={handlePasswordChange} register={register} />
              <a className="right-0 text-right text-FAST-Orange pt-1 hover:underline cursor-pointer">Olvide mi contraseña</a>
            </div>

            <button className='h-[40px] w-full rounded-lg bg-FAST-Orange font-bold uppercase text-[#FFFFFF] cursor-pointer hover:bg-[#ed6d1f]' disabled={isLoading}type='submit'>{isLoading ? "Cargando" : "Entrar"}</button>
            
            {/*Registro de nueva cuenta*/}
            <div className="flex justify-center">
              <p className="text-base text-[#646982] pb-1.5">¿No tienes una cuenta?</p>
              <Link to="/Registro" element={<Registro/>} className="font-bold uppercase text-FAST-Orange pl-1 hover:underline cursor-pointer ">Registrate</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;

