import pb from '../services/database/pocketbase';

export function generarUrlImagen(record, imageField) {
    
    if (record && record[imageField]) {
        
        const imageUrl = pb.getFileUrl(record, record[imageField]);
        
        return imageUrl;
    }

    return null; 
}