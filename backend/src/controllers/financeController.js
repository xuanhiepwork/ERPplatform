const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');

exports.getCashflowStats = catchAsync(async (req, res, next) => {
    const { dept_id } = req.query; // Lấy tham số lọc từ URL: ?dept_id=1

    // Biến phụ trợ để dùng trong câu SQL (nếu không có dept_id thì SQL sẽ bỏ qua điều kiện lọc)
    const deptFilter = dept_id ? Number(dept_id) : null;

    // 1. Tính Tổng Thu (Revenue) - Lọc theo phòng ban của người sở hữu Deal (BD)
    const [revenueResult] = await db.query(
        `SELECT SUM(p.amount) as total_revenue 
         FROM payments p
         JOIN deals d ON p.deal_id = d.id
         JOIN users u ON d.user_id = u.id
         WHERE p.status = 'PAID' 
         AND (? IS NULL OR u.dept_id = ?)`,
        [deptFilter, deptFilter]
    );

    // 2. Tính Tổng Chi (Expenses) - Lọc theo phòng ban của nhân viên (Lương + Chi phí)
    const [expenseResult] = await db.query(
        `SELECT (
            SELECT IFNULL(SUM(ps.net_salary), 0) 
            FROM payslips ps 
            JOIN users u ON ps.user_id = u.id 
            WHERE ps.status = 'Paid' AND (? IS NULL OR u.dept_id = ?)
         ) + (
            SELECT IFNULL(SUM(e.amount), 0) 
            FROM expenses e 
            JOIN users u ON e.user_id = u.id 
            WHERE e.status = 'Approved' AND (? IS NULL OR u.dept_id = ?)
         ) as total_expense`,
        [deptFilter, deptFilter, deptFilter, deptFilter]
    );

    // 3. Lấy dữ liệu biểu đồ 6 tháng gần nhất có lọc theo phòng ban
    const [chartData] = await db.query(`
        SELECT 
            months.month_name AS date,
            IFNULL(rev.amount, 0) AS revenue,
            IFNULL(exp.amount, 0) AS expense
        FROM (
            SELECT DATE_FORMAT(CURRENT_DATE - INTERVAL 5 MONTH, '%Y-%m') AS month_name
            UNION SELECT DATE_FORMAT(CURRENT_DATE - INTERVAL 4 MONTH, '%Y-%m')
            UNION SELECT DATE_FORMAT(CURRENT_DATE - INTERVAL 3 MONTH, '%Y-%m')
            UNION SELECT DATE_FORMAT(CURRENT_DATE - INTERVAL 2 MONTH, '%Y-%m')
            UNION SELECT DATE_FORMAT(CURRENT_DATE - INTERVAL 1 MONTH, '%Y-%m')
            UNION SELECT DATE_FORMAT(CURRENT_DATE, '%Y-%m')
        ) AS months
        LEFT JOIN (
            SELECT DATE_FORMAT(p.created_at, '%Y-%m') AS month, SUM(p.amount) AS amount
            FROM payments p
            JOIN deals d ON p.deal_id = d.id
            JOIN users u ON d.user_id = u.id
            WHERE p.status = 'PAID' AND (? IS NULL OR u.dept_id = ?)
            GROUP BY month
        ) AS rev ON months.month_name = rev.month
        LEFT JOIN (
            SELECT month, SUM(amount) as amount FROM (
                SELECT DATE_FORMAT(e.created_at, '%Y-%m') as month, e.amount 
                FROM expenses e JOIN users u ON e.user_id = u.id
                WHERE e.status = 'Approved' AND (? IS NULL OR u.dept_id = ?)
                UNION ALL
                SELECT DATE_FORMAT(ps.payment_date, '%Y-%m') as month, ps.net_salary as amount 
                FROM payslips ps JOIN users u ON ps.user_id = u.id
                WHERE ps.status = 'Paid' AND (? IS NULL OR u.dept_id = ?)
            ) AS combined_exp GROUP BY month
        ) AS exp ON months.month_name = exp.month
        ORDER BY date ASC
    `, [deptFilter, deptFilter, deptFilter, deptFilter, deptFilter, deptFilter]);

    const totalRevenue = revenueResult[0].total_revenue || 0;
    const totalExpense = expenseResult[0].total_expense || 0;

    res.status(200).json({
        success: true,
        data: {
            summary: {
                totalRevenue,
                totalExpense,
                netProfit: totalRevenue - totalExpense,
                profitMargin: totalRevenue > 0 ? ((totalRevenue - totalExpense) / totalRevenue * 100).toFixed(2) : 0,
                filteredByDept: dept_id || 'All Departments'
            },
            chartData
        }
    });

    // Truy vấn tổng hợp doanh thu theo tháng trong năm hiện tại
    const query = `
        SELECT 
            DATE_FORMAT(createdAt, '%b') AS month,
            SUM(CASE WHEN status = 'PAID' THEN amount ELSE 0 END) AS revenue,
            SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expenses -- Nếu bạn có cột type
        FROM payments 
        WHERE YEAR(createdAt) = YEAR(CURRENT_DATE())
        GROUP BY MONTH(createdAt), month
        ORDER BY MONTH(createdAt) ASC
    `;

    const [rows] = await db.execute(query);

    // Tính toán thêm netCashflow và operatingCashflow (logic nghiệp vụ)
    const processedData = rows.map(row => ({
        ...row,
        netCashflow: row.revenue - row.expenses,
        operatingCashflow: (row.revenue - row.expenses) * 0.9 // Giả định chi phí vận hành chiếm 10%
    }));

    res.status(200).json({
        status: 'success',
        data: processedData
    });
});