const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, expenseRules } = require('../middlewares/validator'); // Import validator

router.use(authMiddleware.verifyToken);

router.route('/')
    .get(expenseController.getMyExpenseClaims)
    .post(
        expenseRules, // 1. Kiểm tra luật
        validate,     // 2. Chặn lại
        expenseController.createExpenseClaim
    );

module.exports = router;