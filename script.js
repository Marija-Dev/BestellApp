let orderedDialog = document.getElementById("myOrderedDialog");
let mobileBasketDialog = document.getElementById("mobileBasketDialogID");

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
        let dish = dishes[indexDishes];
        
        if (dishes[indexDishes].category === "Burger & Sandwiches") {
            
            burgerRef.innerHTML += getBurgerTemplate(dish);  
        }

        if (dishes[indexDishes].category === "Pizza") {
            pizzaRef.innerHTML += getBurgerTemplate(dish);
        }

        if (dishes[indexDishes].category === "Salad") {
            saladRef.innerHTML += getBurgerTemplate(dish);
        }
    }
}




//prüft ob sich bestimmtes menu in basket befindet, wenn ja wird anzahl erhöht, wenn nein wird hinzugefügt
function addToBasket(id) {

    let dishToBasket = dishes.find(dish => dish.id === id);
    let found = basket.find(element => element.id === dishToBasket.id);

    menuToBasket = {
        id: dishToBasket.id,
        name: dishToBasket.name,
        price: dishToBasket.price,
        amount: 1
    }

    if (found) {
        found.amount++;
    } else {
        basket.push(menuToBasket);
    }


    renderBasket();
    calculatePrice();
    buyNow();
    changeAddToBasketButton(id);

}


// ------------TEST---------------



function changeAddToBasketButton(id) {
    let addToBasketButton = document.getElementById(`addToBasketButton-${id}`);
    let found = basket.find(element => element.id === id);

    

    if (found) {
        addToBasketButton.innerHTML = getAddToBasketBtnTemplate(found);
        addToBasketButton.classList.add("add-to-basket-color");
    } else {
        addToBasketButton.innerHTML = `Add to basket`;
    }
    
}


// -----------TEST ENDE-----------






//lädt basket inhalt, wenn nichts im basket, nachricht -> nothing in here..
//rechnet direkt im getBasketTemplate menge mal preis aus und zeigt es im html an (vom einzelnen menü)
function renderBasket() {
    let basketRef = document.getElementById("addedBasketMenu");
    let checkOutCon = document.getElementById("checkOutContainer");
    let basketMobileRef = document.getElementById("mobileBasketContent");
    let mobileCheckOut = document.getElementById("mobileCheckOutContainer");

    basketRef.innerHTML = "";
    basketMobileRef.innerHTML = "";

    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
        basketRef.innerHTML += getBasketTemplate(indexBasket);
        basketMobileRef.innerHTML += getBasketTemplate(indexBasket);
    }

    if (basket.length === 0) {
        basketRef.innerHTML = getEmptyBasketNoteTemplate();
        checkOutCon.innerHTML = "";
        basketMobileRef.innerHTML = getEmptyBasketNoteTemplate();
        mobileCheckOut.innerHTML = "";
    } else if (basket.length !== 0) {
        checkOutCon.innerHTML = getSubTotalTemplate();
        mobileCheckOut.innerHTML = getSubTotalTemplate();
    }

    calculatePrice();
}

//löscht basket inhalt -> einzelnes menü
function deleteMenu(indexBasket, indexDishes) {
    basket.splice(indexBasket, 1);

    renderBasket();
    buyNow();
    changeAddToBasketButton();
}

//prüft per id welcher button geklickt wurde, und fügt entweder 1 hinzu oder zieht 1 ab
function changeAmount(indexBasket, id) {
    let basketDishes = basket[indexBasket];
    let amountToChange = document.getElementById(`menuAmount-${indexBasket}`);
    let clickedButton = event.target.id;


    if (clickedButton === `addAmount-${indexBasket}`) {

        
        amountToChange.innerHTML = basketDishes.amount++;

       

    } else if (clickedButton === "removeAmount" && basketDishes.amount > 1) {
        amountToChange.innerHTML = basketDishes.amount--;
    }



    renderBasket();
    calculatePrice();
    buyNow();
    changeAddToBasketButton(id);
}

function calculatePrice() {
    let subTotal = document.getElementsByClassName("sub-price");
    let deliveryFee = document.getElementsByClassName("delivery-price");
    let total = document.getElementsByClassName("total-price");
    let subTotalSum = basket.reduce((sum, dish) => sum + dish.price * dish.amount, 0);

    for (let i = 0; i < subTotal.length; i++) {
        subTotal[i].innerHTML = subTotalSum.toFixed(2).replace(".", ",") + "€";
    }

    for (let i = 0; i < deliveryFee.length; i++) {
        deliveryFee[i].innerHTML = delivery.toFixed(2).replace(".", ",") + "€";
    }

    for (let i = 0; i < total.length; i++) {
        total[i].innerHTML = (subTotalSum + delivery).toFixed(2).replace(".", ",") + "€";
    }
}

function buyNow() {
    let buyNowPrice = document.getElementsByClassName("buy-now-price");
    let subTotalSum = basket.reduce((sum, dish) => sum + dish.price * dish.amount, 0); //rechnet gesamtsumme im basket aus

    for (let i = 0; i < buyNowPrice.length; i++) {
        buyNowPrice[i].innerHTML = "(" + (subTotalSum + delivery).toFixed(2).replace(".", ",") + "€" + ")";
    }
}

function openOrderedDialog() {
    orderedDialog.innerHTML = getOrderedTemplate();
    orderedDialog.showModal();
    orderedDialog.classList.add("opened");

    let basketRef = document.getElementById("myBasket");
    let clickedButton = event.target.id; //gibt die id des angeklickten button aus

    if (clickedButton === "buyNowButton" || clickedButton === "buyNowPrice") { //vergleicht angeklickte id mit: "buyNowButton", ...
        basketRef.classList.add("remove-basket"); //... wenn ja, entfernt basket nach klick auf bestellbutton
        mobileBasketDialog.classList.remove("open");

        setTimeout(() => {
            setTimeout(closeOrderedDialog, 5000); //führt closeOrderedDialog funktion nach 5000 ms aus
        });
    }
}

function closeOrderedDialog() {
    orderedDialog.close();
    orderedDialog.classList.remove("opened");
}

function toggleMobileBasketDialog() {
    let basketMobileContent = document.getElementById("mobileBasketContent");

    if (mobileBasketDialog.open) {
        mobileBasketDialog.close();
    } else {
        mobileBasketDialog.show();
    }

    mobileBasketDialog.classList.toggle("open");
}