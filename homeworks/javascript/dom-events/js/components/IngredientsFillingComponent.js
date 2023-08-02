"use strict";

class IngredientsFillingComponent {
    #sitComponent;
    #aimComponent;

    #getIngredientsFn = null;

    #ingredientAddListener = null;
    #ingredientDeleteListener = null;

    constructor(element, ingredients) {
        this.#aimComponent = new MenuComponent(element.querySelector(".ingredients-menu"), ingredients);
        this.#sitComponent = new SelectedIngredientsTableComponent(
            element.querySelector(".selected-ingredients"),
            ingredients
        );

        this.#aimComponent.onItemClick(this.#handleIngredientAdd.bind(this));
        this.#sitComponent.onRowClick(this.#handleIngredientDelete.bind(this));
    }

    #handleIngredientAdd(ingredient) {
        if (this.#ingredientAddListener) {
            this.#ingredientAddListener(ingredient);
        }

        const hasAdded = this.#getIngredientsFn().includes(ingredient);

        if (hasAdded) {
            this.#sitComponent.add(ingredient);
            this.#aimComponent.toggle(ingredient);
        }
    }

    #handleIngredientDelete(ingredient) {
        this.#aimComponent.toggle(ingredient);

        if (this.#ingredientDeleteListener) {
            this.#ingredientDeleteListener(ingredient);
        }
    }

    /**
     * Установка коэффициента зависимости цены от размера гамбургера.
     *
     * @param {Number} newValue - коэффициент.
     */
    setPriceCoefficient(newValue) {
        this.#sitComponent.setPriceCoefficient(newValue);
    }

    /**
     * Установка функции обратного вызова для получения текущих ингредиентов гамбургера.
     *
     * @param {Function} callbackfn - функция обратного вызова.
     */
    setIngredientsGetter(callbackfn) {
        this.#getIngredientsFn = callbackfn;
    }

    /**
     * Установка функции обратного вызова при добавлении ингредиента гамбургера.
     *
     * @param {Function} listener отправляет объект HamburgerIngredient в качестве аргумента.
     */
    onIngredientAdd(listener) {
        this.#ingredientAddListener = listener;
    }

    /**
     * Установка функции обратного вызова при удалении ингредиента гамбургера.
     *
     * @param {Function} listener отправляет объект HamburgerIngredient в качестве аргумента.
     */
    onIngredientDelete(listener) {
        this.#ingredientDeleteListener = listener;
    }
}
