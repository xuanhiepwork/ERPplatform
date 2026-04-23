const express = require('express');
const financeController = require('../controllers/financeController');
const authMiddleware = require('../middlewares/authMiddleware');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

// Chỉ Founder và Manager mới được xem báo cáo tài chính
router.use(authMiddleware);
router.get('/cashflow-stats', restrictTo('Founder', 'Manager'), financeController.getCashflowStats);

module.exports = router;