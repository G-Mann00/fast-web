import {/* createUser, */isUsernameAvailable, isKioskonameAvailable } from "../database/index";

export const checkUser = async (nomUser) => {
    // Verifica si el nombre de usuario ya existe
    const isAvailable = await isUsernameAvailable(nomUser);
    if (isAvailable) {
        // El nombre de usuario está disponible
        return true;
    } else {
        // El nombre de usuario ya existe
        return false;
    }
};

export const checkKiosko = async (nomKiosko) => {
    // Verifica si el nombre de kiosko ya existe
    const isAvailable = await isKioskonameAvailable(nomKiosko);

    if (isAvailable) {
        // El nombre de kiosko está disponible
        return true;
    } else {
        // El nombre de kiosko ya existe
        return false;
    }
};

export function nombreUsuarioValido(nomUsuario) {
    // Verifica si el nombre de usuario tiene más de 3 caracteres o contiene espacios
    const esNombreUsuarioValido = nomUsuario.length < 3 || /\s/.test(nomUsuario);
    // Retorna true si al menos una de las condiciones es válida, false en caso contrario
    return esNombreUsuarioValido;
}
