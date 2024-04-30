// Importing components and assets
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Dialog, DialogBody, DialogFooter, DialogHeader, Button, InputSection, ImageUpload, CategoriaSelector, SpinnerFAST } from "../index";
import foodIcon from '../../assets/img/fast-default-food-icon.png';
import { useForm } from 'react-hook-form';
import { handleImageFileChange } from "../../utils/index";
import { buscarXnombre } from "../../services/database";
// importar el hook de useKiosk
import { useKiosk } from '../../hooks/kiosko';

// EditProduct component
const EditProduct = ({ editOpen, producto, handleModalOpen, handleSuccesOpenEdit }) => {
    // Obtener el kiosko del contexto
    const { kiosko } = useKiosk();
    const { control, register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState(foodIcon);
    const [nombreUsed, setNombreUsed] = useState(''); //estado para mostrar mensaje en caso de que el nombre del producto ya exista
    // eslint-disable-next-line no-unused-vars
    const [file, setFile] = useState(null); //estado para almacenar la imagen del producto

    const uploadImage = (file) => { //Función para subir la imagen del producto
        handleImageFileChange(file, setImageUrl, setFile);
    }


    // Function to handle form submission
    const onSubmit = async (data) => {
        const producto = await buscarXnombre(data.nombreProducto, kiosko.id, "edit");
        if (producto) {
            setNombreUsed(data.nombreProducto);
            return;
        }
        console.log("datos => ", data);
        handleSuccesClose();
        handleSuccesOpenEdit();
    }

    // Function to handle cancellation
    const handleCanceled = () => {
        handleModalOpen('canceledEdit');
    }

    const handleSuccesClose = () => {
        handleModalOpen('edit');
    };

    // Effect to set form values when producto and datosCargados change
    useEffect(() => {
        if (producto) {
            setLoading(false);
            setValue('nombreProducto', producto.nombre);
            setValue('descripcionProducto', producto.descripcion);
            setValue('precio', producto.precio);
            setValue('categoria', producto.idCategoria);
            setValue('foto', producto.imagen);
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
                        <span className="text-FAST-Orange mr-4 font-bold">{producto.nombre}</span>
                    </DialogHeader>
                    <DialogBody>
                        <form className="pl-[75px] grid grid-cols-2 gap-[70px] justify-center" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                {/* Nombre */}
                                <InputSection tipo="text" frase="Nombre" etiqueta="Nombre del Producto" name="nombreProducto" register={register} mensaje={nombreUsed ? nombreUsed : ''} />
                                {/* Descripcion */}
                                <InputSection tipo="text" frase="Descripcion" etiqueta="Descripcion del producto" name="descripcionProducto" register={register} />
                                {/* Precio */}
                                <InputSection tipo="text" frase="Precio (C$)" etiqueta="Precio del producto" name="precio" register={register} />
                                {/* Categoria */}
                                <CategoriaSelector name="categoria" control={control} />
                            </div>

                            <div>
                                <ImageUpload defaultImageUrl={producto.imagen ? producto.imagen : imageUrl} onChange={uploadImage} name="foto" register={register} />
                            </div>
                        </form>
                    </DialogBody>

                    <DialogFooter>
                        <div className="space-x-8">
                            <Button className="bg-[#ef4444] text-[#FFFFFF] hover:bg-[#FF6B6B]" onClick={handleCanceled}>Cancelar</Button>
                            <Button className="bg-FAST-DarkBlue text-[#FFFFFF] hover:bg-[#2B3045]" onClick={handleSubmit(onSubmit)}>Guardar Cambios</Button>
                        </div>
                    </DialogFooter>
                </>
            )}
        </Dialog>
    );
};

// Prop validation
EditProduct.propTypes = {
    editOpen: PropTypes.bool.isRequired,
    handleModalOpen: PropTypes.func.isRequired,
    producto: PropTypes.object.isRequired,
    handleSuccesOpenEdit: PropTypes.func,
};

// Exporting component
export default EditProduct;
