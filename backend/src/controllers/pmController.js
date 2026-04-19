const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const AuditLogger = require('../utils/auditLogger');

// ==========================
// 1. PROJECT MANAGEMENT
// ==========================

exports.createProject = catchAsync(async (req, res, next) => {
    const manager_id = req.user.id;
    const { name, description, start_date, end_date } = req.body;

    const query = `INSERT INTO projects (name, description, start_date, end_date, manager_id) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [name, description, start_date, end_date, manager_id]);

    res.status(201).json({
        success: true,
        message: 'Tạo dự án thành công!',
        data: { project_id: result.insertId, name }
    });
});

exports.getAllProjects = catchAsync(async (req, res, next) => {
    const query = `
        SELECT p.*, u.full_name AS manager_name 
        FROM projects p 
        JOIN users u ON p.manager_id = u.id 
        WHERE p.deleted_at IS NULL 
        ORDER BY p.created_at DESC
    `;
    const [projects] = await db.query(query);
    res.status(200).json({ success: true, results: projects.length, data: projects });
});

// ==========================
// 2. TASK & KANBAN MANAGEMENT
// ==========================

exports.createTask = catchAsync(async (req, res, next) => {
    const { project_id, title, description, priority, assignee_id, start_date, due_date, depends_on_task_id } = req.body;

    const query = `
        INSERT INTO tasks (project_id, title, description, priority, assignee_id, start_date, due_date, depends_on_task_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [project_id, title, description, priority, assignee_id, start_date, due_date, depends_on_task_id || null]);

    // Bắn Socket báo có task mới
    req.io.emit('task_board_updated', {
        action: 'NEW_TASK',
        project_id,
        task_id: result.insertId,
        message: `Task mới "${title}" đã được thêm vào dự án!`
    });

    res.status(201).json({ success: true, message: 'Tạo công việc thành công', data: { task_id: result.insertId } });
});

exports.getTasksByProject = catchAsync(async (req, res, next) => {
    const { projectId } = req.params;

    const query = `
        SELECT t.*, u.full_name AS assignee_name, u.avatar AS assignee_avatar
        FROM tasks t
        LEFT JOIN users u ON t.assignee_id = u.id
        WHERE t.project_id = ? AND t.deleted_at IS NULL
        ORDER BY t.created_at ASC
    `;
    const [tasks] = await db.query(query, [projectId]);
    res.status(200).json({ success: true, results: tasks.length, data: tasks });
});

// API dùng khi Kéo - Thả thẻ trên bảng Kanban
exports.updateTaskStatus = catchAsync(async (req, res, next) => {
    const { taskId } = req.params;
    const { status } = req.body; // 'To-Do', 'In Progress', 'Review', 'Done'

    await db.query('UPDATE tasks SET status = ?, updated_at = NOW() WHERE id = ?', [status, taskId]);

    // Bắn Socket để các máy khác tự động di chuyển thẻ mà không cần F5
    req.io.emit('task_board_updated', {
        action: 'STATUS_CHANGED',
        task_id: taskId,
        new_status: status
    });

    res.status(200).json({ success: true, message: 'Đã cập nhật trạng thái Task.' });
});

// ==========================
// 3. GANTT CHART API
// ==========================

// API này format data chuẩn để đưa vào các thư viện vẽ Gantt (như DhtmlxGantt hoặc Frappe Gantt)
exports.getGanttData = catchAsync(async (req, res, next) => {
    const { projectId } = req.params;

    const query = `
        SELECT id, title AS text, start_date, due_date AS end_date, 
               status, depends_on_task_id AS parent
        FROM tasks
        WHERE project_id = ? AND deleted_at IS NULL AND start_date IS NOT NULL AND due_date IS NOT NULL
        ORDER BY start_date ASC
    `;
    const [tasks] = await db.query(query, [projectId]);

    // Format lại dữ liệu cho Gantt (Tính duration bằng ngày)
    const formattedTasks = tasks.map(task => {
        const start = new Date(task.start_date);
        const end = new Date(task.end_date);
        const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Số ngày

        // Xác định % hoàn thành dựa trên status
        let progress = 0;
        if (task.status === 'In Progress') progress = 0.3;
        if (task.status === 'Review') progress = 0.8;
        if (task.status === 'Done') progress = 1;

        return {
            id: task.id,
            text: task.text,
            start_date: start.toISOString().split('T')[0], // Format YYYY-MM-DD
            duration: duration > 0 ? duration : 1,
            progress: progress,
            dependencies: task.parent ? task.parent.toString() : ""
        };
    });

    res.status(200).json({ success: true, data: formattedTasks });
});