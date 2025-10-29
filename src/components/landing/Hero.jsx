import mockups from "../../assets/img/FAST-mockup-devices.png";

const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between mt-6 lg:mt-20 px-6 lg:px-20 text-center lg:text-left">
      {/* Texto del Hero */}
      <div className="flex flex-col items-center lg:items-start max-w-xl lg:mr-12">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-FAST-Text tracking-wide leading-tight">
          Transforma tu experiencia con
          <span className="text-FAST-Orange"> FAST</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#797979]">
          Evita filas y gestiona tus pedidos fácilmente desde nuestra app móvil
          o sitio web. ¡Rápido, simple y sin esperas!
        </p>

        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-10">
          <a
            href="/Registro"
            className="bg-FAST-Orange text-base sm:text-lg md:text-xl font-medium text-FAST-WhiteCream py-3 px-6 rounded-lg hover:bg-[#ed6d1f] transition"
          >
            Solicitar registro
          </a>

          <a
            href="https://docs.google.com/document/d/1BTF859wrmj2FItA_RM5SjaNdsuu_ggZ74tNq4qYjsVc/edit?usp=sharing"
            className="bg-FAST-DarkBlue text-base sm:text-lg md:text-xl font-medium text-FAST-WhiteCream py-3 px-6 rounded-lg hover:bg-[#2B3045] transition"
          >
            Conocer más
          </a>
        </div>
      </div>

      {/* Imagen del Hero */}
      <div className="w-full flex justify-center lg:justify-end mt-12 lg:mt-0">
        <img
          src={mockups}
          alt="Dispositivos mostrando la aplicación FAST"
          className="w-full max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
