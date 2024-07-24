import { verificarNumero, isKioskonameAvailable } from "../database/index";

export const checkUser = async (telefono) => {
    // Verifica si el nombre de usuario ya existe
    const isAvailable = await verificarNumero(telefono);
    if (isAvailable) {
        // El nombre de usuario está disponible
        return true;
    } else {
        // El nombre de usuario ya existe
        return false;
    }
};

export const checkKiosko = async (nomKiosko, type) => {
    // Verifica si el nombre de kiosko ya existe
    const isAvailable = await isKioskonameAvailable(nomKiosko, type);

    if (isAvailable) {
        // El nombre de kiosko está disponible
        return true;
    } else {
        // El nombre de kiosko ya existe
        return false;
    }
};

export function numeroTelefonoValido(numTelefono) {
    // Verifica si el nombre de usuario tiene más de 3 caracteres o contiene espacios
    const esNumeroTelefonoValido =  /^[0-9]{8}$/.test(numTelefono);
    // Retorna true si al menos una de las condiciones es válida, false en caso contrario
    return esNumeroTelefonoValido;
}

