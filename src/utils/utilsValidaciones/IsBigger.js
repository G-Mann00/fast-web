export function isBigger(descripcion, type, setErrorMessage) {
    if (descripcion.length > 150) {
        setErrorMessage(`La ${type} no debe superar los 150 caracteres`);
        return true;
    } else {
        setErrorMessage('');
        return false;
    }
}