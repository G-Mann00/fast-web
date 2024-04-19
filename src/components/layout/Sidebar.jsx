import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SIDEBAR_LINKS, SIDEBAR_BOTTOM_LINKS } from "../../lib/constants";
import { HiOutlineLogout } from "react-icons/hi";
import { buscarRegistroUsuario, generarUrlImagen } from "../../services/database/index";
import FASTKioskImage from '../../assets/img/FASTKioskImage.png';
// Importar los hooks useUser y useKiosk 
import { useUser } from '../../hooks/user';
import { useKiosk } from '../../hooks/kiosko';


// Estilo general para los links de la sidebar
const linkClass = 'flex items-center gap-2 font-normal px-3 py-2 hover:bg-[#2B3045] hover:no-underline active:bg-FAST-Orange rounded-sm text-xl';

const Sidebar = () => {
  // Usar el hook useUser para obtener el usuario almacenado y las funciones de login y logout
  const { user, logoutUser } = useUser();
  const [imageUrl, setImageUrl] = useState(null);
  const [nombreKiosko, setNombreKiosko] = useState('Kiosko FAST'); // Cambiar por el nombre del kiosko [nombreKiosko
  const navigate = useNavigate();
  const { loginKiosko, logoutKiosko } = useKiosk();


  // Define `logoutUser` con las acciones que quieres realizar
  const handleLogout = () => {
    // Llamar a la función de cierre de sesión original
    logoutUser();
    logoutKiosko();
    // Restablecer el estado de `imageUrl` (puedes cambiar `null` por otro valor si lo deseas)
    setImageUrl(null);
    // Redirigir al usuario a "/"
    navigate('/');
  };

  useEffect(() => {
    if (user) {
      buscarRegistroUsuario(user.id)
        .then((record) => {
          if (record) {
            const imageUrl = generarUrlImagen(record, 'imagen');
            // Usa loginKiosko para asignar el record al contexto de kiosko
            loginKiosko(record);
            setImageUrl(imageUrl);
            setNombreKiosko(record.nombre);
          } else {
            console.error('No se encontró el registro del usuario.');
          }
        })
        .catch((error) => {
          console.error('Error al buscar el registro del usuario:', error);
        });
    }
  }, [user, loginKiosko]);

  return (
    <div className="bg-FAST-DarkBlue w-60 p-3 flex flex-col text-FAST-WhiteCream">

      {/* Perfil del Kiosko */}
      <div className="flex flex-col items-center justify-center p-8 gap-3 h-[31vh]">
        <img
          src={imageUrl ? imageUrl : FASTKioskImage}
          className="w-40 h-40 object-cover rounded-full ring-8 ring-FAST-Orange"
          alt="Profile"
        />
        <h1 className="text-xl text-FAST-WhiteCream font-medium text-center pt-2">{nombreKiosko ? nombreKiosko : "Kiosko FAST"}</h1>
      </div>

      {/* Links de la sidebar */}
      <div className="py-2 flex flex-1 flex-col gap-0.5">
        {/* Links principales de la sidebar */}
        {SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>

      {/* Links del fondo de la sidebar */}
      <div className="flex flex-col gap-0.5 pt-2 border-t border-[#6B6E82]">
        {/* Links secundarios de la sidebar */}
        {SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}

        {/* Link de Cerrar Sesión */}
        <div
          className={classNames(linkClass, 'cursor-pointer text-[#ef4444] active:bg-[#ef4444] active:text-FAST-WhiteCream')}
          onClick={handleLogout}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Cerrar Sesión
        </div>
      </div>
    </div>
  );
};


// Componente para las rutas de la sidebar, recibe un link como parametro
const SidebarLink = ({ link }) => {
  // Hook para obtener la ruta actual
  const { pathname } = useLocation();

  // Estilo general para los links de la sidebar
  return (
    <Link
      to={link.path}
      className={classNames(pathname.pathname === link.path ? 'bg-FAST-Orange text-white' : 'text-FAST-WhiteCream', linkClass)}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
};

// Añadir PropTypes para validar las props del componente SidebarLink
SidebarLink.propTypes = {
  link: PropTypes.shape({
    path: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,
};

export default Sidebar;
