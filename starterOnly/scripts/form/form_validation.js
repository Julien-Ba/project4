import { inputValidation } from "./input_validation.js";
import { validatedForm } from "../layout/form.js";
import { capitalize } from "../utils/str.js";
export { validateForm, areInputsValid };



/* 

    cycle through all the inputs and call the respective functions

    preventDefault:
        - remove the default html behaviour of form validation

    validatedForm:
        - change the layout of the form content to tell the user it is validated

    resetCustomCheckboxValidity:
        - if present, remove the custom error div and dataset for checkbox/radio inputs

    areInputsValid:
        - the const synthax need to be respected in the input_validation.inputValidation object
            eg: if input.name === "birthdate" -> isBirthdateValid: function(){}
        - if (typeof) filter the non-input elements and non-handle inputs
        - regex.test() catch the multiple inputs choices exception

*/



function validateForm(event) {
    event.preventDefault();
    if (isFormValid(event.target)) {
        console.log(`${event.target.name} form is valid`);
        return validatedForm(event.target);
    } else {
        console.log(`${event.target.name} form is NOT valid`);
    }
}

function isFormValid(form) {
    const len = form.elements.length;
    let isValid = true;
    for (let i = 0; i < len; i++) {
        if (!areInputsValid(form.elements[i])) {
            form.reportValidity();
            isValid = false;
            break;
        }
    }
    return isValid;
}

function areInputsValid(input) {
    resetCustomCheckboxValidity();
    const functionName = `is${capitalize(input.name)}Valid`;
    if (typeof inputValidation[functionName] !== "function"
        || (/location[2-9]/).test(input.id))
        return true;
    if (inputValidation[functionName](input))
        return true;
    return false;
}

function resetCustomCheckboxValidity() {
    const div = document.querySelector(".checkboxValidity");
    if (div != null) div.remove();
    const radios = document.querySelectorAll("input[type = 'radio']");
    radios.forEach((radio) => radio.dataset.error = false);
}
