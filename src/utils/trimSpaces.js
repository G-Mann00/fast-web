export function trimSpaces(object) {
    return Object.keys(object).reduce((newObj, key) => {
        newObj[key] = typeof object[key] === 'string' ? object[key].trim() : object[key];
        return newObj;
    }, {});
}