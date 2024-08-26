
export {
    isNameRequired,
    isEmailRequired,
    isAgeRequired,
    isQuantityRequired,
    isLocationRequired,
    isTosRequired,
    minAge,
    minTourney,
    maxTourney,
    inputRequired
};


const isNameRequired = false;
const isEmailRequired = false;
const isAgeRequired = false;
const isQuantityRequired = false;
const isLocationRequired = true;
const isTosRequired = true;

const minAge = 13;
const minTourney = 0;
const maxTourney = 99;

const inputRequired = ["first", "last", "brithdate", "quantity", "checkbox1"];