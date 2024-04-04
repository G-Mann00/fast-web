import { Link, useLocation } from "react-router-dom"
import classNames from 'classnames'
import { SIDEBAR_LINKS, SIDEBAR_BOTTOM_LINKS } from "../../lib/constants"
import { HiOutlineLogout } from "react-icons/hi"

// Estilo general para los links de la sidebar
const linkClass = 'flex items-center gap-2 font-normal px-3 py-2 hover:bg-[#2B3045] hover:no-underline active:bg-FAST-Orange rounded-sm text-xl'

const Sidebar = () => {

  return (
    <div className="bg-FAST-DarkBlue w-60 p-3 flex flex-col text-FAST-WhiteCream">
      
      {/* Perfil del Kiosko */}
      <div className="flex flex-col items-center justify-center p-8 gap-3 h-[31vh]">
        <img
          src="https://img.freepik.com/foto-gratis/anciano-sonriente-gafas_23-2148740051.jpg"
          className="w-40 h-40 object-cover rounded-full ring-8 ring-FAST-Orange"
        />
        <h1 className="text-xl text-FAST-WhiteCream font-medium text-center pt-2">Kiosko El Viejo</h1>
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
        <div className={classNames(linkClass, 'cursor-pointer text-[#ef4444] active:bg-[#ef4444] active:text-FAST-WhiteCream')}>
			    <span className="text-xl">
				    <HiOutlineLogout />
			    </span>
			    Cerrar Sesión
		    </div>
      </div>

    </div>
  )
}

// Componente para las rutas de la sidebar, recibe un link como parametro
const SidebarLink = ({link}) => {

  // Hook para obtener la ruta actual
  const pathname = useLocation()

  // Estilo general para los links de la sidebar
  return (
    <Link
    to={link.path}
    className= {classNames(pathname === link.path ? 'bg-FAST-Orange text-white' : 'text-FAST-WhiteCream', linkClass)}
    >
        <span className="text-xl">{link.icon}</span>
        {link.label}
    </Link>
  )
}

export default Sidebar
