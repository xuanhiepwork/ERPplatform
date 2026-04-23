const aiService = require('../services/aiService');
const catchAsync = require('../utils/catchAsync');

exports.getAIDecomposition = catchAsync(async (req, res, next) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: "Vui lòng nhập tiêu đề công việc" });
    }

    // Gọi AI để lấy danh sách sub-tasks gợi ý
    const suggestions = await aiService.decomposeTask(title, description);

    res.status(200).json({
        success: true,
        data: suggestions
    });
});

exports.saveSubTasks = catchAsync(async (req, res, next) => {
    const { taskId } = req.params;
    const { subtasks } = req.body; // Đây là mảng các sub-tasks PM đã chọn

    if (!subtasks || !Array.isArray(subtasks) || subtasks.length === 0) {
        return next(new AppError('Danh sách sub-tasks không hợp lệ.', 400));
    }

    // 1. Kiểm tra Task cha có tồn tại không
    const [taskExists] = await db.query('SELECT id FROM tasks WHERE id = ?', [taskId]);
    if (taskExists.length === 0) {
        return next(new AppError('Không tìm thấy Task cha để gắn Sub-tasks.', 404));
    }

    // 2. Chuẩn bị dữ liệu để insert hàng loạt (Bulk Insert)
    // Cấu trúc mảng lồng: [[task_id, title, desc, hours, dept], [task_id, title, ...]]
    const values = subtasks.map(sub => [
        taskId,
        sub.title,
        sub.description,
        sub.estimated_hours || 0,
        sub.department || 'General'
    ]);

    // 3. Thực hiện Insert
    const sql = `INSERT INTO sub_tasks (parent_task_id, title, description, estimated_hours, department) VALUES ?`;
    await db.query(sql, [values]);

    res.status(201).json({
        success: true,
        message: `Đã lưu thành công ${subtasks.length} sub-tasks vào hệ thống.`
    });
});