export function numberFormat(numero, setNumeroK) {
    const number = numero.replace(/\s/g, "") //Remove the spaces in a string 
    const nFormat = numberLetters(number, setNumeroK) //Check if the string contains letters or special characters
    if (number.length > 11) {
        setNumeroK("El número de teléfono no puede superar 11 dígitos")
        return true
    } else if (nFormat) {
        return true
    }
    else {
        return false
    }
}

function numberLetters(numero, setNumeroK) {
    var lettersRegex = /[A-Za-z]/; // Regular expression to match letters
    var specialsRegex = /[^A-Za-z0-9\s]/; // Regular expression to match specials

    if (lettersRegex.test(numero) || specialsRegex.test(numero)) {
        setNumeroK("La cadena contiene letras o caracteres especiales");
        return true;
    } else {
        return false;
    }
}