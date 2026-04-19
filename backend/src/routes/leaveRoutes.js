const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const authMiddleware = require('../middlewares/authMiddleware');

// Chỉ nhân viên đã đăng nhập mới được tạo/xem đơn nghỉ phép
router.use(authMiddleware.verifyToken);

router.route('/')
    .get(leaveController.getMyLeaveRequests)
    .post(leaveController.createLeaveRequest);

module.exports = router;