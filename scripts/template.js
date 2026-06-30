function getBurgerTemplate(dish) {
    return `<section class="single-menu-card">
                    <img class="single-menu-img" src="${dish.imgPath}" alt="${dish.alt}">

                    <div class="single-meal-description">
                        <div class="name-price-con">
                            <h4 class="meal-name">${dish.name}</h4>

                        </div>
                           
                        <div class="price-container"> 
                            <p class="price">${dish.price.toFixed(2).replace(".", ",") + "€"}</p>
                        </div>
                            
                        <div>
                            <p class="ingredients">${dish.ingredients}</p>
                        </div>
                    </div>

                    <button onclick="addToBasket(${dish.id})" id="addToBasketButton-${dish.id}" class="add-to-basket-button">Add to basket</button>
            </section>`
}

function getPizzaTemplate(indexDishes) {
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

function getSaladTemplate(indexDishes) {
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


function getBasketTemplate(dish) {
    return `<section class="basket-menu-card">
                <div class="basket-name-container">
                    <p class="basket-amount">${dish.amount}</p>
                    <p class="basket-x">x</p>
                    <p class="basket-menu-name">${dish.name}</p>
                    
                    <div class="delete-button-container">
                        <button class="delete-menu-button" onclick="deleteMenu(${dish.id})"></button>
                    </div>
                </div>

                <div class="basket-amount-container">
                    <div class="change-amount-container">
                        <button id="removeAmount" onclick="decreaseAmount(${dish.id})" class="remove-amount"></button>
                        <p id="menuAmount-${dish.id}" class="basket-amount">${dish.amount}</p>
                        <button id="addAmount-${dish.id}" onclick="increaseAmount(${dish.id})" class="add-amount"></button>
                    </div>

                    <p id="price-${dish.id}" class="basket-menu-price">${(dish.price * dish.amount).toFixed(2).replace(".", ",") + "€"}</p>
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


function getAddToBasketBtnTemplate(dish) {
    return `<p class="add-to-basket-text">Added ${dish.amount}</p>
           `
}




