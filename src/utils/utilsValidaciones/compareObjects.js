export function compareObjetcs(obj1, obj2, setMensajeIgual) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    console.log('Keys1: ', keys1);
    console.log('Keys2: ', keys2);
    console.log('Obj1: ', obj1);
    console.log('Obj2: ', obj2);

    if (keys1.length !== keys2.length) {
        setMensajeIgual('Ocurrio un error con los datos');
        return false;
    }

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            console.log(key);
            console.log(obj1[key]);
            console.log(obj2[key]);
            console.log("Entre aqui");
            return true;
        }
    }

    setMensajeIgual('Aún no se realiza ningún cambio');
    return false;
}