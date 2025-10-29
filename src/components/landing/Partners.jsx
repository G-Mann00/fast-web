import sociosImg1 from "../../assets/img/socios-noreal-logo-1.png";
import sociosImg2 from "../../assets/img/socios-noreal-logo-2.png";
import sociosImg3 from "../../assets/img/socios-noreal-logo-3.png";
import sociosImg4 from "../../assets/img/socios-noreal-logo-4.png";
import sociosImg5 from "../../assets/img/socios-noreal-logo-5.png";

const Partners = () => {
  const logos = [sociosImg1, sociosImg2, sociosImg3, sociosImg4, sociosImg5];

  return (
    <section id="socios" className="relative mt-20 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-lg sm:text-xl font-medium text-FAST-Orange">
          - Nuestros Socios -
        </h1>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-FAST-Text">
          Marcas y comercios que confían en FAST
        </h2>
      </div>

      {/* Carousel con bordes difuminados */}
      <div className="relative w-full overflow-hidden">
        {/* Bordes difuminados */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10"></div>

        {/* Carrusel infinito extendido */}
        <div className="flex animate-scroll-long whitespace-nowrap items-center py-6">
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex justify-center items-center mx-12 shrink-0"
            >
              <img
                src={logo}
                alt={`logo socio ${index + 1}`}
                className="h-[100px] sm:h-[120px] md:h-[150px] lg:h-[150px] w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
