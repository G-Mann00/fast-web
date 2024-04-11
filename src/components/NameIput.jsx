import PropTypes from 'prop-types';

const NameIput = ({tipo, frase}) => {
  return (
    <input className="h-[40px] w-[400px] rounded-lg bg-[#A0A5BA]/20 p-3" type={tipo} placeholder={frase} />
  )
}

NameIput.propTypes = {
    tipo: PropTypes.string.isRequired, // Specify the type of the 'tipo' prop and make it required
    frase: PropTypes.string.isRequired, // Specify the type of the 'frase' prop and make it required
};

export default NameIput