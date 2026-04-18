const { db } = require('../config/db');

class Employee {
    static async findAll() {
        // Only fetch employees that are NOT soft-deleted
        const [rows] = await db.query('SELECT * FROM employee WHERE is_deleted = 0');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM employee WHERE id = ? AND is_deleted = 0', [id]);
        return rows[0];
    }

    static async create(employeeData) {
        const { full_name, dob, hometown, avatar, department_id, position_id } = employeeData;
        const [result] = await db.query(
            'INSERT INTO employee (full_name, dob, hometown, avatar, department_id, position_id, is_deleted) VALUES (?, ?, ?, ?, ?, ?, 0)',
            [full_name, dob, hometown, avatar, department_id, position_id]
        );
        return result.insertId;
    }

    static async softDelete(id) {
        // Update the is_deleted flag instead of permanently deleting
        const [result] = await db.query('UPDATE employee SET is_deleted = 1 WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Employee;