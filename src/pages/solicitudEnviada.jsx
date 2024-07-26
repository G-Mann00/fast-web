import DocumentTitle from "../components/DocumentTitle";
import exito from "../assets/img/operacionExitosa.png";
import { useNavigate } from "react-router-dom";

const SolicitudEnviada = () => {
  DocumentTitle("Solicitud Enviada");
  const navigate = useNavigate();

  return (
    <main className="flex h-svh bg-FAST-DarkBlue justify-center items-center px-2 py-6 sm:px-8 sm:py-10">
        <div className="flex flex-col items-center space-y-6">
            <img 
            src={exito} 
            alt="Triangulo naranja de alerta" 
            className="mt-12"
            />
            <p className="text-FAST-WhiteCream text-4xl font-bold">
                Solicitud Enviada
            </p>
            <p className="text-FAST-WhiteCream text-xl font-bold">
              Gracias por preferir Fast.
            </p>
            <p className="text-FAST-WhiteCream text-xl font-bold">
              Le estaremos enviando un correo de confirmación.
            </p>
            <div className="mt-5 flex justify-center"> 
              <button type="button" className="w-56 h-10 bg-FAST-Orange text-FAST-WhiteCream cursor-pointer hover:bg-[#ed6d1f] font-bold uppercase rounded-lg"
              onClick={() => navigate('/')}
              >Aceptar</button>
           </div>
        </div>
    </main>
  )
}

export default SolicitudEnviada
