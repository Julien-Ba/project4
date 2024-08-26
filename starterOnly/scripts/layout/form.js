export {
    openForm,
    closeForm,
    validatedForm,
    setCustomCheckboxValidity
};



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

function validatedForm() {
    document.querySelector(".btn-submit").style.display = "none";
    document.querySelector(".form-reserve-content").style.display = "none";
    toggleInverseElements.forEach((element) =>
        document.querySelector(element).style.display = "block"
    );
    document.forms["reserve"].reset();
};

function setCustomCheckboxValidity(input, str) {
    const div = document.createElement("div");
    div.classList.add("checkboxValidity");
    div.textContent = str;
    input.parentNode.insertAdjacentElement("afterend", div);
}