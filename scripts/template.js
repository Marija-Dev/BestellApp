function getBurgerTemplate(indexDishes) {
    return `<section class="single-menu-card">
                    <img class="single-menu-img" src="${dishes[indexDishes].imgPath}" alt="">

                    <div class="single-meal-description">
                        <div class="name-price-con">
                            <h4 class="meal-name">${dishes[indexDishes].name}</h4>
                            <p class="price">${dishes[indexDishes].price.toFixed(2).replace(".", ",") + "€"}</p>
                        </div>

                        <div>
                            <p class="ingredients">${dishes[indexDishes].ingredients}</p>
                        </div>
                    </div>

                    <button onclick="addToBasket(${indexDishes})" class="add-to-basket-button"></button>
            </section>`
}

function getPizzaTemplate(indexDishes) {
    return `<section class="single-menu-card">
                    <img class="single-menu-img" src="${dishes[indexDishes].imgPath}" alt="">

                    <div class="single-meal-description">
                        <div class="name-price-con">
                            <h4 class="meal-name">${dishes[indexDishes].name}</h4>
                            <p class="price">${dishes[indexDishes].price.toFixed(2).replace(".", ",") + "€"}</p>
                        </div>

                        <div>
                            <p class="ingredients">${dishes[indexDishes].ingredients}</p>
                        </div>
                    </div>

                    <button onclick="addToBasket(${indexDishes})" class="add-to-basket-button"></button>

            </section>
           `
}

function getSaladTemplate(indexDishes) {
    return `<section class="single-menu-card">
                    <img class="single-menu-img" src="${dishes[indexDishes].imgPath}" alt="">

                    <div class="single-meal-description">
                        <div class="name-price-con">
                            <h4 class="meal-name">${dishes[indexDishes].name}</h4>
                            <p class="price">${dishes[indexDishes].price.toFixed(2).replace(".", ",") + "€"}</p>
                        </div>

                        <div>
                            <p class="ingredients">${dishes[indexDishes].ingredients}</p>
                        </div>
                    </div>

                    <button onclick="addToBasket(${indexDishes})" class="add-to-basket-button"></button>
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
                    <button id="removeAmount" onclick="changeAmount(${indexBasket})" class="remove-amount"></button>
                    <p id="menuAmount" class="basket-amount">${basket[indexBasket].amount}</p>
                    <button id="addAmount" onclick="changeAmount(${indexBasket})" class="add-amount"></button>
                    <p id="price" class="basket-menu-price">${dishes[indexBasket].price.toFixed(2).replace(".", ",") + "€"}</p>
                </div>
                
            </section>
            `

}

