import PropTypes from 'prop-types';
import { Input } from '@material-tailwind/react';

const NameInput = ({ tipo, frase, mensaje, register = () => { }, name }) => (
    <div>
        <Input
            className="!border-none h-[40px] w/[400px] rounded-lg bg-[#A0A5BA]/20 p-3"
            type={tipo}
            placeholder={frase}
            {...register(name)}
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
};

export default NameInput;
