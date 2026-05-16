const express = require('express');
const router = express.Router();
const leaveController = require('./leaveController');
const authMiddleware = require('../../../core/middlewares/authMiddleware');
const { validate, leaveRules } = require('../../../core/middlewares/validator'); // Import validator

router.use(authMiddleware.verifyToken);

router.route('/')
    .get(leaveController.getMyLeaveRequests)
    .post(
        leaveRules, // 1. Kiểm tra luật
        validate,   // 2. Chặn lại
        leaveController.createLeaveRequest
    );

module.exports = router;