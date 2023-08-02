"use strict";

/**
 * Реализовать конструктор для создания гамбургеров с описанными ниже методами.
 *
 * Необходимо оформить с помощью прототипного наследования.
 *
 * Функция, объекты которой описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 */
const Hamburger = (function () {
    const DEFAULT_CALORIES = 250;
    const DEFAULT_PRICE = 2.06;

    const hamburgerSize = Symbol("hamburgerSize");
    const stuffings = Symbol("stuffings");
    const toppings = Symbol("toppings");

    //#region Компоненты и размеры бургера

    /**
     * Ингредиент гамбургера
     *
     * @constructor
     * @param {String} id       Уникальный идентификатор Ингредиент
     * @param {String} type     Тип ингредиента гамбургера
     * @param {String} name     Название ингредиента гамбургера
     * @param {Number} price    Цена ингредиента гамбургера
     * @param {Number} calories Калорийность компонента
     *
     * @returns {Readonly<HamburgerIngredient>}
     */
    function HamburgerIngredient(id, type, name, price, calories) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.price = price;
        this.calories = calories;

        return Object.freeze(this);
    }

    /**
     * Размер гамбургера
     *
     * @constructor
     * @param {String} id                  Уникальный идентификатор размера
     * @param {String} name                Наименование размера гамбургера
     * @param {Number} maxStuffingCount    Максимальное количество начинки
     * @param {Number} priceCoefficient    Коэффициент увеличения цены в зависимости от размера
     * @param {Number} caloriesCoefficient Коэффициент увеличения калорий в зависимости от размера
     *
     * @returns {Readonly<HamburgerSize>}
     */
    function HamburgerSize(id, name, maxStuffingCount, priceCoefficient, caloriesCoefficient) {
        this.id = id;
        this.name = name;
        this.maxStuffingCount = maxStuffingCount;
        this.priceCoefficient = priceCoefficient;
        this.caloriesCoefficient = caloriesCoefficient;

        return Object.freeze(this);
    }

    /* Размеры, виды начинок и добавок.
     * Необходимо наполнить своими значениями.
     * Также можно добавить свои собственные топпинги и начинки
     *
     * Размеры начинаются с SIZE_*
     * Начинки начинаются с STUFFING_*
     * Топпинги начинаются с TOPPING_*
     */
    Hamburger.SIZE_SMALL = new HamburgerSize("SIZE_SMALL", "Small", 5, 1, 1);
    Hamburger.SIZE_LARGE = new HamburgerSize("SIZE_LARGE", "Large", 10, 1.7, 1.5);
    Hamburger.STUFFING_CHEESE = new HamburgerIngredient("STUFFING_CHEESE", "stuffing", "Nice cheese", 0.7, 45);
    Hamburger.STUFFING_SALAD = new HamburgerIngredient("STUFFING_SALAD", "stuffing", "Tasty salad", 0.4, 30);
    Hamburger.STUFFING_POTATO = new HamburgerIngredient("STUFFING_POTATO", "stuffing", "Crispy potato", 0.8, 50);
    Hamburger.TOPPING_MAYO = new HamburgerIngredient("TOPPING_MAYO", "topping", "Classic mayo", 0.7, 40);
    Hamburger.TOPPING_SPICE = new HamburgerIngredient("TOPPING_SPICE", "topping", "Piquancy spice", 0.7, 40);

    //#endregion
    function Hamburger(size, stuffing) {
        this[hamburgerSize] = size instanceof HamburgerSize ? size : Hamburger.SIZE_SMALL;
        this[stuffings] = stuffing instanceof HamburgerIngredient ? [stuffing] : [];
        this[toppings] = [];
    }

    function isStuffing(ingredient) {
        return ingredient instanceof HamburgerIngredient && ingredient.type === "stuffing";
    }

    function isTopping(ingredient) {
        return ingredient instanceof HamburgerIngredient && ingredient.type === "topping";
    }

    Hamburger.prototype.addStuffing = function (stuffing) {
        if (this[stuffings].length === this[hamburgerSize].maxStuffingCount || !isStuffing(stuffing)) {
            return;
        }

        if (!this[stuffings].includes(stuffing)) {
            this[stuffings].push(stuffing);
        }
    };

    Hamburger.prototype.addTopping = function (topping) {
        if (!isTopping(topping)) {
            return;
        }

        if (!this[toppings].includes(topping)) {
            this[toppings].push(topping);
        }
    };

    Hamburger.prototype.removeStuffing = function (stuffing) {
        if (!isStuffing(stuffing)) {
            return;
        }

        const stuffingIndex = this[stuffings].indexOf(stuffing);

        if (stuffingIndex !== -1) {
            this[stuffings].splice(stuffingIndex, 1);
        }
    };

    Hamburger.prototype.removeTopping = function (topping) {
        if (!isTopping(topping)) {
            return;
        }

        const toppingIndex = this[toppings].indexOf(topping);

        if (toppingIndex !== -1) {
            this[toppings].splice(toppingIndex, 1);
        }
    };

    Hamburger.prototype.getSize = function () {
        return this[hamburgerSize];
    };

    Hamburger.prototype.getStuffings = function () {
        return this[stuffings].slice();
    };

    Hamburger.prototype.getToppings = function () {
        return this[toppings].slice();
    };

    Hamburger.prototype.calculateCalories = function () {
        const toppingCalories = this[toppings].reduce((calories, topping) => calories + topping.calories, 0);
        const stuffingCalories = this[stuffings].reduce((calories, stuffing) => calories + stuffing.calories, 0);
        const totalCalories = DEFAULT_CALORIES + toppingCalories + stuffingCalories;

        return totalCalories * this[hamburgerSize].caloriesCoefficient;
    };

    Hamburger.prototype.getDefaultPrice = function () {
        return this[hamburgerSize].priceCoefficient * DEFAULT_PRICE;
    };

    Hamburger.prototype.calculatePrice = function () {
        const toppingPrice = this[toppings].reduce((price, topping) => price + topping.price, 0);
        const stuffingPrice = this[stuffings].reduce((price, stuffing) => price + stuffing.price, 0);
        const totalPrice = DEFAULT_PRICE + toppingPrice + stuffingPrice;

        return totalPrice * this[hamburgerSize].priceCoefficient;
    };

    return Hamburger;
})();
