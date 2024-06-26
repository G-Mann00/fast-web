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
async function cargarProductos(tiendaId) {

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

//Función para trabajar cargarProductos y mapear productos

export async function cargarProductosYmapear(tiendaId) {
    try {
        const productos = await cargarProductos(tiendaId);
        const productosMapeados = await mapearProductos(productos);
        return productosMapeados;
    } catch (error) {
        console.error('Error cargando y mapeando los productos:', error);
        return [];
    }

}
//Función que mapea sobre los productos para poder mostrar la imagen y la categoría en la tabla
async function mapearProductos(arreglo) {
    // Utilizamos Promise.all para ejecutar todas las transformaciones de manera simultánea
    const objetosMapeados = await Promise.all(
        // Utilizamos el método map para iterar sobre cada objeto del arreglo
        arreglo.map(async objeto => ({
            // Mapeamos las propiedades del objeto original al nuevo objeto
            id: objeto.id, // Copiamos el id del objeto original
            nombre: objeto.nombre, // Copiamos el nombre del objeto original
            idCategoria: objeto.categoria[0], // Copiamos el id de la categoría del objeto original
            categoria: await obtenerCategorias(objeto.categoria[0]), // Obtenemos la categoría del objeto original
            file: objeto.Image, // Copiamos el archivo de imagen del objeto original
            imagen: await generarUrlImagen(objeto, 'Image'), // Obtenemos la URL de la imagen mediante la función asincrónica generarUrlImagen
            descripcion: objeto.descripcion, // Copiamos la descripción del objeto original
            descripcionCorta: checkIfLong(objeto.descripcion),// Si la descripción es mayor a 50 caracteres, la truncamos
            precio: objeto.precio, // Copiamos el precio del objeto original
            tienda: objeto.tienda // Copiamos la tienda del objeto original
        }))
    );

    // Devolvemos el arreglo de objetos mapeados
    return objetosMapeados;
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

//Función para buscar un producto por su nombre
export async function buscarXnombre(productoNombre, tiendaId, rol) {
    try {
        const arreglo = await cargarProductos(tiendaId);
        const resultado = arreglo.filter(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase());
        if (resultado.length > 0 && rol === "create") {
            //console.log("Como dueles", resultado)
            return true;
        } else if (resultado.length === 1 && rol === "edit") {
            //console.log("Como dueles", resultado)
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

//Función para editar un producto

export async function editarProducto(id, producto, file) {
    try {
        // Crea un FormData para almacenar los datos del producto
        const formData = new FormData();
        formData.append('nombre', producto.nombreProducto);
        formData.append('descripcion', producto.descripcionProducto);
        formData.append('precio', producto.precio);
        formData.append('categoria', producto.categoria);
        formData.append('Image', file);  // Pasa el archivo de imagen

        // Edita el producto con el id proporcionado
        await pb.collection('producto').update(id, formData);

        // Retorna true si el producto se editó correctamente
        return true;

    } catch (error) {
        console.error('Error editando el producto:', error);
        return null;
    }

}

function checkIfLong(descripcion) {
    if (descripcion.length > 50) {
        return descripcion.substring(0, 47) + '...'; // Trunca la descripción a los primeros 47 caracteres y agrega tres puntos suspensivos
    }
    return descripcion;
}

/*La función substring en JavaScript se utiliza para extraer una
 parte de una cadena (string) y devolver una nueva cadena que contiene
  esos caracteres extraídos. Toma uno o dos argumentos:

    El primer argumento es el índice del carácter donde comenzará la extracción.
    El segundo argumento (opcional) es el índice del carácter donde terminará la extracción.
     Si este argumento no se proporciona, la extracción se realizará hasta el final de la cadena.*/