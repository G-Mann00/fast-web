import { Hero, Navbar, Partners, Services, Footer } from "../components/index";
import download from '../assets/img/download-section.png';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20">
        <Hero />
        <Services />
        <Partners />
      </div>
      <div className="bg-FAST-Orange flex justify-center">
        <img src={download} alt="download section" />
      </div>
      <Footer />
    </>
  )
}

export default LandingPage
