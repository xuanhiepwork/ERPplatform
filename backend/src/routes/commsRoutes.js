const express = require('express');
const router = express.Router();
const commsController = require('../controllers/commsController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, postRules, commentRules, wikiCategoryRules, wikiArticleRules } = require('../middlewares/validator');
// const restrictTo = require('../middlewares/restrictTo'); // Mở ra nếu cần chặn quyền

router.use(authMiddleware.verifyToken);

// --- NEWSFEED ---
router.route('/newsfeed')
    .get(commsController.getNewsfeed)
    .post(postRules, validate, commsController.createPost);

router.post('/newsfeed/:postId/like', commsController.toggleLike);
router.post('/newsfeed/:postId/comments', commentRules, validate, commsController.addComment);

// --- WIKI / KNOWLEDGE BASE ---
router.route('/wiki/categories')
    .get(commsController.getCategories)
    .post(authMiddleware.requirePermission('manage_wiki'), wikiCategoryRules, validate, commsController.createWikiCategory);

router.route('/wiki/articles')
    .post(authMiddleware.requirePermission('manage_wiki'), wikiArticleRules, validate, commsController.createArticle);

router.get('/wiki/categories/:categoryId/articles', commsController.getArticlesByCategory);
router.get('/wiki/articles/:id', commsController.getArticleDetail);
/**
 * @route   POST /api/v1/comms/wiki-bot
 * @desc    Chat với trợ lý ảo RAG để tra cứu chính sách, quy định nội bộ
 * @access  Tất cả nhân viên đã đăng nhập đều có quyền hỏi
 */
router.post('/wiki-bot', commsController.chatWithWiki);

/**
 * @route   GET /api/v1/comms/wiki
 * @desc    Lấy danh sách các bài viết Wiki (nếu bạn muốn làm trang danh mục)
 */
// router.get('/wiki', commsController.getAllWikiArticles);

/**
 * @route   POST /api/v1/comms/wiki
 * @desc    Tạo bài viết Wiki mới (Chỉ dành cho Manager/HR/Founder)
 */
// router.post('/wiki', restrictTo('Founder', 'Manager'), commsController.createWikiArticle);

module.exports = router;