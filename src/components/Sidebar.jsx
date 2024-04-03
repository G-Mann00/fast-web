import { Link, useLocation } from "react-router-dom"
import classNames from 'classnames'
import { HiOutlineViewGrid, HiOutlineCube, HiOutlineShoppingCart, HiOutlineOfficeBuilding, HiOutlineCog, HiOutlineLogout } from "react-icons/hi"

const Sidebar = () => {

    // Hook para obtener la ruta actual
    const pathname = useLocation()
    // Estilo general para los links de la sidebar
    const linkClass = 'flex items-center gap-2 font-normal px-3 py-2 hover:bg-[#2B3045] hover:no-underline active:bg-FAST-Orange rounded-sm text-xl'


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
        
        {/* Link de Dashboard */}
        <Link
        to={"/dashboard"}
        className= {classNames(pathname === "/dashboard" ? 'bg-FAST-Orange text-white' : 'text-FAST-WhiteCream', linkClass)}
        >
            <HiOutlineViewGrid className="text-xl"/>
            Inicio 
        </Link>

        {/* Link de Productos */}
        <Link
        to={"/dashboard/productos"}
        className= {classNames(pathname === "/dashboard/productos" ? 'bg-FAST-Orange text-white' : 'text-FAST-WhiteCream', linkClass)}
        >
            <HiOutlineCube className="text-xl"/>
            Productos 
        </Link>

        {/* Link de Ordenes */}
        <Link
        to={"/dashboard/ordenes"}
        className= {classNames(pathname === "/dashboard/ordenes" ? 'bg-FAST-Orange text-white' : 'text-FAST-WhiteCream', linkClass)}
        >
            <HiOutlineShoppingCart className="text-xl"/>
            Ordenes 
        </Link>

        {/* Link de Kiosko (configuracion de kiosko) */}
        <Link
        to={"/dashboard/kiosko"}
        className= {classNames(pathname === "/dashboard/kiosko" ? 'bg-FAST-Orange text-white' : 'text-FAST-WhiteCream', linkClass)}
        >
            <HiOutlineOfficeBuilding className="text-xl"/>
            Kiosko 
        </Link>

      </div>

      {/* Links del fondo de la sidebar */}
      <div className="flex flex-col gap-0.5 pt-2 border-t border-[#6B6E82]">

        {/* Link de Ajustes */}
        <Link
        to={"/dashboard/ajustes"}
        className= {classNames(pathname === "/dashboard/ajuste" ? 'bg-FAST-Orange text-white' : 'text-FAST-WhiteCream', linkClass)}
        >
            <HiOutlineCog className="text-xl"/>
            Ajustes de perfil 
        </Link>

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

export default Sidebar
