const express = require('express');
const taskController = require('./taskController');
const authMiddleware = require('../../../core/middlewares/authMiddleware');
const restrictTo = require('../../../core/middlewares/restrictTo');

const router = express.Router();

/**
 * TẤT CẢ CÁC ROUTE Ở ĐÂY ĐỀU CẦN ĐĂNG NHẬP (JWT TOKEN)
 */
router.use(authMiddleware.verifyToken);

/**
 * @route   POST /api/v1/tasks/ai-decompose
 * @desc    Sử dụng Gemini 1.5 Flash để chia nhỏ một Task lớn thành các Sub-tasks
 * @access  Chỉ dành cho Founder và Manager (PM)
 */
router.post(
    '/ai-decompose',
    restrictTo('Founder', 'Manager'),
    taskController.getAIDecomposition
);

router.post(
    '/:taskId/sub-tasks',
    restrictTo('Founder', 'Manager'),
    taskController.saveSubTasks
);

// Bạn có thể thêm các route quản lý task thông thường ở đây
// router.get('/', taskController.getAllTasks);
// router.post('/', restrictTo('Founder', 'Manager'), taskController.createTask);

module.exports = router;
