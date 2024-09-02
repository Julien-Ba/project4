export { clickBtnMinus, clickBtnPlus };
import { maxTourney } from "./variables.js";


// select the numerical input
const inputNb = document.querySelector("input[type='number']");

// substract 1 to the input value
function clickBtnMinus() {

    // convert the string value to a number
    const nb = parseInt(inputNb.value);

    // check is the value is a number and if it's less than 1, if so, return 0
    if (isNaN(nb) || nb < 1) return inputNb.value = "0";

    // check if the value is more or equal to the max set value in ./variables.maxTourney, is so, return the max value
    if (nb >= maxTourney) return inputNb.value = maxTourney.toString();

    // if the cases above are ignored, return the value - 1
    inputNb.value = (nb - 1).toString();
};


// add 1 to the input value
function clickBtnPlus() {

    // convert the string value to a number
    const nb = parseInt(inputNb.value);

    // check is the value is a number, if so, return 1
    if (isNaN(nb)) return inputNb.value = "1";

    // check is the value is less than 0, if so, return 0
    if (nb < 0) return inputNb.value = "0";

    // check if the value is more or equal to the max set value in ./variables.maxTourney, is so, return the max value
    if (nb >= maxTourney) return inputNb.value = maxTourney.toString();

    // if the cases above are ignored, return the value + 1
    inputNb.value = (nb + 1).toString();
};
