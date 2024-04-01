import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Registro from "./pages/Registrarme";
import RegisterKiosk from "./pages/RegisterKiosk";
import Error404 from "./pages/Error404";

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
    </Routes>
  )
}

export default App
