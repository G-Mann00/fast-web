import pb from './pocketbase';
import { 
    generarUrlImagen, 
    capitalizeFirstLetter,
    capitalizeLongStrings 
} from '../../utils/index';


//Función para crear un producto
export async function agregarProducto(tiendaId, producto, file) {
    try {
        //capitalize the name of my product
        let capitalized_name = capitalizeFirstLetter(producto.nombreProducto);
        let capitalized_description = capitalizeLongStrings(producto.descripcionProducto);

        const productoDetalle = { 
            nombre: capitalized_name,
            descripcion: capitalized_description,
            precio: producto.precio,
            tienda: tiendaId,
            categoria: producto.categoria,
            Image: file,  
            state: 1
        };

        // Crea un nuevo registro en la colección 'producto'
        await pb.collection('producto').create(productoDetalle);

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
        const results = await pb.collection('VwProductos').getFullList({}, {
            filter: `tienda = "${tiendaId}" && state != 3 `,
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
    const objetosMapeados = await Promise.all(
        arreglo.map(async objeto => ({
            id: objeto.id, 
            nombre: objeto.nombre, 
            idCategoria: objeto.categoria,
            categoria: objeto.nombreCategoria, 
            file: objeto.Image, 
            imagen: generarUrlImagen(objeto, 'Image'),
            descripcion: objeto.descripcion,
            descripcionCorta: checkIfLong(objeto.descripcion),
            precio: objeto.precio,
            tienda: objeto.tienda,
            //estado: objeto.state, 
        }))
    );
    
    // Devolvemos el arreglo de objetos mapeados
    return objetosMapeados;
}

//Función para eliminar un producto
export async function eliminarProducto(id) {
    try {
        const formData = new FormData();
        formData.append('state', 3);
        await pb.collection('producto').update(id, formData);
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

//Función para editar un producto

export async function editarProducto(id, producto, file) {
    try {
        // Crea un FormData para almacenar los datos del producto
        let capitalized_name = capitalizeFirstLetter(producto.nombreProducto);
        let capitalized_description = capitalizeLongStrings(producto.descripcionProducto);

        const productoDetalle = { 
            nombre: capitalized_name,
            descripcion: capitalized_description,
            precio: producto.precio,
            categoria: producto.categoria,
            Image: file,
            state: 2
        };

        // Edita el producto con el id proporcionado
        await pb.collection('producto').update(id, productoDetalle);

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