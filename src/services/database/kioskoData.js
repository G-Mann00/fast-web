import pb from './pocketbase';

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

export function generarUrlImagen(record, imageField) {
    if (record && record[imageField]) {
        // Genera la URL de la imagen utilizando la función `getFileUrl` de PocketBase
        const imageUrl = pb.getFileUrl(record, record[imageField]);
        console.log('URL de la imagen:', imageUrl);
        return imageUrl;
    }

    console.log('El campo de la imagen es nulo.');
    return null; // Devuelve null si el campo de la imagen es nulo
}