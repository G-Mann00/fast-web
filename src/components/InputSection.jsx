import PropTypes from 'prop-types';
import { Input } from '@material-tailwind/react';

const InputSection = ({ tipo, frase, etiqueta, mensaje = ' ', register = () => { }, name, isEditable }) => {
    return (
        <div className='pt-6 pb-[22px] w-96'>
            <h2 className="text-left font-bold text-FAST-Text">{etiqueta}</h2>
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
