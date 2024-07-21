// Función para verificar si todos los campos han sido llenados
export const allFieldsFilled = (data) => {
    //console.log("Data recibida: ", data);
    return Object.values(data).every(value => value !== '' && value !== null);
};