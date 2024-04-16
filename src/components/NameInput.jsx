import PropTypes from 'prop-types';

const NameInput = ({ tipo, frase, register = () => {}, name }) => {
    return (
        <input
            className="h-[40px] w-[400px] rounded-lg bg-[#A0A5BA]/20 p-3"
            type={tipo}
            placeholder={frase}
            {...register(name)}
        />
    );
};

NameInput.propTypes = {
    tipo: PropTypes.string.isRequired, // Tipo de input (requerido)
    frase: PropTypes.string.isRequired, // Placeholder del input (requerido)
    register: PropTypes.func, // Función de registro (opcional, valor predeterminado es una función vacía)
    name: PropTypes.string.isRequired, // Nombre del input (requerido)
};

export default NameInput;
