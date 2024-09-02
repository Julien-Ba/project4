export {
    openForm,
    closeForm,
    validatedForm,
    setCustomCheckboxValidity
};



/*
    open and close the form
*/

// select the element that need to be modified when the form opens or closes
let formDataElements = ["background", "header", "footer"];

// loop through all the elements inside the main to add it to the elements to be modified
const mainElements = document.querySelector(".main").children;
for (let i = 0; i < mainElements.length; i++) {
    formDataElements.push(mainElements[i].id);
}

// function called by the event listener to open the form
function openForm() {

    // reset the elements inside the form in case it was previously validated
    resetForm();

    // loop through the elements that need to be modified and add a custom dataset to handle those elements in the css
    formDataElements.forEach((element) => {
        document.querySelector(`#${element}`).dataset.form_opened = "true"
    });
}

// function called by the event listener to close the form
function closeForm() {

    // loop through the elements that need to be modified and add a custom dataset to handle those elements in the css
    formDataElements.forEach((element) =>
        document.querySelector(`#${element}`).dataset.form_opened = "false"
    );
}



/* 
    Manage the layout of the elements inside the form
*/

// select the elements to be modified once the form is valid
const formElements = ["form-reserve-content", "form-validated-bg", "close-form-reserve-validated"];

// reset the dataset of the validated elements
function resetForm() {
    formElements.forEach((element) =>
        document.querySelector(`.${element}`).dataset.form_validated = "false"
    );
}

// modify the form layout once it is valid
function validatedForm(form) {

    // add a custom dataset for the elements to be modified in the css
    formElements.forEach((element) =>
        document.querySelector(`.${element}`).dataset.form_validated = "true"
    );

    // call the default function to reset the input values of the form
    form.reset();
};


// create a new div to add a custom error msg to an input
function setCustomCheckboxValidity(input, str) {

    // create the element
    const div = document.createElement("div");

    // add a class to it
    div.classList.add("checkboxValidity");

    // add the content (error msg)
    div.textContent = str;

    // insert the element after the input
    input.parentNode.insertAdjacentElement("afterend", div);
}
