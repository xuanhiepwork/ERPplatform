const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');

const moduleCatalog = [
    { title: 'Employee Records', module: 'HR', path: '/hr/core' },
    { title: 'Time & Attendance', module: 'HR', path: '/hr' },
    { title: 'Contracts', module: 'HR', path: '/hr/contracts' },
    { title: 'Financial Dashboard', module: 'Finance', path: '/finance' },
    { title: 'Accounts Payable', module: 'Finance', path: '/finance' },
    { title: 'Accounts Receivable', module: 'Finance', path: '/finance' },
    { title: 'Marketing Command Center', module: 'Marketing', path: '/marketing' },
    { title: 'Digital Asset Library', module: 'Marketing', path: '/marketing/dam' },
    { title: 'Project Task Board', module: 'Projects', path: '/pm' },
    { title: 'Strategy Board', module: 'Projects', path: '/pm/strategy' },
    { title: 'Partner Pipeline', module: 'Business Development', path: '/bd/pipeline' },
];

const like = (value) => `%${String(value || '').trim()}%`;

exports.globalSearch = catchAsync(async (req, res) => {
    const q = String(req.query.q || '').trim();
    if (!q) {
        return res.status(200).json({ success: true, data: [] });
    }

    const normalized = q.toLowerCase();
    const staticResults = moduleCatalog
        .filter((item) => item.title.toLowerCase().includes(normalized) || item.module.toLowerCase().includes(normalized))
        .map((item) => ({ ...item, type: 'module' }));

    const dbResults = [];
    const searches = [
        {
            sql: `SELECT full_name AS title, 'HR' AS module, '/hr/core' AS path, 'employee' AS type FROM users WHERE deleted_at IS NULL AND full_name LIKE ? LIMIT 5`,
            params: [like(q)],
        },
        {
            sql: `SELECT title, 'Marketing' AS module, '/marketing' AS path, 'campaign' AS type FROM campaigns WHERE deleted_at IS NULL AND title LIKE ? LIMIT 5`,
            params: [like(q)],
        },
        {
            sql: `SELECT file_name AS title, 'Marketing' AS module, '/marketing/dam' AS path, 'asset' AS type FROM digital_assets WHERE deleted_at IS NULL AND (file_name LIKE ? OR tags LIKE ?) LIMIT 5`,
            params: [like(q), like(q)],
        },
        {
            sql: `SELECT name AS title, 'Projects' AS module, '/pm' AS path, 'project' AS type FROM projects WHERE deleted_at IS NULL AND name LIKE ? LIMIT 5`,
            params: [like(q)],
        },
        {
            sql: `SELECT title, 'Projects' AS module, '/pm/strategy' AS path, 'task' AS type FROM tasks WHERE deleted_at IS NULL AND title LIKE ? LIMIT 5`,
            params: [like(q)],
        },
    ];

    for (const search of searches) {
        try {
            const [rows] = await db.query(search.sql, search.params);
            dbResults.push(...rows);
        } catch (error) {
            // Some modules are optional in early deployments; keep search usable.
        }
    }

    res.status(200).json({
        success: true,
        data: [...dbResults, ...staticResults].slice(0, 12),
    });
});

exports.getNotifications = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const notifications = [];

    try {
        const [approvals] = await db.query(
            `SELECT id, entity_type, created_at FROM approval_requests WHERE current_approver_id = ? AND status = 'Pending' ORDER BY created_at DESC LIMIT 10`,
            [userId]
        );
        notifications.push(...approvals.map((item) => ({
            id: `approval-${item.id}`,
            title: `${item.entity_type.replace(/_/g, ' ')} awaiting approval`,
            time: item.created_at,
            unread: true,
            type: 'approval',
            path: '/dashboard',
            approval_id: item.id,
        })));
    } catch (error) {
        // Ignore optional table errors in development.
    }

    res.status(200).json({ success: true, data: notifications });
});

exports.markNotificationRead = catchAsync(async (req, res) => {
    res.status(200).json({ success: true, data: { id: req.params.id, unread: false } });
});

exports.markAllNotificationsRead = catchAsync(async (req, res) => {
    res.status(200).json({ success: true });
});
