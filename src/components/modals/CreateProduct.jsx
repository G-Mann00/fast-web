import { Dialog, DialogBody, DialogFooter, DialogHeader, Button, InputSection, CategoriaSelector, ImageUpload, ProductoExitoso } from "../index";
import foodIcon from '../../assets/img/fast-default-food-icon.png';
import { useForm } from 'react-hook-form'; // Import `useForm` hook from 'react-hook-form' para manejar el proceso de registro de productos
import { useState/*, useEffect*/ } from 'react';
import { handleImageFileChange, checkIfNumber } from "../../utils/index";
import { agregarProducto } from "../../services/database/index";
import PropTypes from 'prop-types'; // Import PropTypes
// importar el hook de useKiosk
import { useKiosk } from '../../hooks/kiosko';

const CreateProduct = ({ stateOpen, handleModalOpen }) => {

    //Manejar la validación de los campos del formulario
    const { control, register, handleSubmit, setValue } = useForm();
    // Obtener el kiosko del contexto
    const { kiosko } = useKiosk();
    //Estados necesarios para manejar la creación de un producto
    const [imageUrl, setImageUrl] = useState(null);
    const [nombreProd, setNombreProd] = useState(null);
    const [showErrorMessage, setErrorMessage] = useState(false); //estado para mostrar mensaje de error en caso de que no todos los campos hayan sido llenados
    const [isNumber, setIsNumber] = useState(false); //estado para mostrar mensaje de error en caso de que el precio no sea un número
    const [succesOpen, setSuccesOpen] = useState(false); //estado para mostrar mensaje de éxito en la creación del producto

    const limpiarCampos = () => {
        setImageUrl(null);
        setErrorMessage(false);
        setIsNumber(false);
        setValue('nombreProducto', null);
        setValue('descripcionProducto', null);
        setValue('precio', null);
        setValue('categoria', null);

    }

    // Función para verificar si todos los campos han sido llenados
    const allFieldsFilled = (data) => {
        console.log("Data recibida: ", data);
        return Object.values(data).every(value => value !== '' && value !== null);
    };

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
        } else {
            setErrorMessage(false);
            setIsNumber(false);
            return true;
        }
    }

    /*const handleEnviar = () => { //Función para enviar el formulario
        handleSubmit(onSubmit);
        handleModalOpen('create');
    }*/
    // State to store the file
    // eslint-disable-next-line no-unused-vars

    const [file, setFile] = useState(null);
    const uploadImage = (file) => {
        handleImageFileChange(file, setImageUrl, setFile);
    }


    const handleSuccesOpen = () => { //Función para abrir el mensaje de éxito
        setSuccesOpen(!succesOpen);
    };

    const handleSuccesClose = () => {
        setSuccesOpen(false);
        setFile(null);
        limpiarCampos();
        handleModalOpen('create');
    };
    const onSubmit = async (data) => {
        const validado = checkIfNumber(data.precio, setIsNumber);
        console.log("Validado: ", validado);
        if (handleValidacion(data, file)) {
            console.log("Data obtenida: ", data);
            console.log("Imagen obtenida: ", file);
            console.log("Kiosko obtenido: ", kiosko);
            const result = await agregarProducto(kiosko.id, data, file);
            console.log("Resultado de la creación del producto: ", result);
            if (result) {
                console.log("Producto creado con éxito");
                setNombreProd(data.nombreProducto);
                handleSuccesOpen();
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
                        <InputSection tipo="text" frase="Nombre" etiqueta="Nombre del Producto" name="nombreProducto" register={register} />

                        {/* Descripcion */}
                        <InputSection tipo="text" frase="Descripcion" etiqueta="Descripción del Producto" name="descripcionProducto" register={register} />

                        {/* Precio */}
                        <InputSection tipo="text" frase="Precio (C$)" etiqueta="Precio del Producto" name="precio" register={register} mensaje={isNumber ? isNumber : ''} />

                        {/* Categoria */}
                        <CategoriaSelector name="categoria" control={control} />
                    </div>

                    {/* Imagen del producto */}
                    <div>
                        <ImageUpload defaultImageUrl={imageUrl || foodIcon} onChange={uploadImage} name="foto" register={register} />
                    </div>
                </form>
            </DialogBody>

            {/* Pie del modal */}
            <DialogFooter>
                <div className="space-x-8">
                    <Button className="bg-[#ef4444] text-[#FFFFFF] hover:bg-[#FF6B6B]" onClick={handleCerrar}>Cancelar</Button>
                    <Button className="bg-FAST-DarkBlue text-[#FFFFFF] hover:bg-[#2B3045]" onClick={handleSubmit(onSubmit)}>Agregar</Button>
                    <ProductoExitoso exitosoOpen={succesOpen} mensaje="fue agregado exitosamente" handleExitosoOpen={handleSuccesOpen} handleExitosoClose={handleSuccesClose} productName={nombreProd} />
                </div>
            </DialogFooter>
        </Dialog>
    );
};

// Prop validation
CreateProduct.propTypes = {
    stateOpen: PropTypes.bool.isRequired,
    handleModalOpen: PropTypes.func.isRequired
};

// Default prop values
CreateProduct.defaultProps = {
    stateOpen: false
};

export default CreateProduct;
