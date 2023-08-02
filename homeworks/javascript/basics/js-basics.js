"use strict";

/**
 * Задание № 1
 *  Напишите функцию pow(x,n), которая возвращает x в степени n.
 *  Иначе говоря, умножает x на себя n раз и возвращает результат.
 *
 *   pow(3, 2) = 3 * 3 = 9
 *   pow(3, 3) = 3 * 3 * 3 = 27
 *   pow(1, 100) = 1 * 1 * ...* 1 = 1
 *   Напишите функцию, которая запрашивает x и n, а затем выводит результат pow(x,n).
 **/

function calculateDegree() {
    const x = inputNumber('Введите число x');

    if (x === null) {
        return;
    }

    const n = inputNumber('Введите степень числа x, n');

    if (n === null) {
        return;
    }

    alert(`pow(${x}, ${n}) = ${ pow(x, n) }`);
}

function inputNumber(inputMessage) {
    const userInput = prompt(inputMessage, '');

    if (userInput === null) {
        alert('Завершение работы.');

        return null;
    }

    if (/^\s*$/.test(userInput)) {
        alert('Введённое значение не должно быть пустым.');

        return null;
    }

    if (isNaN(userInput)) {
        alert('Неверный ввод.');

        return null;
    }

    return Number(userInput);
}

function pow(x, n) {
    let result = 1;

    if (n > 0) {
        for (let i = n; i > 0; i--) {
            result *= x;
        }
    } else if (n < 0) {
        for (let i = n; i < 0; i++) {
            result /= x;
        }
    }

    return result;
}

/**
 * Задание № 2
 *  Последовательность чисел Фибоначчи имеет формулу Fn = Fn-1 + Fn-2.
 *  То есть, следующее число получается как сумма двух предыдущих.
 *  Первые два числа равны 1, затем 2(1+1), затем 3(1+2), 5(2+3) и
 *  так далее: 1, 1, 2, 3, 5, 8, 13, 21....
 *
 *  Напишите функцию, которая запрашивает n, а затем выводит результат fib(n).
 **/

function getFibonacciNumber() {
    const n = inputNaturalNumber('Введите номер числа Фибоначчи (последовательность начинается с 1)');

    if (n === null) {
        return;
    }

    alert(`fib(${n}) = ${ fib(n) }`);
}

function inputNaturalNumber(inputMessage) {
    const number = inputNumber(inputMessage);

    if (number === null) {
        return null;
    }

    if (!Number.isInteger(number) || number <= 0) {
        alert('Введённое значение должен быть натуральным числом.');

        return null;
    }

    return number;
}

function fib(n) {
    let firstNumber = 1;
    let secondNumber = 1;

    for (let i = 3; i <= n; i++) {
        let result = firstNumber + secondNumber;
        firstNumber = secondNumber;
        secondNumber = result;
    }

    return secondNumber;
}

/**
 * Задание № 3
 *  Имеется функция sumTo(n), которая для данного n вычисляет сумму чисел от 1 до n, например:
 *    sumTo(1) = 1
 *    sumTo(2) = 2 + 1 = 3
 *    sumTo(3) = 3 + 2 + 1 = 6
 *    sumTo(4) = 4 + 3 + 2 + 1 = 10
 *    ...
 *    sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
 *
 *    Необходимо реализовать функцию sumTo, также написать функцию, которая запрашивает n,
 *    а затем вывод результат sumTo(n)
 */

function sumToNumber() {
    const n =  inputNaturalNumber('Введите верхнюю границу вычислений, n, суммы чисел от 1 до n:');

    if (n === null) {
        return;
    }

    alert(`sumTo(${n}) = ${ sumTo(n) }`);
}

function sumTo(n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

/**
 * Задание № 4
 * У наших знакомых фермеров очень трудно с математикой, но все хорошо с разведением овец.
 * Фермеры просят помочь им, написав функцию, которая поможет им сделать разведение овец предсказуемым.
 *
 * Требуется реализовать функцию, которая принимает в параметрах кол-во овец и месяц,
 * в который мы хотим узнать популяцию овец. Начальный месяц отсчета принимать за 1цу.
 *
 * Необходимо реализовать расчет популяции овец следуя правилам ниже:
 *
 * 1. Если номер месяца делится без остатка на 4, то находим 75% популяции овец.
 *      Логируем это значение в консоль в формате, указанном ниже.
 *      Затем отнимает это значение от общего кол-ва овец.
 *
 * 2. В противном случае, если популяции больше 10000, найти половину от популяции овец.
 *      Логируем это значение в консоль в формате, указанном ниже.
 *      Затем отнимаем это значение из общего числа овец.
 *
 * Используемый формат сообщения после уменьшения числа популяции овец:
 * --------------------------------------------
 * Отнимаем <число> овец от их популяции.
 * --------------------------------------------
 *
 * 3. Также каждый месяц популяция увеличивается на 4.
 *      Логируем в консоль значение популяции овец, полученное после увеличения.
 *
 * Формат сообщения после увеличения популяции овец
 * --------------------------------------------
 * Будет <число> овец после 1 месяца(ев)
 * --------------------------------------------
 *
 * Для решения использовать циклы
 */
let sheepCount = 4;
let lastMonth = 12;

function predictSheepCount(startSheepCount, lastMonth) {
    let sheepCount = startSheepCount;

    for (let i = 1; i <= lastMonth; i++) {
        if (i % 4 === 0) {
            removeSheep(75);
        } else if (sheepCount > 10000) {
            removeSheep(50);
        }

        sheepCount += 4;

        console.log(`Будет ${sheepCount} овец после ${i} месяца(ев).`);
    }

    function removeSheep(percent) {
        const removedCount = Math.round(percent * sheepCount / 100);

        console.log(`Отнимаем ${removedCount} овец от их популяции.`);

        sheepCount -= removedCount;
    }
}

predictSheepCount(sheepCount, lastMonth);
