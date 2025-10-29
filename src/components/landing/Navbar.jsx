import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // íconos hamburger y cerrar
import logo from "../../assets/img/fast-logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#FFFFFF] sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img className="w-28 sm:w-36 lg:w-48" src={logo} alt="Fast Logo" />
        </div>

        {/* Links (desktop) */}
        <ul className="hidden lg:flex space-x-8">
          <li>
            <a className="text-lg lg:text-xl font-medium">Inicio</a>
          </li>
          <li>
            <a className="text-lg lg:text-xl font-medium">Servicios</a>
          </li>
          <li>
            <a className="text-lg lg:text-xl font-medium">Socios</a>
          </li>
          <li>
            <a className="text-lg lg:text-xl font-medium">Descarga</a>
          </li>
        </ul>

        {/* Buttons (desktop) */}
        <div className="hidden lg:flex space-x-4">
          <a
            href="/Login"
            className="bg-FAST-DarkBlue text-base lg:text-lg font-medium text-FAST-WhiteCream py-2 px-4 rounded-lg hover:bg-[#2B3045]"
          >
            Iniciar Sesion
          </a>
          <a
            href="/Registro"
            className="bg-FAST-Orange text-base lg:text-lg font-medium text-FAST-WhiteCream py-2 px-4 rounded-lg hover:bg-[#ed6d1f]"
          >
            Solicitar registro
          </a>
        </div>

        {/* Hamburger (mobile) */}
        <button className="lg:hidden p-2 text-FAST-Text" onClick={togglePanel}>
          <HiMenu size={28} />
        </button>
      </div>

      {/* Sidepanel mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={togglePanel}>
            <HiX size={28} />
          </button>
        </div>

        <ul className="flex flex-col items-start px-6 space-y-6 mt-6">
          <li>
            <a className="text-lg font-medium" onClick={togglePanel}>
              Inicio
            </a>
          </li>
          <li>
            <a className="text-lg font-medium" onClick={togglePanel}>
              Servicios
            </a>
          </li>
          <li>
            <a className="text-lg font-medium" onClick={togglePanel}>
              Socios
            </a>
          </li>
          <li>
            <a className="text-lg font-medium" onClick={togglePanel}>
              Descarga
            </a>
          </li>
        </ul>

        <div className="flex flex-col px-6 mt-6 space-y-4">
          <a
            href="/Login"
            className="bg-FAST-DarkBlue text-white py-2 px-4 rounded-lg text-center"
          >
            Iniciar Sesion
          </a>
          <a
            href="/Registro"
            className="bg-FAST-Orange text-white py-2 px-4 rounded-lg text-center"
          >
            Solicitar registro
          </a>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={togglePanel}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
