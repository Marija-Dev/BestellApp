function init() {
    renderDishes();
}

function renderDishes() {
    let burgerRef = document.getElementById("allBurgers");
    let pizzaRef = document.getElementById("allPizza");
    let saladRef = document.getElementById("allSalad");

    burgerRef.innerHTML = "";
    pizzaRef.innerHTML = "";
    saladRef.innerHTML = "";

    for (let indexDishes = 0; indexDishes < dishes.length; indexDishes++) {

        if (dishes[indexDishes].category === "Burger & Sandwiches") {
            burgerRef.innerHTML += getBurgerTemplate(indexDishes);
        }

        if (dishes[indexDishes].category === "Pizza") {
            pizzaRef.innerHTML += getPizzaTemplate(indexDishes);
        }

        if (dishes[indexDishes].category === "Salad") {
            saladRef.innerHTML += getSaladTemplate(indexDishes);
        }
    }
}

function addToBasket(indexDishes) {
    let dishToBasket = dishes[indexDishes];
    let basketMenu = document.getElementById("addedBasketMenu");
    
    let found = basket.find(element => element.id === dishToBasket.id);

    menuToPush = {
        id: dishToBasket.id,
        name: dishToBasket.name,
        price: dishToBasket.price,
        amount: 1
    }

    if (found) {
        found.amount++;

    } else {
        basket.push(menuToPush);
    }

    renderBasket();
}


function renderBasket() {
    basketRef = document.getElementById("addedBasketMenu");
    basketRef.innerHTML = "";

    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
        basketRef.innerHTML += getBasketTemplate(indexBasket);
    }
}