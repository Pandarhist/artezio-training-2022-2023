-- 1) Есть ли дополнительная возможность нормализовать таблицы в приведенной схеме?

-- Да, столбец CITY таблиц CUSTOMERS, SELLERS можно вынести в отдельную таблицу CITIES и связать с 
-- теми таблицами по внешнему ключу.

CREATE TABLE CITIES(
    CTNUM  INT         IDENTITY(1,1)  NOT NULL,
    CTNAME VARCHAR(40) NOT NULL,
    PRIMARY KEY (CTNUM)
);

INSERT INTO CITIES (CTNAME)
SELECT CITY
  FROM CUSTOMERS
UNION
SELECT CITY
 FROM SELLERS;

UPDATE CUSTOMERS
   SET CITY = (SELECT CTNUM 
                 FROM CITIES
                WHERE CITY = CTNAME);

UPDATE SELLERS
   SET CITY = (SELECT CTNUM 
                 FROM CITIES
                WHERE CITY = CTNAME);

ALTER TABLE CUSTOMERS
    ALTER COLUMN CITY INT;

ALTER TABLE CUSTOMERS
  ADD CONSTRAINT FK_Customers_Cities
      FOREIGN KEY (CITY) REFERENCES CITIES(CTNUM);

ALTER TABLE SELLERS
    ALTER COLUMN CITY INT;

ALTER TABLE SELLERS
  ADD CONSTRAINT FK_Sellers_Cities
      FOREIGN KEY (CITY) REFERENCES CITIES(CTNUM);

-- 2) Вывести информацию о заказах, у которых нет покупателей или продавцов

SELECT *
  FROM ORDERS
 WHERE SNUM IS NULL
       OR CNUM IS NULL;

-- 3) Вывести информацию о заказах, у которых у покупателей нет предпочтительных продавцов

SELECT O.*
  FROM ORDERS AS O
       INNER JOIN CUSTOMERS AS C
       ON O.CNUM = C.CNUM
 WHERE C.SNUM IS NULL;

-- 4) Вывести информацию о заказах, именах покупателей и продавцов, если продавца или покупателя нет, вывести null

SELECT O.ONUM,
       O.AMT,
       O.ODATE,
       C.CNAME,
       S.SNAME
  FROM ORDERS AS O
       LEFT JOIN SELLERS AS S
       ON O.SNUM = S.SNUM
       LEFT JOIN CUSTOMERS AS C
       ON O.CNUM = C.CNUM;

-- 5) Вывести полную информацию о продавцах и заказах, если продавец не имеет заказов, вывести null

SELECT S.*,
       O.ONUM,
       O.AMT,
       O.ODATE,
       O.CNUM
  FROM SELLERS AS S
       LEFT JOIN ORDERS AS O
       ON S.SNUM = O.SNUM;

-- 6) Вывести уникальные пары имен покупателей и продавцов по таблице заказов. Имена должны быть определены

SELECT DISTINCT
       C.CNAME,
       S.SNAME
  FROM ORDERS AS O
       INNER JOIN SELLERS AS S
       ON O.SNUM = S.SNUM
       INNER JOIN CUSTOMERS AS C
       ON O.CNUM = C.CNUM;

-- 7) Вывести уникальные пары покупателей имеющих заказы в один и тот же день. 

SELECT DISTINCT
       O1.CNUM AS CNUM1,
       O2.CNUM AS CNUM2
  FROM ORDERS AS O1
       INNER JOIN ORDERS AS O2
       ON O1.ODATE = O2.ODATE
 WHERE O1.CNUM < O2.CNUM;

-- 8) Вывести строки с минимальными и максимальными суммами заказов и именем покупателя, столбцом указывающем самая высокая или низкая сумма

(SELECT C.CNAME, 
        MIN(O.AMT) AS 'AMT',
        'MIN' AS 'Type'
   FROM CUSTOMERS AS C
        INNER JOIN ORDERS AS O
        ON C.CNUM = O.CNUM
  GROUP BY C.CNAME)
  
  UNION

