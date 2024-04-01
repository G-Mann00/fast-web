import image1 from '../assets/img/hero-image-1.png';
import image2 from '../assets/img/hero-image-2.png';

const Hero = () => {
return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">

        {/* Hero Header */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium text-center tracking-wide">
            Transforma tu experiencia de ordenes de comida con 
            <span className="bg-FAST-ORANGE">
                {" "}
                FAST!
            </span>
        </h1>

        {/* Hero Subtext */}
        <p className='mt-10 text-2xl text-center text-[#797979] max-w-4xl'>
            Evita largas filas a la hora de hacer tus pedidos con nuestra aplicacion movil 
           o registra tu kiosko y optimiza tu gestion de ordenes desde nuestro sitio web. No esperes mas y empieza a utilizar FAST!
        </p>

        {/* Hero Calls for action */}
        <div className='flex justify-center my-10'>
            <a
            href="/Registrarme"
            className="bg-FAST-Orange text-xl font-medium text-FAST-WhiteCream py-3 px-4 mx-3 rounded-lg hover:bg-[#ed6d1f]"
            >
            Registrate ya
            </a>

            <a 
            href="https://docs.google.com/document/d/1BTF859wrmj2FItA_RM5SjaNdsuu_ggZ74tNq4qYjsVc/edit?usp=sharing" 
            className="bg-FAST-DarkBlue text-xl font-medium text-FAST-WhiteCream py-3 px-4 mx-3 rounded-lg hover:bg-[#2B3045]"
            >
             Documentación
            </a>
        </div>

        {/* Hero Images */}
        <div className="flex mt-10 justify-center">
            <img className='mx-2 my-4' src={image1} alt='Mujer usando la aplicacion FAST'/>
            <img className='mx-2 my-4' src={image2} alt='Chef satisfecho con FAST'/>
        </div>

    </div>
);
}

export default Hero