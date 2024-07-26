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
    trimSpaces} 
    from "../../../utils/index";
import { editarCajero, editarCajeroContraseña } from "../../../services/database";

import { useKiosk } from '../../../hooks/kiosko';

const EditCajero = ({ editOpen, producto, handleModalOpen, handleSuccesOpenEdit }) => {

    const { kiosko } = useKiosk();
    const { control, register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [nombreActual, setNombreActual] = useState(''); 
    const [editable, setIsEditable] = useState(false);
    const [showErrorMessage, setErrorMessage] = useState(false);  
    const [passwordMatch, setPasswordMatch] = useState('');

    const limpiarCampos = () => {

    }

    const validarCampos = (data) => {
        const hola = true;
        return hola;
    };

    const handleValidacion = (data) => {
        if (!validarCampos(data)) {
            setErrorMessage(true);
            return false;
        } 
        else {
            console.log("hola");
            return true;
        }
    }

    // Function to handle form submission
    const onSubmit = async (data) => {
        const dataTrim = trimSpaces(data);
        if (handleValidacion(dataTrim )) {
            const result = await editarCajeroContraseña(producto[0], dataTrim);
            if (result) {
                handleSuccesOpenEdit();
                handleSuccesClose();
            }
        }
    }

    const handleImageClick = () => {
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

    // Effect to set form values when producto and datosCargados change
    useEffect(() => {
        if (producto) {
            setLoading(false);

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
                        <span className="mr-1.5">Editar Cajero{' '}</span>
                        <span className="text-FAST-Orange mr-4 font-bold">{producto[1]}</span>
                    </DialogHeader>
                    <DialogBody>
                        <form className="pl-[75px] grid grid-cols-2 gap-[70px] justify-center" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                {showErrorMessage ? <span className="text-[#FF0400]">No se han llenado todos los campos</span> : null}

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

                                <div className="flex flex-row">
                                  <p className="text-lg">Editar contraseña</p> 
                                  <img 
                                  className="h-[20px] w-[20px] ml-2 cursor-pointer" 
                                  src={editPencil} alt="editar" 
                                  onClick={handleImageClick} /> 
                                  <span  
                                  className="text-sm text-gray-800 bg-[#D3D3D3] p-2 rounded opacity-0 hover:opacity-100 transition-opacity duration-200">
                                    Editar contraseña</span>
                                </div>

                                {editable ? (      <div>
                               <InputSection 
                                tipo="password" 
                                frase="Contraseña Actual" 
                                etiqueta="Contraseña" 
                                register={register} 
                                name="oldPassword" 
                                mensaje={passwordMatch} 
                                isEditable={editable}/>

                                <InputSection 
                                tipo="password" 
                                frase="Contraseña" 
                                etiqueta="Contraseña" 
                                register={register} 
                                name="password" 
                                mensaje={passwordMatch} 
                                isEditable={editable} />
 
                                <InputSection 
                                tipo="password" 
                                frase="Contraseña" 
                                etiqueta="Confirmar Contraseña" 
                                register={register} 
                                name="passwordConfirm" 
                                mensaje={passwordMatch} 
                                isEditable={editable}/> 
                               </div>) : null} 

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
    producto: PropTypes.object.isRequired,
    handleSuccesOpenEdit: PropTypes.func,
};

export default EditCajero;
