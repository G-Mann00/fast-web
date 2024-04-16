import PropTypes from 'prop-types';
import NameInput from './NameInput'; // Import your NameIput component

const InputSection = ({ tipo, frase, etiqueta, register = () => {}, name }) => {
    return (
        <div className='pt-6 pb-[22px] w-96'>
            <h2 className="text-left font-bold">{etiqueta}</h2>
            <NameInput tipo={tipo} frase={frase} register={register} name={name} />
        </div>
    );
};

InputSection.propTypes = {
    tipo: PropTypes.string.isRequired, // Tipo de input (requerido)
    frase: PropTypes.string.isRequired, // Placeholder del input (requerido)
    etiqueta: PropTypes.string.isRequired, // Etiqueta del input (requerido)
    register: PropTypes.func, // Función de registro (opcional)
    name: PropTypes.string.isRequired, // Nombre del input (requerido)
};

export default InputSection;
