import servicesImg1 from "../../assets/img/landing-services-4.png";
import servicesImg2 from "../../assets/img/landing-services-5.png";
import servicesImg3 from "../../assets/img/landing-services-6.png";

const Services = () => {
  return (
    <section id="servicios" className="relative mt-20 px-6 lg:px-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-lg sm:text-xl font-medium text-FAST-Orange">
          - Nuestros Servicios -
        </h1>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-FAST-Text">
          Simplificamos tu experiencia con FAST
        </h2>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-10 lg:gap-12">
        {/* Card 1 */}
        <div className="flex flex-col items-center text-center max-w-sm w-full bg-white rounded-2xl p-6 shadow-md transition-transform duration-300 hover:scale-[1.02]">
          <div className="w-full aspect-square flex justify-center items-center">
            <img
              src={servicesImg1}
              alt="Haz tu pedido con FAST"
              className="w-[90%] h-[90%] object-contain rounded-xl"
            />
          </div>
          <h3 className="mt-8 text-2xl font-semibold text-FAST-Text">
            Haz tu pedido
          </h3>
          <p className="mt-3 text-lg text-[#797979] leading-relaxed">
            Realiza tu pedido fácilmente desde la app y evita las filas.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center text-center max-w-sm w-full bg-white rounded-2xl p-6 shadow-md transition-transform duration-300 hover:scale-[1.02]">
          <div className="w-full aspect-square flex justify-center items-center">
            <img
              src={servicesImg2}
              alt="Retira tu pedido sin esperar"
              className="w-[90%] h-[90%] object-contain rounded-xl"
            />
          </div>
          <h3 className="mt-8 text-2xl font-semibold text-FAST-Text">
            Retira tu comida
          </h3>
          <p className="mt-3 text-lg text-[#797979] leading-relaxed">
            Recoge tu pedido sin demoras y paga fácilmente al retirarlo.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center text-center max-w-sm w-full bg-white rounded-2xl p-6 shadow-md transition-transform duration-300 hover:scale-[1.02]">
          <div className="w-full aspect-square flex justify-center items-center">
            <img
              src={servicesImg3}
              alt="Disfruta con FAST"
              className="w-[90%] h-[90%] object-contain rounded-xl"
            />
          </div>
          <h3 className="mt-8 text-2xl font-semibold text-FAST-Text">
            Disfruta tu tiempo
          </h3>
          <p className="mt-3 text-lg text-[#797979] leading-relaxed">
            Disfruta de tu comida sin esperas, rápido y sin complicaciones.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
