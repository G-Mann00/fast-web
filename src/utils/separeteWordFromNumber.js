export function separeteWordFromNumber(string) {
    const word = string.replace(/[^a-zA-Z]/g, '');
    return word.trim();
}