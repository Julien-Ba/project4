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


// first function called by the event listener
function validateForm(event) {

    // cancel the default behaviour of the submit
    event.preventDefault();

    // send the form data to check if it's ready to be submited
    if (isFormValid(event.target)) {

        // if all the requirements return true validate the form
        console.log(`${event.target.name} form is valid`);
        return validatedForm(event.target);

    } else {

        // if not, do nothing
        console.log(`${event.target.name} form is NOT valid`);
    }
}


// function that loop through the form inputs
function isFormValid(form) {
    const len = form.elements.length;
    let isValid = true;
    for (let i = 0; i < len; i++) {

        //send each input to the areInputsValid function
        if (!areInputsValid(form.elements[i])) {

            // modify the bool if one of the input return an error
            isValid = false;
            break;
        }
    }

    // return the result of the inputs check
    return isValid;
}


// recieve inputs one by one to check them
function areInputsValid(input) {

    // reset the previous errors
    resetCustomCheckboxValidity();

    // transform the name of the input to a valid key to call
    const functionName = `is${capitalize(input.name)}Valid`;

    // check if the key exist in the object in ./input_validation and is associated to a function
    if (typeof inputValidation[functionName] !== "function"

        // exception for the label with multiple input choices, keep the 1st, exclude the others
        || (/location[2-9]/).test(input.id))

        // if the name of the input wasn't associated with a check, consider it valid
        return true;

    // send the input value to the associated function
    if (inputValidation[functionName](input)) {

        // if the value checks the requirements, return true
        return true;
    }

    // if not, return false
    return false;
}


// Exception for the input of type checkbox or radio
// reset the previous errors
function resetCustomCheckboxValidity() {
    const div = document.querySelector(".checkboxValidity");
    if (div != null) div.remove();
    const radios = document.querySelectorAll("input[type = 'radio']");
    radios.forEach((radio) => radio.dataset.error = false);
}
