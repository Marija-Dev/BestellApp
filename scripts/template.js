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

                    <button onclick="addToBasket(${indexDishes})" class="add-to-basket-button">Add to basket</button>
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

                    <button onclick="addToBasket(${indexDishes})" class="add-to-basket-button">Add to basket</button>

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

                    <button onclick="addToBasket(${indexDishes})" class="add-to-basket-button">Add to basket</button>
            </section>
           `
}


function getBasketTemplate(indexBasket) {
    return `<section >
                <p id="menuAmount-${indexBasket}">${basket[indexBasket].amount}</p>
                
                <h4 class="meal-name">${basket[indexBasket].name}</h4>

            </section>
            `

}

