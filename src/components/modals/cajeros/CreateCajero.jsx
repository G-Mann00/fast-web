import { 
    Dialog, 
    DialogBody, 
    DialogFooter, 
    DialogHeader, 
    Button, 
    InputSection, 
 } from "../../index";
import { allFieldsFilled, trimSpaces } from "../../../utils/index";
import { useForm } from 'react-hook-form'; // Import `useForm` hook from 'react-hook-form' para manejar el proceso de registro de productos
import { useState } from 'react';
import  cajero_icon  from "../../../assets/img/fast-default-user-icon.png"
import { 
    createCajero, 
    buscarXnombreCajero } 
    from "../../../services/database/index";
import PropTypes from 'prop-types';
// importar el hook de useKiosk
import { useKiosk } from '../../../hooks/kiosko';

const CreateCajero = ({ stateOpen, handleModalOpen, handleSuccessOpen, setNombreProd }) => {

    //Manejar la validación de los campos del formulario
    const { register, handleSubmit, setValue} = useForm();
    // Obtener el kiosko del contexto
    const { kiosko } = useKiosk();
    //Estados necesarios para manejar la creación de un producto
    const [showErrorMessage, setErrorMessage] = useState(''); //estado para mostrar mensaje de error
    const [nombreUsed, setNombreUsed] = useState(''); //estado para mostrar mensaje en caso de que el nombre del producto ya exista 
    const [passwordMatch, setPasswordMatch] = useState(''); //estado para mostrar mensaje en caso de que las contraseñas no coincidan
    const limpiarCampos = () => {
        setErrorMessage('');
        setNombreUsed('');
        setValue('nombreCajero', null);
        setValue('apellidoCajero', null);
        setValue('password', null);
        setValue('passwordConfirm', null);
    }

    const handleCerrar = () => { //Función para cerrar el modal
        limpiarCampos();
        handleModalOpen('canceledCreate');
    }

    function checkPasswordMatch(password, passwordConfirm) { 
        return password === passwordConfirm;
    }

    const handleValidacion = (data) => {
        if (!allFieldsFilled(data)) {
            setErrorMessage('Por favor llena todos los campos');
            return false;
        } 
        else if (!checkPasswordMatch(data.password, data.passwordConfirm)) { 
            setPasswordMatch('Las contraseñas no coinciden');
            return false;
        }
        else {
            setErrorMessage('');
            setPasswordMatch('');
            setNombreUsed(false);
            return true;
        }
    }
    //Okay acá manejamos el cierre del modal
    const handleSuccesClose = () => {
        limpiarCampos();
        handleModalOpen('create');
    };

    const onSubmit = async (data) => {
        const dataTrim = trimSpaces(data);
        const cajero = await buscarXnombreCajero(dataTrim.nombreCajero, kiosko.id, "create");
        if (cajero) {
            setNombreUsed('Ya existe un cajero con ese nombre');
            return;
        }
        if (handleValidacion(data)) {
            const result = await createCajero(data, kiosko.id, kiosko.nombre);
            if (result) {
                console.log("Cajero creado con éxito");
                setNombreProd(data.nombreCajero);
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
            <DialogHeader>Nuevo Cajero</DialogHeader>

            {/* Cuerpo del modal */}
            <DialogBody>
                <form className="pl-[75px] grid grid-cols-2 gap-[70px] justify-center" onSubmit={handleSubmit(onSubmit)}>
                    {/* Campos del cajero */}
                    <div>
                        {showErrorMessage ? <span className="text-[#FF0400]">{showErrorMessage}</span> : null}
                        {/* Primer Nombre */}
                        <InputSection 
                        tipo="text" 
                        frase="Primer Nombre" 
                        etiqueta="Primer Nombre" 
                        name="nombreCajero" 
                        register={register} 
                        mensaje={nombreUsed ? nombreUsed : ''} 
                        />
                        
                        {/* Primer Apellido */}
                        <InputSection 
                        tipo="text" 
                        frase="Primer Apellido" 
                        etiqueta="Primer Apellido" 
                        name="apellidoCajero" 
                        register={register} 
                         />

                        <InputSection 
                        tipo="password" 
                        frase="Contraseña" 
                        etiqueta="Contraseña" 
                        register={register} 
                        name="password" 
                        mensaje={passwordMatch} 
                        />
 
                        <InputSection 
                        tipo="password" 
                        frase="Contraseña" 
                        etiqueta="Confirmar Contraseña" 
                        register={register} 
                        name="passwordConfirm" 
                        mensaje={passwordMatch} 
                        />
                    </div>
                    {/* Imagen del producto */}
                    <div className="mt-[100px] ml-[32px]">
                        <img src={cajero_icon} alt="Cajero icon"></img>
                    </div>
                </form>
            </DialogBody>

            {/* Pie del modal */}
            <DialogFooter>
                <div className="space-x-8 mr-[65px]">
                    <Button 
                    className="bg-[#ef4444] text-[#FFFFFF] hover:bg-[#FF6B6B]" 
                    onClick={handleCerrar}>Cancelar</Button>
                    <Button 
                    className="bg-FAST-DarkBlue text-[#FFFFFF] hover:bg-[#2B3045]" 
                    onClick={handleSubmit(onSubmit)}>Agregar</Button>
                </div>
            </DialogFooter>
        </Dialog>
    );
};

// Prop validation
CreateCajero.propTypes = {
    stateOpen: PropTypes.bool,
    handleModalOpen: PropTypes.func,
    handleSuccessOpen: PropTypes.func,
    setNombreProd: PropTypes.func, // setNombreProd is a function

};

// Default prop values
CreateCajero.defaultProps = {
    stateOpen: false
};

export default CreateCajero;
