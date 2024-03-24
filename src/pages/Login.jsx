import DocumentTitle from "../components/DocumentTitle"
import logo from "../assets/img/fast-logo.svg"
import closedEye from "../assets/img/eye-closed.svg"


const Login = () => {
  DocumentTitle("Inicio de sesion")
  return (
    <>
    <main className="flex h-svh bg-FAST-DarkBlue justify-center px-2 py-6 sm:px-8 sm:py-10">
      
      <div className="flex max-h-[500px] flex-col items-center space-y-6">
        <img className='w-fit max-w-[220px] h-fit max-h-[60px]' src={logo} alt="Fast logo"/>
        <p className="text-FAST-WhiteCream text-2xl font-bold sm:text-3xl">Te damos la bienvenida</p>

        {/*Contenedor del login*/ }
        <form className="flex size-full flex-col items-center justify-around rounded-3xl bg-FAST-WhiteCream p-5 text-left">
          
          <p className="left-0 text-left text-[#FF0400] hidden">Nombre de usuario o clave inválidos</p>

          {/*Campo de correo electronico*/}
          <div className="flex w-full flex-col">
            <h2 className="text-left pb-1 font-bold">Correo electrónico</h2>
            <input 
            className= "h-[40px] w-full rounded-lg bg-[#A0A5BA]/20 p-3" 
            placeholder="fast@gmail.com"/>
          </div>

          {/*Campo de clave*/ }
          <div className="flex w-full flex-col">
            <h2 className="text-left pb-1 font-bold">Contraseña</h2>
            <div className="relative flex h-[40px] justify-items-end rounded-lg bg-[#A0A5BA]/20">
              <input 
              className="absolute size-full rounded-lg bg-[#A0A5BA]/[0] p-3"
              type="password"
              placeholder="* * * * * * * *"/>
              <button className="absolute right-4 top-[11px]">
                <img className="w-fit max-w-[24px] h-fit max-h-[24px] pt-0.5" src={closedEye} alt="Mostrar contraseña"/>
              </button>
            </div>
            <a className="right-0 text-right text-FAST-Orange pt-1 hover:underline cursor-pointer">Olvide mi contraseña</a>
          </div>

          <button className='h-[40px] w-full rounded-lg bg-FAST-Orange font-bold uppercase text-[#FFFFFF] cursor-pointer hover:bg-[#ed6d1f]' disabled type='submit'>Entrar</button>
          
          {/*Registro de nueva cuenta*/}
          <div className="flex justify-center">
            <p className="text-base text-[#646982] pb-1.5">¿No tienes una cuenta?</p>
            <a className="font-bold uppercase text-FAST-Orange pl-1 cursor-pointer hover:underline">REGISTRARTE</a>
          </div>

        </form>
      </div>
    </main>
    </>
  )
}

export default Login
