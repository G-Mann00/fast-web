import PropTypes from 'prop-types';
import { 
    Dialog, 
    DialogHeader, 
    DialogBody,
    DialogFooter, 
    Button 
} from '../../index'; // assuming these are the correct imports
import prohibido from '../../../assets/img/Permiso_Denegado.png';

function AccionRestringida({ exitosoOpen, handleExitosoClose }) {
    // Modal de confirmación de producto agregado exitosamente
    return (
        <Dialog open={exitosoOpen} size="md">
            {/* Encabezado del modal */}
            <DialogHeader>Registro de cajero restringido</DialogHeader>

            {/* Cuerpo del modal */}
            <DialogBody>
                <div className="flex justify-center items-center gap-3">
                    <img 
                    className="w-[100px] h-[100px]" 
                    src={prohibido} />
                    <p className="text-left text-lg text-FAST-Text"><span className='text text-FAST-Orange font-bold'>No tienes permiso para agregar más cajeros </span></p>
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
AccionRestringida.propTypes = {
    exitosoOpen: PropTypes.bool.isRequired,
    handleExitosoClose: PropTypes.func.isRequired,
};

// Default prop values
AccionRestringida.defaultProps = {
    exitosoOpen: false,
};

export default AccionRestringida;