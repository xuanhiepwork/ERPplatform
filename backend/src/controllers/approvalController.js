const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.handleAction = catchAsync(async (req, res, next) => {
    const { approval_id, action, comment } = req.body; // action: 'Approved' hoặc 'Rejected'
    const approver_id = req.user.id;

    // 1. Kiểm tra quyền của người duyệt
    const [approvals] = await db.query(
        'SELECT * FROM approval_requests WHERE id = ? AND current_approver_id = ? AND status = "Pending"',
        [approval_id, approver_id]
    );

    if (approvals.length === 0) {
        return next(new AppError('Bạn không có quyền duyệt đơn này hoặc đơn đã được xử lý.', 403));
    }

    const currentApproval = approvals[0];

    // 2. Nếu bị Từ chối (Rejected)
    if (action === 'Rejected') {
        await db.query(
            'UPDATE approval_requests SET status = "Rejected", comment = ?, updated_at = NOW() WHERE id = ?',
            [comment, approval_id]
        );
        // Cập nhật trạng thái bảng gốc (ví dụ: bảng leave_requests)
        await db.query(`UPDATE ${currentApproval.entity_type} SET status = "Rejected" WHERE id = ?`, [currentApproval.entity_id]);

        return res.status(200).json({ success: true, message: 'Đã từ chối đơn thành công.' });
    }

    // 3. Nếu được Duyệt (Approved) - Kiểm tra xem có bước tiếp theo không
    // Giả sử logic: HR duyệt (level 1) xong phải đến Founder (level 2) cho các khoản tiền lớn
    let nextApproverId = null;
    if (currentApproval.entity_type === 'Transaction' && currentApproval.level === 1) {
        // Tìm sếp tổng (Founder) hoặc Manager cấp cao hơn
        const [founder] = await db.query('SELECT id FROM users WHERE role = "Founder" LIMIT 1');
        nextApproverId = founder[0].id;
    }

    if (nextApproverId) {
        // Chuyển bóng sang người tiếp theo
        await db.query(
            'UPDATE approval_requests SET current_approver_id = ?, level = level + 1, updated_at = NOW() WHERE id = ?',
            [nextApproverId, approval_id]
        );
    } else {
        // Đây là bước cuối cùng -> Duyệt hoàn tất
        await db.query('UPDATE approval_requests SET status = "Approved", updated_at = NOW() WHERE id = ?', [approval_id]);
        await db.query(`UPDATE ${currentApproval.entity_type} SET status = "Approved" WHERE id = ?`, [currentApproval.entity_id]);

        // GỌI LOGIC ĐẶC THÙ: Ví dụ nếu là đơn nghỉ phép thì trừ ngày phép, nếu là lương thì khóa bảng lương.
        if (currentApproval.entity_type === 'Leave_Request') {
            // Logic trừ ngày phép...
        }
    }

    // 4. Ghi Audit Trail
    await db.query(
        'INSERT INTO audit_logs (user_id, action, table_name, new_data) VALUES (?, ?, ?, ?)',
        [approver_id, action, 'approval_requests', JSON.stringify({ approval_id, comment })]
    );

    res.status(200).json({ success: true, message: 'Thao tác phê duyệt hoàn tất.' });
});

// 1. API: Lấy danh sách các đơn ĐANG CHỜ TÔI DUYỆT
exports.getMyPendingApprovals = catchAsync(async (req, res, next) => {
    const myId = req.user.id;

    const query = `
        SELECT a.id as approval_id, a.entity_type, a.entity_id, a.level, a.status, a.created_at,
               u.full_name as requester_name, u.email as requester_email
        FROM approval_requests a
        JOIN users u ON a.requester_id = u.id
        WHERE a.current_approver_id = ? AND a.status = 'Pending'
        ORDER BY a.created_at DESC
    `;
    const [requests] = await db.query(query, [myId]);

    res.status(200).json({
        success: true,
        results: requests.length,
        data: requests
    });
});

// 2. API (Dùng chung): Tạo một yêu cầu phê duyệt mới
// Hàm này thường được gọi TỪ BÊN TRONG các controller khác (Ví dụ: khi nhân viên tạo LeaveRequest)
// Nhưng ta cũng có thể viết thành API nếu muốn test
exports.submitApproval = catchAsync(async (req, res, next) => {
    const requester_id = req.user.id;
    const { entity_type, entity_id, current_approver_id } = req.body;

    if (!entity_type || !entity_id || !current_approver_id) {
        return next(new AppError('Thiếu thông tin để tạo luồng phê duyệt', 400));
    }

    const query = `
        INSERT INTO approval_requests (entity_type, entity_id, requester_id, current_approver_id, level, status)
        VALUES (?, ?, ?, ?, 1, 'Pending')
    `;

    const [result] = await db.query(query, [entity_type, entity_id, requester_id, current_approver_id]);

    res.status(201).json({
        success: true,
        message: 'Đã gửi yêu cầu phê duyệt thành công.',
        data: { approval_id: result.insertId }
    });
});