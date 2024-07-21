// Importing components and assets
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {
     Dialog, 
     DialogBody, 
     DialogFooter, 
     DialogHeader, 
     Button, 
     InputSection, 
     TextArea, 
     ImageUpload, 
     CategoriaSelector, 
     SpinnerFAST 
    } 
     from "../index";
import foodIcon from '../../assets/img/fast-default-food-icon.png';
import { useForm } from 'react-hook-form';
import {
    handleImageFileChange, 
    checkIfNumber, 
    isBigger} 
    from "../../utils/index";
import { buscarXnombre, editarProducto } from "../../services/database";
// importar el hook de useKiosk
import { useKiosk } from '../../hooks/kiosko';

// EditProduct component
const EditProduct = ({ editOpen, producto, handleModalOpen, handleSuccesOpenEdit, tipo }) => {
    // Obtener el kiosko del contexto
    const { kiosko } = useKiosk();
    const { control, register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [imageUrl, setImageUrl] = useState(false);
    const [nombreUsed, setNombreUsed] = useState(''); //estado para mostrar mensaje en caso de que el nombre del producto ya exista
    const [nombreActual, setNombreActual] = useState(''); //estado para manejar el estado del nombre del producto
    const [showErrorMessage, setErrorMessage] = useState(false); //estado para mostrar mensaje de error en caso de que no todos los campos hayan sido llenados
    const [isNumber, setIsNumber] = useState(false);
    const [descripcionProd, setDescripcionProd] = useState(''); //estado para manejar la descripción del producto y mostrar mensaje en caso de que exceda los 150 caracteres
    const [file, setFile] = useState(null); //estado para almacenar la imagen del producto

    const limpiarCampos = () => {
        setNombreUsed(null);
        setErrorMessage(null);
        setIsNumber(null);
        setDescripcionProd(null);
        setFile(null);
        setImageUrl("");
        setValue('nombreProducto', producto[1]);
        setValue('descripcionProducto', producto[6]);
        setValue('precio', producto[8]);
    }
    const uploadImage = (file) => { //Función para subir la imagen del producto
        handleImageFileChange(file, setImageUrl, setFile);

    }
    // Función para verificar si todos los campos han sido llenados
    const allFieldsFilled = (data) => {
        return Object.values(data).every(value => value !== '' && value !== null);
    };

    // Función para verificar si todos los campos están llenos y hay un archivo
    const validarCampos = (data) => {
        const hola = allFieldsFilled(data);
        return hola;
    };

    const handleValidacion = (data) => {
        if (!validarCampos(data)) {
            setErrorMessage(true);
            return false;
        } else if (checkIfNumber(data.precio, setIsNumber)) {
            return false;
        }
        else if (isBigger(data.descripcionProducto, "descripción", setDescripcionProd)) {
            return false;
        }
        else {
            setErrorMessage(false);
            setIsNumber(false);
            setNombreUsed(false);
            return true;
        }
    }

    // Function to handle form submission
    const onSubmit = async (data) => {
        const respuesta = await buscarXnombre(data.nombreProducto, kiosko.id, "edit");
        if (respuesta && data.nombreProducto !== nombreActual) {
            setNombreUsed("El nombre del producto ya existe");
            return;
        }
        if (handleValidacion(data, file)) {
            const result = await editarProducto(producto[0], data, file);
            console.log('File en Resultado Producto:', file);
            if (result) {
                //console.log("Producto editado exitosamente");
                handleSuccesOpenEdit();
                handleSuccesClose();

            }
        }
    }

    // Function to handle cancellation
    const handleCanceled = () => {
        limpiarCampos();
        handleModalOpen('canceledEdit');
    }

    const handleSuccesClose = () => {
        limpiarCampos();
        handleModalOpen('edit');
    };

    // Effect to set form values when producto and datosCargados change
    useEffect(() => {
        if (producto) {
            console.log('Producto:', producto);
            setLoading(false);
            setValue('nombreProducto', producto[1]);
            setNombreActual(producto[1]);
            setValue('descripcionProducto', producto[6]);
            setValue('precio', producto[8]);
            setValue('categoria', producto[2]);
            setValue('foto', producto[5]);
            setImageUrl(producto[5]);
            setFile(producto[4]);

        }
    }, [producto, setValue]);

    return (
        <Dialog open={editOpen} size="lg">
            {loading ? (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <SpinnerFAST />
                </div>
            ) : (
                <>
                    <DialogHeader>
                        <span className="mr-1.5">Editar Producto{' '}</span>
                        <span className="text-FAST-Orange mr-4 font-bold">{producto[1]}</span>
                    </DialogHeader>
                    <DialogBody>
                        <form className="pl-[75px] grid grid-cols-2 gap-[70px] justify-center" onSubmit={handleSubmit(onSubmit)}>
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
                                etiqueta="Descripcion del producto" 
                                name="descripcionProducto" 
                                register={register} 
                                mensaje={descripcionProd ? descripcionProd : ' '} />

                                {/* Precio */}
                                <InputSection 
                                tipo="text" 
                                frase="Precio (C$)" 
                                etiqueta="Precio del producto" 
                                name="precio" 
                                register={register} 
                                mensaje={isNumber ? isNumber : ''} />

                                {/* Categoria */}
                                {tipo === "producto" && (<CategoriaSelector name="categoria" control={control} />)}
                            </div>

                            <div className="mt-[44px] ml-[32px] mr-[32px]">
                                <ImageUpload 
                                defaultImageUrl={producto[5] ? producto[5] : foodIcon} 
                                onChange={uploadImage} 
                                name="foto" 
                                register={register} />
                            </div>
                        </form>
                    </DialogBody>

                    <DialogFooter>
                        <div className="space-x-8 mr-[20px] 0">
                            <Button 
                            className="bg-[#ef4444] text-[#FFFFFF] hover:bg-[#FF6B6B]" 
                            onClick={handleCanceled}>Cancelar</Button>
                            <Button 
                            className="bg-FAST-DarkBlue text-[#FFFFFF] hover:bg-[#2B3045]" 
                            onClick={handleSubmit(onSubmit)}>Guardar Cambios</Button>
                        </div>
                    </DialogFooter>
                </>
            )}
        </Dialog>
    );
};

// Prop validation
EditProduct.propTypes = {
    tipo: PropTypes.string,
    editOpen: PropTypes.bool.isRequired,
    handleModalOpen: PropTypes.func.isRequired,
    producto: PropTypes.object.isRequired,
    handleSuccesOpenEdit: PropTypes.func,
};

// Exporting component
export default EditProduct;
