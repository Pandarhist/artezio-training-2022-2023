"use strict";

class CountAndPriceComponent {
    #countInputElement;
    #totalPriceElement;

    #count = 1;
    #price = 0;

    #countChangeListener = null;

    constructor(element) {
        this.#countInputElement = element.querySelector("#count");
        this.#countInputElement.value = this.#count;
        this.#totalPriceElement = element.querySelector("#total");
        this.#countInputElement.addEventListener("change", (e) => this.#handleCountChange(e));
    }

    #handleCountChange(event) {
        let currentValue = Number(event.target.value);

        if (currentValue > 50) {
            event.target.value = currentValue = 50;
        } else if (currentValue < 1) {
            event.target.value = currentValue = 1;
        }

        if (currentValue !== this.#count) {
            this.#count = currentValue;

            if (this.#countChangeListener) {
                this.#countChangeListener(this.#count);
            }

            this.#recalculateTotalPrice();
        }
    }

    #recalculateTotalPrice() {
        this.#totalPriceElement.textContent = formatPrice(this.#count * this.#price);
    }

    /**
     * Получение количества заказываемых гамбургеров
     * @returns {Number}
     */
    getCount() {
        return this.#count;
    }

    /**
     * Получение общей цены за заказ (с учетом количества)
     * @return {Number}
     */
    getTotalPrice() {
        return this.#price * this.#count;
    }

    /**
     * Установка новой цены за один гамбургер.
     *
     * @param {Number} newPrice
     */
    setPrice(newPrice) {
        this.#price = newPrice;
        this.#recalculateTotalPrice();
    }

    /**
     * Установка функции обратного вызова на изменение количества
     *
     * @param {Function} listener вызывается, когда было изменено количество. Отправляет аргумент новое количество
     */
    onCountChange(listener) {
        this.#countChangeListener = listener;
    }
}
