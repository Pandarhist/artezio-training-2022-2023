import connection from "../config.js";

/**
 * Модель технологии.
 *
 * @param {Object} technology - технология, на которой специализируется сотрудник.
 * @param {String} technology.id - id технологии.
 * @param {String} technology.name - название технологии.
 *
 * @returns {Object} технология.
 */
const Technology = function (technology) {
    this.id = technology.id;
    this.fullName = technology.name;
};

Technology.prototype.getById = function (id) {
    const query = `SELECT *
                     FROM technologies
                    WHERE id = ?`;

    
    connection.query(query, [id], (error, results) => {
        if (error) {
            result(error);
        } else {
            result(null, results[0]);
        }
    });
    
};

/**
 * Получение всех технологий из базы данных MySQL.
 *
 * @param {Function} result - функция обратного вызова для дальнейшей обработки результатов запроса.
 */
Technology.prototype.getAll = function (result) {
    const query = `SELECT * FROM technologies`;

    
    connection.query(query, (error, results) => {
        if (error) {
            result(error);
        } else {
            result(null, results);
        }
    });
    
};

export { Technology };
