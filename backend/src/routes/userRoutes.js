const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload'); // File upload.js của bạn

const router = express.Router();

// Bắt buộc đăng nhập cho tất cả route bên dưới
router.use(authMiddleware.verifyToken);

// API tự phục vụ (ESS - Employee Self-Service)
router.get('/me', userController.getMe);
router.patch('/me', userController.updateMe);

// API upload Avatar (sử dụng middleware multer 'upload.single')
// Tên field trong form-data phải là 'avatar'
router.post('/me/avatar', upload.single('avatar'), userController.uploadAvatar);

module.exports = router;