"use strict";

class MenuComponent {
    #itemsListElement;
    #addButtonElement;

    #ingredients;

    #itemClickListener = null;

    constructor(element, ingredients) {
        this.#addButtonElement = element.querySelector("button");
        this.#itemsListElement = element.querySelector(".ingredients");
        this.#itemsListElement.addEventListener("click", (e) => this.#handleItemClick(e));
        this.#ingredients = ingredients.map((item) => ({ available: true, value: item }));
        this.#fill(ingredients);
    }

    static #createLI(ingredient) {
        const link = document.createElement("a");
        link.textContent = ingredient.name;
        link.href = "#";
        const element = document.createElement("li");
        element.dataset.id = ingredient.id;
        element.append(link);

        return element;
    }

    /**
     * Заполняет выпадающий список ингредиентов.
     *
     * @param {HamburgerIngredient[]} ingredients - ингредиенты.
     */
    #fill(ingredients) {
        ingredients
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach((item) => {
                const liElement = MenuComponent.#createLI(item);
                this.#itemsListElement.append(liElement);
            });
    }

    #handleItemClick(event) {
        const liElement = event.target.closest("li");

        if (!liElement) {
            return;
        }

        const ingredient = this.#ingredients.find((item) => item.value.id === liElement.dataset.id);

        if (this.#itemClickListener) {
            this.#itemClickListener(ingredient.value);
        }
    }

    /**
     * Скрывает или отображает элемент меню, представляющий ингредиент гамбургера.
     *
     * @param {HamburgerIngredient} ingredient - ингредиент гамбургера.
     */
    toggle(ingredient) {
        const item = this.#ingredients.find((item) => item.value === ingredient);

        if (!item) {
            return;
        }

        const list = this.#itemsListElement;
        const liElement = list.querySelector(`li[data-id=${ingredient.id}]`);

        if (item.available) {
            item.available = false;
            liElement.style.display = "none";

            const hasAvailableIngredients = this.#ingredients.some((item) => item.available);

            !hasAvailableIngredients && (this.#addButtonElement.disabled = true);
        } else {
            item.available = true;
            liElement.style.display = "block";

            this.#addButtonElement.disabled && (this.#addButtonElement.disabled = false);
        }
    }

    /**
     * Установка функции обратного вызова при нажатии на элемент меню.
     *
     * @param {Function} listener отправляет HamburgerIngredient в качестве аргумента.
     */
    onItemClick(listener) {
        this.#itemClickListener = listener;
    }
}
