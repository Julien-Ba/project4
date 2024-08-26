import { editNavBar } from "./layout/navbar.js";
import { openForm, closeForm } from "./layout/form.js";
import { clickBtnMinus, clickBtnPlus } from "./form/input_number.js";
import { areInputsValid, validateForm } from "./form/form_validation.js";



// Mobile nav-bar
document.querySelector(".nav-extender").addEventListener("click", editNavBar);



// Open-close reserve form
document.querySelectorAll(".btn-signup").forEach((btn) => btn.addEventListener("click", openForm));
document.querySelectorAll(".close-form-reserve").forEach((btn) => btn.addEventListener("click", closeForm));



// Number inputs buttons
document.querySelector(".btn-minus").addEventListener("click", (event) => {
    clickBtnMinus(event);
    event.target.parentNode.firstElementChild.setCustomValidity("");
});
document.querySelector(".btn-plus").addEventListener("click", (event) => {
    clickBtnPlus(event);
    event.target.parentNode.firstElementChild.setCustomValidity("");
});



// Submit reserve form
document.forms["reserve"].addEventListener("submit", ((event) => { validateForm(event) }));

for (let i = 0; i < document.forms["reserve"].elements.length; i++) {
    document.forms["reserve"].elements[i].addEventListener("change", (event) => { areInputsValid(event.target) });
}