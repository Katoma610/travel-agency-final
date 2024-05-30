let rightBtn = document.querySelector(".right-button");
let leftBtn = document.querySelector(".left-button");
let slider = document.querySelector(".slider-container");

let monthsBtn = document.querySelector(".months-button");
let countriesBtn = document.querySelector(".countries-button");
let ageBtn = document.querySelector(".age-button");
let priceBtn = document.querySelector(".price-button");

let monthsList = document.querySelector(".months-filter-list");
let countriesList = document.querySelector(".countries-filter-list");
let ageList = document.querySelector(".age-filter-list");
let priceList = document.querySelector(".price-filter-list");

let allMonthCheckbox = document.querySelector(".all-month-checkbox");
let allCountriesCheckbox = document.querySelector(".all-countries-checkbox");
let allAgeCheckbox = document.querySelector(".all-age-checkbox");
let allPriceCheckbox = document.querySelector(".all-price-checkbox");

let monthsCheckboxes = document.querySelectorAll(".month-checkbox");
let countriesCheckboxes = document.querySelectorAll(".countries-checkbox");
let ageCheckboxes = document.querySelectorAll(".age-checkbox");
let priceCheckboxes = document.querySelectorAll(".price-checkbox");

let leftColumn = document.querySelector(".left-column");
let rightColumn = document.querySelector(".right-column");

let offset = 0;
let sliderInc = 300;

let chosenMonths = [];
let chosenCountries = [];
let chosenAges = [];
let chosenPrices = [];

document.querySelector('.footer-submit').value = '';

function removeValue() {
    document.querySelector('.footer-email').value = '';
}

class SearchCard {
    constructor(name, month, age, country, price, isLeft) {
        this.name = name;
        this.month = month;
        this.age = age;
        this.country = country;
        this.price = price;
        this.isLeft = isLeft;
    }

    getCardElem() {
        let elem = document.createElement("div");
        elem.classList.add("search-card");

        let pName = document.createElement("div");
        pName.classList.add("search-card-name");
        pName.innerHTML = this.name;

        let pMonth = document.createElement("div");
        pMonth.classList.add("search-card-month");
        pMonth.innerHTML = this.month;

        let pAge = document.createElement("div");
        pAge.classList.add("search-card-age");
        pAge.innerHTML = this.age;

        let pCountry = document.createElement("div");
        pCountry.classList.add("search-card-country");
        pCountry.innerHTML = this.country;

        let pPrice = document.createElement("div");
        pPrice.classList.add("search-card-price");
        pPrice.innerHTML = this.price;

        elem.appendChild(pName);
        elem.appendChild(pMonth);
        elem.appendChild(pAge);
        elem.appendChild(pCountry);
        elem.appendChild(pPrice);

        return elem;
    }
}

let searchCards = [
    new SearchCard("Trip 1", "January", 12, "USA", 2500, true),
    new SearchCard("Trip 2", "January", 8, "Turkey", 500, false),
    new SearchCard("Trip 3", "February", 16, "USA", 5500, true),
    new SearchCard("Trip 4", "March", 10, "UK", 2500, false)
];


function checkMonths(card) {
    cardMonth = card.month;

    if (chosenMonths.length === 0 || chosenMonths.length === 12) {
        return true;
    }

    if (chosenMonths.includes(cardMonth)) {
        return true;
    }
    return false;
}

function checkAge(card) {
    cardAge = card.age;

    if (chosenAges.length === 0 || chosenAges.length === 6) {
        return true;
    }
    
    if (cardAge >= Math.max(...chosenAges)) {
        return true;
    }
    return false;
}

function checkCountry(card) {
    cardCountry = card.country;

    if (chosenCountries.length === 0 || chosenCountries.length === 3) {
        return true;
    }

    if (chosenCountries.includes(cardCountry)) {
        return true;
    }
    return false;
}

function checkPrice(card) {
    cardPrice = card.price;

    if (chosenPrices.length === 0 || chosenPrices.length === 5) {
        return true;
    }

    for (let i = 0; i < chosenPrices.length; i++) {
        const price = chosenPrices[i];
        if (price.length > 1) {
            if (cardPrice >= price[0] && cardPrice <= price[1]) {
                return true;
            }
        } else {
            if (cardPrice >= price[0]) {
                return true;
            }
        }
    }
    return false;
}


function range(start, end) {
    let rangeFunction = [];
    for (let i = start; i <= end; i++) {
        rangeFunction.push(i);
    }
    return rangeFunction;
}

function isEqual(object1, object2) {
    if (object1.length !== object2.length) {
        return false;
    }

    for (let i = 0; i < object1.length; i++) {
        if (object1[i] !== object2[i]) {
            return false;
        }
    }
    return true;
}

function findEqual(list, item) {
    for (let i = 0; i < list.length; i++) {
        if (isEqual(list[i], item)) {
            return i;
        }
    }
    return -1;
}

