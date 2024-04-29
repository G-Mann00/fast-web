// Importing components and assets
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Dialog, DialogBody, DialogFooter, DialogHeader, Button, InputSection, ImageUpload, CategoriaSelector, SpinnerFAST } from "../index";
import foodIcon from '../../assets/img/fast-default-food-icon.png';
import { useForm } from 'react-hook-form';

// EditProduct component
const EditProduct = ({ editOpen, producto, handleModalOpen }) => {
    const { control, register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(true);
    const [datosCargados, setDatosCargados] = useState(true);

    // Function to handle form submission
    const onSubmit = (data) => {
        console.log(data);
    }

    // Function to handle cancellation
    const handleCanceled = () => {
        handleModalOpen('canceledEdit');
    }

    // Function to handle data loading
    const onDataLoaded = () => {
        setDatosCargados(true);
    }

    // Effect to set form values when producto and datosCargados change
    useEffect(() => {
        if (producto && datosCargados) {
            setLoading(false);
            setValue('nombreProducto', producto.nombre);
            setValue('descripcionProducto', producto.descripcion);
            setValue('precio', producto.precio);
            setValue('categoria', producto.idCategoria);
            setValue('foto', producto.imagen);
        }
    }, [producto, setValue, datosCargados]);

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
                                <InputSection tipo="text" frase="Nombre" etiqueta="Nombre del Producto" name="nombreProducto" register={register} />
                                {/* Descripcion */}
                                <InputSection tipo="text" frase="Descripcion" etiqueta="Descripcion del producto" name="descripcionProducto" register={register} />
                                {/* Precio */}
                                <InputSection tipo="text" frase="Precio (C$)" etiqueta="Precio del producto" name="precio" register={register} />
                                {/* Categoria */}
                                <CategoriaSelector name="categoria" control={control} onDataLoaded={onDataLoaded} />
                            </div>

                            <div>
                                <ImageUpload defaultImageUrl={producto.imagen ? producto.imagen : foodIcon} name="foto" />
                            </div>
                        </form>
                    </DialogBody>

                    <DialogFooter>
                        <div className="space-x-8">
                            <Button className="bg-[#ef4444] text-[#FFFFFF] hover:bg-[#FF6B6B]" onClick={handleCanceled}>Cancelar</Button>
                            <Button className="bg-FAST-DarkBlue text-[#FFFFFF] hover:bg-[#2B3045]" >Guardar Cambios</Button>
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
};

// Exporting component
export default EditProduct;
