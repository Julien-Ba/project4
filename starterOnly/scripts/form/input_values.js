import {
    minAge,
    minTourney,
    maxTourney
} from "./variables.js";

export {
    isInputEmpty,
    inputHas2char,
    isEmailFormat,
    isDateFormat,
    isDateInFuture,
    isTooYoung,
    isInputNaN,
    isInputInt,
    isInputNegative,
    isInputInThreshold
};



function isInputEmpty(input) {
    if (input.value !== "") return false;
    console.log(`${input.name} input is not filled`);
    input.setCustomValidity("Merci de remplir ce champ");
    return true;
}

function inputHas2char(input) {
    if (input.value.length > 1) return true;
    console.log(`${input.name} input has less than 2 char`);
    input.setCustomValidity("Veuillez rentrer au minimum 2 caratères");
    return false;
}

function isEmailFormat(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input.value)) return true;
    console.log(`the ${input.name} entered is NOT in a valid format`);
    input.setCustomValidity("Merci de renseigner un format valide d'adresse mail.");
    return false;
}

function isDateFormat(input) {
    const date = new Date(input.value);
    if (!isNaN(date.getTime())) return true;
    console.log(`the ${input.name} entered is NOT a valid date format`);
    input.setCustomValidity("La date a besoin d'être rentré dans le bon format.");
    return false;
}

const now = new Date();

function isDateInFuture(input) {
    const date = new Date(input.value);
    if (date < now) return false;
    console.log(`${input.name} is in the future`);
    input.setCustomValidity("Si vous venez du futur, merci de nous en faire part.");
    return true;
}

function isTooYoung(input) {
    const date = new Date(input.value);
    const age = now.getFullYear() - date.getFullYear();
    if (age >= minAge) return false;
    console.log("person is too young");
    input.setCustomValidity("Vous êtes trop jeune pour participer.");
    return true;
}

function isInputNaN(input) {
    if (!isNaN(input.value)) return false;
    console.log(`${input.name} entered is not a number`);
    input.setCustomValidity("Veuillez rentrer un nombre sous forme numérique.");
    return true;
}

function isInputInt(input) {
    if (input.value % 1 === 0) return true;
    console.log(`${input.name} entered is not an integer`);
    input.setCustomValidity("Veuillez rentrer un nombre entier.");
    return false;
}

function isInputNegative(input) {
    if (!(input.value < 0)) return false;
    console.log(`${input.name} entered is a negative number`);
    input.setCustomValidity("Veuillez rentrer un nombre positif.");
    return true;
}

function isInputInThreshold(input) {
    if (input.value >= minTourney && input.value <= maxTourney)
        return false;
    console.log(`${input.name} ~ isInputInThreshold ~ (input.value >= minTourney && input.value <= maxTourney) :`, (input.value >= minTourney && input.value <= maxTourney));
    input.setCustomValidity(`Veuillez rentrer un nombre entre ${minTourney} et ${maxTourney}.`);
    return true;
}
