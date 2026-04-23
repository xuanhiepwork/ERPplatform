const express = require('express');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Webhook từ PayOS gọi vào (Phải để public, KHÔNG bọc authMiddleware)
router.post('/webhook', paymentController.handlePayOSWebhook);

// Các API bên dưới cần nhân viên BD đăng nhập mới tạo được link thu tiền
router.use(authMiddleware.verifyToken);

router.post('/create-link', authMiddleware.requirePermission('manage_bd'), paymentController.createPaymentLink);

module.exports = router;