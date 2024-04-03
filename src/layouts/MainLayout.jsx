import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const MainLayout = () => {
return (
    <div className="h-screen w-screen overflow-hidden flex flex-row">
        <Sidebar/>
        <div className="bg-[#95f3e5]">Header pendiente</div>

        {/* Outlet para renderizar las rutas hijas */}
        <div> <Outlet/> </div>
    </div>
)
}

export default MainLayout
