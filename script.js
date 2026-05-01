function init() {
    renderBurger();
}

function renderBurger() {
    let contentRef = document.getElementById("allBurgers");
    contentRef.innerHTML = "";

    for (let indexBurger = 0; indexBurger < burgerAndSandwiches.length; indexBurger++) {
        contentRef.innerHTML += getDishesTemplate(indexBurger);
    }
}

function name(params) {
    
}