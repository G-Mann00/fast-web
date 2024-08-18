export function capitalizeFirstLetter(string) {
    let word = string.toLowerCase();
    return word.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}