(SELECT C.CNAME, 
        MAX(O.AMT) AS 'AMT',
        'MAX' AS 'Type'
   FROM CUSTOMERS AS C
        INNER JOIN ORDERS AS O
        ON C.CNUM = O.CNUM
  GROUP BY C.CNAME);

-- 9) Вывести полную информацию о покупателях, у которых есть заказы с продавцом помимо предпочтительного

SELECT DISTINCT C.*
  FROM CUSTOMERS AS C
       INNER JOIN ORDERS AS O
       ON O.CNUM = C.CNUM AND
          O.SNUM <> C.SNUM;

-- 10) Вывести полную информацию о заказах, покупатели и продавцы которых живут в разных городах

SELECT O.*
  FROM ORDERS AS O
       INNER JOIN CUSTOMERS AS C
       ON O.CNUM = C.CNUM
       INNER JOIN SELLERS AS S
       ON O.SNUM = S.SNUM
 WHERE C.CITY <> S.CITY;

-- 11) Вывести дату и среднюю сумму заказа на эту дату.

SELECT O.ODATE,
       AVG(O.AMT) AS AVG_AMT
  FROM ORDERS AS O
 GROUP BY O.ODATE;

-- 12) Вывести имена всех продавцов, которые имеют ведут более двух заказов

SELECT S.SNAME
  FROM SELLERS AS S
       INNER JOIN ORDERS AS O
       ON O.SNUM = S.SNUM
 GROUP BY S.SNAME
HAVING COUNT(*) > 2;

-- 13) Вывести все заказы, сумма которых больше средней суммы всех заказов

SELECT O.*
  FROM ORDERS AS O
 WHERE O.AMT > (SELECT AVG(AMT) 
                  FROM ORDERS);

-- 14) Вывести все заказы покупателей с рейтингом выше среднего

SELECT O.*
  FROM ORDERS AS O
       INNER JOIN CUSTOMERS AS C
       ON O.CNUM = C.CNUM
 WHERE C.RATING > (SELECT AVG(RATING) 
                     FROM CUSTOMERS);

-- 15) Вставить в таблицу TMPDATA данные всех заказов и имена заказчиков из 'London' и 'Boston'

INSERT INTO TMPDATA
SELECT O.CNUM,
       O.SNUM,
       C.CNAME,
       C.CITY,
       O.ODATE,
       O.AMT
  FROM ORDERS AS O
       INNER JOIN CUSTOMERS AS C
       ON O.CNUM = C.CNUM
 WHERE C.CITY IN ('Boston', 'London');

-- 16) Изменить в таблице TMPDATA дату всех заказов заказчика с рейтингом 200 на 01/01/1990

UPDATE TMPDATA
   SET ODATE = CAST(01/01/1990 AS DATETIME)
 WHERE CNUM IN (SELECT C.CNUM
                  FROM CUSTOMERS AS C
                 WHERE C.RATING = 200);

-- 17) Удалить из таблицы TMPDATA все заказы продавца 'Peel'

DELETE
  FROM TMPDATA
 WHERE SNUM = (SELECT SNUM 
                 FROM SELLERS AS S
                WHERE S.SNAME = 'Peel');

-- 18) Вставить в таблицу TMPDATA все заказы продавцов, которые имеют комисионные ниже, чем средние комисионные продавцов, имеющих заказы.

INSERT INTO TMPDATA
SELECT O.CNUM,
       O.SNUM,
       C.CNAME,
       C.CITY,
       O.ODATE,
       O.AMT
  FROM ORDERS AS O
       INNER JOIN CUSTOMERS AS C
       ON O.CNUM = C.CNUM
       INNER JOIN SELLERS AS S
       ON O.SNUM = S.SNUM
 WHERE S.COMM < (SELECT AVG(DISTINCT S1.COMM)
                   FROM SELLERS AS S1
                        INNER JOIN ORDERS AS O1
                        ON S1.SNUM = O1.SNUM);
