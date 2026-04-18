const Department = require('../models/departmentModel');

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.status(200).json({ success: true, data: departments });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.createDepartment = async (req, res) => {
    try {
        const { name, manager_id } = req.body;
        const newId = await Department.create(name, manager_id);
        res.status(201).json({
            success: true,
            message: 'Department created',
            data: { id: newId, name, manager_id }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create department', error: error.message });
    }
};