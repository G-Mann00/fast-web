import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

function App() {

  return (
    <Routes>
      {/* Enrutamiento a la LandingPage */}
      <Route path="/" element={<LandingPage />}></Route>

      {/* Enrutamiento a la página de Login */}
      <Route path="/Login" element={<Login />}></Route>
    </Routes>
  )
}

export default App
