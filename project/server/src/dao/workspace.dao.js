import connection from "../config.js";

/**
 * Модель рабочего места сотрудника.
 *
 * @param {Object} workspace - данные рабочего места.
 * @param {Number} workspace.id - id рабочего места.
 * @param {Number} workspace.workspaceNumber - номер рабочего места.
 * @param {Number} workspace.room - номер комнаты.
 *
 * @returns {ReadOnly<Object>} рабочее место.
 */
const Workspace = function (workspace) {
    this.id = workspace.id;
    this.workspaceNumber = workspace.workspaceNumber;
    this.room = workspace.room;
};

/**
 * Добавление нового рабочего места в базу данных MySQL.
 *
 * @param {Object} workspace - данные рабочего места.
 * @param {Number} workspace.id - id рабочего места.
 * @param {Number} workspace.workspaceNumber - номер рабочего места.
 * @param {Number} workspace.room - номер комнаты.
 * @param {Function} result - функция обратного вызова для дальнейшей обработки результатов запроса.
 */
Workspace.prototype.create = function (workspace) {
    const query = `INSERT INTO workspaces (id, workspace_number, room)
                   VALUES (?, ?, ?)`;
    const values = [workspace.id, workspace.workspaceNumber, workspace.room];

    
    connection.query(query, values, (err, results) => {
        if (err) {
            result(err);
        } else {
            result(null, results.insertId);
        }
    });
    
};

/**
 * Обновление сведений о рабочем месте в базе данных MySQL.
 *
 * @param {Number} id - id рабочего места.
 * @param {Object} workspace - данные рабочего места.
 * @param {Number} workspace.workspaceNumber - номер рабочего места.
 * @param {Number} workspace.room - номер комнаты.
 * @param {Function} result - функция обратного вызова для дальнейшей обработки результатов запроса.
 */
Workspace.prototype.update = function (id, workspace) {
    const query = `UPDATE workspaces
                     SET workspace_number = ?, room = ?
                     WHERE id = ?`;
    const values = [workspace.workspaceNumber, workspace.room, id];

    
    connection.query(query, values, (err, res) => {
        if (err) {
            result(err);
            return;
        }

        if (res.affectedRows === 0) {
            result({ kind: "not_found" });
            return;
        }

        result(null, { id, ...workspace });
    });
    
};

/**
 * Обновление сведений о рабочем месте в базе данных MySQL.
 *
 * @param {Number} id - id рабочего места.
 * @param {Function} result - функция обратного вызова для дальнейшей обработки результатов запроса.
 */
Workspace.prototype.getById = function (id) {
    const query = `SELECT * FROM workspaces WHERE id = ?`;

    
    connection.query(query, [id], (error, res) => {
        if (error) {
            result(error);
        } else {
            result(null, res[0]);
        }
    });
    
};

/**
 * Получение всех рабочих мест из базы данных MySQL.
 *
 * @param {Function} result - функция обратного вызова для дальнейшей обработки результатов запроса.
 */
Workspace.getAll = function (result) {
    const query = `SELECT * FROM workspaces`;

    
    connection.query(query, (error, res) => {
        if (error) {
            result(error);
        } else {
            result(null, res);
        }
    });
    
};

export { Workspace };
