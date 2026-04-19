const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, payrollRules } = require('../middlewares/validator'); // Import validator

router.use(authMiddleware.verifyToken);

// Nhân viên tự xem phiếu lương của mình (ESS)
router.get('/my-payslips', payrollController.getMyPayslips);

// HR / Kế toán / Admin chạy tính lương (Phải có quyền 'generate_payroll')
router.post('/generate',
    authMiddleware.requirePermission('generate_payroll'),
    payrollRules, // 1. Kiểm tra luật
    validate,     // 2. Chặn lại
    payrollController.generateMonthlyPayrollDraft
);

module.exports = router;