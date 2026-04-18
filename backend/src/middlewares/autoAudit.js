const AuditLogger = require('../utils/auditLogger');

module.exports = (req, res, next) => {
    // Chỉ ghi log cho các hành động thay đổi dữ liệu
    if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method)) {
        // Lắng nghe sự kiện khi phản hồi đã được gửi thành công
        res.on('finish', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                AuditLogger.log(req, {
                    action: req.method === 'DELETE' ? 'DELETE' : 'UPDATE/INSERT',
                    table_name: req.originalUrl.split('/')[3], // Lấy tên module từ URL
                    new_values: req.body
                });
            }
        });
    }
    next();
};