const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const AuditLogger = require('../utils/auditLogger');

const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const AuditLogger = require('../utils/auditLogger');

// 1. Dành cho HR/Kế toán: Chạy tính lương nháp cho toàn công ty
exports.generateMonthlyPayrollDraft = catchAsync(async (req, res, next) => {
    const { month, year } = req.body;

    if (!month || !year) {
        return next(new AppError('Vui lòng cung cấp tháng và năm để tính lương!', 400));
    }

    // Câu lệnh SQL "Thần thánh": Gom dữ liệu Điểm danh và Nghỉ phép đã duyệt
    const summaryQuery = `
        WITH MonthlyAttendance AS (
            SELECT user_id, COUNT(id) AS att_days, SUM(CASE WHEN status = 'Late' THEN 1 ELSE 0 END) AS late_days
            FROM attendance_logs
            WHERE deleted_at IS NULL AND MONTH(check_in) = ? AND YEAR(check_in) = ? AND status != 'Absent'
            GROUP BY user_id
        ),
        MonthlyLeaves AS (
            SELECT user_id, SUM(DATEDIFF(end_date, start_date) + 1) AS paid_leaves
            FROM leave_requests
            WHERE deleted_at IS NULL AND status = 'Approved' AND leave_type = 'Annual' AND MONTH(start_date) = ? AND YEAR(start_date) = ?
            GROUP BY user_id
        )
        SELECT 
            u.id AS user_id, u.full_name, u.base_salary,
            COALESCE(a.att_days, 0) AS attendance_days,
            COALESCE(a.late_days, 0) AS late_days,
            COALESCE(l.paid_leaves, 0) AS paid_leave_days,
            (COALESCE(a.att_days, 0) + COALESCE(l.paid_leaves, 0)) AS total_paid_days
        FROM users u
        LEFT JOIN MonthlyAttendance a ON u.id = a.user_id
        LEFT JOIN MonthlyLeaves l ON u.id = l.user_id
        WHERE u.deleted_at IS NULL AND u.status = 'Active';
    `;

    const [employeeStats] = await db.query(summaryQuery, [month, year, month, year]);

    if (employeeStats.length === 0) {
        return next(new AppError('Không có dữ liệu nhân viên để tính lương.', 404));
    }

    // Cấu hình quy tắc tính lương (Sau này có thể lôi từ Database ra)
    const STANDARD_WORKING_DAYS = 22;
    const LATE_PENALTY = 50000;

    // Tính toán cho từng nhân viên
    const payslips = employeeStats.map(emp => {
        const dailyRate = emp.base_salary / STANDARD_WORKING_DAYS;
        const calculatedSalary = emp.total_paid_days * dailyRate;
        const deduction = emp.late_days * LATE_PENALTY;
        const netAmount = calculatedSalary - deduction;

        return {
            user_id: emp.user_id,
            full_name: emp.full_name,
            month: month,
            year: year,
            base_amount: emp.base_salary,
            working_days: emp.total_paid_days,
            late_days: emp.late_days,
            deduction: deduction,
            net_amount: netAmount > 0 ? Math.round(netAmount) : 0
        };
    });

    // Ghi Log: Ai là người vừa bấm nút tính lương?
    AuditLogger.log(req, {
        action: 'CALCULATE',
        table_name: 'payslips',
        new_values: { message: `Generated draft payroll for ${month}/${year}` }
    });

    res.status(200).json({
        success: true,
        message: `Đã tính toán xong bảng lương tháng ${month}/${year}`,
        data: payslips
    });
});

// 2. Dành cho Nhân viên: Xem danh sách phiếu lương của chính mình
exports.getMyPayslips = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    // Giả định bạn có bảng payslips lưu kết quả sau khi Kế toán chốt
    // Nếu chưa có bảng này, bạn có thể tạo sau. Đây là API chuẩn bị sẵn.
    const query = `
        SELECT id, month, year, base_amount, bonus, deduction, net_amount, status, created_at 
        FROM payslips 
        WHERE user_id = ? AND deleted_at IS NULL 
        ORDER BY year DESC, month DESC
    `;
    const [rows] = await db.query(query, [userId]);

    res.status(200).json({
        success: true,
        results: rows.length,
        data: rows
    });
});