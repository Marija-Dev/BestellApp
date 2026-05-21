function getBurgerTemplate(indexBurger) {
    return `<section class="single-menu-card">
                    <img class="single-menu-img" src="${burgerImages[indexBurger]}" alt="">

                    <div class="single-meal-description">
                        <div class="name-price-con">
                            <h4 class="meal-name">${burgerAndSandwiches[indexBurger].name}</h4>
                            <p class="price">${burgerAndSandwiches[indexBurger].price.toFixed(2).replace(".", ",") + "€"}</p>
                        </div>

                        <div>
                            <p class="ingredients">${burgerAndSandwiches[indexBurger].ingredients}</p>
                        </div>
                    </div>

                    <button class="add-to-basket-button">Add to basket</button>
            </section>`
}

function getPizzaTemplate(indexPizza) {
    return `<section class="single-menu-card">
                    <img class="single-menu-img" src="${pizzaImages[indexPizza]}" alt="">

                    <div class="single-meal-description">
                        <div class="name-price-con">
                            <h4 class="meal-name">${pizza[indexPizza].name}</h4>
                            <p class="price">${pizza[indexPizza].price.toFixed(2).replace(".", ",") + "€"}</p>
                        </div>

                        <div>
                            <p class="ingredients">${pizza[indexPizza].ingredients}</p>
                        </div>
                    </div>

                    <button class="add-to-basket-button">Add to basket</button>

            </section>
           `
}

function getSaladTemplate(indexSalad) {
    return `<section class="single-menu-card">
                    <img class="single-menu-img" src="${saladImages[indexSalad]}" alt="">

                    <div class="single-meal-description">
                        <div class="name-price-con">
                            <h4 class="meal-name">${salad[indexSalad].name}</h4>
                            <p class="price">${salad[indexSalad].price.toFixed(2).replace(".", ",") + "€"}</p>
                        </div>

                        <div>
                            <p class="ingredients">${salad[indexSalad].ingredients}</p>
                        </div>
                    </div>

                    <button onclick="addToBasket" class="add-to-basket-button">Add to basket</button>
            </section>
           `
}

