const express = require('express');
const router = express.Router();
const commsController = require('../controllers/commsController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, postRules, commentRules, wikiCategoryRules, wikiArticleRules } = require('../middlewares/validator');

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

module.exports = router;