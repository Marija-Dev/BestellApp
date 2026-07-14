let orderedDialog = document.getElementById("myOrderedDialog");
let mobileBasketDialog = document.getElementById("mobileBasketDialogID");

function init() {
    getFromLocalStorage();
    renderDishes();
    renderBasket();
    updateAddToBasketBtns();
}

//fügt die dishes je nach kategorie in zugehörigen html container
function renderDishes() {
    let burgerRef = document.getElementById("allBurgers");
    let pizzaRef = document.getElementById("allPizza");
    let saladRef = document.getElementById("allSalad");

    for (let indexDishes = 0; indexDishes < dishes.length; indexDishes++) {
        let dish = dishes[indexDishes];

        if (dish.category === "Burger & Sandwiches") {
            burgerRef.innerHTML += getMenuTemplate(dish);
        } else if (dish.category === "Pizza") {
            pizzaRef.innerHTML += getMenuTemplate(dish);
        } else {
            saladRef.innerHTML += getMenuTemplate(dish);
        }
    }
}

// prüft per id ob sich bestimmtes dish im basket befindet, wenn ja anzahl wird erhöht, wenn nein wird hinzugefügt
function addToBasket(id) {
    let currentDish = dishes.find(dish => dish.id === id); //prüft per id angeklicktes dish
    let existingDish = basket.find(element => element.id === currentDish.id); //prüft per id ob sich angeklicktes dish im basket befindet
    let newDish = { //wenn existingDish nicht im basket, wird per newDish hinzugefügt
        id: currentDish.id,
        name: currentDish.name,
        price: currentDish.price,
        amount: 1
    }

    if (existingDish) {
        existingDish.amount++;
    } else {
        basket.push(newDish);
    }

    renderBasket();
    changeAddToBasketButton(id);
    showBadge(id);
}

function changeAddToBasketButton(id) {
    let addToBasketButton = document.getElementById(`addToBasketButton-${id}`);
    let existingDish = basket.find(element => element.id === id);

    if (existingDish) {
        addToBasketButton.innerHTML = getAddToBasketBtnTemplate(existingDish);
        addToBasketButton.classList.add("add-to-basket-color");
    } else {
        addToBasketButton.innerHTML = `Add to basket`;
        addToBasketButton.classList.remove("add-to-basket-color");
    }
}

function resetAllAddToBasketButtons() {
    let allAddToBasketButtons = document.querySelectorAll(".add-to-basket-button");

    for (let i = 0; i < allAddToBasketButtons.length; i++) {
        allAddToBasketButtons[i].classList.remove("add-to-basket-color");
        allAddToBasketButtons[i].innerHTML = `Add to basket`;
    }
}

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
        let basketDish = basket[indexBasket];

        basketRef.innerHTML += getBasketTemplate(basketDish);
        basketMobileRef.innerHTML += getBasketTemplate(basketDish);
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
function deleteDish(id) {
    let indexBasket = basket.findIndex(dish => dish.id === id);

    if (indexBasket === -1) {
        return;
    }

    basket.splice(indexBasket, 1);

    renderBasket();
    changeAddToBasketButton(id);
    showBadge(id);
}

//fügt im basket 1 hinzu
function increaseAmount(id) {
    let currentDish = basket.find(dish => dish.id === id);

    if (!currentDish) {
        return;
    }

    currentDish.amount++;

    renderBasket();
    changeAddToBasketButton(id);
    showBadge(id);
}

// entfernt im basket 1 
function decreaseAmount(id) {
    let currentDish = basket.find(dish => dish.id === id);

    if (!currentDish) {
        return;
    }

    if (currentDish.amount > 1) {
        currentDish.amount--;
    } else if (currentDish.amount <= 1) {
        deleteDish(id);
    }

    renderBasket();
    changeAddToBasketButton(id);
    showBadge(id);
}

