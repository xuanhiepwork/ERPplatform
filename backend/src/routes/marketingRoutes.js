const express = require('express');
const router = express.Router();
const marketingController = require('../controllers/marketingController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload'); // Tái sử dụng cấu hình multer
const { validate, campaignRules } = require('../middlewares/validator');

router.use(authMiddleware.verifyToken);

// --- Campaigns & Content Calendar ---
router.route('/campaigns')
    .get(marketingController.getAllCampaigns)
    .post(authMiddleware.requirePermission('manage_marketing'), campaignRules, validate, marketingController.createCampaign);

router.patch('/campaigns/:id/status', authMiddleware.requirePermission('manage_marketing'), marketingController.updateCampaignStatus);

// --- Digital Asset Management (DAM) ---
router.route('/assets')
    .get(marketingController.searchAssets)
    // Upload file yêu cầu field 'file' trong form-data
    .post(authMiddleware.requirePermission('manage_marketing'), upload.single('file'), marketingController.uploadAsset);

module.exports = router;