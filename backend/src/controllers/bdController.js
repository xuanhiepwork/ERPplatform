const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const AuditLogger = require('../utils/auditLogger');

// ==========================
// PARTNER MANAGEMENT
// ==========================

exports.createPartner = catchAsync(async (req, res, next) => {
    const { name, industry, contact_person, email, phone } = req.body;

    const query = `INSERT INTO partners (name, industry, contact_person, email, phone) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [name, industry, contact_person, email, phone]);

    res.status(201).json({
        success: true,
        message: 'Đã tạo hồ sơ đối tác thành công!',
        data: { partner_id: result.insertId, name }
    });
});

exports.getAllPartners = catchAsync(async (req, res, next) => {
    const [rows] = await db.query('SELECT * FROM partners WHERE deleted_at IS NULL ORDER BY created_at DESC');
    res.status(200).json({ success: true, results: rows.length, data: rows });
});

// ==========================
// DEAL PIPELINE (KANBAN)
// ==========================

exports.getPipelineDeals = catchAsync(async (req, res, next) => {
    // This query joins Deals, Partners, and Users to provide rich data for the Kanban board
    const query = `
        SELECT d.id, d.name AS deal_name, d.expected_revenue, d.stage, d.status, d.closing_date,
               p.name AS partner_name, u.full_name AS owner_name
        FROM deals d
        JOIN partners p ON d.partner_id = p.id
        JOIN users u ON d.owner_id = u.id
        WHERE d.deleted_at IS NULL AND d.status = 'Open'
        ORDER BY d.updated_at DESC
    `;
    const [deals] = await db.query(query);

    res.status(200).json({ success: true, results: deals.length, data: deals });
});

exports.createDeal = catchAsync(async (req, res, next) => {
    const owner_id = req.user.id;
    const { partner_id, name, expected_revenue, closing_date } = req.body;

    const query = `
        INSERT INTO deals (partner_id, name, expected_revenue, closing_date, owner_id) 
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [partner_id, name, expected_revenue || 0, closing_date, owner_id]);

    // Real-time notification to the team that a new deal was added
    req.io.emit('pipeline_updated', {
        action: 'NEW_DEAL',
        deal_id: result.insertId,
        message: `Deal mới "${name}" vừa được thêm vào Pipeline!`
    });

    res.status(201).json({
        success: true,
        message: 'Tạo cơ hội kinh doanh thành công.',
        data: { deal_id: result.insertId }
    });
});

exports.updateDealStage = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { new_stage } = req.body; // e.g., 'Negotiation'

    // Validate stage
    const validStages = ['Outreach', 'Pitching', 'Negotiation', 'Legal', 'Onboarding'];
    if (!validStages.includes(new_stage)) {
        return next(new AppError('Trạng thái pipeline không hợp lệ.', 400));
    }

    // Fetch old data for Audit
    const [oldRows] = await db.query('SELECT stage, name FROM deals WHERE id = ?', [id]);
    if (oldRows.length === 0) return next(new AppError('Không tìm thấy deal này.', 404));

    // Update Stage
    await db.query('UPDATE deals SET stage = ?, updated_at = NOW() WHERE id = ?', [new_stage, id]);

    AuditLogger.log(req, {
        action: 'UPDATE',
        table_name: 'deals',
        entity_id: id,
        old_values: { stage: oldRows[0].stage },
        new_values: { stage: new_stage }
    });

    // 🟢 BẮN SOCKET ĐỂ FRONTEND KÉO THẢ MƯỢT MÀ KHÔNG CẦN RELOAD 🟢
    req.io.emit('pipeline_updated', {
        action: 'STAGE_CHANGED',
        deal_id: id,
        new_stage: new_stage,
        message: `Deal "${oldRows[0].name}" vừa chuyển sang giai đoạn ${new_stage}.`
    });

    res.status(200).json({ success: true, message: 'Đã cập nhật trạng thái Deal.' });
});

// ==========================
// DEAL ACTIVITIES (LOGS)
// ==========================

exports.logActivity = catchAsync(async (req, res, next) => {
    const { id } = req.params; // deal_id
    const user_id = req.user.id;
    const { activity_type, description } = req.body;

    const query = `INSERT INTO deal_activities (deal_id, user_id, activity_type, description) VALUES (?, ?, ?, ?)`;
    await db.query(query, [id, user_id, activity_type, description]);

    res.status(201).json({ success: true, message: 'Đã ghi chú hoạt động thành công.' });
});