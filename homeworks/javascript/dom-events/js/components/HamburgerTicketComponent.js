"use strict";

class HamburgerTicketComponent {
    #parentContainer;

    constructor(element) {
        this.#parentContainer = element;
    }

    static #createPosition(name, value) {
        return { name, value };
    }

    /**
     * Создание секции чека.
     *
     * @param {String} name - заголовок секции.
     * @param {Object[]} items - объекты с полями, представляющие позиции секции.
     * @param {String} items[].name - наименование позиции.
     * @param {Number} items[].value - значение позиции.
     *
     * @returns {HTMLElement}
     */
    static #createSection(name, items) {
        const element = document.createElement("section");
        const positions = document.createElement("dl");
        positions.classList.add("dl-horizontal");

        items.forEach((item) => {
            const nameElement = document.createElement("dt");
            nameElement.textContent = item.name;
            const valueElement = document.createElement("dd");
            valueElement.textContent = item.value;

            positions.append(nameElement, valueElement);
        });

        if (name && name.trim()) {
            const header = document.createElement("h3");
            header.classList.add("text-center");
            header.textContent = name;

            element.append(header);
        }

        element.append(positions);

        return element;
    }

    /**
     * Вывод чека заказа.
     *
     * @param {Hamburger} hamburger - выбранный гамбургер.
     * @param {Number} count - количество гамбургеров.
     * @param {Number} totalPrice - цена за все гамбургеры.
     */
    show(hamburger, count, totalPrice) {
        const size = hamburger.getSize();
        const toppings = hamburger.getToppings();
        const stuffings = hamburger.getStuffings();

        if (this.#parentContainer.style.display === "none") {
            this.#parentContainer.style.display = "block";
        }

        this.#parentContainer.replaceChildren("");

        addIngredientsSection.call(this, "Topping", toppings);
        addIngredientsSection.call(this, "Stuffing", stuffings);

        //#region Обязательные секции
        const sizeSection = HamburgerTicketComponent.#createSection("Size", [
            HamburgerTicketComponent.#createPosition(size.name, formatPrice(hamburger.getDefaultPrice())),
        ]);
        sizeSection.style.marginBottom = "5px";

        const priceSection = HamburgerTicketComponent.#createSection("Price", [
            HamburgerTicketComponent.#createPosition("Price", formatPrice(hamburger.calculatePrice())),
        ]);
        priceSection.querySelector(".dl-horizontal").style.margin = 0;
        priceSection.style.borderBottom = "2px solid black";

        const totalSection = HamburgerTicketComponent.#createSection("", [
            HamburgerTicketComponent.#createPosition("Count", count),
            HamburgerTicketComponent.#createPosition("Total", formatPrice(totalPrice)),
        ]);
        //#endregion

        this.#parentContainer.append(sizeSection, priceSection, totalSection);

        function addIngredientsSection(name, ingredients) {
            if (!ingredients.length) {
                return;
            }

            const positions = ingredients.map((item) => {
                const price = item.price * size.priceCoefficient;

                return HamburgerTicketComponent.#createPosition(item.name, formatPrice(price));
            });

            const section = HamburgerTicketComponent.#createSection(name, positions);
            this.#parentContainer.append(section);
        }
    }
}
