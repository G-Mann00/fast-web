/* 
Este layout es el que se encarga de renderizar el sidebar, el header y el resto de pantallas
en el dashboard. 
*/

import { Outlet } from "react-router-dom"
import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"

const MainLayout = () => {
return (
    <div className="h-screen w-screen overflow-hidden flex flex-row bg-[#eff2f5]">
        <Sidebar />
        
        <div className="flex flex-col flex-1">
            <Header />

             {/* Outlet para renderizar las rutas hijas */}
            <div className="flex-1 p-4 min-h-0 overflow-auto">
                <Outlet/>
            </div>
        </div>

    </div>
)
}

export default MainLayout
