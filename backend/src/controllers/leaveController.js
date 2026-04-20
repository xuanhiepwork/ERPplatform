const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const AuditLogger = require('../utils/auditLogger');
const sendEmail = require('../utils/emailService');

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

        // 🟢 BẮN SOCKET TỚI FRONTEND TẠI ĐÂY 🟢
        req.io.emit('new_approval_request', {
            approver_id: approver_id,
            requester_id: userId,
            entity_type: 'Leave_Request',
            message: 'Bạn có một đơn xin nghỉ phép mới cần phê duyệt!'
        });

        // ✉️ BẮN EMAIL TỚI NGƯỜI DUYỆT ✉️
        // 1. Lấy email và tên của người duyệt từ Database
        const [approverData] = await connection.query('SELECT full_name, email FROM users WHERE id = ?', [approver_id]);

        if (approverData.length > 0) {
            const approverEmail = approverData[0].email;
            const approverName = approverData[0].full_name;

            // 2. Thiết kế nội dung Email (Dùng HTML cho đẹp)
            const emailSubject = `🔔 [ERP] Yêu cầu phê duyệt nghỉ phép mới`;
            const emailHtml = `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #2c3e50;">Xin chào ${approverName},</h2>
                    <p>Bạn vừa nhận được một yêu cầu phê duyệt <b>Nghỉ phép</b> mới trên hệ thống ERP.</p>
                    <ul>
                        <li><b>Loại phép:</b> ${leave_type}</li>
                        <li><b>Thời gian:</b> Từ ${start_date} đến ${end_date}</li>
                        <li><b>Lý do:</b> <i>"${reason}"</i></li>
                    </ul>
                    <p>Vui lòng đăng nhập vào hệ thống để xem chi tiết và xử lý.</p>
                    <hr>
                    <p style="font-size: 12px; color: #888;">Đây là email tự động, vui lòng không trả lời.</p>
                </div>
            `;

            // 3. Gửi email ngầm (Không dùng await để tránh làm API phản hồi chậm)
            sendEmail(approverEmail, emailSubject, emailHtml);
        }

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