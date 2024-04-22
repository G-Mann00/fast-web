import pb from './pocketbase';
import { generarUrlImagen } from '../../utils/index';
import { obtenerCategorias } from '../database/index';

export async function cargarProductos(tiendaId) {

    try {
        const results = await pb.collection('producto').getFullList({}, {
            filter: `tienda = "${tiendaId}"`,
        });

        return results;

    } catch (error) {
        console.error('Error cargando los productos:', error);
        return [];
    }

}

export async function mapearProductos(arreglo) {
    // Utilizamos Promise.all para ejecutar todas las transformaciones de manera simultánea
    const objetosMapeados = await Promise.all(
        // Utilizamos el método map para iterar sobre cada objeto del arreglo
        arreglo.map(async objeto => ({
            // Mapeamos las propiedades del objeto original al nuevo objeto
            id: objeto.id, // Copiamos el id del objeto original
            nombre: objeto.nombre, // Copiamos el nombre del objeto original
            categoria: await obtenerCategorias(objeto.categoria[0]), // Obtenemos la categoría del objeto original
            imagen: await generarUrlImagen(objeto, 'Image'), // Obtenemos la URL de la imagen mediante la función asincrónica generarUrlImagen
            descripcion: objeto.descripcion, // Copiamos la descripción del objeto original
            precio: objeto.precio, // Copiamos el precio del objeto original
            tienda: objeto.tienda // Copiamos la tienda del objeto original
        }))
    );

    // Devolvemos el arreglo de objetos mapeados
    return objetosMapeados;
}
