import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {

  return (
    <Routes>

      {/* Enrutamiento a pagina de login */}
      <Route path="/Login" element={<Login />}></Route>
    </Routes>
  )
}

export default App
