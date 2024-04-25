import pb from './pocketbase';
import { generarUrlImagen } from '../../utils/index';
import { obtenerCategorias } from '../database/index';

//Función para crear un producto
export async function agregarProducto(tiendaId, producto, file) {
    try {
        // Crea un FormData para almacenar los datos del producto
        const formData = new FormData();
        formData.append('nombre', producto.nombreProducto);
        formData.append('descripcion', producto.descripcionProducto);
        formData.append('precio', producto.precio);
        formData.append('tienda', tiendaId);
        formData.append('categoria', producto.categoria);
        formData.append('Image', file);  // Pasa el archivo de imagen

        // Crea un nuevo registro en la colección 'producto'
        await pb.collection('producto').create(formData);

        // Retorna true si el producto se creó correctamente
        return true;

    } catch (error) {
        console.error('Error agregando el producto:', error);
        return null;
    }
}
//Función para cargar todos los productos y mostrarlos en la tabla
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

//Función para eliminar un producto
export async function eliminarProducto(id) {
    try {
        // Elimina el producto con el id proporcionado
        console.log('ID del producto a eliminar:', id);
        await pb.collection('producto').delete(id);

        // Retorna true si el producto se eliminó correctamente
        return true;

    } catch (error) {
        console.error('Error eliminando el producto:', error);
        return null;
    }
}

//Función que mapea sobre los productos para poder mostrar la imagen y la categoría en la tabla
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