function updateCards() {
    leftColumn.replaceChildren();
    rightColumn.replaceChildren();

    for (let i = 0; i < searchCards.length; i++) {
        const card = searchCards[i];

        if (checkMonths(card) && checkAge(card) && checkCountry(card) && checkPrice(card)) {
            if (card.isLeft) {
                leftColumn.appendChild(card.getCardElem());
            } else {
                rightColumn.appendChild(card.getCardElem());
            }
        }
    }
}

updateCards();

rightBtn.addEventListener("click", () => {
    offset += sliderInc;
    if (offset > sliderInc*2) {
        offset = 0;
    }
    slider.style.right = `${offset}px`;
});

leftBtn.addEventListener("click", () => {
    offset -= sliderInc;
    if (offset < 0) {
        offset = sliderInc*2;
    }
    slider.style.right = `${offset}px`;
});



monthsBtn.addEventListener("click", () => {
    if (monthsList.style.display !== "block") {
        monthsList.style.display = "block";
        monthsBtn.lastChild.style.rotate = "90deg";
    } else {
        monthsList.style.display = "none";
        monthsBtn.lastChild.style.rotate = "0deg";
    }
});

countriesBtn.addEventListener("click", () => {
    if (countriesList.style.display !== "block" ) {
        countriesList.style.display = "block";
        countriesBtn.lastChild.style.rotate = "90deg";
    } else {
        countriesList.style.display = "none";
        countriesBtn.lastChild.style.rotate = "0deg";
    }
});

ageBtn.addEventListener("click", () => {
    if (ageList.style.display !== "block") {
        ageList.style.display = "block";
        ageBtn.lastChild.style.rotate = "90deg";
    } else {
        ageList.style.display = "none";
        ageBtn.lastChild.style.rotate = "0deg";
    }
});

priceBtn.addEventListener("click", () => {
    if (priceList.style.display !== "block") {
        priceList.style.display = "block";
        priceBtn.lastChild.style.rotate = "90deg";
    } else {
        priceList.style.display = "none";
        priceBtn.lastChild.style.rotate = "0deg";
    }
});



allMonthCheckbox.addEventListener("change", () => {
    chosenMonths = [];
    if (allMonthCheckbox.checked) {
        document.querySelectorAll(".month-checkbox").forEach((checkbox) => {
            checkbox.checked = true;
            chosenMonths.push(checkbox.name);
            updateCards();
        });
    } else {
        document.querySelectorAll(".month-checkbox").forEach((checkbox) => {
            checkbox.checked = false;
            updateCards();
        });
    }
});

allAgeCheckbox.addEventListener("change", () => {
    chosenAges = [];
    if (allAgeCheckbox.checked) {
        document.querySelectorAll(".age-checkbox").forEach((checkbox) => {
            checkbox.checked = true;
            chosenAges.push(parseInt(checkbox.name, 10));
            updateCards();
        });
    } else {
        document.querySelectorAll(".age-checkbox").forEach((checkbox) => {
            checkbox.checked = false;
            updateCards();
        });
    }
});

allCountriesCheckbox.addEventListener("change", () => {
    chosenCountries = [];
    if (allCountriesCheckbox.checked) {
        document.querySelectorAll(".countries-checkbox").forEach((checkbox) => {
            checkbox.checked = true;
            chosenCountries.push(checkbox.name);
            updateCards();
        });
    } else {
        document.querySelectorAll(".countries-checkbox").forEach((checkbox) => {
            checkbox.checked = false;
            updateCards();
        });
    }
});

allPriceCheckbox.addEventListener("change", () => {
    chosenPrices = [];
    if (allPriceCheckbox.checked) {
        document.querySelectorAll(".price-checkbox").forEach((checkbox) => {
            checkbox.checked = true;
            updateCards();
        });
    } else {
        document.querySelectorAll(".price-checkbox").forEach((checkbox) => {
            checkbox.checked = false;
            updateCards();
        });
    }
});



monthsCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            chosenMonths.push(checkbox.name);
            updateCards();
        } else {
            chosenMonths.splice(chosenMonths.indexOf(checkbox.name), 1);
            updateCards();
        }
    });
});

countriesCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            chosenCountries.push(checkbox.name);
            updateCards();
        } else {
            chosenCountries.splice(chosenCountries.indexOf(checkbox.name), 1);
            updateCards();
        }
    });
});

ageCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            chosenAges.push(parseInt(checkbox.name, 10));
            updateCards();
        } else {
            chosenAges.splice(chosenAges.indexOf(parseInt(checkbox.name, 10)), 1);
            updateCards();
        }
    });
});

priceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        splitName = checkbox.name.split('-');

        splitName[0] = parseInt(splitName[0], 10);
        if (splitName.length !== 1) {
            splitName[1] = parseInt(splitName[1], 10);
        }

        if (checkbox.checked) {
            chosenPrices.push(splitName);
            updateCards();
        } else {
            chosenPrices.splice(findEqual(chosenPrices, splitName), 1);
            updateCards();
        }
    });
});

document.addEventListener("DOMContentLoaded", function(event) { 
    var scrollpos = localStorage.getItem('scrollpos');
    if (scrollpos) window.scrollTo(0, scrollpos);
});

window.onbeforeunload = function(e) {
    localStorage.setItem('scrollpos', window.scrollY);
};