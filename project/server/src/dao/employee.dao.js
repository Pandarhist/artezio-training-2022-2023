import connection from "../config.js";

class Employee {
    constructor(employee) {
        this.id = employee.id;
        this.fullName = employee.fullName;
        this.technologyId = employee.technologyId;
        this.position = employee.position;
        this.hiringDate = employee.hiringDate;
        this.avatar = employee.avatar;
    }
    async create(employee) {
        const query = `INSERT INTO employees (id, full_name, technology, position, hiring_date, avatar)
                   VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
            employee.id,
            employee.fullName,
            employee.technologyId,
            employee.position,
            employee.hiringDate,
            employee.avatar,
        ];

        try {
            const createdEmployee = await connection.query(query, values);
            return createdEmployee;
        } catch (err) {
            throw err;
        }
    }
    async update(id, employee) {
        const query = `UPDATE employees
                   SET full_name = ?, technology = ?, position = ?, hiring_date = ?, avatar = ?
                   WHERE id = ?`;
        const values = [
            employee.fullName,
            employee.technology,
            employee.position,
            employee.hiringDate,
            employee.avatar,
            id,
        ];

        try {
            const result = await connection.query(query, values);

            if (result.affectedRows === 0) {
                throw { kind: "not_found" };
            }

            return { id, ...employee };
        } catch (err) {
            throw err;
        }
    }
    async getById(id) {
        const query = `SELECT *
                   FROM employees
                   WHERE id = ?`;

        try {
            const results = await connection.query(query, [id]);
            return results[0];
        } catch (err) {
            throw err;
        }
    }
    async getAll() {
        const query = `SELECT * FROM employees`;

        try {
            const results = await connection.query(query);
            return results;
        } catch (err) {
            throw err;
        }
    }
}

export default Employee;
