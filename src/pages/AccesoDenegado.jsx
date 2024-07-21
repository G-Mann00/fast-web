import DocumentTitle from "../components/DocumentTitle";
import prohibido from "../assets/img/circulo-restriccion.png";
import { useNavigate } from "react-router-dom";

const AccesoDenegado = () => {
  DocumentTitle("Acceso Denegado");
  const navigate = useNavigate();

  return (
    <main className="flex h-svh bg-FAST-DarkBlue justify-center px-2 py-6 sm:px-8 sm:py-10">
      <div className="flex flex-col items-center space-y-6">
        <img 
        src={prohibido} 
        alt="Circulo de restriccion" 
        className="mt-12" />
        <p className="text-FAST-WhiteCream text-5xl font-bold">Acceso Denegado</p>
        <p className="text-FAST-WhiteCream text-3xl font-bold">Usted no tiene permiso para entrar a esta pagina</p>

        <div className="mt-5 flex justify-center">
          <button type="button" className="w-56 h-10 bg-FAST-Orange text-FAST-WhiteCream cursor-pointer hover:bg-[#ed6d1f] font-bold uppercase rounded-lg"
            onClick={() => navigate('/')}
          >Regresar</button>
        </div>
      </div>
    </main>
  )
}

export default AccesoDenegado
