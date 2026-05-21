function init() {
    renderBurger();
    renderPizza();
    renderSalad();
}

function renderBurger() {
    let contentRef = document.getElementById("allBurgers");
    contentRef.innerHTML = "";

    for (let indexBurger = 0; indexBurger < burgerAndSandwiches.length; indexBurger++) {
        contentRef.innerHTML += getBurgerTemplate(indexBurger);
    }
}

function renderPizza() {
    let contentRef = document.getElementById("allPizza");
    contentRef.innerHTML = "";

    for (let indexPizza = 0; indexPizza < pizza.length; indexPizza++) {
        contentRef.innerHTML += getPizzaTemplate(indexPizza);
    }
}

function renderSalad() {
    let contentRef = document.getElementById("allSalad");
    contentRef.innerHTML = "";

    for (let indexSalad = 0; indexSalad < salad.length; indexSalad++) {
        contentRef.innerHTML += getSaladTemplate(indexSalad);
    }
}

function addToBasket() {
    
}