'use strict';

/**
 * Реализовать конструктор для создания гамбургером с описанными методами ниже.
 * Необходимо оформить с помощью шаблона "Модуль".
 *
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 */
const Hamburger = (function () {
    const DEFAULT_CALORIES = 200;
    const DEFAULT_PRICE = 180;

    function Hamburger(size, stuffing) {
        const hamburgerSize = size instanceof HamburgerSize ? size : Hamburger.SIZE_SMALL;
        const stuffings = isStuffing(stuffing) ? [stuffing] : [];
        const toppings = [];

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
        this.addStuffing = function (stuffing) {
            if (stuffings.length === hamburgerSize.maxStuffingCount || !isStuffing(stuffing)) {
                return;
            }

            if (!stuffings.includes(stuffing)) {
                stuffings.push(stuffing);
            }
        };

        /**
         * Добавить топпинг к гамбургеру. Можно добавить несколько,
         * при условии, что они разные.
         *
         * @param topping  Тип топпинга
         */
        this.addTopping = function (topping) {
            if (!isTopping(topping)) {
                return;
            }

            if (!toppings.includes(topping)) {
                toppings.push(topping);
            }
        };

        /**
         * Убрать топпинг, при условии, что он ранее был
         * добавлен.
         *
         * @param topping Тип топпинга
         */
        this.removeTopping = function (topping) {
            if (!isTopping(topping)) {
                return;
            }

            const toppingIndex = toppings.indexOf(topping);

            if (toppingIndex !== -1) {
                toppings.splice(toppingIndex, 1);
            }
        };

        /**
         * Узнать размер гамбургера
         * @return {Number} размер гамбургера
         */
        this.getSize = function () {
            return hamburgerSize;
        };

        /**
         * Узнать начинку гамбургера
         * @return {Array} Массив добавленных начинок, содержит константы
         * Hamburger.STUFFING_*
         */
        this.getStuffing = function () {
            return stuffings.slice();
        };

        /**
         * Получить список добавок
         *
         * @return {Array} Массив добавленных добавок, содержит константы
         * Hamburger.TOPPING_*
         */
        this.getToppings = function () {
            return toppings.slice();
        };

        /**
         * Узнать калорийность
         * @return {Number} Калорийность в калориях
         */
        this.calculateCalories = function () {
            const toppingCalories = toppings.reduce((calories, topping) => calories + topping.calories, 0);
            const stuffingCalories = stuffings.reduce((calories, stuffing) => calories + stuffing.calories, 0);
            const totalCalories = DEFAULT_CALORIES + toppingCalories + stuffingCalories;

            return totalCalories * hamburgerSize.caloriesCoefficient;
        };

        /**
         * Узнать цену гамбургера
         * @return {Number} Цена гамбургера
         */
        this.calculatePrice = function () {
            const toppingPrice = toppings.reduce((price, topping) => price + topping.price, 0);
            const stuffingPrice = stuffings.reduce((price, stuffing) => price + stuffing.price, 0);
            const totalPrice = DEFAULT_PRICE + toppingPrice + stuffingPrice;

            return totalPrice * hamburgerSize.priceCoefficient;
        };
    }

    function isTopping(component) {
        return component instanceof HamburgerComponent && component.type === 'topping';
    }

    function isStuffing(component) {
        return component instanceof HamburgerComponent && component.type === 'stuffing';
    }

    //#region Компоненты гамбургера

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
