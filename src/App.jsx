import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import RegistroCompleto from "./pages/RegistroCompleto";
import AccesoDenegado from "./pages/AccesoDenegado";
import Error404 from "./pages/Error404";
import MainLayout from "./layouts/MainLayout";
import Inicio from "./pages/dashboard/Inicio";
import Productos from "./pages/dashboard/Productos";
import Ordenes from "./pages/dashboard/Ordenes";
import ConfigKiosko from "./pages/dashboard/AjustesKiosko";
import Ajustes from "./pages/dashboard/Ajustes";
import { UserProvider } from "./context/userContext";
import { KioskoProvider } from "./context/kioskoContext"; // Importar KioskoProvider
import { useUser } from '../src/hooks/user'; // Importar el hook useUser


function ProtectedRoute({ component: Component, ...rest }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 2000);
      return () => clearTimeout(timer); // limpiar el temporizador, le puse un tiempo de 2 segundos para que cuando refresque no lo dirija al /Denegado
    }
  }, [user]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate('/Denegado');
    }
  }, [shouldRedirect, navigate]);

  return user ? <Component {...rest} /> : null; //si encuentra un usuario, renderiza el componente, de lo contrario, no renderiza nada
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

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

        {/* Enrutamiento a la página de acceso denegado */}
        <Route path="/Denegado" element={<AccesoDenegado />} />

        {/* Enrutamiento al dashboard y sus rutas hijas */}
        <Route path="/dashboard" element={
          <KioskoProvider> {/* Envolver MainLayout con KioskoProvider */}
            <ProtectedRoute component={MainLayout} /> {/* Reemplazar Route por ProtectedRoute pasamos MainLayout como una prop */}
          </KioskoProvider>
        }>
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
