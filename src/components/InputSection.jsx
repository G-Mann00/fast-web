import PropTypes from 'prop-types';
import { Input } from '@material-tailwind/react';

const InputSection = ({ tipo, frase, etiqueta, mensaje = ' ', register = () => { }, name, isEditable }) => {
    return (
        <div className='pt-2 w-96'>
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
    tipo: PropTypes.string,
    frase: PropTypes.string,
    etiqueta: PropTypes.string, 
    register: PropTypes.func, 
    name: PropTypes.string.isRequired,
    mensaje: PropTypes.string, 
    isEditable: PropTypes.bool, 
};

export default InputSection;
