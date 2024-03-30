import firstCard from '../assets/img/services-img-one.png'
import secondCard from '../assets/img/services-img-two.png'
import thirdCard from '../assets/img/services-img-three.png'

const Services = () => {
  return (
    <div className="relative mt-20">

        {/* Services Header */}
        <div className="text-center">
            <h1 className=" text-xl font-medium text-FAST-Orange">
                - Nuestros Servicios -
            </h1>
        </div>

        {/* Services Cards */}
        <div className="flex justify-around mt-7 space-x-10">

            {/* Se debe buscar una mejor manera de construir esto, el simple texto puede desvaratar los margenes de imagen y no se porque, ultima vez que tomo codigo generado con ia a partir de diseño -L */}
            {/* First Card */}
            <div className="flex flex-col max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow text-center text-neutral-800 max-md:mt-10">
                <img src={firstCard} alt="first service" className="max-w-full w-full aspect-[1.04]" />
                <h3 className="mt-9 text-3xl font-semibold">Ordena desde donde estés</h3>
                <p className="mt-4 text-xl font-medium leading-8 text-center text-[#797979]">Ordena desde tu comodidad y disfruta al llegar. ¡Adiós a las filas de espera!</p>
                </div>
            </div>

            {/* Second Card */}
            <div className="flex flex-col max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow text-center text-neutral-800 max-md:mt-10">
                <img src={secondCard} alt="first service" className="max-w-full w-full aspect-[1.04]" />
                <h3 className="mt-9 text-3xl font-semibold">Es facil ordenar</h3>
                <p className="mt-4 text-xl font-medium leading-8 text-center text-[#797979]">Simplifica tu recepción de pedidos con nuestra automatización. ¡Hazlo fácil!</p>
                </div>
            </div>

            {/* Second Card */}
            <div className="flex flex-col max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow text-center text-neutral-800 max-md:mt-10">
                <img src={thirdCard} alt="first service" className="max-w-full w-full aspect-[1.04]" />
                <h3 className="mt-9 text-3xl font-semibold">Eficiencia sin demoras</h3>
                <p className="mt-4 text-xl font-medium leading-8 text-center text-[#797979]">Deja la rapidez del trabajo en nuestras manos, asi que enfocate en tu negocio!</p>
                </div>
            </div>
        </div>

      
    </div>
  )
}

export default Services
