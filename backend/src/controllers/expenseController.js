const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const AuditLogger = require('../utils/auditLogger');

// 1. Lấy danh sách các yêu cầu thanh toán/hoàn ứng của BẢN THÂN
exports.getMyExpenseClaims = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const query = `
        SELECT id, amount, description, receipt_url, status, created_at 
        FROM expense_claims 
        WHERE user_id = ? AND deleted_at IS NULL 
        ORDER BY created_at DESC
    `;
    const [rows] = await db.query(query, [userId]);

    res.status(200).json({
        success: true,
        results: rows.length,
        data: rows
    });
});

// 2. Tạo yêu cầu thanh toán (Expense Claim) MỚI & Gửi cho Quản lý/Kế toán duyệt
exports.createExpenseClaim = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { amount, description, receipt_url, approver_id } = req.body;

    // 1. Kiểm tra đầu vào (Validation cơ bản)
    if (!amount || !description || !approver_id) {
        return next(new AppError('Vui lòng cung cấp đủ: số tiền (amount), mô tả (description) và người duyệt (approver_id).', 400));
    }

    if (amount <= 0) {
        return next(new AppError('Số tiền yêu cầu thanh toán phải lớn hơn 0.', 400));
    }

    // * Khởi tạo Transaction để bảo vệ luồng tiền
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        // 2. Lưu đơn vào bảng expense_claims (Trạng thái mặc định: Pending)
        const insertExpenseQuery = `
            INSERT INTO expense_claims (user_id, amount, description, receipt_url, status)
            VALUES (?, ?, ?, ?, 'Pending')
        `;
        const [expenseResult] = await connection.query(insertExpenseQuery, [userId, amount, description, receipt_url || null]);
        const expenseId = expenseResult.insertId;

        // 3. Đẩy đơn này vào "Động cơ Phê duyệt" (Bảng approval_requests)
        // Lưu ý entity_type là 'Expense_Claim'
        const insertApprovalQuery = `
            INSERT INTO approval_requests (entity_type, entity_id, requester_id, current_approver_id, level, status)
            VALUES ('Expense_Claim', ?, ?, ?, 1, 'Pending')
        `;
        await connection.query(insertApprovalQuery, [expenseId, userId, approver_id]);

        // 4. Chốt Transaction (Lưu cả 2 bảng cùng lúc)
        await connection.commit();

        // 5. Ghi log Audit (Rất quan trọng với luồng tài chính)
        AuditLogger.log(req, {
            action: 'INSERT',
            table_name: 'expense_claims',
            entity_id: expenseId,
            new_values: req.body
        });

        // 🟢 BẮN SOCKET TỚI FRONTEND TẠI ĐÂY 🟢
        req.io.emit('new_approval_request', {
            approver_id: approver_id,
            requester_id: userId,
            entity_type: 'Expense_Claim',
            message: `Bạn có một yêu cầu thanh toán chi phí trị giá ${amount.toLocaleString('vi-VN')} VND cần duyệt!`
        });

        res.status(201).json({
            success: true,
            message: 'Đã tạo yêu cầu thanh toán và gửi cho người quản lý duyệt thành công!',
            data: { expense_id: expenseId, amount: amount }
        });

    } catch (error) {
        // Nếu có lỗi, Rollback toàn bộ để không bị mất tiền oan hoặc sinh ra dữ liệu rác
        await connection.rollback();
        return next(new AppError('Đã có lỗi xảy ra khi tạo yêu cầu thanh toán: ' + error.message, 500));
    } finally {
        connection.release(); // Luôn luôn phải trả connection lại cho Pool
    }
});

exports.createExpenseClaim = catchAsync(async (req, res, next) => {
    const { amount, reason } = req.body;
    let status = 'Pending_Manager';

    // Logic phê duyệt đa cấp
    if (amount > 5000000) {
        status = 'Pending_Founder'; // Tự động đẩy lên bàn Sếp tổng
    }

    const [newClaim] = await db.query(
        'INSERT INTO expense_claims (user_id, amount, reason, status) VALUES (?, ?, ?, ?)',
        [req.user.id, amount, reason, status]
    );

    res.status(201).json({ success: true, data: newClaim });
});