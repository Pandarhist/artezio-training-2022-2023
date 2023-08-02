'use strict';

/**
 * Сортировка объектов
 *
 * Напишите код, который отсортирует массив объектов people по полю age.
 * Выведите список имён в массиве после сортировки.
 */
const vasya = { name: "Вася", age: 23 };
const masha = { name: "Маша", age: 18 };
const vovochka = { name: "Вовочка", age: 6 };

const people = [ vasya , masha , vovochka ];

people.sort(function (a, b) {
    return a.age - b.age;
});

const names = people.map(function (person) {
        return person.name;
    })
    .join(', ');

console.log(names);

// теперь people: [vovochka, masha, vasya]
console.log(people[0].age); // 6


/**
 * Добавить класс в строку.
 *
 * В объекте есть свойство className,
 * которое содержит список «классов» – слов, разделенных пробелом. Например, className: 'open menu'
 *
 * Создайте функцию addClass(obj, cls), которая добавляет в список класс cls,
 * но только если его там еще нет. Функция не должна добавлять лишних пробелов.
 *
 */
const obj = {
    className: 'open menu'
};

addClass(obj, 'new'); // obj.className='open menu new'
addClass(obj, 'open'); // без изменений (класс уже существует)
addClass(obj, 'me'); // obj.className='open menu new me'

console.log(obj.className); // "open menu new me"

function addClass(obj, cls) {
    if (typeof obj.className !== 'string' || typeof cls !== 'string') {
        return;
    }

    const classes = obj.className.split(' ');

    if (!classes.includes(cls)) {
        classes.push(cls);

        obj.className = classes.join(' ');
    }
}

/**
 * Напиши функцию pluck, которая берет массив объектов и
 * возвращает массив значений определенного поля.
 * Функция не должна изменять исходный массив.
 */
const characters = [
    { name: 'Михаил', age: 36 },
    { name: 'Фёдор', age: 40 }
];

console.log(pluck(characters, 'name')); // ['Михаил', 'Фёдор']

function pluck(objects, propertyName) {
    return objects.map(function (obj) {
        return obj[propertyName];
    });
}

/**
 * Напиши функцию, считающую число свойств в объекте.
 * Функция не должна изменять исходный объект и
 * должна работать с различными объектами(строки, массивы, собственные объекты)
 */

const foo = { a: 1, b: 2 };
console.log(count(foo)); // 2

function count(obj) {
    let propertyCount = 0;

    for (let property in obj) {
        propertyCount++;
    }

    return propertyCount;
}

const bar = [];
console.log(count(bar)); // 0

const baz = [1, 2, 3];
console.log(count(baz)); // 3

const xyz = [];
xyz[100] = 1;
console.log(count(xyz)); // 1

const abc = 'string';
console.log(count(abc)); // 6

/**
 * Даны следующие исходные данные.
 * Используя методы типа Array, необходимо выполнить некие операции с массивом данных,
 * чтобы получился результат, описанный над каждой переменной.
 * Результат должен храниться в данной переменной
 */
const students = [
    {
        name: 'John',
        age: 17,
        gender: 'M',
        grade: 8,
        state: 'Florida'
    },
    {
        name: 'Sarah',
        age: 19,
        gender: 'F',
        grade: 9,
        state: 'Alaska'
    },
    {
        name: 'Peter',
        age: 21,
        gender: 'M',
        grade: 5,
        state: 'California'
    },
    {
        name: 'Bred',
        age: 19,
        gender: 'M',
        grade: 8,
        state: 'Florida'
    },
    {
        name: 'Garry',
        age: 24,
        gender: 'M',
        grade: 9,
        state: 'Tennessee'
    },
    {
        name: 'Samantha',
        age: 14,
        gender: 'F',
        grade: 7,
        state: 'California'
    },
    {
        name: 'Garold',
        age: 16,
        gender: 'M',
        grade: 8,
        state: 'Washington'
    }
];

/**
 *
 * Записать выражения для подсчета и присвоения следующий данных в указанные переменные
 *
 */


/**
 * [Number] количество совершеннолетних (возраст >= 18)
 */
const adultsCount = students.filter(function (student) {
    return student.age >= 18;
}).length;


/**
 * [Number] Средний бал среди всех учащихся
 */

const meanGrade = students.reduce(function (gradeSum, student) {
    return gradeSum += student.grade;
}, 0) / students.length;

/**
 * [Number] Средний бал среди несовершеннолетних (возраст < 18)
 */

const teenGradesInfo = students.reduce(function (gradeInfo, student) {
    if (student.age < 18) {
        gradeInfo.gradeSum += student.grade;
        gradeInfo.count++;
    }

    return gradeInfo;
}, { gradeSum: 0, count: 0 });

const teenMeanGrade = teenGradesInfo.gradeSum / teenGradesInfo.count;

/**
 * [Number] Средний бал среди совершеннолетних парней
 */

const menGradeInfo = students.reduce(function (gradeInfo, student) {
    if (student.age >= 18 && student.gender === 'M') {
        gradeInfo.gradeSum += student.grade;
        gradeInfo.count++;
    }

    return gradeInfo;
}, { gradeSum: 0, count: 0 });

const menMeanGrade = menGradeInfo.gradeSum / menGradeInfo.count;

/**
 * [Array<Student>] Массив учащихся, отсортированных по возрастанию балов.
 */

const studentsByGrades = students.slice()
    .sort(function (a, b) {
        return a.grade - b.grade;
    });

/**
 * [Array<String>] Массив имен всех учащихся
 */

const studentNames = students.map(function (student) {
    return student.name;
});

/**
 * [Array<String>] Массив имен всех девушек
 */

const girlNames = students.filter(function (student) {
        return student.gender === 'F';
    })
    .map(function (student) {
        return student.name;
    });

/**
 * [Array<String>] Имена всех штатов, в которых живут учащиеся (без повторений!)
 */
const states = students.map(function (student) {
        return student.state;
    })
    .filter(function (state, index, states) {
        return states.indexOf(state) === index;
    });


/**
 * [Array<String>] Имена всех совершеннолетних из штата California
 */
const californians = students.filter(function (student) {
        return student.state === 'California' && student.age >= 18;
    })
    .map(function (student) {
        return student.name;
    });

/**
 * [Number] Средний бал учащихся из Аляски, с именем начинающимся на 'S'
 */
const alaskaGradesInfo = students.reduce(function (gradesInfo, student) {
    if (student.state === 'Alaska' && student.name[0] === 'S') {
       gradesInfo.gradeSum += student.grade;
       gradesInfo.count++;
    }

   return gradesInfo;
}, { gradeSum: 0, count: 0 });

const alaskaSMeanGrade = alaskaGradesInfo.gradeSum / alaskaGradesInfo.count;
