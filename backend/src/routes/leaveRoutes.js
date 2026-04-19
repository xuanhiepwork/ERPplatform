const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, leaveRules } = require('../middlewares/validator'); // Import validator

router.use(authMiddleware.verifyToken);

router.route('/')
    .get(leaveController.getMyLeaveRequests)
    .post(
        leaveRules, // 1. Kiểm tra luật
        validate,   // 2. Chặn lại
        leaveController.createLeaveRequest
    );

module.exports = router;