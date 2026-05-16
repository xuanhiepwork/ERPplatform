const { db } = require('../config/db');

class Department {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM department'); // Add 'WHERE is_deleted = 0' if applicable
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM department WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(name, manager_id = null) {
        // Adjust these columns based on your exact department table schema
        const [result] = await db.query(
            'INSERT INTO department (name, manager_id) VALUES (?, ?)',
            [name, manager_id]
        );
        return result.insertId;
    }
}

module.exports = Department;