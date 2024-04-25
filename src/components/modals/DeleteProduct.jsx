import { Dialog, DialogBody, DialogFooter, DialogHeader, Button, ProductoExitoso } from "../index";
import { eliminarProducto } from '../../services/database/index'
import warningIcon from '../../assets/img/triangulo-alerta.png';
import PropTypes from 'prop-types';
import { useState } from 'react';


const DeleteProduct = ({ deleteOpen, handleModalOpen, producto }) => {
    const [succesOpen, setSuccesOpen] = useState(false); //estado para mostrar mensaje de éxito en la creación del producto
    const handleSuccesOpen = () => {
        setTimeout(() => {
            setSuccesOpen(!succesOpen);
        }, 1000);
    };

    const handleSuccesClose = () => {
        handleModalOpen('delete');
        setSuccesOpen(false);
    };

    const handleEliminarProducto = async (producto) => {
        const result = await eliminarProducto(producto.id);
        if (result) {
            handleSuccesOpen();
        } else {
            console.log('Error al eliminar producto');
        }
    };
    return (
        <Dialog open={deleteOpen} size="md">
            {/* Encabezado del modal */}
            <DialogHeader>Eliminar Producto</DialogHeader>

            {/* Cuerpo del modal */}
            <DialogBody>
                <div className="flex justify-center items-center gap-3">
                    <img className="w-[100px] h-[100px]" src={warningIcon} />
                    <p className="text-left text-lg text-FAST-Text">¿Está seguro que desea eliminar {producto.nombre}?</p>
                </div>
            </DialogBody>

            {/* Pie del modal */}
            <DialogFooter>
                <div className="space-x-8">
                    <Button className="bg-[#ef4444] text-[#FFFFFF] hover:bg-[#FF6B6B]" onClick={() => handleModalOpen('canceledDelete')}>Cancelar</Button>
                    <Button className="bg-FAST-DarkBlue text-[#FFFFFF] hover:bg-[#2B3045]" onClick={() => handleEliminarProducto(producto)} >Confirmar</Button>
                    <ProductoExitoso exitosoOpen={succesOpen} mensaje="fue eliminado exitosamente" handleExitosoOpen={handleSuccesOpen} handleExitosoClose={handleSuccesClose} productName={producto.nombre} />
                </div>
            </DialogFooter>
        </Dialog>
    );
};

DeleteProduct.propTypes = {
    deleteOpen: PropTypes.bool.isRequired,
    handleModalOpen: PropTypes.func.isRequired,
    producto: PropTypes.object.isRequired
};

export default DeleteProduct;