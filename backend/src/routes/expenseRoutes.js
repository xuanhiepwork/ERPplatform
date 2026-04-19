const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/authMiddleware');

// Chỉ nhân viên đã đăng nhập mới được tạo/xem đơn claim chi phí
router.use(authMiddleware.verifyToken);

router.route('/')
    .get(expenseController.getMyExpenseClaims)
    .post(expenseController.createExpenseClaim);

module.exports = router;