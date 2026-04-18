const Employee = require('../models/employeeModel');
const AuditLogger = require('../utils/auditLogger');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const newId = await Employee.create(req.body);
        res.status(201).json({ success: true, message: 'Employee created', data: { id: newId, ...req.body } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create employee', error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const deletedRows = await Employee.softDelete(req.params.id);
        if (deletedRows === 0) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        res.status(200).json({ success: true, message: 'Employee successfully soft-deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.updateEmployee = catchAsync(async (req, res, next) => {
    const employeeId = req.params.id;
    const newData = req.body;

    // 1. LẤY DỮ LIỆU CŨ (Để Audit Trail)
    const [oldRows] = await db.query('SELECT * FROM employee WHERE id = ? AND is_deleted = 0', [employeeId]);
    if (oldRows.length === 0) return next(new AppError('Không tìm thấy nhân viên', 404));
    const oldData = oldRows[0];

    // 2. THỰC HIỆN UPDATE
    await db.query('UPDATE employee SET ? WHERE id = ?', [newData, employeeId]);

    // 3. GHI AUDIT LOG (Tự động & Im lặng)
    // Chúng ta không dùng 'await' ở đây để tránh làm chậm response trả về cho User
    AuditLogger.log(req, {
        action: 'UPDATE',
        table_name: 'employee',
        entity_id: employeeId,
        old_values: oldData,
        new_values: newData
    });

    res.status(200).json({ success: true, message: 'Cập nhật thành công' });
});

exports.updateSalary = catchAsync(async (req, res, next) => {
    const { employeeId } = req.params;
    const { new_salary } = req.body;

    // 1. FETCH: Lấy dữ liệu cũ trước khi sửa
    const [oldRows] = await db.query(
        'SELECT id, full_name, base_salary FROM users WHERE id = ? AND deleted_at IS NULL', 
        [employeeId]
    );
    
    if (oldRows.length === 0) return next(new AppError('Nhân viên không tồn tại', 404));
    const oldData = oldRows[0];

    // 2. UPDATE: Thực hiện thay đổi
    await db.query(
        'UPDATE users SET base_salary = ?, updated_at = NOW() WHERE id = ?', 
        [new_salary, employeeId]
    );

    // 3. LOG: Ghi lại sự thay đổi
    // Lưu ý: Không dùng await để giải phóng response nhanh cho người dùng
    AuditLogger.log(req, {
        action: 'UPDATE',
        table_name: 'users',
        entity_id: employeeId,
        old_values: { base_salary: oldData.base_salary },
        new_values: { base_salary: new_salary }
    });

    res.status(200).json({
        success: true,
        message: `Đã cập nhật lương cho nhân viên ${oldData.full_name} thành công.`
    });
});