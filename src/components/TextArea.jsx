import { Textarea } from "@material-tailwind/react";
import PropTypes from 'prop-types';


const TextArea = ({ tipo, frase, etiqueta, register = () => { }, name, mensaje, isEditable }) => (

    <div className="pt-6 pb-[22px] w-96">
        <h2 className="text-left font-bold text-FAST-Text">{etiqueta}</h2>
        <Textarea
            className="h-[40px] w/[410px] rounded-lg border-[#FFFFFF]  text-[#181C2E] text-lg p-3"
            type={tipo}
            placeholder={frase}
            {...register(name)}
            disabled={isEditable}
        />
        <p className="text-[#FF0400]" >{mensaje}</p>
    </div>

);

TextArea.propTypes = {
    tipo: PropTypes.string, // Tipo de input (requerido)
    frase: PropTypes.string.isRequired, // Placeholder del input (requerido)
    register: PropTypes.func, // Función de registro (opcional, valor predeterminado es una función vacía)
    name: PropTypes.string.isRequired, // Nombre del input (requerido)
    etiqueta: PropTypes.string.isRequired, // Etiqueta del input (requerido)
    mensaje: PropTypes.string, // Mensaje de ayuda (opcional)
    isEditable: PropTypes.bool, // Estado de si el input es editable o no 
}


export default TextArea;