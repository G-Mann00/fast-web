import logo from "../assets/img/fast-logo.svg";

const Navbar = () => {
  return (
    <nav className="bg-[#FFFFFF] sticky top-0 z-50 py-3 shadow-md">
        <div className="container px-4 mx-auto relative lg:text-sm">
            <div className="flex justify-between items-center">

                {/* Logo */}
                <div className="flex items-center flex-shrink-0">
                    <img className= 'mr-2 mt-3 mb-3 w-fit max-w-[200px] h-fit max-h-[200px]' src={logo} alt="Fast logo"/>
                </div>

                {/* Navbar Links */}
                <ul className="hidden lg:flex ml-14 space-x-12">
                    <li><a className="text-xl font-medium">Inicio</a></li>
                    <li><a className="text-xl font-medium">Servicios</a></li>
                    <li><a className="text-xl font-medium">Socios</a></li>
                    <li><a className="text-xl font-medium">Descarga</a></li>
                </ul>

                {/* Navbar Buttons */}
                <div className="hidden lg:flex justify-center space-x-12 items-center">
                    <a href="/login" className="bg-FAST-DarkBlue text-xl font-medium text-FAST-WhiteCream py-2 px-3 border rounded-lg hover:bg-[#2B3045]">Iniciar Sesion</a>
                    <a href="/Registrarme" className="bg-FAST-Orange text-xl font-medium text-FAST-WhiteCream py-2 px-3 border rounded-lg hover:bg-[#ed6d1f]">Crea una Cuenta</a>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
