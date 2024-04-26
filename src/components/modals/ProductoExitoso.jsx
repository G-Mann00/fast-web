import PropTypes from 'prop-types';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '../index'; // assuming these are the correct imports
import exitoso from '../../assets/img/operacionExitosa.png';

function ProductoExitoso({ exitosoOpen, mensaje, handleExitosoOpen, handleExitosoClose, productName }) {
    // Modal de confirmación de producto agregado exitosamente
    return (
        <Dialog open={exitosoOpen} handler={handleExitosoOpen} size="md">
            {/* Encabezado del modal */}
            <DialogHeader>Operación exitosa</DialogHeader>

            {/* Cuerpo del modal */}
            <DialogBody>
                <div className="flex justify-center items-center gap-3">
                    <img className="w-[100px] h-[100px]" src={exitoso} />
                    <p className="text-left text-lg text-FAST-Text">El producto {productName} {mensaje}</p>
                </div>
            </DialogBody>

            {/* Pie del modal */}
            <DialogFooter>
                <div className="space-x-8">
                    <Button className="bg-FAST-DarkBlue text-[#FFFFFF] hover:bg-[#2B3045]" onClick={handleExitosoClose}>Aceptar</Button>
                </div>
            </DialogFooter>
        </Dialog>
    );
}

// Prop validation
ProductoExitoso.propTypes = {
    exitosoOpen: PropTypes.bool.isRequired,
    handleExitosoOpen: PropTypes.func.isRequired,
    handleExitosoClose: PropTypes.func.isRequired,
    productName: PropTypes.string.isRequired,
    mensaje: PropTypes.string.isRequired
};

// Default prop values
ProductoExitoso.defaultProps = {
    exitosoOpen: false,
};

export default ProductoExitoso;