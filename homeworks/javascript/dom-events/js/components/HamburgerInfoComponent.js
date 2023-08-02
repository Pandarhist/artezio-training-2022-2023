"use strict";

class HamburgerInfoComponent {
    #caloriesElement;
    #priceElement;
    #sizeElement;
    #stuffingsCountElement;
    #toppingsCountElement;

    constructor(element) {
        this.#caloriesElement = element.querySelector(".info-calories");
        this.#priceElement = element.querySelector(".info-price");
        this.#sizeElement = element.querySelector(".info-size");
        this.#stuffingsCountElement = element.querySelector(".info-stuffings");
        this.#toppingsCountElement = element.querySelector(".info-toppings");
    }

    /**
     * Установка текущего гамбургера.
     *
     * @param {Hamburger} newHamburger - гамбургер.
     */
    setHamburger(newHamburger) {
        const sizeName = newHamburger.getSize().name;
        const toppingsCount = newHamburger.getToppings().length;
        const stuffingsCount = newHamburger.getStuffings().length;
        const calories = newHamburger.calculateCalories();
        const price = newHamburger.calculatePrice();

        this.#sizeElement.textContent = sizeName;
        this.#toppingsCountElement.textContent = toppingsCount;
        this.#stuffingsCountElement.textContent = stuffingsCount;
        this.#caloriesElement.textContent = calories;
        this.#priceElement.textContent = formatPrice(price);
    }
}
