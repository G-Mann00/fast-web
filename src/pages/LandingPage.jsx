import Hero from "../components/landing/Hero"
import Navbar from "../components/landing/Navbar"
import Partners from "../components/landing/Partners"
import Services from "../components/landing/Services"
import download from '../assets/img/download-section.png';
import Footer from "../components/landing/Footer";

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
        <img src={download} alt="download section"/>
    </div>
    <Footer />
    </>
  )
}

export default LandingPage
