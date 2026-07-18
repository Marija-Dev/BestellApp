let orderedDialog = document.getElementById("myOrderedDialog");
let mobileBasketDialog = document.getElementById("mobileBasketDialogID");

function init() {
    getFromLocalStorage();
    renderDishes();
    renderBasket();
    renderMobileBasket();
    updateAddToBasketBtns();
}

//sorts dishes into the correct container according to category
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

// looks up a dish by ID in the basket and either increases its quantity or inserts it if missing
function addToBasket(id) {
    let currentDish = dishes.find(dish => dish.id === id);
    let existingDish = basket.find(element => element.id === currentDish.id); 
    let newDish = {
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
    renderMobileBasket();
    changeAddToBasketButton(id);
    showBadge(id);
}

// changes design and text from "add to basket" button to "added 1" if dish is in basket
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

// resets all "add to basket" buttons 
function resetAllAddToBasketButtons() {
    let allAddToBasketButtons = document.querySelectorAll(".add-to-basket-button");

    for (let i = 0; i < allAddToBasketButtons.length; i++) {
        allAddToBasketButtons[i].classList.remove("add-to-basket-color");
        allAddToBasketButtons[i].innerHTML = `Add to basket`;
    }
}

// renders basket content, if basket empty shows "nothin in here.." message
// calculates the total amount for each menu item in getBasketTemplate using its price and displays it in the HTML
function renderBasket() {
    let basketRef = document.getElementById("addedBasketMenu");
    let checkOutCon = document.getElementById("checkOutContainer");
    basketRef.innerHTML = "";

    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
        let basketDish = basket[indexBasket];
        basketRef.innerHTML += getBasketTemplate(basketDish);
    }
    if (basket.length === 0) {
        basketRef.innerHTML = getEmptyBasketNoteTemplate();
        checkOutCon.innerHTML = "";
    } else if (basket.length !== 0) {
        checkOutCon.innerHTML = getSubTotalTemplate();
    }
    calculatePrice();
}

// renders mobile basket content, if basket empty shows "nothin in here.." message
// calculates the total amount for each menu item in getBasketTemplate using its price and displays it in the HTML
function renderMobileBasket() {
    let basketMobileRef = document.getElementById("mobileBasketContent");
    let mobileCheckOut = document.getElementById("mobileCheckOutContainer");
    basketMobileRef.innerHTML = "";

    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
        let basketDish = basket[indexBasket];
        basketMobileRef.innerHTML += getBasketTemplate(basketDish);
    }
    if (basket.length === 0) {
        basketMobileRef.innerHTML = getEmptyBasketNoteTemplate();
        mobileCheckOut.innerHTML = "";
    } else if (basket.length !== 0) {
        mobileCheckOut.innerHTML = getSubTotalTemplate();
    }
    calculatePrice();
}

// deletes single dish from basket
function deleteDish(id) {
    let indexBasket = basket.findIndex(dish => dish.id === id);

    if (indexBasket === -1) {
        return;
    }

    basket.splice(indexBasket, 1);

    renderBasket();
    renderMobileBasket();
    changeAddToBasketButton(id);
    showBadge(id);
}

// changes the amount of a single dish in the basket; if the amount is 1 and the user clicks "-", the dish is removed
function changeAmount(id) {
    let currentDish = basket.find(dish => dish.id === id);
    let clickedButton = event.target.id;

    if (clickedButton === "removeAmount" && currentDish.amount > 1) {
        currentDish.amount--;
    } else if (clickedButton === "addAmount") {
        currentDish.amount++;
    } else if (currentDish.amount <= 1) {
        deleteDish(id);
    }

    renderBasket();
    renderMobileBasket();
    changeAddToBasketButton(id);
    showBadge(id);
}

// calculates the total price of all dishes and renders it in the container matching the className
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

// calculates the price of all dishes and displays it in the "buyNow" - button 
function buyNow() {
    let buyNowPrice = document.getElementsByClassName("buy-now-price");
    let subTotalSum = basket.reduce((sum, dish) => sum + dish.price * dish.amount, 0); //rechnet gesamtsumme im basket aus, ohne delivery

    for (let i = 0; i < buyNowPrice.length; i++) {
        buyNowPrice[i].innerHTML = "(" + (subTotalSum + delivery).toFixed(2).replace(".", ",") + "€" + ")";
    }
}

// opens the "order done" dialog if user clicks on "buyNow"- button
function openOrderedDialog(id) {
    orderedDialog.innerHTML = getOrderedTemplate();
    orderedDialog.showModal();
    orderedDialog.classList.add("opened");

    resetAllAddToBasketButtons();
    showBadge(id);
    autoDialogClose();
    emptyBasket();
    emptyMobileBasket();
}

// empties the basket content and hides the basket for 5 seconds
function emptyBasket() {
    let basket = document.getElementById("myBasket");
    let basketRef = document.getElementById("addedBasketMenu");
    let basketCheckOutCon = document.getElementById("checkOutContainer");
    let clickedButton = event.target.id;

    if (clickedButton === "buyNowButton" || clickedButton === "buyNowPrice") {
        basket.classList.add("remove-basket");
        basketRef.innerHTML = getEmptyBasketNoteTemplate();
        basketCheckOutCon.innerHTML = "";
    }

    setTimeout(() => {
        basket.classList.remove("remove-basket");
    }, 5000);
    deleteItems();
}

// clears all basket items and temporarily hides the basket for 5 seconds
function emptyMobileBasket() {
    let mobileBasketRef = document.getElementById("mobileBasketContent");
    let mobileCheckOutContainer = document.getElementById("mobileCheckOutContainer");
    let clickedButton = event.target.id; //gibt die id des angeklickten button aus

    if (clickedButton === "buyNowButton" || clickedButton === "buyNowPrice") { //vergleicht angeklickte id mit: "buyNowButton"  oder "buyNowPrice" id, ...
        mobileBasketDialog.classList.remove("open"); //... bzw entfernt hier mobile basket
        mobileBasketRef.innerHTML = getEmptyBasketNoteTemplate();
        mobileCheckOutContainer.innerHTML = "";
    }

    setTimeout(() => {
        mobileBasketDialog.classList.add("open");
    }, 5000);
    deleteItems();
}

// auto-closes the "order done" dialog 5 seconds after the order is done
function autoDialogClose() {
    setTimeout(() => {
        setTimeout(closeOrderedDialog, 5000);
    });
}

// closes the "order done" dialog when user clicks on the "x"
function closeOrderedDialog() {
    orderedDialog.close();
    orderedDialog.classList.remove("opened");
}

// toggles the mobile basket when the basket icon is clicked
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

// shows a badge with dish count; hides it when the basket is empty
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

// Updates the dish count in the "add to basket" button when the page loads
function updateAddToBasketBtns() {
    for (let i = 0; i < basket.length; i++) {
        changeAddToBasketButton(basket[i].id);
        showBadge(basket[i].id);
    }
}

// saves the basket object in localstorage
function saveToLocalStorage() {
    localStorage.setItem("basket", JSON.stringify(basket));
}

// loads the basket object from the localstorage
function getFromLocalStorage() {
    let myBasket = JSON.parse(localStorage.getItem("basket"));

    if (myBasket) {
        basket = myBasket;
    } else {
        basket;
    }
}

// clears all data from localstorage
function deleteItems() {
  localStorage.clear();
}

