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
    const DEFAULT_CALORIES = 200;
    const DEFAULT_PRICE = 180;

    const hamburgerSize = Symbol('hamburgerSize');
    const stuffings = Symbol('stuffings');
    const toppings = Symbol('toppings');

    //#region Компоненты и размеры бургера

    /**
     * Компонент гамбургера
     *
     * @param type     Тип компонента гамбургера
     * @param name     Название компонента гамбургера
     * @param price    Цена компонента гамбургера
     * @param calories Калорийность компонента
     * @returns {Readonly<HamburgerComponent>}
     * @constructor
     */
    function HamburgerComponent(type, name, price, calories) {
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
     * @param name                Наименование размера гамбургера
     * @param maxStuffingCount    Максимальное количество начинки
     * @param priceCoefficient    Коэффициент увеличения цены в зависимости от размера
     * @param caloriesCoefficient Коэффициент увеличения калорий в зависимости от размера
     */
    function HamburgerSize(name, maxStuffingCount, priceCoefficient, caloriesCoefficient) {
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
    Hamburger.SIZE_SMALL = new HamburgerSize('Small', 5, 1, 1);
    Hamburger.SIZE_LARGE = new HamburgerSize('Large', 10, 1.7, 1.5);
    Hamburger.STUFFING_CHEESE = new HamburgerComponent('stuffing', 'Nice cheese', 300, 120);
    Hamburger.STUFFING_SALAD = new HamburgerComponent('stuffing', 'Tasty salad', 250, 140);
    Hamburger.STUFFING_POTATO = new HamburgerComponent('stuffing', 'Crispy potato', 320, 200);
    Hamburger.TOPPING_MAYO = new HamburgerComponent('topping', 'Classic mayo', 140, 200);
    Hamburger.TOPPING_SPICE = new HamburgerComponent('topping', 'Piquancy spice', 140, 180);

    //#endregion

    function Hamburger(size, stuffing) {
        this[hamburgerSize] = size instanceof HamburgerSize ? size : Hamburger.SIZE_SMALL;
        this[stuffings] = stuffing instanceof HamburgerComponent ? [stuffing] : [];
        this[toppings] = [];
    }

    function isStuffing(component) {
        return component instanceof HamburgerComponent && component.type === 'stuffing';
    }

    function isTopping(component) {
        return component instanceof HamburgerComponent && component.type === 'topping';
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

    Hamburger.prototype.getStuffing = function () {
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

    Hamburger.prototype.calculatePrice = function () {
        const toppingPrice = this[toppings].reduce((price, topping) => price + topping.price, 0);
        const stuffingPrice = this[stuffings].reduce((price, stuffing) => price + stuffing.price, 0);
        const totalPrice = DEFAULT_PRICE + toppingPrice + stuffingPrice;

        return totalPrice * this[hamburgerSize].priceCoefficient;
    };

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
