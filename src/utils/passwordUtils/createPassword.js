export function createPassword() {
    return Math.random().toString(36).slice(-8);
}