const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const commsService = require('../services/commsService');

// ==========================
// 1. NEWSFEED (BẢNG TIN)
// ==========================

exports.createPost = catchAsync(async (req, res, next) => {
    const author_id = req.user.id;
    const { content, post_type } = req.body;

    const query = `INSERT INTO newsfeed_posts (author_id, content, post_type) VALUES (?, ?, ?)`;
    const [result] = await db.query(query, [author_id, content, post_type || 'General']);

    // Bắn Socket báo có bài viết mới
    req.io.emit('newsfeed_update', {
        action: 'NEW_POST',
        message: `Có bài đăng mới trên bảng tin công ty!`
    });

    res.status(201).json({ success: true, message: 'Đăng bài thành công!', data: { post_id: result.insertId } });
});

exports.getNewsfeed = catchAsync(async (req, res, next) => {
    // Lấy bài đăng kèm số lượng like và số lượng comment
    const query = `
        SELECT p.id, p.content, p.post_type, p.created_at, 
               u.full_name AS author_name, u.avatar AS author_avatar,
               (SELECT COUNT(*) FROM newsfeed_likes WHERE post_id = p.id) AS total_likes,
               (SELECT COUNT(*) FROM newsfeed_comments WHERE post_id = p.id) AS total_comments
        FROM newsfeed_posts p
        JOIN users u ON p.author_id = u.id
        WHERE p.deleted_at IS NULL
        ORDER BY p.created_at DESC
        LIMIT 20 -- Phân trang (Pagination) cơ bản
    `;
    const [posts] = await db.query(query);
    res.status(200).json({ success: true, results: posts.length, data: posts });
});

exports.toggleLike = catchAsync(async (req, res, next) => {
    const { postId } = req.params;
    const userId = req.user.id;

    // Kiểm tra xem đã like chưa
    const [existingLike] = await db.query('SELECT id FROM newsfeed_likes WHERE post_id = ? AND user_id = ?', [postId, userId]);

    if (existingLike.length > 0) {
        // Đã like -> Unlike (Xóa)
        await db.query('DELETE FROM newsfeed_likes WHERE post_id = ? AND user_id = ?', [postId, userId]);
        return res.status(200).json({ success: true, message: 'Đã bỏ thích.' });
    } else {
        // Chưa like -> Thêm Like
        await db.query('INSERT INTO newsfeed_likes (post_id, user_id) VALUES (?, ?)', [postId, userId]);
        return res.status(200).json({ success: true, message: 'Đã thích bài viết.' });
    }
});

exports.addComment = catchAsync(async (req, res, next) => {
    const { postId } = req.params;
    const userId = req.user.id;
    const { content } = req.body;

    await db.query('INSERT INTO newsfeed_comments (post_id, user_id, content) VALUES (?, ?, ?)', [postId, userId, content]);

    // Trigger socket báo có người bình luận
    req.io.emit('newsfeed_update', { action: 'NEW_COMMENT', post_id: postId });

    res.status(201).json({ success: true, message: 'Đã bình luận.' });
});

// ==========================
// 2. KNOWLEDGE BASE (WIKI)
// ==========================

exports.createWikiCategory = catchAsync(async (req, res, next) => {
    const { name, description, parent_id } = req.body;
    const query = `INSERT INTO wiki_categories (name, description, parent_id) VALUES (?, ?, ?)`;
    const [result] = await db.query(query, [name, description, parent_id || null]);
    res.status(201).json({ success: true, data: { category_id: result.insertId } });
});

exports.getCategories = catchAsync(async (req, res, next) => {
    const [categories] = await db.query('SELECT * FROM wiki_categories ORDER BY name ASC');
    res.status(200).json({ success: true, data: categories });
});

exports.createArticle = catchAsync(async (req, res, next) => {
    const author_id = req.user.id;
    const { category_id, title, content } = req.body;

    const query = `INSERT INTO wiki_articles (category_id, title, content, author_id) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [category_id, title, content, author_id]);

    res.status(201).json({ success: true, message: 'Tạo bài viết thành công!', data: { article_id: result.insertId } });
});

exports.getArticlesByCategory = catchAsync(async (req, res, next) => {
    const { categoryId } = req.params;
    const query = `
        SELECT a.id, a.title, a.created_at, a.updated_at, u.full_name AS author_name
        FROM wiki_articles a
        JOIN users u ON a.author_id = u.id
        WHERE a.category_id = ? AND a.deleted_at IS NULL
    `;
    const [articles] = await db.query(query, [categoryId]);
    res.status(200).json({ success: true, results: articles.length, data: articles });
});

exports.getArticleDetail = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const query = `
        SELECT a.*, u.full_name AS author_name 
        FROM wiki_articles a 
        JOIN users u ON a.author_id = u.id 
        WHERE a.id = ? AND a.deleted_at IS NULL
    `;
    const [articles] = await db.query(query, [id]);

    if (articles.length === 0) return next(new AppError('Không tìm thấy bài viết', 404));

    res.status(200).json({ success: true, data: articles[0] });
});

exports.chatWithWiki = catchAsync(async (req, res, next) => {
    const { message } = req.body;

    if (!message) return next(new AppError('Vui lòng nhập câu hỏi.', 400));

    const answer = await commsService.askWikiBot(message);

    res.status(200).json({
        success: true,
        data: {
            reply: answer
        }
    });
});