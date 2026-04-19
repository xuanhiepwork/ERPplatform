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

// 6. Rules cho Đối tác (Partners)
exports.partnerRules = [
    body('name').notEmpty().withMessage('Tên công ty đối tác không được để trống.'),
    body('email').optional().isEmail().withMessage('Email đối tác không hợp lệ.')
];

// 7. Rules cho Cơ hội kinh doanh (Deals)
exports.dealRules = [
    body('partner_id').isInt().withMessage('ID đối tác phải là số nguyên.'),
    body('name').notEmpty().withMessage('Tên Deal không được để trống.'),
    body('expected_revenue').optional().isFloat({ min: 0 }).withMessage('Doanh thu dự kiến phải là số dương.')
];

// 8. Rules cho Hoạt động (Deal Activities)
exports.activityRules = [
    body('activity_type').isIn(['Call', 'Email', 'Meeting', 'Note']).withMessage('Loại hoạt động không hợp lệ.'),
    body('description').notEmpty().withMessage('Vui lòng nhập nội dung ghi chú.')
];

// 9. Rules cho Dự án (Projects)
exports.projectRules = [
    body('name').notEmpty().withMessage('Tên dự án không được để trống.'),
    body('start_date').optional().isISO8601().withMessage('Ngày bắt đầu không hợp lệ.'),
    body('end_date').optional().isISO8601().withMessage('Ngày kết thúc không hợp lệ.')
];

// 10. Rules cho Công việc (Tasks)
exports.taskRules = [
    body('project_id').isInt().withMessage('ID Dự án phải là số.'),
    body('title').notEmpty().withMessage('Tiêu đề task không được để trống.'),
    body('priority').isIn(['Low', 'Medium', 'High', 'Urgent']).withMessage('Mức độ ưu tiên không hợp lệ.')
];

// 11. Rules cho Marketing Campaigns
exports.campaignRules = [
    body('title').notEmpty().withMessage('Tiêu đề bài đăng/chiến dịch không được để trống.'),
    body('channel').isIn(['Facebook', 'YouTube', 'Email', 'Website', 'Event', 'Other']).withMessage('Kênh truyền thông không hợp lệ.'),
    body('publish_date').optional().isISO8601().withMessage('Ngày lên bài không đúng định dạng.')
];

// 12. Rules cho Bảng tin & Bình luận
exports.postRules = [
    body('content').notEmpty().withMessage('Nội dung bài đăng không được để trống.')
];
exports.commentRules = [
    body('content').notEmpty().withMessage('Nội dung bình luận không được để trống.')
];

// 13. Rules cho Wiki
exports.wikiCategoryRules = [
    body('name').notEmpty().withMessage('Tên danh mục không được để trống.')
];
exports.wikiArticleRules = [
    body('category_id').isInt().withMessage('ID danh mục phải là số.'),
    body('title').notEmpty().withMessage('Tiêu đề bài viết không được để trống.'),
    body('content').notEmpty().withMessage('Nội dung bài viết không được để trống.')
];