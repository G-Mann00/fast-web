import pb from './pocketbase';
import { 
    capitalizeFirstLetter,
    capitalizeLongStrings } from '../../utils';

export async function buscarRegistroUsuario(userId) {
    try {
        // Consulta a la colección 'tienda' filtrando por el ID del usuario de 'userAdmin'
        const records = await pb.collection('tienda').getFullList({
            filter: `userAdmin = "${userId}"`,
        });

        // Verifica si existe al menos un registro
        if (records && records.length > 0) {
            return records[0]; // Devuelve el primer registro
        }

        console.log('No se encontró un registro para el usuario.');
        return null; // Devuelve null si no se encuentra un registro
    } catch (error) {
        console.error('Error al buscar el registro del usuario:', error);
        // Propaga el error para que pueda ser manejado por el código que llame a esta función
        throw error;
    }
}

export async function verificarNumero(numero) {
    try {
        const results = await pb.collection("tienda").getFullList({}, {
            filter: `telefono = "${numero}" `,
        });
        const numeroAvailable = results.length === 0;

        return numeroAvailable;

    } catch (error) {
        console.error('Error verificando la disponibilidad del número:', error);
        return false;
    }
}

export async function verificarEmail(email) {
    try {
        const results = await pb.collection("tienda").getFullList({}, {
            filter: `correo = "${email}" `,
        });
        const emailAvailable = results.length === 0;

        return emailAvailable;

    } catch (error) {
        console.error('Error verificando la disponibilidad del correo:', error);
        return false;
    }
}

//Funcion para editar un kiosko

export async function editarKiosko(id, kiosko, file) {
    try {

        const nombreKiosko = capitalizeFirstLetter(kiosko.nombreKiosko);
        const descripcionKiosko = capitalizeLongStrings(kiosko.descripcionKiosko);

        const detallesKiosko = {
            nombre: nombreKiosko,
            telefono: kiosko.telefonoKiosko,
            correo: kiosko.emailKiosko,
            descripcion: descripcionKiosko,
            imagen: file,
        }

        // Edita el kiosko con el id proporcionado
        await pb.collection('tienda').update(id, detallesKiosko);

        // Retorna true si el kiosko se editó correctamente
        return true;

    } catch (error) {
        console.error('Error editando el kiosko:', error);
        return null;
    }
}