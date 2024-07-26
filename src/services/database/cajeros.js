import pb from './pocketbase';
import { capitalizeFirstLetter } from '../../utils/index';

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
        //console.log('Buscando registro del usuario...', tiendaId);
        // Consulta a la colección 'tienda' filtrando por el ID del usuario de 'userAdmin'
        const records = await pb.collection('cajeros').getFullList({
            filter: `Kiosko = "${tiendaId}" && state != 3`,
        });
        // Verifica si existe al menos un registro
        if (records && records.length > 0) {
            const desireRecord = ["id","username","Kiosko","Lastname","collectionId","collectionName","collectionId","first_Name" ];
            const reorderRecords = records.map(record => 
                desireRecord.map(key => record[key])
            );
            return reorderRecords; 
        };
        return []; // Devuelve null si no se encuentra un registro
    } catch (error) {
        console.error('Error al buscar el registro del cajero:', error);
        // Propaga el error para que pueda ser manejado por el código que llame a esta función
        throw error;
    }
}

//Funciones para agregar cajeros
//Función para buscar un Cajero por su nombre, y checar que no haya otro cajero con el mismo nombre
export async function buscarXnombreCajero(cajeroNombre, tiendaId, rol) {
    try {
        const arreglo = await buscarRegistroCajero(tiendaId);
        //console.log("arreglo de cajeros => ", arreglo);
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
        console.error('Error buscando el producto:', error);
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
        console.error('Error creando el usuario:', error);
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
        console.error('Error eliminando el producto:', error);
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
        console.error('Error buscando el producto:', error);
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

export async function editarCajero(cajeroId, data, kioskoName, kioskoId) { 
    try {
        const {userName, nom, ape} = await handleNombresCajeros(data, kioskoName, kioskoId);
        console.log(cajeroId);  

        const cajeroDetails = {
            username: userName,
            first_Name: nom,
            Lastname:  ape,
        };

        await pb.collection('Cajeros').update(cajeroId, cajeroDetails);

        return true;

    } catch (error) {
        console.error('Error editando el producto:', error);
        return null;
    }
}

export async function editarCajeroContraseña(cajeroId, data) { 
    try {
        console.log(cajeroId);
        console.log(data.oldPassword);
        const cajeroDetails = {
            first_Name: data.nombreCajero,
            Lastname: data.apellidoCajero,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
            oldPassword: data.oldPassword,
        };

        await pb.collection('Cajeros').update(cajeroId, cajeroDetails);

        return true;

    } catch (error) {
        console.error('Error editando el producto:', error);
        return null;
    }
}

