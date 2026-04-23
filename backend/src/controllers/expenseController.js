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
    // Thống nhất dùng 'description' hoặc 'reason', ở đây mình dùng description theo chuẩn bảng của bạn
    const { amount, description, receipt_url, approver_id } = req.body;

    // 1. Validation nghiêm ngặt
    if (!amount || !description || !approver_id) {
        return next(new AppError('Thiếu thông tin: Số tiền, mô tả hoặc người duyệt.', 400));
    }

    if (amount <= 0) {
        return next(new AppError('Số tiền phải lớn hơn 0.', 400));
    }

    // 2. Xác định trạng thái dựa trên số tiền (Logic PM)
    let initialStatus = 'Pending_Manager';
    if (amount > 5000000) {
        initialStatus = 'Pending_Founder';
    }

    // 3. Khởi tạo Transaction
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        // BƯỚC A: Lưu đơn vào bảng expense_claims
        const insertExpenseQuery = `
            INSERT INTO expense_claims (user_id, amount, description, receipt_url, status)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [expenseResult] = await connection.query(insertExpenseQuery, [
            userId,
            amount,
            description,
            receipt_url || null,
            initialStatus
        ]);
        const expenseId = expenseResult.insertId;

        // BƯỚC B: Đẩy đơn vào Động cơ Phê duyệt (Bảng approval_requests)
        const insertApprovalQuery = `
            INSERT INTO approval_requests (entity_type, entity_id, requester_id, current_approver_id, level, status)
            VALUES ('Expense_Claim', ?, ?, ?, 1, 'Pending')
        `;
        await connection.query(insertApprovalQuery, [expenseId, userId, approver_id]);

        // 4. CHỐT TRANSACTION
        await connection.commit();

        // 5. Ghi Audit Log & Bắn Socket (Sau khi commit thành công)
        AuditLogger.log(req, {
            action: 'INSERT',
            table_name: 'expense_claims',
            entity_id: expenseId,
            new_values: { amount, description, initialStatus }
        });

        req.io.emit('new_approval_request', {
            approver_id: approver_id,
            message: `Yêu cầu thanh toán ${amount.toLocaleString('vi-VN')}đ đang chờ bạn duyệt! (${initialStatus})`
        });

        // TRẢ VỀ KẾT QUẢ DUY NHẤT TẠI ĐÂY
        res.status(201).json({
            success: true,
            message: 'Đã tạo yêu cầu và gửi luồng phê duyệt thành công!',
            data: { expense_id: expenseId, amount }
        });

    } catch (error) {
        await connection.rollback();
        return next(new AppError('Lỗi hệ thống khi tạo yêu cầu: ' + error.message, 500));
    } finally {
        connection.release();
    }
});