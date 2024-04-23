import PropTypes from 'prop-types';
import NameInput from './NameInput'; // Import your NameIput component

const InputSection = ({ tipo, frase, etiqueta, mensaje = ' ', register = () => { }, name, isEditable }) => {
    return (
        <div className='pt-6 pb-[22px] w-96'>
            <h2 className="text-left font-bold">{etiqueta}</h2>
            <NameInput tipo={tipo} frase={frase} register={register} name={name} mensaje={mensaje} isEditable={isEditable} />
        </div>
    );
};

InputSection.propTypes = {
    tipo: PropTypes.string.isRequired, // Tipo de input (requerido)
    frase: PropTypes.string.isRequired, // Placeholder del input (requerido)
    etiqueta: PropTypes.string.isRequired, // Etiqueta del input (requerido)
    register: PropTypes.func, // Función de registro (opcional)
    name: PropTypes.string.isRequired, // Nombre del input (requerido)
    mensaje: PropTypes.string, // Mensaje de ayuda (opcional)
    isEditable: PropTypes.bool, // Estado de si el input es editable o no (opcional, valor predeterminado es false)
};

export default InputSection;