// rechnet preis aller gerichte zusammen und fügt sie per classname in die entsprechenden container
function calculatePrice() {
    let subTotal = document.getElementsByClassName("sub-price");
    let deliveryFee = document.getElementsByClassName("delivery-price");
    let total = document.getElementsByClassName("total-price");
    let buyNow = document.getElementsByClassName("buy-now-button");
    let subTotalSum = basket.reduce((sum, dish) => sum + dish.price * dish.amount, 0); //rechnet preis aller im basket befindlichen gerichte zusammen

    for (let i = 0; i < subTotal.length; i++) {
        subTotal[i].innerHTML = subTotalSum.toFixed(2).replace(".", ",") + "€";
        deliveryFee[i].innerHTML = delivery.toFixed(2).replace(".", ",") + "€";
        total[i].innerHTML = (subTotalSum + delivery).toFixed(2).replace(".", ",") + "€";
        buyNow[i].innerHTML = "Buy now " + "(" + (subTotalSum + delivery).toFixed(2).replace(".", ",") + "€" + ")";
    }

    saveToLocalStorage();
}

function buyNow() {
    let buyNowPrice = document.getElementsByClassName("buy-now-price");
    let subTotalSum = basket.reduce((sum, dish) => sum + dish.price * dish.amount, 0); //rechnet gesamtsumme im basket aus, ohne delivery

    for (let i = 0; i < buyNowPrice.length; i++) {
        buyNowPrice[i].innerHTML = "(" + (subTotalSum + delivery).toFixed(2).replace(".", ",") + "€" + ")";
    }
}

// öffnet dialog bei klick auf "buyNow"-Button
function openOrderedDialog(id) {
    orderedDialog.innerHTML = getOrderedTemplate();
    orderedDialog.showModal();
    orderedDialog.classList.add("opened");

    let basketRef = document.getElementById("myBasket");
    let mobileBasketRef = document.getElementById("mobileBasketContent");
    let mobileCheckOutContainer = document.getElementById("mobileCheckOutContainer");
    let clickedButton = event.target.id; //gibt die id des angeklickten button aus

    if (clickedButton === "buyNowButton" || clickedButton === "buyNowPrice") { //vergleicht angeklickte id mit: "buyNowButton"  oder "buyNowPrice" id, ...
        basketRef.classList.add("remove-basket"); //... wenn gleich, entfernt basket nach klick auf bestellbutton ... 
        mobileBasketDialog.classList.remove("open"); //... bzw entfernt hier mobile basket
        mobileBasketRef.innerHTML = getEmptyBasketNoteTemplate();
        mobileCheckOutContainer.innerHTML = "";

        setTimeout(() => {
            setTimeout(closeOrderedDialog, 5000); //führt closeOrderedDialog funktion nach 5000 ms -> 5 sec aus
        });
    }

    resetAllAddToBasketButtons();
    showBadge(id);
}

function closeOrderedDialog() {
    orderedDialog.close();
    orderedDialog.classList.remove("opened");

    saveToLocalStorage();
}

// öffnet/schliesst mobilen basket bei klick auf basket icon 
function toggleMobileBasketDialog() {
    let basketMobileContent = document.getElementById("mobileBasketContent");

    if (mobileBasketDialog.open) {
        mobileBasketDialog.close();
    } else {
        mobileBasketDialog.show();
    }

    mobileBasketDialog.classList.toggle("open");

    saveToLocalStorage();
}

// fügt basket icon badge mit aktueller anzahl der einzelnen gerichte hinzu, wenn 0 im warenkorb, badge verschwindet
function showBadge(id) {
    let badge = document.getElementById("badge");
    let totalAmount = basket.reduce((amount, dish) => amount + dish.amount, 0);
    let currentDish = basket.find(dish => dish.id === id);
    let clickedButton = event.target.id;

    if (currentDish) {
        badge.classList.remove("badge-hide");
        badge.innerHTML = totalAmount;
    } else if (!currentDish) {
        badge.innerHTML = totalAmount;
    }

    if ((!currentDish && totalAmount === 0) || (clickedButton === "buyNowButton")) {
        badge.classList.add("badge-hide");
    }
}

// zeigt die aktuelle stückzahl im basket an nachdem seite neu geladen wird
function updateAddToBasketBtns() {
    for (let i = 0; i < basket.length; i++) {
        changeAddToBasketButton(basket[i].id);
        showBadge(basket[i].id);
    }
}

//speichert das basket object im localstorage
function saveToLocalStorage() {
    localStorage.setItem("basket", JSON.stringify(basket));
}

//lädt das basket object aus dem localstorage
function getFromLocalStorage() {
    let myBasket = JSON.parse(localStorage.getItem("basket"));
    if (myBasket) {
        basket = myBasket;
    } else {
        basket;
    }
}

