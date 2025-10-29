import { Hero, Navbar, Partners, Services, Footer } from "../components/index";
import download from "../assets/img/FAST-download-section.png";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 transform scale-[0.9] origin-top">
        <Hero />
        <Services />
        <Partners />
      </div>
      <div className="bg-FAST-Orange flex justify-center">
        <img
          src={download}
          alt="download section"
          className="w-[90%] max-w-6xl"
        />
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
