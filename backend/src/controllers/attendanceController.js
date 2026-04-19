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

// Lấy bảng công cá nhân theo tháng và năm
exports.getMyTimesheet = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { month, year } = req.query; // Lấy từ query string: ?month=4&year=2026

    if (!month || !year) {
        return next(new AppError('Vui lòng cung cấp tháng và năm!', 400));
    }

    // Query lấy tất cả log chấm công của user trong tháng đó
    const query = `
        SELECT id, check_in, check_out, status, work_mode, location_data
        FROM attendance_logs
        WHERE user_id = ? 
          AND MONTH(check_in) = ? 
          AND YEAR(check_in) = ?
          AND deleted_at IS NULL
        ORDER BY check_in ASC
    `;

    const [rows] = await db.query(query, [userId, month, year]);

    res.status(200).json({
        success: true,
        results: rows.length,
        data: rows
    });
});