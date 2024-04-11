import PropTypes from 'prop-types';
import NameIput from './NameIput'; // Import your NameIput component

const InputSection = ({ tipo, frase, etiqueta }) => {
    return (
        <div className='pt-6  pb-[22px] w-96'>
            <h2 className="text-left font-bold">{etiqueta}</h2> {/* Use the 'frase' prop as the text content of the h2 element */}
            <NameIput tipo={tipo} frase={frase} />
        </div>
    );
};

InputSection.propTypes = {
    tipo: PropTypes.string.isRequired, // Specify the type of the 'tipo' prop and make it required
    frase: PropTypes.string.isRequired, // Specify the type of the 'frase' prop and make it required
    etiqueta: PropTypes.string.isRequired, // Specify the type of the 'etiqueta' prop and make it required
};

export default InputSection;
