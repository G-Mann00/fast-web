import { createUser, isUsernameAvailable, isKioskonameAvailable, isEmailAvailable } from './users';
import { authenticateUser, hasTiendaRecords, obtenerDatosActualizadosUsuario } from './users';
import { buscarRegistroUsuario, verificarNumero, verificarEmail, editarKiosko } from './kioskoData';
import { agregarProducto, eliminarProducto, buscarXnombre, cargarProductosYmapear, editarProducto } from './products';
import { obtenerCategorias, obtenerCategoriasCompletas } from './categorias';


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
    verificarNumero,
    verificarEmail,
    editarKiosko
};

// Exportar las funciones de los productos
export {
    cargarProductosYmapear,
    agregarProducto,
    eliminarProducto,
    buscarXnombre,
    editarProducto
};

// Exportar las funciones de las categorias
export {
    obtenerCategorias,
    obtenerCategoriasCompletas
};

