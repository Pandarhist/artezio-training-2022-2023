"use strict";

/**
 * Необходимо без выполнения кода и открытия его в редакторе
 * определить результат выполнения.
 *
 * Чему будет равно значение переменной result?
 */
function mystery(input) {
    const secret = 4;
    input += 2;
    function mystery2(multiplier) {
        multiplier *= input;
        return secret * multiplier;
    }
    return mystery2;
}

function mystery3(param) {
    function mystery4(bonus) {
        return param(6) + bonus;
    }
    return mystery4;
}

const hidden = mystery(3);
const jumble = mystery3(hidden);
const result = jumble(2);

/**
 * Значение переменной result будет равно 122.
 * 
 * При инициализации переменной hidden внутрь модуля mystery передаётся значение 3.
 * Т.о, результат функции hidden будет вычисляться как multiplier * 5 * 4.
 * 
 * При инициализации переменной jumble в качестве функции-параметра передаётся hidden.
 * Т.о., значение функции jumble будет вычисляться как (6 * 5 * 4) + bonus = 120 + bonus.
 * 
 * Далее, вызываем функцию jumble с параметром 2 и получаем 122.
 * 
 */

/**
 * Реализовать две функции repeat, sequence
 *
 * Напиши функцию создания генератора sequence(start, step).
 * Она при вызове возвращает другую функцию-генератор,
 * которая при каждом вызове дает число на 1 больше, и так до бесконечности.
 *
 * Начальное число, с которого начинать отсчет, и шаг, задается при создании генератора.
 * Шаг можно не указывать, тогда он будет равен одному. Начальное значение по умолчанию равно 0.
 * Генераторов можно создать сколько угодно.
 *
 * @param start - начальное число, с которого начинать отсчет.
 *                Начальное значение по умолчанию равно 0.
 * @param step -  шаг, задается при создании генератора.
 *                Шаг можно не указывать, тогда он будет равен одному
 *
 * @return function - вызове возвращает другую функцию-генератор,
 * которая при каждом вызове дает число начиная с start на step больше, и так до бесконечности
 */
function sequence(start = 0, step = 1) {
    let currentValue = start;

    return function () {
        const result = currentValue;
        currentValue += step;

        return result;
    };
}

/**
 * Функция вызвает функцию func заданное число (times) раз
 *
 * @param func - функция, которая будет вызываться
 * @param times - сколько раз нужно вызвать функцию func
 *
 * @return Array - массив с результатами всех вызовов функции.
 *                 Каждое возвращенное из вызова func значение записывается как новый элемент массива.
 *                 Размерность массива совпадает с количеством times вызовов.
 */
function repeat(func, times) {
    const results = new Array(times);

    for (let i = 0; i < results.length; i++) {
        results[i] = func();
    }

    return results;
}

const generator = sequence(10, 3);
const generator2 = sequence(0, 2);

console.log(generator()); // 10
console.log(generator()); // 13

console.log(generator2()); // 0

console.log(repeat(generator2, 5)); // [2, 4, 6, 8, 10]
