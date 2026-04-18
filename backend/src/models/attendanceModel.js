const { db } = require('../config/db');

class Attendance {
    // 1. Get all attendance logs with User info
    static async findAll() {
        const query = `
      SELECT 
        a.id, a.check_in, a.check_out, a.work_mode, a.status, a.location_data,
        u.full_name, u.email, u.position
      FROM attendance_logs a
      JOIN users u ON a.user_id = u.id
      WHERE a.deleted_at IS NULL 
        AND u.deleted_at IS NULL
      ORDER BY a.check_in DESC
    `;
        const [rows] = await db.query(query);
        return rows;
    }

    // 2. Check In (Insert new record)
    static async checkIn(data) {
        const { user_id, location_data, work_mode, status } = data;
        const query = `
      INSERT INTO attendance_logs 
      (user_id, check_in, location_data, work_mode, status) 
      VALUES (?, NOW(), ?, ?, ?)
    `;
        // We stringify the JSON location_data before inserting it into MySQL
        const [result] = await db.query(query, [
            user_id,
            JSON.stringify(location_data),
            work_mode,
            status || 'On_Time'
        ]);
        return result.insertId;
    }

    // 3. Check Out (Update existing record)
    static async checkOut(attendance_id) {
        const query = `
      UPDATE attendance_logs 
      SET check_out = NOW(), updated_at = NOW()
      WHERE id = ? AND deleted_at IS NULL
    `;
        const [result] = await db.query(query, [attendance_id]);
        return result.affectedRows;
    }
}

module.exports = Attendance;