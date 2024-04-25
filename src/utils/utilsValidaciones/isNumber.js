export const checkIfNumber = (value, setIsNumber) => {
    if (isNaN(value)) {
        setIsNumber('El valor debe ser un número');
        return true;
    } else {
        setIsNumber('');
        return false;
    }
};