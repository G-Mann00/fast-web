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
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Enrutamiento a la LandingPage */}
        <Route path="/" element={<LandingPage />} />

        {/* Enrutamiento a la página de Login */}
        <Route path="/Login" element={<Login />} />

        {/* Enrutamiento a la página de Registro */}
        <Route path="/Registro" element={<RegistroCompleto />} />

        {/* Enrutamiento a la página de error 404 */}
        <Route path="*" element={<Error404 />} />

        {/* Enrutamiento al dashboard y sus rutas hijas */}
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Inicio />} />
          <Route path="/dashboard/productos" element={<Productos />} />
          <Route path="/dashboard/ordenes" element={<Ordenes />} />
          <Route path="/dashboard/kiosko" element={<ConfigKiosko />} />
          <Route path="/dashboard/ajustes" element={<Ajustes />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
