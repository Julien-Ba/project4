// Extend nav bar

function editNav() {
  var navBtn = document.getElementById("myTopnav");
  if (!navBtn.classList.contains("responsive")) {
    navBtn.classList.add("responsive");
  } else {
    navBtn.classList.remove("responsive");
  }
}



// Open-Close modal form

const modal = document.querySelector(".bground");
const openModalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");

openModalBtn.forEach((btn) => btn.addEventListener("click", openModal));
closeModalBtn.addEventListener("click", closeModal);

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}



// form requirements

/*
  the instructions didn't say to check if:
  [email, birthdate, quantity] needed to be filled
  for now if they're empty the form can NOT be submited

  also, no min age were specified for the birthdate
  for now the min age is set to 13
*/

const form = document.forms["reserve"];

const isNameRequired = true;
const isEmailRequired = true;
const isAgeRequired = true;
const isQuantityRequired = true;
const isLocationRequired = true;
const isTosRequired = true;

const minAge = 13;


// form check

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isFormValid(form)) {
    console.log(`${form.name} form is valid`);
    return validate();
  } else {
    console.log(`${form.name} form is NOT valid`);
  }
});

function validate() {
  alert("Merci ! Votre réservation a été reçue.");
  location.reload(true);
};

function isFormValid(form) {
  resetCustomCheckboxValidity();
  if (!isNameValid(form.elements["first"])
    || !isNameValid(form.elements["last"])
    || !isEmailValid(form.elements["email"])
    || !isBirthdateValid(form.elements["birthdate"])
    || !isQuantityValid(form.elements["quantity"])
    || !hasLocation(form.elements["location"])
    || !hasCheckedTerms(form.elements["terms"])
  ) {
    form.reportValidity();
    return false;
  }
  return true;
}


// input check

function isNameValid(input) {
  if (!isNameRequired) return true;
  if (isInputEmpty(input)
    || !inputHas2char(input)
  ) return isInputValid(input, false);
  return isInputValid(input, true);
}

function isEmailValid(input) {
  if (!isEmailRequired) return true;
  if (isInputEmpty(input)
    || !isEmailFormat(input)
  ) return isInputValid(input, false);
  return isInputValid(input, true);
}

function isBirthdateValid(input) {
  if (!isAgeRequired) return true;
  if (isInputEmpty(input)
    || !isDateFormat(input)
    || isDateInFuture(input)
    || isTooYoung(input)
  ) return isInputValid(input, false);
  return isInputValid(input, true);
}

function isQuantityValid(input) {
  if (!isQuantityRequired) return true;
  if (isInputEmpty(input)
    || !isNumber(input)
    || !isInteger(input)
    || isNegative(input)
    || isTooBig(input)
  ) return isInputValid(input, false);
  return isInputValid(input, true);
}

function hasLocation(inputs) {
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


// input value check

function isInputEmpty(input) {
  if (!input.value == "") return false;
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

function isDateInFuture(input) {
  const date = new Date(input.value);
  const now = new Date();
  if (date < now) return false;
  console.log(`${input.name} is in the future`);
  input.setCustomValidity("Si vous venez du futur, merci de nous en faire part.");
  return true;
}

function isTooYoung(input) {
  const date = new Date(input.value);
  const now = new Date();
  const age = now.getFullYear() - date.getFullYear();
  if (age >= minAge) return false;
  console.log("person is too young");
  input.setCustomValidity("Vous êtes trop jeune pour participer.");
  return true;
}

function isNumber(input) {
  if (!isNaN(input.value)) return true;
  console.log(`${input.name} entered is not a number`);
  input.setCustomValidity("Veuillez rentrer un nombre sous forme numérique.");
  return false;
}

function isInteger(input) {
  if (input.value % 1 == 0) return true; // if it's a long ... oh well ...
  console.log(`${input.name} entered is not an integer`);
  input.setCustomValidity("Veuillez rentrer un nombre entier.");
  return false;
}

function isNegative(input) {
  if (!(input.value < 0)) return false;
  console.log(`${input.name} entered is a negative number`);
  input.setCustomValidity("Veuillez rentrer un nombre positif.");
  return true;
}

function isTooBig(input) {
  const maxNb = 99;
  if (input.value <= maxNb) return false;
  console.log(`${input.name} entered more than ${maxNb}`);
  input.setCustomValidity(`Veuillez rentrer un nombre entre 0 et ${maxNb}.`);
  return true;
}

function isInputValid(input, bool) {
  if (bool == true) {
    console.log(`${input.name} is valid`);
    input.setCustomValidity("");
    return true;
  }
  console.log(`${input.name} is NOT valid`);
  return false;
}

function setCustomCheckboxValidity(input, str) {
  const div = document.createElement("div");
  div.classList.add("checkboxValidity");
  div.textContent = str;
  input.parentNode.append(div);
}

function resetCustomCheckboxValidity() {
  const div = document.querySelector(".checkboxValidity");
  if (div != null) div.remove();
}