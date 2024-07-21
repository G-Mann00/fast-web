import { 
    Dialog, 
    DialogBody, 
    DialogFooter, 
    DialogHeader, 
    Button, 
    InputSection, 
    CategoriaSelector, 
    ImageUpload, 
    TextArea } 
    from "../index";
import foodIcon from '../../assets/img/fast-default-food-icon.png';
import { useForm } from 'react-hook-form'; // Import `useForm` hook from 'react-hook-form' para manejar el proceso de registro de productos
import { useState } from 'react';
import { 
    handleImageFileChange, 
    checkIfNumber, 
    isBigger } 
    from "../../utils/index";
import { agregarProducto, buscarXnombre } from "../../services/database/index";
import { allFieldsFilled } from "../../utils/index";
import PropTypes from 'prop-types';
// importar el hook de useKiosk
import { useKiosk } from '../../hooks/kiosko';

const CreateProduct = ({ stateOpen, handleModalOpen, handleSuccessOpen, setNombreProd }) => {

    //Manejar la validación de los campos del formulario
    const { control, register, handleSubmit, setValue } = useForm();
    // Obtener el kiosko del contexto
    const { kiosko } = useKiosk();
    //Estados necesarios para manejar la creación de un producto
    const [imageUrl, setImageUrl] = useState(null);
    const [showErrorMessage, setErrorMessage] = useState(false); //estado para mostrar mensaje de error en caso de que no todos los campos hayan sido llenados
    const [isNumber, setIsNumber] = useState(false); //estado para mostrar mensaje de error en caso de que el precio no sea un número
    const [nombreUsed, setNombreUsed] = useState(''); //estado para mostrar mensaje en caso de que el nombre del producto ya exista
    const [descripcionProd, setDescripcionProd] = useState(''); //estado para manejar la descripción del producto y mostrar mensaje en caso de que exceda los 150 caracteres 


    const limpiarCampos = () => {
        setImageUrl(null);
        setErrorMessage(false);
        setNombreUsed(false);
        setIsNumber(false);
        setDescripcionProd(false);
        setValue('nombreProducto', null);
        setValue('descripcionProducto', null);
        setValue('precio', null);
        setValue('categoria', " ");

    }
    // Función para verificar si todos los campos están llenos y hay un archivo
    const validarCampos = (data, file) => {
        const hola = allFieldsFilled(data) && file;
        return hola;
    };

    const handleCerrar = () => { //Función para cerrar el modal
        limpiarCampos();
        handleModalOpen('canceledCreate');
    }

    const handleValidacion = (data, file) => {
        if (!validarCampos(data, file)) {
            setErrorMessage(true);
            return false;
        } else if (checkIfNumber(data.precio, setIsNumber)) {
            return false;
        } else if (isBigger(data.descripcionProducto, 'descripción', setDescripcionProd)) {
            return false;
        }
        else {
            setErrorMessage(false);
            setIsNumber(false);
            setNombreUsed(false);
            return true;
        }
    }

    const [file, setFile] = useState(null); //estado para almacenar la imagen del producto
    const uploadImage = (file) => { //Función para subir la imagen del producto
        handleImageFileChange(file, setImageUrl, setFile);
    }

    const handleSuccesClose = () => {
        setFile(null);
        limpiarCampos();
        handleModalOpen('create');
    };
    const onSubmit = async (data) => {
        const producto = await buscarXnombre(data.nombreProducto, kiosko.id, "create");
        if (producto) {
            setNombreUsed('El nombre del producto ya existe');
            return;
        }
        if (handleValidacion(data, file)) {
            const result = await agregarProducto(kiosko.id, data, file);
            if (result) {
                setNombreProd(data.nombreProducto);
                setTimeout(() => {
                    handleSuccessOpen();
                    handleSuccesClose();
                }, 1000); // Espera 1000 milisegundos (1 segundo) antes de ejecutar la función
            }
        }
    }

    return (
        // Modal de creacion de producto
        <Dialog open={stateOpen} size="lg">
            {/* Encabezado del modal */}
            <DialogHeader>Nuevo Producto</DialogHeader>

            {/* Cuerpo del modal */}
            <DialogBody>
                <form className="pl-[75px] grid grid-cols-2 gap-[70px] justify-center" onSubmit={handleSubmit(onSubmit)}>
                    {/* Campos del producto */}
                    <div>
                        {showErrorMessage ? <span className="text-[#FF0400]">No se han llenado todos los campos</span> : null}
                        {/* Nombre */}
                        <InputSection 
                        tipo="text" 
                        frase="Nombre" 
                        etiqueta="Nombre del Producto" 
                        name="nombreProducto" 
                        register={register} 
                        mensaje={nombreUsed ? nombreUsed : ''} />

                        {/* Descripcion */}
                        <TextArea 
                        frase="Descripcion" 
                        etiqueta="Descripción del Producto" 
                        name="descripcionProducto" 
                        register={register} 
                        mensaje={descripcionProd ? descripcionProd : ' '} />

                        {/* Precio */}
                        <InputSection 
                        tipo="text" 
                        frase="Precio (C$)" 
                        etiqueta="Precio del Producto" 
                        name="precio" register={register} 
                        mensaje={isNumber ? isNumber : ''} />

                        {/* Categoria */}
                        <CategoriaSelector name="categoria" control={control} />
                    </div>

                    {/* Imagen del producto */}
                    <div className="mt-[44px] ml-[32px] mr-[32px]">
                        <ImageUpload 
                        defaultImageUrl={imageUrl || foodIcon} 
                        onChange={uploadImage} 
                        name="foto" 
                        register={register} />
                    </div>
                </form>
            </DialogBody>

            {/* Pie del modal */}
            <DialogFooter>
                <div className="space-x-8 mr-[65px] 0">
                    <Button 
                    className="bg-[#ef4444] text-[#FFFFFF] hover:bg-[#FF6B6B]" 
                    onClick={handleCerrar}
                    >Cancelar</Button>
                    <Button 
                    className="bg-FAST-DarkBlue text-[#FFFFFF] hover:bg-[#2B3045]" 
                    onClick={handleSubmit(onSubmit)}
                    >Agregar</Button>
                </div>
            </DialogFooter>
        </Dialog>
    );
};

// Prop validation
CreateProduct.propTypes = {
    stateOpen: PropTypes.bool.isRequired,
    handleModalOpen: PropTypes.func.isRequired,
    handleSuccessOpen: PropTypes.func.isRequired,
    setNombreProd: PropTypes.func.isRequired, // setNombreProd is a function

};

// Default prop values
CreateProduct.defaultProps = {
    stateOpen: false
};

export default CreateProduct;
