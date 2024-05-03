import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const ImageUpload = ({ defaultImageUrl, onChange, register = () => { }, name, mostrarBotones = true }) => {
    const [imageUrl, setImageUrl] = useState(defaultImageUrl);
    console.log('ImageUpload useEffect: ', defaultImageUrl);

    useEffect(() => {
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file); // Muestra la imagen en la vista
                setImageUrl(imageUrl);
                onChange(file); // Pasa el archivo directamente a onChange
            }
        };

        const inputFile = document.getElementById(name); // Usa el `name` para el `id` del input
        if (inputFile) {
            inputFile.addEventListener('change', handleFileChange);
        }

        return () => {
            if (inputFile) {
                inputFile.removeEventListener('change', handleFileChange);
            }
        };
    }, [onChange, name]);

    return (
        <div className="w-80 pt-6 pb-[35px] grid justify-items-center">
            <img className='w-fit max-w-[250px] h-[250px] rounded-full mb-6' src={imageUrl || defaultImageUrl} alt="Uploaded" />
            {mostrarBotones ? <label htmlFor={name} className="inline-block w-72 h-10 bg-FAST-Orange text-FAST-WhiteCream cursor-pointer hover:bg-[#ed6d1f] font-bold uppercase rounded-lg relative">
                <span className="absolute left-0 right-0 top-0 bottom-0 z-10 flex items-center justify-center">Subir imagen</span>
                <input id={name} className="pb-3 absolute opacity-0" type="file" accept="image/*" {...register(name)} />
            </label> : null}
        </div>
    );
};

ImageUpload.propTypes = {
    defaultImageUrl: PropTypes.string, // URL de imagen predeterminada
    onChange: PropTypes.func.isRequired, // Función de cambio de imagen
    register: PropTypes.func, // Función de registro de formularios
    name: PropTypes.string.isRequired, // Nombre del input (usado como ID)
    mostrarBotones: PropTypes.bool, // Mostrar botones
};

export default ImageUpload;
