const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const AuditLogger = require('../utils/auditLogger');

// Lấy thông tin cá nhân của chính mình (My Profile)
exports.getMe = catchAsync(async (req, res, next) => {
    const userId = req.user.id; // Lấy từ Token

    // Lưu ý: Không trả về cột password
    const query = `
        SELECT id, full_name, email, role, dept_id, dob, hometown, avatar, base_salary 
        FROM users 
        WHERE id = ? AND deleted_at IS NULL
    `;
    const [users] = await db.query(query, [userId]);

    if (users.length === 0) {
        return next(new AppError('Không tìm thấy thông tin người dùng.', 404));
    }

    res.status(200).json({ success: true, data: users[0] });
});

// Cập nhật thông tin cá nhân (VD: Quê quán, Sinh nhật)
exports.updateMe = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { hometown, dob } = req.body;

    // Lấy dữ liệu cũ để ghi log
    const [oldRows] = await db.query('SELECT hometown, dob FROM users WHERE id = ?', [userId]);
    const oldData = oldRows[0];

    const query = `UPDATE users SET hometown = ?, dob = ?, updated_at = NOW() WHERE id = ?`;
    await db.query(query, [hometown, dob, userId]);

    // Ghi log Audit
    AuditLogger.log(req, {
        action: 'UPDATE',
        table_name: 'users',
        entity_id: userId,
        old_values: oldData,
        new_values: { hometown, dob }
    });

    res.status(200).json({ success: true, message: 'Cập nhật thông tin cá nhân thành công.' });
});

// Upload Avatar
exports.uploadAvatar = catchAsync(async (req, res, next) => {
    // req.file được tạo ra bởi middleware multer (đã có trong upload.js của bạn)
    if (!req.file) {
        return next(new AppError('Vui lòng đính kèm một file ảnh hợp lệ!', 400));
    }

    const userId = req.user.id;
    const filePath = req.file.path.replace(/\\/g, '/'); // Chuẩn hóa đường dẫn cho Windows/Linux

    // Cập nhật đường dẫn avatar vào database
    await db.query('UPDATE users SET avatar = ?, updated_at = NOW() WHERE id = ?', [filePath, userId]);

    res.status(200).json({
        success: true,
        message: 'Tải lên ảnh đại diện thành công.',
        data: { avatar_url: filePath }
    });
});