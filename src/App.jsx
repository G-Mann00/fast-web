import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Registro from "./pages/Registrarme";
import RegisterKiosk from "./pages/RegisterKiosk";
import Error404 from "./pages/Error404";
import MainLayout from "./layouts/MainLayout";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Ordenes from "./pages/Ordenes";
import ConfigKiosko from "./pages/ConfigKiosko";
import Ajustes from "./pages/Ajustes";

function App() {

  return (
    <Routes>
      {/* Enrutamiento a la LandingPage */}
      <Route path="/" element={<LandingPage />}></Route>

      {/* Enrutamiento a la página de Login */}
      <Route path="/Login" element={<Login />}></Route>

      {/* Enrutamiento a la página de Registro */}
      <Route path="/Registrarme" element={<Registro />}></Route>
      
      {/* Enrutamiento a la página de Registro de Kiosko*/}
      <Route path="/RegisterKiosk" element={<RegisterKiosk />}></Route>

      {/* Enrutamiento a la página de error 404*/}
      <Route path="*" element={<Error404 />}></Route>

      {/* Enrutamiento al dashboard y sus rutas hijas*/}
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Inicio />}></Route>
        <Route path="/dashboard/productos" element={<Productos />}></Route>
        <Route path="/dashboard/ordenes" element={<Ordenes />}></Route>
        <Route path="/dashboard/kiosko" element={<ConfigKiosko />}></Route>
        <Route path="/dashboard/ajustes" element={<Ajustes />}></Route>
      </Route>
    </Routes>
  )
}

export default App
