import { editNavBar } from "./navbar.js";
import { openForm, closeForm } from "./form.js";
import { clickBtnMinus, clickBtnPlus } from "./input_number.js";



const navExtenderBtn = document.querySelector(".nav-extender");
navExtenderBtn.onclick = function () { editNavBar() };


const openFormBtn = document.querySelectorAll(".btn-signup");
openFormBtn.forEach((btn) => btn.onclick = function () { openForm() });

const closeFormBtn = document.querySelectorAll(".close-form-reserve");
closeFormBtn.forEach((btn) => btn.onclick = function () { closeForm() });


const btnMinus = document.querySelector(".btn-minus");
btnMinus.onclick = function () { clickBtnMinus() };

const btnPlus = document.querySelector(".btn-plus");
btnPlus.onclick = function () { clickBtnPlus() };