function getBurgerTemplate(indexDishes) {
    return `<section class="single-menu-card">
                    <img class="single-menu-img" src="${dishes[indexDishes].imgPath}" alt="${dishes[indexDishes].alt}">

                    <div class="single-meal-description">
                        <div class="name-price-con">
                            <h4 class="meal-name">${dishes[indexDishes].name}</h4>

                        </div>
                           
                        <div class="price-container"> 
                            <p class="price">${dishes[indexDishes].price.toFixed(2).replace(".", ",") + "€"}</p>
                        </div>
                            
                        <div>
                            <p class="ingredients">${dishes[indexDishes].ingredients}</p>
                        </div>
                    </div>

                    <button onclick="addToBasket(${indexDishes})" id="addToBasketButton-${indexDishes}" class="add-to-basket-button"></button>
            </section>`
}

function getPizzaTemplate(indexDishes, indexBasket) {
    return `<section class="single-menu-card">
                    <img class="single-menu-img" src="${dishes[indexDishes].imgPath}" alt="${dishes[indexDishes].alt}">

                    <div class="single-meal-description">
                        <div class="name-price-con">
                            <h4 class="meal-name">${dishes[indexDishes].name}</h4>
                            <p class="price">${dishes[indexDishes].price.toFixed(2).replace(".", ",") + "€"}</p>
                        </div>

                        <div>
                            <p class="ingredients">${dishes[indexDishes].ingredients}</p>
                        </div>
                    </div>

                    <button onclick="addToBasket(${indexDishes})" id="addToBasketButton" class="add-to-basket-button">Add to basket</button>

            </section>
           `
}

function getSaladTemplate(indexDishes, indexBasket) {
    return `<section class="single-menu-card">
                    <img class="single-menu-img" src="${dishes[indexDishes].imgPath}" alt="${dishes[indexDishes].alt}">

                    <div class="single-meal-description">
                        <div class="name-price-con">
                            <h4 class="meal-name">${dishes[indexDishes].name}</h4>
                            <p class="price">${dishes[indexDishes].price.toFixed(2).replace(".", ",") + "€"}</p>
                        </div>

                        <div>
                            <p class="ingredients">${dishes[indexDishes].ingredients}</p>
                        </div>
                    </div>

                    <button onclick="addToBasket(${indexDishes})" id="addToBasketButton" class="add-to-basket-button">Add to basket</button>
            </section>
           `
}


function getBasketTemplate(indexBasket) {
    return `<section class="basket-menu-card">
                <div class="basket-name-container">
                    <p class="basket-amount">${basket[indexBasket].amount}</p>
                    <p class="basket-x">x</p>
                    <p class="basket-menu-name">${basket[indexBasket].name}</p>
                    
                    <div class="delete-button-container">
                        <button class="delete-menu-button" onclick="deleteMenu(${indexBasket})"></button>
                    </div>
                </div>

                <div class="basket-amount-container">
                    <div class="change-amount-container">
                        <button id="removeAmount" onclick="changeAmount(${indexBasket})" class="remove-amount"></button>
                        <p id="menuAmount-${indexBasket}" class="basket-amount">${basket[indexBasket].amount}</p>
                        <button id="addAmount-${indexBasket}" onclick="changeAmount(${indexBasket})" class="add-amount"></button>
                    </div>

                    <p id="price-${indexBasket}" class="basket-menu-price">${(basket[indexBasket].price * basket[indexBasket].amount).toFixed(2).replace(".", ",") + "€"}</p>
                </div>
                
            </section>
            `
}

function getEmptyBasketNoteTemplate() {
    return `<div class="empty-basket-note">
                Nothing here yet. <br>
                Go ahead and choose something delicious!

                <img class="shopping-cart-img" src="./assets/icons/shopping-cart.svg" alt="Shopping-Cart">
            </div>
           `
}

function getSubTotalTemplate() {
    return `<section class="check-out-container">
                <div class="sub-total-container">
                    <h6>Subtotal</h6>
                    <p id="subTotal" class="sub-price"></p>
                </div>

                <div class="delivery-container">
                    <h6>Delivery fee</h6>
                    <p id="deliveryFee" class="delivery-price"></p>
                </div>

                <div class="border"></div>

                <div class="total-container">
                    <h6>Total</h6>
                    <p id="total" class="total-price"></p>
                </div>

                <div>
                    <button onclick="openOrderedDialog()" id="buyNowButton" class="buy-now-button">Buy now
                        <p id="buyNowPrice" class="buy-now-price"></p>
                    </button>
                </div>
            </section>
           `
           
}


function getOrderedTemplate() {
    return ` <section class="ordered-container"> 
                <p onclick="closeOrderedDialog()" class="close-dialog-btn">x</p>
                <img class="car-image" src="./assets/icons/delivery-car.png" alt="">
                <p class="order-confirmed">Order confirmed!</p>
                <p class="food-on-way">Your food in on the way!</p>
            </section>
    
           `
}




