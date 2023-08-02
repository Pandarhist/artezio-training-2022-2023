"use strict";

class SelectSizeComponent {
    #parentContainer;
    #selectContainer;

    #sizes;

    #sizeSelectionListener = null;

    constructor(element, sizes) {
        this.#parentContainer = element;
        this.#selectContainer = element.querySelector(".select-size");
        this.#selectContainer.addEventListener("click", (e) => this.#handleSizeSelection(e));
        this.#sizes = sizes;
        this.#fill(sizes);
    }

    static #createSizeButton(size) {
        const button = document.createElement("button");
        button.classList.add("btn", "btn-lg", "btn-primary");
        button.dataset.id = size.id;
        button.textContent = size.name;
        const element = document.createElement("div");
        element.classList.add("col-xs-6", "text-center");
        element.append(button);

        return element;
    }

    #fill(items) {
        items
            .slice()
            .sort((a, b) => b.name.localeCompare(a.name))
            .forEach((item) => this.#selectContainer.append(SelectSizeComponent.#createSizeButton(item)));
    }

    #handleSizeSelection(event) {
        if (!event.target.closest("button")) {
            return;
        }

        this.#parentContainer.style.display = "none";

        const size = this.#sizes.find((item) => item.id === event.target.dataset.id);

        if (this.#sizeSelectionListener) {
            this.#sizeSelectionListener(size);
        }
    }

    /**
     * Установка функции обратного вызова на выбор размера.
     *
     * @param {Function} listener отправляет объект HamburgerSize в качестве аргумента.
     */
    onSizeSelection(listener) {
        this.#sizeSelectionListener = listener;
    }
}
