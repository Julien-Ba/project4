import { editNavBar } from "./layout/navbar.js";
import { openForm, closeForm } from "./layout/form.js";
import { clickBtnMinus, clickBtnPlus } from "./form/input_number.js";
import { validateForm } from "./form/form_validation.js";



// Mobile nav-bar

const navExtenderBtn = document.querySelector(".nav-extender");
navExtenderBtn.onclick = function () { editNavBar() };



// Open-close reserve form

const openFormBtn = document.querySelectorAll(".btn-signup");
openFormBtn.forEach((btn) => btn.onclick = function () { openForm() });

const closeFormBtn = document.querySelectorAll(".close-form-reserve");
closeFormBtn.forEach((btn) => btn.onclick = function () { closeForm() });



// Number inputs buttons

const btnMinus = document.querySelector(".btn-minus");
btnMinus.onclick = function () { clickBtnMinus() };

const btnPlus = document.querySelector(".btn-plus");
btnPlus.onclick = function () { clickBtnPlus() };



// Submit reserve form

document.forms["reserve"].addEventListener("submit", (event) => validateForm(event));
