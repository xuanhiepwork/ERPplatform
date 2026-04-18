const Attendance = require('../models/attendanceModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllAttendance = async (req, res) => {
    try {
        const records = await Attendance.findAll();
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.checkIn = catchAsync(async (req, res, next) => {
    const user_id = req.user.id;
    const { location_data, work_mode, status } = req.body;
    // Không cần try...catch. Nếu lỗi, catchAsync sẽ tự đẩy qua errorMiddleware
    // Quăng lỗi bằng AppError, Global Handler sẽ tự lo việc trả về JSON status 400
    if (!user_id) {
        return next(new AppError('Không tìm thấy thông tin user_id!', 400));
    }

    const newId = await Attendance.checkIn({ user_id, location_data, work_mode, status });

    res.status(201).json({
        success: true,
        message: 'Chấm công thành công',
        data: { attendance_id: newId, check_in: new Date() }
    });
});

exports.checkOut = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Attendance.checkOut(id);

        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Attendance record not found or already deleted' });
        }

        res.status(200).json({ success: true, message: 'Checked out successfully' });
    } catch (error) {
        console.error('Check-out error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};