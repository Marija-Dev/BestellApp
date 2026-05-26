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

    menuToPush = {
        name: dishToBasket.name,
        price: dishToBasket.price,
        amount: 1
    }

    basket.push(menuToPush);

    console.log("basket:", menuToPush);
    
    renderBasket();

    // let basket = document.getElementById("myBasket");




    // // let menuAmount = basketArray.find;

    // let burgers = burgerAndSandwiches[indexBurger];
    // let orderedMenu = document.getElementById("addedBasketMenu");

    // // let dish = {
    // //     name: burgerAndSandwiches[indexBurger].name,
    // //     price: burgerAndSandwiches[indexBurger].price,
    // //     amount: burgerAndSandwiches[indexBurger].amount
    // // }

    // // for (let indexBurger = 0; indexBurger < basketArray.length; indexBurger++) {
    // // }

    // if (basketArray.length === 0) {

    //     burgers.amount++;
    //     basketArray.push(getBurgerBasketTemplate(indexBurger));

    //     orderedMenu.innerHTML += basketArray;

    //     //    basketArray = !basketArray;
    //     // orderedMenu.innerHTML + basketArray;

    //     // basket.innerHTML += getBurgerBasketTemplate(indexBurger);
    // }

    // else if (basketArray.length !== 0) {

    //     burgers.amount++;
    // }

}


function renderBasket() {
    basketRef = document.getElementById("addedBasketMenu");
    basketRef.innerHTML = "";

    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
        basketRef.innerHTML += getBasketTemplate(indexBasket);
        
    }

}