const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, employeeRules } = require('../middlewares/validator'); // Import validator

router.use(authMiddleware.verifyToken);

router.get('/', authMiddleware.requirePermission('view_employee'), employeeController.getAllEmployees);

// Gắn validator vào Route POST
router.post('/',
    authMiddleware.requirePermission('create_employee'),
    employeeRules, // 1. Kiểm tra luật
    validate,      // 2. Chặn lại nếu vi phạm luật
    employeeController.createEmployee
);

router.delete('/:id', authMiddleware.requirePermission('delete_employee'), employeeController.deleteEmployee);
module.exports = router;