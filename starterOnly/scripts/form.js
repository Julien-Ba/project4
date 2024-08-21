export { openForm, closeForm };



// Open-Close modal form
const toggleElements = [".background", ".form-reserve-container", ".btn-submit", ".form-reserve-content"];
const toggleInverseElements = [".form-validated-bg", ".close-form-reserve-validated"];
let bgElements = ["header", "footer"];

for (let i = 0; i < document.querySelector("main").children.length; i++) {
    let child = document.querySelector("main").children[i];
    if (!child.classList.contains("form-reserve-container")) {
        bgElements.push("." + child.classList[0]);
    }
}

let bgElementsMobile = [];
for (let i = 1; i < bgElements.length; i++) {
    console.log(bgElements[i]);
    bgElementsMobile.push(bgElements[i]);
}

function openForm() {
    toggleElements.forEach((element) =>
        document.querySelector(element).style.display = "block"
    );
    toggleInverseElements.forEach((element) =>
        document.querySelector(element).style.display = "none"
    );
    bgElements.forEach((elements) =>
        (document.querySelectorAll(elements)).forEach(
            (element) => element.classList.add("blur")
        )
    );
    bgElementsMobile.forEach((elements) =>
        (document.querySelectorAll(elements)).forEach(
            (element) => element.classList.add("mobile-form-bg")
        )
    );
};

function closeForm() {
    toggleElements.forEach((element) =>
        document.querySelector(element).style.display = "none"
    );
    bgElements.forEach((elements) =>
        (document.querySelectorAll(elements)).forEach(
            (element) => element.classList.remove("blur")
        )
    );
    bgElementsMobile.forEach((elements) =>
        (document.querySelectorAll(elements)).forEach(
            (element) => element.classList.remove("mobile-form-bg")
        )
    );
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

const isNameRequired = false;
const isEmailRequired = false;
const isAgeRequired = false;
const isQuantityRequired = false;
const isLocationRequired = false;
const isTosRequired = false;

const minAge = 13;
const minTourney = 0;
const maxTourney = 99;


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
    document.querySelector(".btn-submit").style.display = "none";
    document.querySelector(".form-reserve-content").style.display = "none";
    toggleInverseElements.forEach((element) =>
        document.querySelector(element).style.display = "block"
    );
    form.reset();
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
        || isInputNaN(input)
        || !isInputInt(input)
        || isInputNegative(input)
        || isInputInThreshold(input)
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

function isInputNaN(input) {
    if (!isNaN(input.value)) return false;
    console.log(`${input.name} entered is not a number`);
    input.setCustomValidity("Veuillez rentrer un nombre sous forme numérique.");
    return true;
}

function isInputInt(input) {
    if (input.value % 1 == 0) return true;
    console.log(`${input.name} entered is not an integer`);
    input.setCustomValidity("Veuillez rentrer un nombre entier.");
    return false;
}

function isInputNegative(input) {
    if (!(input.value < 0)) return false;
    console.log(`${input.name} entered is a negative number`);
    input.setCustomValidity("Veuillez rentrer un nombre positif.");
    return true;
}

function isInputInThreshold(input) {
    if (input.value >= minTourney && input.value <= maxTourney)
        return false;
    console.log(`${input.name} ~ isInputInThreshold ~ (input.value >= minTourney && input.value <= maxTourney) :`, (input.value >= minTourney && input.value <= maxTourney));
    input.setCustomValidity(`Veuillez rentrer un nombre entre ${minTourney} et ${maxTourney}.`);
    return true;
}


// Custom validity

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
