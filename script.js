let dialog = document.getElementById("myDialog");

function init() {
    renderDishes();
    renderBasket();
    // renderPrice();
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

//lädt basket inhalt, wenn nichts im basket, nachricht -> nothing in here..
//rechnet direkt im template menge mal preis aus und zeigt es im html an
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

//löscht basket inhalt -> einzelnes menü
function deleteMenu(indexBasket) {
    basket.splice(indexBasket, 1);

    renderBasket();
}

//prüft per id welcher button geklickt wurde, und fügt entweder 1 hinzu oder zieht 1 ab
function changeAmount(indexBasket) {
    let basketDishes = basket[indexBasket];
    let amountToChange = document.getElementById(`menuAmount-${indexBasket}`);
    let clickedButton = event.target.id;

    if (clickedButton === `addAmount-${indexBasket}`) {
        amountToChange.innerHTML = basketDishes.amount++;

    } else if (clickedButton === "removeAmount" && basketDishes.amount > 1) {
        amountToChange.innerHTML = basketDishes.amount--;
    }

    renderBasket();
}






function subTotal() {
    let checkOutCon = document.getElementById("checkOutContainer");
    checkOutCon.innerHTML = "";
    checkOutCon.innerHTML = getSubTotalTemplate();

    let subTotal = document.getElementById("subTotal");
    let deliveryFee = document.getElementById("deliveryFee");
    let delivery = 4.99;
    let total = document.getElementById("total");
    let subTotalSum = basket.reduce((sum, dish) => sum + dish.price * dish.amount, 0);

    subTotal.innerHTML = subTotalSum.toFixed(2).replace(".", ",") + "€";
    deliveryFee.innerHTML = delivery.toFixed(2).replace(".", ",") + "€";
    total.innerHTML = (subTotalSum + delivery).toFixed(2).replace(".", ",") + "€";

    if (basket.length === 0) {
        checkOutCon.innerHTML = "";
    }

    renderBasket();
}

function buyNow() {
    let buyNowPrice = document.getElementById("buyNowPrice");
    let subTotalSum = basket.reduce((sum, dish) => sum + dish.price * dish.amount, 0); //rechnet gesamtsumme im basket aus
    let delivery = 4.99;

    buyNowPrice.innerHTML = "(" + (subTotalSum + delivery).toFixed(2).replace(".", ",") + "€" + ")";
}

function openDialog() {
    dialog.innerHTML = getOrderedTemplate();
    dialog.showModal();
    dialog.classList.add("opened");

    let basketRef = document.getElementById("myBasket");
    let clickedButton = event.target.id; //gibt die id des angeklickten button aus

    if (clickedButton === "buyNowButton") { //vergleicht angeklickte id mit: "buyNowButton", ...
        basketRef.classList.add("remove-basket"); //... wenn ja, entfernt basket

        setTimeout(() => {
            setTimeout(closeDialog, 5000); //führt closeDialog funktion nach 5000 ms aus
        });
    }
}

function closeDialog() {
    dialog.close();
    dialog.classList.remove("opened");
}

function toggleMobileBasket() {
    
}


