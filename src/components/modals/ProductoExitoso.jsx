import PropTypes from 'prop-types';
import { 
    Dialog, 
    DialogHeader, 
    DialogBody, 
    DialogFooter, 
    Button 
} from '../index'; // assuming these are the correct imports
import exitoso from '../../assets/img/operacionExitosa.png';

function ProductoExitoso({ exitosoOpen, mensaje, handleExitosoClose, productName, sujeto }) {
    // Modal de confirmación de producto agregado exitosamente
    return (
        <Dialog open={exitosoOpen} size="md">
            {/* Encabezado del modal */}
            <DialogHeader>Operación exitosa</DialogHeader>

            {/* Cuerpo del modal */}
            <DialogBody>
                <div className="flex justify-center items-center gap-3">
                    <img className="w-[100px] h-[100px]" src={exitoso} />
                    <p className="text-left text-lg text-FAST-Text">El {sujeto} <span className='text text-FAST-Orange font-bold'>{productName}</span> {mensaje}</p>
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
    sujeto: PropTypes.string,
    exitosoOpen: PropTypes.bool.isRequired,
    handleExitosoClose: PropTypes.func.isRequired,
    productName: PropTypes.string,
    mensaje: PropTypes.string.isRequired
};

// Default prop values
ProductoExitoso.defaultProps = {
    exitosoOpen: false,
};

export default ProductoExitoso;