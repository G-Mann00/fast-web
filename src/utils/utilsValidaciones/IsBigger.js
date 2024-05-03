export function isBigger(descripcion, type, setErrorMessage) {
    console.log('Descripcion: ', descripcion);
    console.log(descripcion.length);
    if (descripcion.length > 150) {
        setErrorMessage(`La ${type} no debe superar los 150 caracteres`);
        return true;
    } else {
        setErrorMessage('');
        return false;
    }
}