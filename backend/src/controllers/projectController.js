// src/controllers/projectController.js
exports.getResourceMap = catchAsync(async (req, res, next) => {
    const [stats] = await db.query(`
        SELECT u.full_name, COUNT(t.id) as active_tasks,
        CASE 
            WHEN COUNT(t.id) > 5 THEN 'Overloaded'
            WHEN COUNT(t.id) BETWEEN 1 AND 5 THEN 'Busy'
            ELSE 'Available'
        END as workload_status
        FROM users u
        LEFT JOIN tasks t ON u.id = t.assignee_id AND t.status = 'In Progress'
        GROUP BY u.id
    `);

    res.status(200).json({ success: true, data: stats });
});