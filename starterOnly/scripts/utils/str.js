export { capitalize };

/*
    Function that capitalize the first letter of a string
*/

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}