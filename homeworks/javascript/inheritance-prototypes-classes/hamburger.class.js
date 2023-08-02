"use strict";

const Hamburger = (function () {
    class HamburgerComponent {
        constructor(type, name, price, calories) {
            this.type = type;
            this.name = name;
            this.price = price;
            this.calories = calories;

            return Object.freeze(this);
        }
    }

    class HamburgerSize {
        constructor(name, maxStuffingCount, priceCoefficient, caloriesCoefficient) {
            this.name = name;
            this.maxStuffingCount = maxStuffingCount;
            this.priceCoefficient = priceCoefficient;
            this.caloriesCoefficient = caloriesCoefficient;

            return Object.freeze(this);
        }
    }

    class Hamburger {
        static #DEFAULT_CALORIES = 200;
        static #DEFAULT_PRICE = 180;

        //#region Компоненты и размеры гамбургера

        /* Размеры, виды начинок и добавок.
         * Необходимо наполнить своими значениями.
         * Также можно добавить свои собственные топпинги и начинки
         *
         * Размеры начинаются с SIZE_*
         * Начинки начинаются с STUFFING_*
         * Топпинги начинаются с TOPPING_*
         */
        static SIZE_SMALL = new HamburgerSize('Small', 5, 1, 1);
        static SIZE_LARGE = new HamburgerSize('Large', 10, 1.7, 1.5);
        static STUFFING_CHEESE = new HamburgerComponent('stuffing', 'Nice cheese', 300, 120);
        static STUFFING_SALAD = new HamburgerComponent('stuffing', 'Tasty salad', 250, 140);
        static STUFFING_POTATO = new HamburgerComponent('stuffing', 'Crispy potato', 320, 200);
        static TOPPING_MAYO = new HamburgerComponent('topping', 'Classic mayo', 140, 200);
        static TOPPING_SPICE = new HamburgerComponent('topping', 'Piquancy spice', 140, 180);

        //#endregion

        static #isStuffing(component) {
            return component instanceof HamburgerComponent && component.type === 'stuffing';
        }

        static #isTopping(component) {
            return component instanceof HamburgerComponent && component.type === 'topping';
        }

        #size;
        #stuffings;
        #toppings;

        /**
         * Реализовать конструктор для создания гамбургером с описанными методами ниже.
         * Необходимо оформить с помощью классов.
         *
         * Класс, объекты которого описывают параметры гамбургера.
         *
         * @constructor
         * @param size        Размер
         * @param stuffing    Начинка
         */
        constructor(size, stuffing) {
            this.#size = size instanceof HamburgerSize ? size : Hamburger.SIZE_SMALL;
            this.#stuffings = Hamburger.#isStuffing(stuffing) ? [stuffing] : [];
            this.#toppings = [];
        }

        /**
         * Добавить начинку к гамбургеру. Можно добавить несколько
         * добавок, при условии, что они разные.
         *
         * Нельзя добавить начинку, если размер гамбургера
         * Hamburger.SIZE_SMALL и кол-во начинку равно 5.
         *
         * Если размер гамбургера Hamburger.SIZE_LARGE,
         * можно добавлять не больше 10 начинку
         *
         * @param stuffing  Тип начинки
         */
        addStuffing(stuffing) {
            if (this.#stuffings.length === this.#size.maxStuffingCount || !Hamburger.#isStuffing(stuffing)) {
                return;
            }

            if (!this.#stuffings.includes(stuffing)) {
                this.#stuffings.push(stuffing);
            }
        }

        /**
         * Добавить топпинг к гамбургеру. Можно добавить несколько,
         * при условии, что они разные.
         *
         * @param topping  Тип топпинга
         */
        addTopping(topping) {
            if (!Hamburger.#isTopping(topping)) {
                return;
            }

            if (!this.#toppings.includes(topping)) {
                this.#toppings.push(topping);
            }
        }

        /**
         * Убрать топпинг, при условии, что он ранее был
         * добавлен.
         *
         * @param topping Тип топпинга
         */
        removeTopping(topping) {
            if (!Hamburger.#isTopping(topping)) {
                return;
            }

            const toppingIndex = this.#toppings.indexOf(topping);

            if (toppingIndex !== -1) {
                this.#toppings.splice(toppingIndex, 1);
            }
        }

        /**
         * Узнать размер гамбургера
         * @return {HamburgerSize} размер гамбургера
         */
        getSize() {
            return this.#size;
        };

        /**
         * Узнать начинку гамбургера
         * @return {Array} Массив добавленных начинок, содержит константы
         * Hamburger.STUFFING_*
         */
        getStuffing() {
            return this.#stuffings.slice();
        };

        /**
         * Получить список добавок
         *
         * @return {Array} Массив добавленных добавок, содержит константы
         * Hamburger.TOPPING_*
         */
        getToppings() {
            return this.#toppings.slice();
        };

        /**
         * Узнать калорийность
         * @return {Number} Калорийность в калориях
         */
        calculateCalories() {
            const toppingCalories = this.#toppings.reduce((calories, topping) => calories + topping.calories, 0);
            const stuffingCalories = this.#stuffings.reduce((calories, stuffing) => calories + stuffing.calories, 0);
            const totalCalories = Hamburger.#DEFAULT_CALORIES + toppingCalories + stuffingCalories;

            return totalCalories * this.#size.caloriesCoefficient;
        };

        /**
         * Узнать цену гамбургера
         * @return {Number} Цена гамбургера
         */
        calculatePrice() {
            const toppingPrice = this.#toppings.reduce((price, topping) => price + topping.price, 0);
            const stuffingPrice = this.#stuffings.reduce((price, stuffing) => price + stuffing.price, 0);
            const totalPrice = Hamburger.#DEFAULT_PRICE + toppingPrice + stuffingPrice;

            return totalPrice * this.#size.priceCoefficient;
        };
    }

    return Hamburger;
})();

//#region Пример использования

// маленький гамбургер с начинкой из сыра
let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

// добавим из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);

// добавим картофель
hamburger.addStuffing(Hamburger.STUFFING_POTATO);

// спросим сколько там калорий
console.log('Калории: ', hamburger.calculateCalories());

// сколько стоит
console.log('Цена: ', hamburger.calculatePrice());

// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);

// А сколько теперь стоит?
console.log('Цена с соусом ', hamburger.calculatePrice());

// большой ли гамбургер получился?
console.log('Большой ли гамбургер? ', hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false

// убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);

console.log('Сколько топпингов добавлено ', hamburger.getToppings().length); // 1

//#endregion
