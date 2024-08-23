export { clickBtnMinus, clickBtnPlus };



const inputNb = document.querySelector("input[type='number']");
const maxTourney = 99;

function clickBtnMinus() {
    const nb = parseInt(inputNb.value);
    if (isNaN(nb) || nb < 1) return inputNb.value = "0";
    if (nb >= maxTourney) return inputNb.value = maxTourney.toString();
    inputNb.value = (nb - 1).toString();
};


function clickBtnPlus() {
    const nb = parseInt(inputNb.value);
    if (isNaN(nb)) return inputNb.value = "1";
    if (nb < 0) return inputNb.value = "0";
    if (nb >= maxTourney) return inputNb.value = maxTourney.toString();
    inputNb.value = (nb + 1).toString();
};

inputNb.addEventListener("change", (event) => {
    if (Number(event.value) < 0) event.value = "0";
});