export {
    openForm,
    closeForm,
    validatedForm,
    setCustomCheckboxValidity
};



let formDataElements = ["background", "header", "footer"];
const mainElements = document.querySelector(".main").children;
for (let i = 0; i < mainElements.length; i++) {
    formDataElements.push(mainElements[i].id);
}

function openForm() {
    resetForm();
    formDataElements.forEach((element) => {
        document.querySelector(`#${element}`).dataset.form_opened = "true"
    });
}

function closeForm() {
    formDataElements.forEach((element) =>
        document.querySelector(`#${element}`).dataset.form_opened = "false"
    );
}

const formElements = ["form-reserve-content", "form-validated-bg", "close-form-reserve-validated"];

function resetForm() {
    formElements.forEach((element) =>
        document.querySelector(`.${element}`).dataset.form_validated = "false"
    );
}

function validatedForm(form) {
    formElements.forEach((element) =>
        document.querySelector(`.${element}`).dataset.form_validated = "true"
    );
    form.reset();
};

function setCustomCheckboxValidity(input, str) {
    const div = document.createElement("div");
    div.classList.add("checkboxValidity");
    div.textContent = str;
    input.parentNode.insertAdjacentElement("afterend", div);
}