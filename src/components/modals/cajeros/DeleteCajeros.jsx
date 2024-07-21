import { Dialog, DialogBody, DialogFooter, DialogHeader, Button } from "../../index";
import { eliminarCajero } from '../../../services/database/index'
import warningIcon from '../../../assets/img/triangulo-alerta.png';
import PropTypes from 'prop-types';

const DeleteCajeros = ({ deleteOpen, handleModalOpen, cajero, handleSuccessOpen }) => {

    const handleEliminarCajero = async () => {
        const result = await eliminarCajero(cajero);
        if (result) {
            handleModalOpen('delete');
            handleSuccessOpen();
        } else {
            console.log('Error al eliminar cajero');
        }
    };
   return (
        <Dialog open={deleteOpen} size="md">
            {/* Encabezado del modal */}
            <DialogHeader>Eliminar Cajero</DialogHeader>

            {/* Cuerpo del modal */}
            <DialogBody>
                <div className="flex justify-center items-center gap-3">
                    <img className="w-[100px] h-[100px]" src={warningIcon} />
                    <p className="text-left text-lg text-FAST-Text">¿Está seguro que desea eliminar  <span className='text text-FAST-Orange font-bold'> {cajero[1]} </span> ?</p>
                </div>
            </DialogBody>

            {/* Pie del modal */}
            <DialogFooter>
                <div className="space-x-8">
                    <Button className="bg-[#ef4444] text-[#FFFFFF] hover:bg-[#FF6B6B]" onClick={() => handleModalOpen('canceledDelete')}>Cancelar</Button>
                    <Button className="bg-FAST-DarkBlue text-[#FFFFFF] hover:bg-[#2B3045]" onClick={() => handleEliminarCajero()} >Confirmar</Button>
                </div>
            </DialogFooter>
        </Dialog>
    );
};

DeleteCajeros.propTypes = {
    deleteOpen: PropTypes.bool,
    handleModalOpen: PropTypes.func,
    cajero: PropTypes.array,
    handleSuccessOpen: PropTypes.func,
};

export default DeleteCajeros;