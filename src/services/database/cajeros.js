import pb from './pocketbase';
import { 
    capitalizeFirstLetter, 
    separeteWordFromNumber
    } from '../../utils/index';

// globally disable auto cancellation
pb.autoCancellation(false);

async function handleNombresCajeros(data, kioskoName, kioskoId) {
    let userName = await generateUserName(data.nombreCajero, kioskoName, kioskoId);
    let nom = capitalizeFirstLetter(data.nombreCajero);
    let ape = capitalizeFirstLetter(data.apellidoCajero);
    return {userName, nom, ape};
}

export async function buscarRegistroCajero(tiendaId) {
    try {
        const records = await pb.collection('cajeros').getFullList({
            filter: `Kiosko = "${tiendaId}" && state != 3`,
        });
        
        if (records && records.length > 0) {
            const desireRecord = ["id","username","Kiosko","Lastname","collectionId","collectionName","state","first_Name" ];
            const reorderRecords = records.map(record => 
                desireRecord.map(key => record[key])
            );
            return reorderRecords; 
        };
        return []; 
    } catch (error) {
        console.error('Error al buscar el registro del cajero:', error);
        
        throw error;
    }
}

//Funciones para agregar cajeros

export async function buscarXnombreCajero(cajeroNombre, tiendaId, rol) {
    try {
        const arreglo = await buscarRegistroCajero(tiendaId);
        const resultado = arreglo.filter(cajero => cajero[7].toLowerCase() === cajeroNombre.toLowerCase());
        if (resultado.length > 0 && rol === "create") {
            return true;
        } else if (resultado.length === 1 && rol === "edit") {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error('Error buscando el cajero:', error);
        return [];
    }
}

export async function createCajero(data, kioskoId, kioskoName) {
    
    try {
        let createdCajero;
        const {userName, nom, ape} = await handleNombresCajeros(data, kioskoName, kioskoId);
        const cajeroDetails = {
            username: userName,
            Kiosko: kioskoId,
            first_Name: nom,
            Lastname: ape,
            state: 1,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
        };
        createdCajero = await pb.collection('Cajeros').create(cajeroDetails);
        return true;

    } catch (error) {
        console.error('Error creando el cajero:', error);
        return false;
    }
}
//Función para eliminar un cajero (Realizamos un eliminado lógico   state = 3 )
export async function eliminarCajero(cajero) {
    try {

        const id = cajero[0];
        const formData = new FormData();
        formData.append('state', 3);

        await pb.collection('Cajeros').update(id, formData);

        return true;

    } catch (error) {
        console.error('Error eliminando el cajero:', error);
        return null;
    }
}

// Función para traer registros de cajeros por nombre de usuario
async function buscarXnombreCajeroUsuario(tiendaId) {
    try {
        const records = await pb.collection('cajeros').getFullList({
            filter: `Kiosko = "${tiendaId}"`,
        });

        return records || [];
    } catch (error) {
        console.error('Error buscando el cajero:', error);
        return [];
    }
}

async function generateUserName(nombre, nomTienda, tiendaId) {
    let pos = 0;
    let userCajero = '';
    var result = nomTienda.split(' ').join('');
    let baseUserName = nombre[pos].toUpperCase() + result.toLowerCase();

    let cajeros_usuarios = await buscarXnombreCajeroUsuario(tiendaId);
    let cantidadCajeros = cajeros_usuarios.length;

    if (cantidadCajeros > 0) {
        // Incrementar el número máximo encontrado para el nuevo usuario
        userCajero = nombre[pos].toUpperCase() + result.toLowerCase() + (cantidadCajeros + 1);
        return userCajero;
    }
    return baseUserName;
}

function compararUserNames(userCajeroActual, userCajeroNew) {
    const actualCajero = separeteWordFromNumber(userCajeroActual);
    const newCajero = separeteWordFromNumber(userCajeroNew);

    if (actualCajero === newCajero) {
        return userCajeroActual;
    } else {    
        return userCajeroNew;
    }
}

export async function editarCajero(cajeroId, actualUserName ,data, kioskoName, kioskoId) { 
    try {
        const {userName, nom, ape} = await handleNombresCajeros(data, kioskoName, kioskoId);
        let nombreUser = compararUserNames(actualUserName, userName);
       
        const cajeroDetails = {
            username: nombreUser,
            first_Name: nom,
            Lastname:  ape,
        };

        await pb.collection('Cajeros').update(cajeroId, cajeroDetails);

        return true;

    } catch (error) {
        console.error('Error editando el cajero:', error);
        return null;
    }
}

function getError(errorData) {
    let firstErrorMessage = '';
    if (errorData.oldPassword && errorData.oldPassword.message) {
        firstErrorMessage = 'La contraseña actual no es correcta';
        return firstErrorMessage;
    } else if (errorData.password && errorData.password.message) {
        firstErrorMessage = 'La contraseña debe tener al menos 8 caracteres';
        return firstErrorMessage;
    } else if (errorData.passwordConfirm && errorData.passwordConfirm.message) {
        firstErrorMessage = 'La confirmación de la contraseña no coincide';
        return firstErrorMessage;
    } else {
        firstErrorMessage = 'Unknown error';
        return firstErrorMessage;
    }
}

export async function editarCajeroContraseña(cajeroId, actualUserName, data, kioskoName, kioskoId) { 
    try {
        const {userName, nom, ape} = await handleNombresCajeros(data, kioskoName, kioskoId);
        let nombreUser = compararUserNames(actualUserName, userName);

        const cajeroDetails = {
            username: nombreUser,
            first_Name: nom,
            Lastname: ape,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
            oldPassword: data.oldPassword,
        };

        const respuesta = await pb.collection('Cajeros').update(cajeroId, cajeroDetails);

        return true;

    } catch (error) {
        if (error.response && error.response.data) {
            const errorData = error.response.data;
            const firstErrorMessage = getError(errorData);
            return firstErrorMessage;
        } else {
            console.error('Error editando el cajero:', error);
        }
        return null;
    }
}

