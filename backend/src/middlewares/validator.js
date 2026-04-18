const { validationResult, body } = require('express-validator');
const AppError = require('../util/AppError');

// Middleware bắt lỗi từ express-validator và ném qua Global Error Handler
exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Lấy thông báo lỗi đầu tiên để trả về
        const extractedErrors = errors.array()[0].msg;
        return next(new AppError(extractedErrors, 400));
    }
    next();
};

// Khai báo các quy tắc kiểm tra (Rules)
exports.loginRules = [
    body('email').isEmail().withMessage('Email không hợp lệ.'),
    body('password').notEmpty().withMessage('Mật khẩu không được để trống.')
];

exports.changePasswordRules = [
    body('newPassword').isLength({ min: 6 }).withMessage('Mật khẩu mới phải có ít nhất 6 ký tự.')
];