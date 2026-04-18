const { db } = require('../config/db');

class AuditLogger {
    // Các trường dữ liệu không bao giờ được phép ghi vào log
    static SENSITIVE_FIELDS = ['password', 'token', 'otp'];

    static filterSensitive(data) {
        if (!data) return null;
        const filtered = { ...data };
        this.SENSITIVE_FIELDS.forEach(field => delete filtered[field]);
        return filtered;
    }

    static async log(req, data) {
        try {
            const { action, table_name, entity_id, old_values, new_values } = data;
            const user_id = req.user ? req.user.id : null;
            const ip_address = req.ip || req.connection.remoteAddress;

            const query = `
                INSERT INTO audit_logs 
                (user_id, action, table_name, entity_id, old_values, new_values, ip_address) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            await db.query(query, [
                user_id,
                action,
                table_name,
                entity_id,
                JSON.stringify(this.filterSensitive(old_values)),
                JSON.stringify(this.filterSensitive(new_values)),
                ip_address
            ]);
        } catch (error) {
            console.error('Audit Log Error 💥:', error.message);
        }
    }
}

module.exports = AuditLogger;