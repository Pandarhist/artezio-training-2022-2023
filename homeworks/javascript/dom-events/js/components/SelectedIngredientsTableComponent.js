"use strict";

class SelectedIngredientsTableComponent {
    #tBodyElement;

    #count = 0;
    #menuIngredients;
    #priceCoefficient = 1;

    #rowClickListener = null;

    constructor(element, menuIngredients) {
        this.#menuIngredients = menuIngredients;
        this.#tBodyElement = element.tBodies[0];
        this.#tBodyElement.addEventListener("click", (e) => this.#handleRowClick(e));
    }

    static #decrementIndexes(row) {
        let nextRow = row.nextElementSibling;

        while (nextRow) {
            const indexCell = nextRow.querySelector(".ingredient-index");
            indexCell.textContent = Number(indexCell.textContent) - 1;
            nextRow = nextRow.nextElementSibling;
        }
    }

    #fillRow(row, ingredient) {
        row.dataset.id = ingredient.id;

        const indexCell = row.insertCell();
        indexCell.classList.add("ingredient-index");
        indexCell.textContent = ++this.#count;

        const nameCell = row.insertCell();
        nameCell.textContent = ingredient.name;
        nameCell.style.width = "50%";

        const priceCell = row.insertCell();
        priceCell.textContent = formatPrice(ingredient.price * this.#priceCoefficient);
        priceCell.style.width = "50%";

        const cancelCell = row.insertCell();
        const cancelSpan = document.createElement("span");
        cancelSpan.classList.add("glyphicon", "glyphicon-remove");
        const cancelButton = document.createElement("button");
        cancelButton.classList.add("btn", "btn-sm", "btn-danger");
        cancelButton.append(cancelSpan);
        cancelCell.style.width = "auto";
        cancelCell.append(cancelButton);
    }

    #handleRowClick(event) {
        if (!event.target.closest("button")) {
            return;
        }

        const row = event.target.closest("tr");
        const ingredient = this.#menuIngredients.find((item) => item.id === row.dataset.id);

        SelectedIngredientsTableComponent.#decrementIndexes(row);

        this.#tBodyElement.removeChild(row);
        this.#count--;

        if (this.#rowClickListener) {
            this.#rowClickListener(ingredient);
        }
    }

    /**
     * Добавление в таблицу ингредиента гамбургера.
     *
     * @param {HamburgerIngredient} ingredient - ингредиент гамбургера.
     */
    add(ingredient) {
        const isValidIngredient = this.#menuIngredients.includes(ingredient);

        isValidIngredient && this.#fillRow(this.#tBodyElement.insertRow(), ingredient);
    }

    /**
     * Установка значения коэффициента зависимости цены от размера.
     *
     * @param {Number} newValue - коэффициент.
     */
    setPriceCoefficient(newValue) {
        this.#priceCoefficient = newValue;
    }

    /**
     * Установка функции обратного вызова на нажатии на строку.
     *
     * @param {Function} listener отправляет HamburgerIngredient в качестве аргумента.
     */
    onRowClick(listener) {
        this.#rowClickListener = listener;
    }
}
