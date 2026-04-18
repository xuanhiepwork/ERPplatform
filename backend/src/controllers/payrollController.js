const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const AuditLogger = require('../utils/auditLogger');

exports.generateMonthlyPayrollDraft = catchAsync(async (req, res, next) => {
    const { month, year } = req.body; // Kế toán truyền vào: { "month": 4, "year": 2026 }

    if (!month || !year) {
        return next(new AppError('Vui lòng cung cấp tháng và năm để tính lương!', 400));
    }

    // 1. Chạy câu lệnh SQL tổng hợp (Dùng dấu ? để tránh SQL Injection)
    const summaryQuery = `
        WITH MonthlyAttendance AS (
            SELECT user_id, COUNT(id) AS att_days, SUM(CASE WHEN status = 'Late' THEN 1 ELSE 0 END) AS late_days
            FROM attendance_logs
            WHERE deleted_at IS NULL AND MONTH(check_in) = ? AND YEAR(check_in) = ? AND status != 'Absent'
            GROUP BY user_id
        ),
        MonthlyLeaves AS (
            SELECT user_id, SUM(CASE WHEN leave_type = 'Annual' THEN DATEDIFF(end_date, start_date) + 1 ELSE 0 END) AS paid_leaves
            FROM leave_requests
            WHERE deleted_at IS NULL AND status = 'Approved' AND MONTH(start_date) = ? AND YEAR(start_date) = ?
            GROUP BY user_id
        )
        SELECT 
            u.id AS user_id, u.base_salary,
            COALESCE(a.att_days, 0) AS attendance_days,
            COALESCE(a.late_days, 0) AS late_days,
            COALESCE(l.paid_leaves, 0) AS paid_leave_days,
            (COALESCE(a.att_days, 0) + COALESCE(l.paid_leaves, 0)) AS total_paid_days
        FROM users u
        LEFT JOIN MonthlyAttendance a ON u.id = a.user_id
        LEFT JOIN MonthlyLeaves l ON u.id = l.user_id
        WHERE u.deleted_at IS NULL AND u.status = 'Active';
    `;

    // Truyền tham số: month, year, month, year (Do có 2 chỗ lọc ngày trong 2 CTE)
    const [employeeStats] = await db.query(summaryQuery, [month, year, month, year]);

    if (employeeStats.length === 0) {
        return next(new AppError('Không có dữ liệu nhân viên để tính lương.', 404));
    }

    // 2. Tính toán Lương Net (Logic Backend)
    const STANDARD_WORKING_DAYS = 22; // Quy định công ty: 22 ngày công/tháng
    const LATE_PENALTY = 50000;       // Phạt đi muộn 50k/lần

    const payslips = employeeStats.map(emp => {
        // Lương 1 ngày = Lương cơ bản / Số ngày công chuẩn
        const dailyRate = emp.base_salary / STANDARD_WORKING_DAYS;
        
        // Tiền lương theo ngày làm việc
        const calculatedSalary = emp.total_paid_days * dailyRate;
        
        // Trừ tiền đi muộn
        const deduction = emp.late_days * LATE_PENALTY;
        
        // Lương thực nhận (Net)
        const netAmount = calculatedSalary - deduction;

        return {
            user_id: emp.user_id,
            month: month,
            year: year,
            base_amount: emp.base_salary,
            bonus: 0, // Bonus có thể lấy từ bảng khác nếu có
            deduction: deduction,
            net_amount: netAmount > 0 ? netAmount : 0 // Không để lương âm
        };
    });

    // 3. (Tùy chọn) Lưu danh sách payslips vào bảng `payslips` dưới dạng Draft bằng vòng lặp hoặc Bulk Insert
    // ...

    // 4. Ghi Audit Log (Kế toán nào vừa chạy tính lương)
    AuditLogger.log(req, {
        action: 'INSERT',
        table_name: 'payslips',
        new_values: { message: `Generated draft payroll for ${month}/${year}` }
    });

    res.status(200).json({
        success: true,
        message: `Đã tính toán xong bảng lương nháp tháng ${month}/${year}`,
        data: payslips
    });
});