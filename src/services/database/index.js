import { createUser, isUsernameAvailable, isKioskonameAvailable, isEmailAvailable } from './users';
import { authenticateUser, hasTiendaRecords, obtenerDatosActualizadosUsuario } from './users';
import { buscarRegistroUsuario } from './kioskoData';
import { cargarProductos, mapearProductos } from './products';
import { obtenerCategorias } from './categorias';


// Exportar todas las funciones necesarias del usuario
export {
    createUser,
    isUsernameAvailable,
    isKioskonameAvailable,
    isEmailAvailable,
    authenticateUser,
    hasTiendaRecords,
    obtenerDatosActualizadosUsuario,
};

// Exportar las funciones del kiosko
export {
    buscarRegistroUsuario,
};

// Exportar las funciones de los productos
export {
    cargarProductos,
    mapearProductos,
};

// Exportar las funciones de las categorias
export {
    obtenerCategorias,
};

