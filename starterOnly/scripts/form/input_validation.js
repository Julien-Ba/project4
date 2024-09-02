import {
    isNameRequired,
    isEmailRequired,
    isAgeRequired,
    isQuantityRequired,
    isLocationRequired,
    isTosRequired
} from "./variables.js";

import {
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
} from "./input_values.js";

import { setCustomCheckboxValidity } from "../layout/form.js";

export {
    inputValidation,
    isInputValid
};



/* 
    object that is called to return the functions associated with the input,
    each input calls a singular function that itself handle all the 
    requirements of the input value.
    see in ./form_validation for the naming of the object key
*/

const inputValidation = {

    isFirstValid: function (input) {
        return isNameValid(input);
    },

    isLastValid: function (input) {
        return isNameValid(input);
    },

    isEmailValid: function (input) {
        if (!isEmailRequired) return true;
        if (isInputEmpty(input)
            || !isEmailFormat(input)
        ) return isInputValid(input, false);
        return isInputValid(input, true);
    },

    isBirthdateValid: function (input) {
        if (!isAgeRequired) return true;
        if (isInputEmpty(input)
            || !isDateFormat(input)
            || isDateInFuture(input)
            || isTooYoung(input)
        ) return isInputValid(input, false);
        return isInputValid(input, true);
    },

    isQuantityValid: function (input) {
        if (!isQuantityRequired) return true;
        if (isInputEmpty(input)
            || isInputNaN(input)
            || !isInputInt(input)
            || isInputNegative(input)
            || isInputInThreshold(input)
        ) return isInputValid(input, false);
        return isInputValid(input, true);
    },

    isLocationValid: function (input) {
        return hasLocation(input);
    },

    isTermsValid: function (input) {
        return hasCheckedTerms(input);
    }



};

// checks if the names inputs respect the requirements
function isNameValid(input) {

    // check if the input is set to required in ./variables
    if (!isNameRequired) return true;

    // calls all the function assiciated with this input value and tells the function isInputValid the result
    if (isInputEmpty(input)
        || !inputHas2char(input)
    ) return isInputValid(input, false);
    return isInputValid(input, true);
}

// check if a location has been checked
function hasLocation(input) {

    // select all the inputs with the name location
    const inputs = document.forms["reserve"].elements[input.name];

    // check if the input is set to required in ./variables
    if (!isLocationRequired) return true;

    // create an array with the inputs and loop through them to see if one is checked
    if (Array.from(inputs).some((input) => input.checked)) {
        console.log("a location was selected");
        return isInputValid(inputs[0], true);
    }
    console.log("no locations were selected");

    // create a div to display the error if no inputs were checked
    setCustomCheckboxValidity(inputs[0].parentNode.parentNode.lastChild, "Veuillez cocher une ville.");

    return isInputValid(inputs[0], false);
}

// check if the terms of service have been checked
function hasCheckedTerms(input) {

    // check if the input is set to required in ./variables
    if (!isTosRequired) return true;

    // if the input is checked, end the function and call isInputValid
    if (input.checked) {
        console.log("has checked terms of service");
        return isInputValid(input, true);
    }
    console.log("has NOT checked terms of services");

    // create a div with the error if the input wasn't checked
    setCustomCheckboxValidity(input, "Veuillez accepter les conditions d'utilisation.");
    return isInputValid(input, false);
}

// return if the input is valid or not
function isInputValid(input, bool) {
    if (bool === true) {
        console.log(`${input.name} is valid`);

        // setCustomValidity with an empty argument tells the browser the input is valid
        input.setCustomValidity("");

        // reset the dataset in case of a previous error
        input.dataset.error = false;

        return true;
    }
    console.log(`${input.name} is NOT valid`);

    // add a dataset-error="true" to the input to change his aspect in the css
    input.dataset.error = true;

    return false;
}
