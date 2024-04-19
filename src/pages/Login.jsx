import { DocumentTitle, PasswordInput } from "../components/index";
import logo from "../assets/img/fast-logo.svg";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import RegistroCompleto from "./RegistroCompleto";
import { authenticateUser, hasTiendaRecords } from "../services/database/index";
import { useUser } from '../hooks/user';


const Login = () => {

  DocumentTitle("Inicio de sesion");
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState('');
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setErrorMessage] = useState(false);
  const [noKiosko, setNoKiosko] = useState(false);
  const { loginUser } = useUser(); // Importar el hook `useUser` del contexto de usuario
  const navigate = useNavigate();

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
  };

  const onSubmit = async (data) => {
    // Inicializar estado de carga y mensaje de error
    setIsLoading(true);
    setErrorMessage(false);

    try {
      // Intentar autenticar al usuario con el correo y contraseña proporcionados
      const user = await authenticateUser(data.email, data.password);

      if (!user) {
        console.log('Usuario no encontrado');
        setErrorMessage(true);
      } else if (!await hasTiendaRecords(user.id)) {
        console.log('Usuario no tiene tienda');
        setNoKiosko(true);
      } else {
        console.log('Usuario encontrado login:', user);
        loginUser(user);
        navigate('/dashboard'); // Redirigir al dashboard
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="flex h-svh bg-FAST-DarkBlue justify-center px-2 py-6 sm:px-8 sm:py-10">
        <div className="flex max-h-[500px] flex-col items-center space-y-6">
          <Link to="/">
            <img className='w-fit max-w-[220px] h-fit max-h-[60px]' src={logo} alt="Fast logo" />
          </Link>
          <p className="text-FAST-WhiteCream text-2xl font-bold sm:text-3xl">Te damos la bienvenida</p>

          {/*Contenedor del login*/}
          <form className="flex size-full flex-col items-center justify-around rounded-3xl bg-FAST-WhiteCream p-5 text-left" onSubmit={handleSubmit(onSubmit)}>
            <p className={`left-0 text-left text-[#FF0400] ${showErrorMessage ? '' : 'hidden'}`}>Correo o clave inválidos</p>
            <p className={`left-0 text-left text-[#FF0400] ${noKiosko ? '' : 'hidden'}`}>Este usuario no tiene kiosko</p>
            {/*Campo de correo electronico*/}
            <div className="flex w-full flex-col">
              <h2 className="text-left pb-1 font-bold">Correo electrónico</h2>
              <input className="h-[40px] w-full rounded-lg bg-[#A0A5BA]/20 p-3" placeholder="fast@gmail.com" {...register("email")} />
            </div>

            {/*Campo de clave*/}
            <div className="flex w-full flex-col">
              <h2 className="text-left pb-1 font-bold">Contraseña</h2>
              <PasswordInput onPasswordChange={handlePasswordChange} register={register} />
              <a className="right-0 text-right text-FAST-Orange pt-1 hover:underline cursor-pointer">Olvide mi contraseña</a>
            </div>

            <button className='h-[40px] w-full rounded-lg bg-FAST-Orange font-bold uppercase text-[#FFFFFF] cursor-pointer hover:bg-[#ed6d1f]' disabled={isLoading} type='submit'>{isLoading ? "Cargando" : "Entrar"}</button>

            {/*Registro de nueva cuenta*/}
            <div className="flex justify-center">
              <p className="text-base text-[#646982] pb-1.5">¿No tienes una cuenta?</p>
              <Link to="/Registro" element={<RegistroCompleto />} className="font-bold uppercase text-FAST-Orange pl-1 hover:underline cursor-pointer ">Registrate</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;

