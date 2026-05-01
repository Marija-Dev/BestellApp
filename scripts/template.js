function getDishesTemplate(indexBurger) {
    return `<section class="single-menu-card">
                    <img class="single-menu-img" src="${menuImages[indexBurger]}" alt="">

                    <div class="single-meal-description">
                        <div class="name-price-con">
                            <h4 class="meal-name">${burgerAndSandwiches[indexBurger].name}</h4>
                            <p class="price">${burgerAndSandwiches[indexBurger].price.toFixed(2).replace(".", ",") + "€"}</p>
                        </div>

                        <div>
                            <p class="ingredients">${burgerAndSandwiches[indexBurger].ingredients}</p>
                        </div>
                    </div>
            </section>`
}