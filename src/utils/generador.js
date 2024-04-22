import pb from '../services/database/pocketbase';

export function generarUrlImagen(record, imageField) {
    console.log('Generando URL de la imagen...', record, imageField);
    if (record && record[imageField]) {
        // Genera la URL de la imagen utilizando la función `getFileUrl` de PocketBase
        const imageUrl = pb.getFileUrl(record, record[imageField]);
        //console.log('URL de la imagen:', imageUrl);
        return imageUrl;
    }

    console.log('El campo de la imagen es nulo.');
    return null; // Devuelve null si el campo de la imagen es nulo
}