import {
    isEmailRequired,
    isAgeRequired,
    isQuantityRequired,
    isLocationRequired,
    isTosRequired
} from "./variables.js";

import {
    isInputEmpty,
    isNameValid,
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

function hasLocation(input) {
    const inputs = document.forms["reserve"].elements[input.name];
    if (!isLocationRequired) return true;
    if (Array.from(inputs).some((input) => input.checked)) {
        console.log("a location was selected");
        return isInputValid(inputs[0], true);
    }
    console.log("no locations were selected");
    setCustomCheckboxValidity(inputs[0], "Veuillez cocher une ville.");
    return isInputValid(inputs[0], false);
}

function hasCheckedTerms(input) {
    if (!isTosRequired) return true;
    if (input.checked) {
        console.log("has checked terms of service");
        return isInputValid(input, true);
    }
    console.log("has NOT checked terms of services");
    setCustomCheckboxValidity(input, "Veuillez cocher les conditions d'utilisation.");
    return isInputValid(input, false);
}

function isInputValid(input, bool) {
    if (bool === true) {
        console.log(`${input.name} is valid`);
        input.setCustomValidity("");
        return true;
    }
    console.log(`${input.name} is NOT valid`);
    return false;
}
