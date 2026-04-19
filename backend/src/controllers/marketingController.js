const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const AuditLogger = require('../utils/auditLogger');

// ==========================
// 1. CAMPAIGNS & CONTENT CALENDAR
// ==========================

exports.createCampaign = catchAsync(async (req, res, next) => {
    const owner_id = req.user.id;
    const { title, description, channel, publish_date } = req.body;

    const query = `INSERT INTO campaigns (title, description, channel, publish_date, owner_id) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [title, description, channel, publish_date, owner_id]);

    // Bắn Socket báo cho team Marketing có bài mới được lên lịch
    req.io.emit('marketing_update', {
        action: 'NEW_CAMPAIGN',
        message: `Lịch lên bài mới: "${title}" trên kênh ${channel}`
    });

    res.status(201).json({
        success: true,
        message: 'Tạo lịch nội dung thành công!',
        data: { campaign_id: result.insertId }
    });
});

exports.getAllCampaigns = catchAsync(async (req, res, next) => {
    const query = `
        SELECT c.*, u.full_name AS owner_name, u.avatar AS owner_avatar
        FROM campaigns c
        JOIN users u ON c.owner_id = u.id
        WHERE c.deleted_at IS NULL
        ORDER BY c.publish_date ASC
    `;
    const [campaigns] = await db.query(query);
    res.status(200).json({ success: true, results: campaigns.length, data: campaigns });
});

exports.updateCampaignStatus = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body; // 'Draft', 'Scheduled', 'Published'

    await db.query('UPDATE campaigns SET status = ?, updated_at = NOW() WHERE id = ?', [status, id]);

    req.io.emit('marketing_update', { action: 'CAMPAIGN_STATUS_CHANGED', campaign_id: id, new_status: status });
    res.status(200).json({ success: true, message: 'Đã cập nhật trạng thái bài đăng.' });
});

// ==========================
// 2. DIGITAL ASSET MANAGEMENT (DAM)
// ==========================

exports.uploadAsset = catchAsync(async (req, res, next) => {
    if (!req.file) {
        return next(new AppError('Vui lòng đính kèm một file hợp lệ!', 400));
    }

    const uploaded_by = req.user.id;
    const { tags, version } = req.body; // Tags truyền vào dạng chuỗi: "Logo, Branding, 2026"

    // Xử lý đường dẫn file (Dùng tạm local, sau này đổi URL S3 vào đây cực kỳ dễ)
    const file_url = req.file.path.replace(/\\/g, '/');
    const file_name = req.file.originalname;
    const file_type = req.file.mimetype;
    const file_size = req.file.size;

    const query = `
        INSERT INTO digital_assets (file_name, file_url, file_type, file_size, version, tags, uploaded_by) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [file_name, file_url, file_type, file_size, version || 'V1', tags || '', uploaded_by]);

    // Bắn Socket báo có tài nguyên mới (Rất hữu ích để Sales/BD biết có file báo giá mới)
    req.io.emit('new_asset_uploaded', {
        asset_id: result.insertId,
        message: `Tài liệu mới "${file_name}" (Phiên bản ${version || 'V1'}) vừa được tải lên kho!`
    });

    res.status(201).json({
        success: true,
        message: 'Tải tài nguyên lên thành công!',
        data: { asset_id: result.insertId, file_url }
    });
});

exports.searchAssets = catchAsync(async (req, res, next) => {
    const { search_query } = req.query; // Tìm theo tag hoặc tên file

    let query = `
        SELECT a.*, u.full_name AS uploaded_by_name 
        FROM digital_assets a
        JOIN users u ON a.uploaded_by = u.id
        WHERE a.deleted_at IS NULL
    `;
    const queryParams = [];

    if (search_query) {
        query += ` AND (a.file_name LIKE ? OR a.tags LIKE ?)`;
        queryParams.push(`%${search_query}%`, `%${search_query}%`);
    }

    query += ` ORDER BY a.created_at DESC`;

    const [assets] = await db.query(query, queryParams);
    res.status(200).json({ success: true, results: assets.length, data: assets });
});