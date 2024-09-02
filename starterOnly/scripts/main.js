import { editNavBar } from "./layout/navbar.js";
import { openForm, closeForm } from "./layout/form.js";
import { clickBtnMinus, clickBtnPlus } from "./form/input_number.js";
import { areInputsValid, validateForm } from "./form/form_validation.js";



/*
    Event that handle the click of the button to extend the nav bar on the mobile layout
*/

document.querySelector(".nav-extender").addEventListener("click", editNavBar);



/*
    Events that handle the click of the buttons responsable for the opening and closing of the form container
*/

document.querySelectorAll(".btn-signup").forEach((btn) => btn.addEventListener("click", openForm));
document.querySelectorAll(".close-form-reserve").forEach((btn) => btn.addEventListener("click", closeForm));



/*
    Events that handle the buttons - + in the numerical inputs of the form
*/

document.querySelector(".btn-minus").addEventListener("click", (event) => {
    clickBtnMinus(event);
    event.target.parentNode.firstElementChild.setCustomValidity("");
});
document.querySelector(".btn-plus").addEventListener("click", (event) => {
    clickBtnPlus(event);
    event.target.parentNode.firstElementChild.setCustomValidity("");
});



/*
    Event that handle the validation of the form on the submit
*/

document.forms["reserve"].addEventListener("submit", ((event) => { validateForm(event) }));


/*
    Loop through the form inputs to call the event that handle the validation of the inputs on the user changes
*/

for (let i = 0; i < document.forms["reserve"].elements.length; i++) {
    document.forms["reserve"].elements[i].addEventListener("change", (event) => { areInputsValid(event.target) });
}