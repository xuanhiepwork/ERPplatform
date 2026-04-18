const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');
router.use(authMiddleware.verifyToken);

// router.route('/')
//     .get(employeeController.getAllEmployees)
//     .post(employeeController.createEmployee);

// router.route('/:id')
//     .delete(employeeController.deleteEmployee);

// Tất cả thao tác nhân sự đều cần đăng nhập

// Chỉ những người có quyền 'view_employee' mới xem được danh sách
router.get('/',
    authMiddleware.requirePermission('view_employee'),
    employeeController.getAllEmployees
);

// Chỉ những người có quyền 'create_employee' mới tạo được nhân sự (Thường là HR/Admin)
router.post('/',
    authMiddleware.requirePermission('create_employee'),
    employeeController.createEmployee
);

// Rất nhạy cảm: Chỉ người có quyền 'delete_employee' mới được xóa (Xóa mềm)
router.delete('/:id',
    authMiddleware.requirePermission('delete_employee'),
    employeeController.deleteEmployee
);

module.exports = router;