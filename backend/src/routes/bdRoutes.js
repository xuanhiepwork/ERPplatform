const express = require('express');
const router = express.Router();
const bdController = require('../controllers/bdController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, partnerRules, dealRules, activityRules } = require('../middlewares/validator');

router.use(authMiddleware.verifyToken);

// --- Partner Routes ---
router.route('/partners')
    .get(bdController.getAllPartners)
    .post(authMiddleware.requirePermission('manage_bd'), partnerRules, validate, bdController.createPartner);

// --- Deal Pipeline Routes ---
router.route('/deals')
    .get(bdController.getPipelineDeals) // Gets data for the Kanban board
    .post(authMiddleware.requirePermission('manage_bd'), dealRules, validate, bdController.createDeal);

// Update Deal Stage (Drag & Drop action)
router.patch('/deals/:id/stage', authMiddleware.requirePermission('manage_bd'), bdController.updateDealStage);

// Log an activity (Meeting, Email) for a specific deal
router.post('/deals/:id/activities', authMiddleware.requirePermission('manage_bd'), activityRules, validate, bdController.logActivity);

module.exports = router;