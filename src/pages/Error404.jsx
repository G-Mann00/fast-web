import DocumentTitle from "../components/DocumentTitle";
import alert from "../assets/img/triangulo-alerta.png";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  DocumentTitle("Error 404 (Not Found)");
  const navigate = useNavigate();

  return (
    <main className="flex h-svh bg-FAST-DarkBlue justify-center px-2 py-6 sm:px-8 sm:py-10">
        <div className="flex flex-col items-center space-y-6">
            <img src={alert} alt="Triangulo naranja de alerta" className="mt-12"/>
            <p className="text-FAST-WhiteCream text-5xl font-bold">404 Not Found</p>
            <p className="text-FAST-WhiteCream text-3xl font-bold">Esta pagina no existe</p>
            <p className="text-FAST-WhiteCream text-xl font-bold">Por favor, verifica la URL</p>

            <div className="mt-5 flex justify-center"> 
              <button type="button" className="w-56 h-10 bg-FAST-Orange text-FAST-WhiteCream cursor-pointer hover:bg-[#ed6d1f] font-bold uppercase rounded-lg"
              onClick={() => navigate(-1)}
              >Regresar</button>
           </div>
        </div>
    </main>
  )
}

export default Error404
