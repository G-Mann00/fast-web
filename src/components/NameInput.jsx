import PropTypes from 'prop-types';
import { Input } from '@material-tailwind/react';

const NameInput = ({ tipo, frase, mensaje, register = () => { }, name, isEditable = false }) => (
    <div>
        <Input
            className="h-[40px] w/[400px] rounded-lg border-[#FFFFFF]  text-[#181C2E] text-lg p-3"
            type={tipo}
            placeholder={frase}
            {...register(name)}
            disabled={isEditable}
        />
        <p className="text-[#FF0400]">{mensaje}</p>
    </div>
);

NameInput.propTypes = {
    tipo: PropTypes.string.isRequired, // Tipo de input (requerido)
    frase: PropTypes.string.isRequired, // Placeholder del input (requerido)
    register: PropTypes.func, // Función de registro (opcional, valor predeterminado es una función vacía)
    name: PropTypes.string.isRequired, // Nombre del input (requerido)
    mensaje: PropTypes.string, // Mensaje de ayuda (opcional)
    isEditable: PropTypes.bool, // Estado de si el input es editable o no (opcional, valor predeterminado es false)
};

export default NameInput;
