const express = require('express');
const router = express.Router();
const approvalController = require('../controllers/approvalController');
const authMiddleware = require('../middlewares/authMiddleware');

// Chỉ người đã đăng nhập mới được xài hệ thống Approval
router.use(authMiddleware.verifyToken);

// 1. Xem danh sách đơn đang chờ MÌNH duyệt
router.get('/pending', approvalController.getMyPendingApprovals);

// 2. Submit 1 đơn mới (Thường dùng để test, thực tế sẽ gọi nội bộ từ controller khác)
router.post('/submit', approvalController.submitApproval);

// 3. Phê duyệt hoặc Từ chối đơn
// Body cần gửi: { "approval_id": 1, "action": "Approved", "comment": "Ok em" }
router.patch('/action', approvalController.handleAction);

module.exports = router;