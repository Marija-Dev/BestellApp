function init() {
    renderDishes();
    renderBasket();
}

//fügt die dishes je nach kategorie in zugehörigen html container
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

//prüft ob sich bestimmtes menu in basket befindet, wenn ja wird anzahl erhöht, wenn nein wird hinzugefügt
function addToBasket(indexDishes) {
    let dishToBasket = dishes[indexDishes];
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

function renderBasket(indexBasket) {
    basketRef = document.getElementById("addedBasketMenu");
    basketRef.innerHTML = "";

    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
        basketRef.innerHTML += getBasketTemplate(indexBasket);
    }

    if (basket.length === 0) {
        basketRef.innerHTML = `<div class="empty-basket-note"> Nothing here yet. <br>
                                    Go ahead and choose something delicious!
                                    <img class="shopping-cart-img" src="./assets/icons/shopping-cart.svg" alt="Shopping-Cart">
                               </div>
                              `
    }
}

function deleteMenu(indexBasket) {
    basket.splice(indexBasket, 1);

    renderBasket();
}

//prüft per id welcher button geklickt wurde, und fügt entweder 1 hinzu oder zieht 1 ab
function changeAmount(indexBasket) {
    let basketDishes = basket[indexBasket];
    let amountToChange = document.getElementById("menuAmount");
    let clickedButton = event.target.id;
    let price = document.getElementById("price");
    let amount = basket[indexBasket].amount;

    if (clickedButton === "addAmount") {
        amountToChange.innerHTML = basketDishes.amount++;
        price.innerHTML = basketDishes.price * amount;
    } else if (clickedButton === "removeAmount" && basketDishes.amount > 1) {
        amountToChange.innerHTML = basketDishes.amount--;
    }

    renderBasket();
}

