USE artezio_office_db;

INSERT INTO technologies (id, t_name) 
VALUES
    (1, 'Java'),
    (2, 'JavaScript'),
    (3, '.NET'),
    (4, 'QA');

INSERT INTO workspaces (id, workspace_number, room)
VALUES
    (1, 1, 1),
    (2, 2, 1),
    (3, 3, 1),
    (4, 4, 1),
    (5, 5, 1),
    (6, 6, 2),
    (7, 7, 2),
    (8, 8, 2),
    (9, 9, 2),
    (10, 10, 2),
    (11, 11, 2),
    (12, 12, 3),
    (13, 13, 3),
    (14, 14, 3),
    (15, 15, 3),
    (16, 16, 3);


INSERT INTO employees (id, full_name, technology, position, hiring_date, avatar)
VALUES
  (1, 'John Doe', 1, 'Lead Java Developer', '2021-01-15', NULL),
  (2, 'Jane Doe', 2, 'Lead JavaScript Developer', '2020-09-03', NULL),
  (3, 'Michael Brown', 3, 'Lead .NET Developer', '2019-06-11', NULL),
  (4, 'Emily Davis', 4, 'QA Engineer', '2021-03-22', NULL),
  (5, 'Robert Wilson', 1, 'Junior Java Developer', '2020-11-30', NULL),
  (6, 'Jessica Lee', 2, 'Senior JavaScript Developer', '2018-07-19', NULL),
  (7, 'William Thompson', 3, 'Middle .NET Developer', '2017-04-25', NULL),
  (8, 'Sophia Martinez', 4, 'Lead QA Engineer', '2021-02-10', NULL),
  (9, 'David Anderson', 1, 'Middle Java Developer', '2019-10-17', NULL),
  (10, 'Olivia Harris', 2, 'Junior Javascript Developer', '2020-12-05', NULL),
  (11, 'Daniel Clark', 3, 'Senior .NET Developer', '2018-08-23', NULL),
  (12, 'Ava Lewis', 4, 'Middle QA Engineer', '2021-04-18', NULL);

SELECT * FROM employees;

