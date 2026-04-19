const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const AuditLogger = require('../utils/auditLogger');

// 1. Lấy danh sách lịch sử xin nghỉ phép của BẢN THÂN
exports.getMyLeaveRequests = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const query = `
        SELECT id, leave_type, start_date, end_date, reason, status, created_at 
        FROM leave_requests 
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

// 2. Tạo đơn xin nghỉ phép MỚI & Gửi cho Quản lý duyệt
exports.createLeaveRequest = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { leave_type, start_date, end_date, reason, approver_id } = req.body;

    // 1. Kiểm tra đầu vào (Validation)
    if (!leave_type || !start_date || !end_date || !approver_id) {
        return next(new AppError('Vui lòng cung cấp đủ: loại phép, ngày bắt đầu, ngày kết thúc và người duyệt (approver_id).', 400));
    }

    // * Mẹo thực tế: Dùng Transaction để đảm bảo nếu tạo đơn lỗi thì luồng phê duyệt cũng không được tạo
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        // 2. Lưu đơn vào bảng leave_requests (Trạng thái mặc định: Pending)
        const insertLeaveQuery = `
            INSERT INTO leave_requests (user_id, leave_type, start_date, end_date, reason, status)
            VALUES (?, ?, ?, ?, ?, 'Pending')
        `;
        const [leaveResult] = await connection.query(insertLeaveQuery, [userId, leave_type, start_date, end_date, reason]);
        const leaveId = leaveResult.insertId;

        // 3. Đẩy đơn này vào "Động cơ Phê duyệt" (Bảng approval_requests)
        const insertApprovalQuery = `
            INSERT INTO approval_requests (entity_type, entity_id, requester_id, current_approver_id, level, status)
            VALUES ('Leave_Request', ?, ?, ?, 1, 'Pending')
        `;
        await connection.query(insertApprovalQuery, [leaveId, userId, approver_id]);

        // 4. Chốt Transaction (Lưu cả 2 bảng cùng lúc)
        await connection.commit();

        // 5. Ghi log Audit
        AuditLogger.log(req, {
            action: 'INSERT',
            table_name: 'leave_requests',
            entity_id: leaveId,
            new_values: req.body
        });

        res.status(201).json({
            success: true,
            message: 'Đã tạo đơn xin nghỉ phép và gửi yêu cầu phê duyệt thành công!',
            data: { leave_id: leaveId }
        });

    } catch (error) {
        // Nếu có lỗi ở bất kỳ bước nào, Rollback (Hủy bỏ) mọi thao tác
        await connection.rollback();
        return next(new AppError('Đã có lỗi xảy ra khi tạo đơn nghỉ phép: ' + error.message, 500));
    } finally {
        connection.release();
    }
});