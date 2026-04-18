const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route Đăng nhập (Không cần token bảo vệ)
router.post('/login', authController.login);

// Các routes bên dưới cần phải có Token mới truy cập được
router.use(authMiddleware.verifyToken);

// Route Đổi mật khẩu
router.patch('/change-password', authController.changePassword);

module.exports = router;