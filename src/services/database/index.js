import { 
    createUser,  
    isKioskonameAvailable, 
    isEmailAvailable 
} from './users';

import { 
    authenticateUser, 
    hasTiendaRecords,
    obtenerDatosActualizadosUsuario,
    editarUsuario, 
    } from './users';

import { 
    buscarRegistroUsuario, 
    verificarNumero, 
    verificarEmail, 
    editarKiosko 
} from './kioskoData';

import { 
    agregarProducto, 
    eliminarProducto,
    buscarXnombre, 
    cargarProductosYmapear, 
    editarProducto 
    } from './products';

import {
    obtenerCategoriasCompletas 
} from './categorias';

import { 
    buscarRegistroCajero, 
    eliminarCajero, 
    buscarXnombreCajero, 
    createCajero,
    editarCajero,
    editarCajeroContraseña
 } from './cajeros';

import {
    obtenerOrdenes,
    updateStateOrder,
    obtenerOrdenesProceso,
    obtenerOrdenesRealTime,
    obtenerDetalleFactura,
} from './gestionOrdenes/gestionOrdenes';

import {
    marcarRealTime,
    marcarRealTimeUpdate,
    updateOrder,
    changeDateFormat,
} from './gestionOrdenes/funcionesOrdenes';

// Exportar todas las funciones necesarias del usuario
export {
    createUser,
    isKioskonameAvailable,
    isEmailAvailable,
    authenticateUser,
    hasTiendaRecords,
    obtenerDatosActualizadosUsuario,
    editarUsuario
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
    obtenerCategoriasCompletas
};

// Exportar las funciones de los cajeros
export {
    buscarRegistroCajero,
    eliminarCajero,
    buscarXnombreCajero,
    createCajero,
    editarCajero,
    editarCajeroContraseña
};

export {
    obtenerOrdenes,
    updateStateOrder,
    obtenerOrdenesProceso,
    obtenerOrdenesRealTime,
    obtenerDetalleFactura,
}

export { 
    marcarRealTime,
    updateOrder,
    marcarRealTimeUpdate,
    changeDateFormat
}

