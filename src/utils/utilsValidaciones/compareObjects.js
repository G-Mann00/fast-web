export function compareObjetcs(obj1, obj2, setMensajeIgual) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        setMensajeIgual('Ocurrio un error con los datos');
        return false;
    }

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return true;
        }
    }

    setMensajeIgual('Aún no se realiza ningún cambio');
    return false;
}