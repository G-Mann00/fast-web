/* 
Este archivo sirve para exportar todos los links de las rutas del sidebar, 
con sus respectivos iconos y nombres. 
*/

// Iconos
import { 
    HiOutlineViewGrid, 
    HiOutlineCube, 
    HiOutlineShoppingCart, 
    HiOutlineOfficeBuilding, 
    HiOutlineCog, 
    HiOutlineQuestionMarkCircle } 
    from "react-icons/hi"
    
import { FiUser } from "react-icons/fi";
// Rutas principales del sidebar
export const SIDEBAR_LINKS = [
    {
        key: "inicio",
        label: "Inicio",
        path: "/dashboard",
        icon: <HiOutlineViewGrid />
    },
    {
        key: "productos",
        label: "Productos",
        path: "/dashboard/productos",
        icon: <HiOutlineCube />
    },
    {
        key: "ordenes",
        label: "Ordenes",
        path: "/dashboard/ordenes",
        icon: <HiOutlineShoppingCart />
    },
    {
        key: "cajeros",
        label: "Cajeros",
        path: "/dashboard/cajeros",
        icon: <FiUser />
    },
    {
        key: "kiosko",
        label: "Kiosco",
        path: "/dashboard/kiosko",
        icon: <HiOutlineOfficeBuilding />
    }
]

// Rutas secundarias del sidebar
export const SIDEBAR_BOTTOM_LINKS = [
    {
        key: "ajustes",
        label: "Ajustes de perfil",
        path: "/dashboard/ajustes",
        icon: <HiOutlineCog />
    },
    {
		key: 'ayuda y soporte',
		label: 'Ayuda y soporte',
		path: 'https://drive.google.com/file/d/1PfApvTSsvW93eYTY-rDAgG-ygC0qkg0i/view?usp=sharing',
		icon: <HiOutlineQuestionMarkCircle />
	}
]
