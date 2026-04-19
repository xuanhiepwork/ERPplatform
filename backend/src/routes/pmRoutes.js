const express = require('express');
const router = express.Router();
const pmController = require('../controllers/pmController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, projectRules, taskRules } = require('../middlewares/validator');

router.use(authMiddleware.verifyToken);

// --- Projects ---
router.route('/projects')
    .get(pmController.getAllProjects)
    .post(authMiddleware.requirePermission('manage_projects'), projectRules, validate, pmController.createProject);

// --- Tasks (Kanban) ---
// Lấy danh sách task của 1 dự án cụ thể
router.route('/projects/:projectId/tasks')
    .get(pmController.getTasksByProject);

// Tạo task mới
router.post('/tasks', taskRules, validate, pmController.createTask);

// Cập nhật trạng thái Task (Kéo thả)
router.patch('/tasks/:taskId/status', pmController.updateTaskStatus);

// --- Gantt Chart ---
// Lấy data đã format chuẩn cho biểu đồ Gantt
router.get('/projects/:projectId/gantt', pmController.getGanttData);

module.exports = router;