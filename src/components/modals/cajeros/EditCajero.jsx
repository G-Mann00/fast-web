import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {
     Dialog, 
     DialogBody, 
     DialogFooter, 
     DialogHeader, 
     Button, 
     InputSection, 
     SpinnerFAST 
    } 
     from "../../index";
import  cajero_icon  from "../../../assets/img/fast-default-user-icon.png"
import { set, useForm } from 'react-hook-form';
import editPencil from '../../../assets/img/editIcon.png';
import {
    trimSpaces,
    allFieldsFilled
       } 
    from "../../../utils/index";
import { editarCajero, editarCajeroContraseña } from "../../../services/database";

import { useKiosk } from '../../../hooks/kiosko';
let simpleVariable = false;

const EditCajero = ({ editOpen, cajero, handleModalOpen, handleSuccesOpenEdit }) => {
    
    const { kiosko } = useKiosk();
    const { control, register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [editable, setIsEditable] = useState(true);
    const [showErrorMessage, setErrorMessage] = useState(false);  
    //const [cambioContraseña, setCambioContraseña] = useState(false);

    const limpiarCampos = () => {
        setErrorMessage(false);
        setIsEditable(true);
        setValue('nombreCajero', cajero[7]);
        setValue('apellidoCajero', cajero[3]);
        setValue('oldPassword', '');
        setValue('password', '');
        setValue('passwordConfirm', '');
        simpleVariable = false;
    }

    const validarCampos = (data) => {
        const fieldsFilled = allFieldsFilled(data);
        return fieldsFilled;
    };

    const handleValidacion = (data) => {
        if (!validarCampos(data)) {
            setErrorMessage("No se han llenado todos los campos");
            return false;
        } 
        else {
            return true;
        }
    };

    async function editCajeroSinContraseña (dataTrim) {
            const result = await editarCajero(cajero[0], cajero[1], dataTrim, kiosko.nombre, kiosko.id);
            if (result === true) {
                handleSuccesOpenEdit();
                handleSuccesClose();
        } else {
            setErrorMessage(result);
        }
    };

    async function editCajeroConContraseña (dataTrim) { 
            const result = await editarCajeroContraseña(cajero[0], cajero[2], dataTrim, kiosko.nombre, kiosko.id);
            if (result === true) {
                handleSuccesOpenEdit();
                handleSuccesClose();
        } else {
            setErrorMessage(result);
        }
    }


    const onSubmit = async (data) => {
        const dataTrim = trimSpaces(data);
        if (!simpleVariable) {
            if (!handleValidacion({nombreCajero: dataTrim.nombreCajero, apellidoCajero: dataTrim.apellidoCajero})) {
                return;
            }
            editCajeroSinContraseña(dataTrim);
        } else {
            if (!handleValidacion({nombreCajero: dataTrim.nombreCajero, apellidoCajero: dataTrim.apellidoCajero, oldPassword: dataTrim.oldPassword, password: dataTrim.password, passwordConfirm: dataTrim.passwordConfirm})) {
                return;
            }
            editCajeroConContraseña(dataTrim);
        }
    };

    const handleImageClick = () => {
        simpleVariable = 'true';
        setIsEditable(!editable);
      };

    // Function to handle cancellation
    const handleCanceled = () => {
        limpiarCampos();
        handleModalOpen('canceledEdit');
    }

    const handleSuccesClose = () => {
        limpiarCampos();
        handleModalOpen('edit');
    };

    useEffect(() => {
        if (cajero) {
            setLoading(false);
            
        }
    }, [cajero, setValue]);

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
                        <span className="mr-1.5">Editar Cajero{' '}</span>
                        <span className="text-FAST-Orange mr-4 font-bold">{cajero[1]}</span>
                    </DialogHeader>
                    <DialogBody>
                        <form className="pl-[75px] grid grid-cols-2 gap-[70px] justify-center" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                {showErrorMessage ? <span className="text-[#FF0400]">{showErrorMessage}</span> : null}

                                <InputSection 
                                tipo="text" 
                                frase="Nombre" 
                                etiqueta="Primer Nombre" 
                                name="nombreCajero" 
                                register={register} 
                                 />

                                <InputSection 
                                tipo="text" 
                                frase="Apellido" 
                                etiqueta="Primer Apellido" 
                                name="apellidoCajero" 
                                register={register} 
                                 />

                                <div className="flex flex-row mt-6">
                                  <p className="text-lg text-FAST-DarkBlue">Editar contraseña</p> 
                                  <img 
                                  className="h-[20px] w-[20px] ml-2 cursor-pointer" 
                                  src={editPencil} alt="editar" 
                                  onClick={handleImageClick} /> 
                                </div>

                                <div>
                               <InputSection 
                                tipo="password" 
                                frase="Contraseña Actual" 
                                etiqueta="Contraseña" 
                                register={register} 
                                name="oldPassword" 
                                isEditable={editable}/>

                                <InputSection 
                                tipo="password" 
                                frase="Contraseña" 
                                etiqueta="Contraseña" 
                                register={register} 
                                name="password" 
                                isEditable={editable} />
 
                                <InputSection 
                                tipo="password" 
                                frase="Contraseña" 
                                etiqueta="Confirmar Contraseña" 
                                register={register} 
                                name="passwordConfirm" 
                                isEditable={editable}/> 
                               </div>

                            </div>
                            <div className="mt-[100px] ml-[32px]">
                              <img src={cajero_icon} alt="Cajero icon"></img>
                              <div className="space-x-8 mr-[20px] 0 mt-[120px]">
                            <Button 
                            className="bg-[#ef4444] text-[#FFFFFF] hover:bg-[#FF6B6B]" 
                            onClick={handleCanceled}>Cancelar</Button>
                            <Button 
                            className="bg-FAST-DarkBlue text-[#FFFFFF] hover:bg-[#2B3045]" 
                            onClick={handleSubmit(onSubmit)}>Guardar Cambios</Button>
                        </div>
                            </div>
                          
                        </form>
                    </DialogBody>
                    <DialogFooter>

                    </DialogFooter>
                </>
            )}
        </Dialog>
    );
};

EditCajero.propTypes = {
    editOpen: PropTypes.bool.isRequired,
    handleModalOpen: PropTypes.func.isRequired,
    cajero: PropTypes.object.isRequired,
    handleSuccesOpenEdit: PropTypes.func,
};

export default EditCajero;
