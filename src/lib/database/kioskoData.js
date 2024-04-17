import pb from './pocketbase';

export async function obtenerImagenUsuario(userId) {
    try {
        // Consulta a la colección 'tienda' filtrando por el ID del usuario de 'userAdmin'
        const records = await pb.collection('tienda').getFullList({
            filter: `userAdmin = "${userId}"`,
        });

        // Verifica si records.items existe y tiene al menos un registro
        if (records && records.length > 0) {
            const record = records[0]; // Toma el primer registro
            // Verifica si el campo 'imagen' existe y no es nulo
            if (record.imagen) {
                console.log('Imagen del registro:', record.imagen);
                const imageField = record.imagen
                const imageUrl = pb.getFileUrl(record, imageField);
                console.log('URL de la imagen:', imageUrl);
                return imageUrl;
            }
        }

        console.log('No hay imagen disponible para el usuario.');
        return false; // Devuelve false si 'imagen' es null o no existe
    } catch (error) {
        console.error('Error al obtener la imagen del usuario:', error);
        // Propaga el error para que pueda ser manejado por el código que llame a esta función
        throw error;
    }
}
