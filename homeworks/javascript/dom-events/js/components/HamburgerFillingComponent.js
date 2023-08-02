"use strict";

class HamburgerFillingComponent {
    #buyHamburgerElement;
    #parentContainer;

    #capComponent;
    #hiComponent;
    #htComponent;
    #toppingIFComponent;
    #stuffingIFComponent;

    #hamburger = null;

    constructor(element, toppings, stuffings) {
        this.#parentContainer = element;
        this.#buyHamburgerElement = element.querySelector("#buyHamburger");
        this.#buyHamburgerElement.addEventListener("click", () => {
            this.#handleBuyHamburgerClick();
        });

        this.#capComponent = new CountAndPriceComponent(element.querySelector("form"));

        this.#hiComponent = new HamburgerInfoComponent(element.querySelector("#hamburgerInfo"));
        this.#stuffingIFComponent = new IngredientsFillingComponent(
            element.querySelector("#stuffingFilling"),
            stuffings
        );
        this.#stuffingIFComponent.onIngredientAdd(this.#handleStuffingAdd.bind(this));
        this.#stuffingIFComponent.onIngredientDelete(this.#handleStuffingDelete.bind(this));

        this.#toppingIFComponent = new IngredientsFillingComponent(element.querySelector("#toppingFilling"), toppings);
        this.#toppingIFComponent.onIngredientAdd(this.#handleToppingAdd.bind(this));
        this.#toppingIFComponent.onIngredientDelete(this.#handleToppingDelete.bind(this));
    }

    #handleBuyHamburgerClick() {
        if (!this.#htComponent) {
            this.#htComponent = new HamburgerTicketComponent(this.#parentContainer.querySelector("#hamburgerTicket"));
        }

        this.#htComponent.show(this.#hamburger, this.#capComponent.getCount(), this.#capComponent.getTotalPrice());
    }

    #handleStuffingAdd(ingredient) {
        this.#hamburger.addStuffing(ingredient);
        this.#updateHamburgerInfo();
    }

    #handleStuffingDelete(ingredient) {
        this.#hamburger.removeStuffing(ingredient);
        this.#updateHamburgerInfo();
    }

    #handleToppingAdd(ingredient) {
        this.#hamburger.addTopping(ingredient);
        this.#updateHamburgerInfo();
    }

    #handleToppingDelete(ingredient) {
        this.#hamburger.removeTopping(ingredient);
        this.#updateHamburgerInfo();
    }

    #updateHamburgerInfo() {
        const price = this.#hamburger.calculatePrice();
        this.#capComponent.setPrice(price);

        this.#hiComponent.setHamburger(this.#hamburger);
    }

    /**
     * Установка гамбургера
     *
     * @param {Hamburger} hamburger - гамбургер
     */
    setHamburger(hamburger) {
        const size = hamburger.getSize();
        const coefficient = size.priceCoefficient;
        const getToppingsFunc = hamburger.getToppings.bind(hamburger);
        const getStuffingsFunc = hamburger.getStuffings.bind(hamburger);

        this.#toppingIFComponent.setIngredientsGetter(getToppingsFunc);
        this.#toppingIFComponent.setPriceCoefficient(coefficient);
        this.#stuffingIFComponent.setIngredientsGetter(getStuffingsFunc);
        this.#stuffingIFComponent.setPriceCoefficient(coefficient);

        this.#hamburger = hamburger;

        this.#updateHamburgerInfo();
    }
}
