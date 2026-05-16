const express = require('express');
const authController = require('./authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { db } = require('../config/db');

const router = express.Router();

// Route Đăng nhập (Không cần token bảo vệ)
router.post('/login', authController.login);
router.post('/register', authController.register);

// Dev-only helper: tạo user test nhanh (CHỈ DÙNG TRONG MÔI TRƯỜNG DEV)
router.post('/dev-create-user', async (req, res) => {
	if (process.env.NODE_ENV === 'production') {
		return res.status(403).json({ success: false, message: 'Not allowed in production' });
	}

	const { email = 'test.user@example.com', password = 'password123', full_name = 'Test User', role = 'Employee' } = req.body;
	try {
		// Kiểm tra tồn tại
		const [exists] = await db.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
		if (exists.length > 0) {
			return res.status(200).json({ success: true, message: 'User already exists', id: exists[0].id });
		}

		const [result] = await db.query('INSERT INTO users (full_name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())', [full_name, email, password, role]);
		return res.status(201).json({ success: true, message: 'Dev user created', id: result.insertId });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message || 'DB error' });
	}
});

// Các routes bên dưới cần phải có Token mới truy cập được
router.use(authMiddleware.verifyToken);

// Route Đổi mật khẩu
router.patch('/change-password', authController.changePassword);

module.exports = router;
