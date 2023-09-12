import connection from "../config.js";

class WorkspaceArrangement {
    constructor(arrangement) {
        this.id = arrangement.workspaceId;
        this.fullName = arrangement.workspaceId;
    }

    create(arrangement) {
        const query = `INSERT INTO workspaces_arrangement (employee, workspace)
                   VALUES (?, ?)`;
        const values = [arrangement.employeeId, arrangement.workspaceId];

        connection.query(query, values, (err, results) => {
            if (err) {
                result(err);
            } else {
                result(null, results.insertId);
            }
        });
    }

    update(employeeId, arrangement) {
        const query = `UPDATE workspaces_arrangement
                   SET workspace = ?
                   WHERE employee = ?`;
        const values = [arrangement.workspaceId, arrangement.employeeId];

        connection.query(query, values, (err, results) => {
            if (err) {
                result(err);
                return;
            }

            if (results.affectedRows === 0) {
                result({ kind: "not_found" });
                return;
            }

            result(null, { id: employeeId, ...arrangement });
        });
    }

    getById(id) {
        const query = `SELECT * 
                   FROM workspaces_arrangement
                   WHERE id = ?`;

        connection.query(query, [id], (error, results) => {
            if (error) {
                result(error);
            } else {
                result(null, results[0]);
            }
        });
    }

    getAll(result) {
        const query = `SELECT * FROM workspaces_arrangement`;

        connection.query(query, (error, results) => {
            if (error) {
                result(error);
            } else {
                result(null, results);
            }
        });
    }
}

export { WorkspaceArrangement };
