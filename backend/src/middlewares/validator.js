const { validationResult, body } = require('express-validator');
const AppError = require('../utils/AppError');

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

// 1. Rules cho Auth (Đăng nhập, Đổi mật khẩu)
exports.loginRules = [
    body('email').isEmail().withMessage('Email không hợp lệ.'),
    body('password').notEmpty().withMessage('Mật khẩu không được để trống.')
];

exports.changePasswordRules = [
    body('newPassword').isLength({ min: 6 }).withMessage('Mật khẩu mới phải có ít nhất 6 ký tự.')
];

// 2. Rules cho Nhân sự (Employee)
exports.employeeRules = [
    body('full_name').notEmpty().withMessage('Họ tên không được để trống.'),
    body('department_id').isInt().withMessage('ID Phòng ban phải là một số nguyên.'),
    body('position_id').isInt().withMessage('ID Vị trí phải là một số nguyên.')
];

// 3. Rules cho Nghỉ phép (Leave)
exports.leaveRules = [
    body('leave_type').isIn(['Annual', 'Sick', 'Unpaid']).withMessage('Loại nghỉ phép không hợp lệ (Chỉ nhận: Annual, Sick, Unpaid).'),
    body('start_date').isISO8601().withMessage('Ngày bắt đầu không đúng định dạng (YYYY-MM-DD).'),
    body('end_date').isISO8601().withMessage('Ngày kết thúc không đúng định dạng (YYYY-MM-DD).'),
    body('approver_id').isInt().withMessage('ID người duyệt phải là số nguyên.')
];

// 4. Rules cho Chi phí (Expense)
exports.expenseRules = [
    body('amount').isFloat({ gt: 0 }).withMessage('Số tiền thanh toán phải là số và lớn hơn 0.'),
    body('description').notEmpty().withMessage('Vui lòng nhập mô tả chi phí.'),
    body('approver_id').isInt().withMessage('ID người duyệt phải là số nguyên.')
];

// 5. Rules cho Tính lương (Payroll)
exports.payrollRules = [
    body('month').isInt({ min: 1, max: 12 }).withMessage('Tháng phải là số từ 1 đến 12.'),
    body('year').isInt({ min: 2000, max: 2100 }).withMessage('Năm không hợp lệ.')
];