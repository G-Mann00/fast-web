import multicentro from '../../assets/img/multicentro-las-americas.svg';
import metrocentro from '../../assets/img/metrocentro.svg';
import galerias from '../../assets/img/galerias.svg';
import ccmanagua from '../../assets/img/centro-comercial-managua.svg';

const Partners = () => {
  return (
    <div className="relative mt-20 mb-20">
        
        {/* Partners Header */}
        <div className="text-center">
            <h1 className=" text-xl font-medium text-FAST-Orange">
                - Nuestros Socios -
            </h1>
        </div>

        {/* Partners Logos */}
        <div className="flex justify-around mt-7 space-x-10">
            <img className='w-200 h-200' src={multicentro} alt='multicentro las americas'/>
            <img className='w-200 h-200' src={metrocentro} alt='metrocentro'/>
            <img className='w-200 h-200' src={galerias} alt='galerias santo domingo'/>
            <img className='w-200 h-200' src={ccmanagua} alt='centro comercial managua'/>
        </div>
    </div>
  )
}

export default Partners
