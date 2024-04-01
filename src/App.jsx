import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Registro from "./pages/Registrarme";
import RegisterKiosk from "./pages/RegisterKiosk";

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
    </Routes>
  )
}

export default App
