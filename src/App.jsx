import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import RegistroCompleto from "./pages/RegistroCompleto";
import Error404 from "./pages/Error404";
import MainLayout from "./layouts/MainLayout";
import Inicio from "./pages/dashboard/Inicio";
import Productos from "./pages/dashboard/Productos";
import Ordenes from "./pages/dashboard/Ordenes";
import ConfigKiosko from "./pages/dashboard/AjustesKiosko";
import Ajustes from "./pages/dashboard/Ajustes";

function App() {

  return (
    <Routes>
      {/* Enrutamiento a la LandingPage */}
      <Route path="/" element={<LandingPage />}></Route>

      {/* Enrutamiento a la página de Login */}
      <Route path="/Login" element={<Login />}></Route>

      {/* Enrutamiento a la página de Registro */}
      <Route path="/Registro" element={<RegistroCompleto />}></Route>

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
