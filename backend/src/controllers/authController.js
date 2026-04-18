const jwt = require('jsonwebtoken');
const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
// const bcrypt = require('bcrypt'); // Bỏ comment dòng này khi bạn dùng bcrypt
const AuditLogger = require('../util/auditLogger');

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1. Kiểm tra xem user có nhập email và password không
    if (!email || !password) {
        return next(new AppError('Vui lòng cung cấp email và mật khẩu!', 400));
    }

    // 2. Tìm user trong database (Chỉ tìm những user chưa bị xóa mềm)
    const [users] = await db.query(
        'SELECT * FROM users WHERE email = ? AND deleted_at IS NULL',
        [email]
    );

    // Nếu không tìm thấy user nào
    if (users.length === 0) {
        // Trả về 401 Unauthorized thay vì 404 để bảo mật (không cho hacker biết email có tồn tại hay không)
        return next(new AppError('Email hoặc mật khẩu không chính xác!', 401));
    }

    const user = users[0];

    // 3. Kiểm tra mật khẩu
    // TRƯỜNG HỢP 1: ĐANG DÙNG MẬT KHẨU THÔ (Không an toàn - Chỉ dùng test)
    const isMatch = (password === user.password);

    // TRƯỜNG HỢP 2: NẾU BẠN ĐÃ DÙNG BCRYPT (Khuyên dùng)
    // const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return next(new AppError('Email hoặc mật khẩu không chính xác!', 401));
    }

    // 4. Kiểm tra trạng thái tài khoản
    if (user.status === 'Suspended' || user.status === 'Offboarding') {
        return next(new AppError('Tài khoản của bạn đã bị khóa hoặc ngừng hoạt động.', 403));
    }

    // 5. Tạo JWT Token
    // Payload: Chứa những thông tin cần thiết để xác định quyền hạn sau này
    const payload = {
        id: user.id,
        role: user.role,
        dept_id: user.dept_id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    // 6. Trả về Token và thông tin user (loại bỏ password trước khi gửi về)
    // Xóa password khỏi object user để không bị lộ ra frontend
    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công',
        token: token,
        data: {
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role,
                dept_id: user.dept_id
            }
        }
    });
});

exports.changePassword = catchAsync(async (req, res, next) => {
    // 1. Lấy thông tin từ request
    const user_id = req.user.id; // Lấy từ token qua middleware verifyToken
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // 2. Validate đầu vào cơ bản
    if (!currentPassword || !newPassword || !confirmPassword) {
        return next(new AppError('Vui lòng nhập đầy đủ mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu!', 400));
    }

    if (newPassword !== confirmPassword) {
        return next(new AppError('Mật khẩu xác nhận không khớp với mật khẩu mới!', 400));
    }

    if (newPassword.length < 6) {
        return next(new AppError('Mật khẩu mới phải có ít nhất 6 ký tự!', 400));
    }

    // 3. Lấy thông tin user từ database để kiểm tra mật khẩu cũ
    const [users] = await db.query('SELECT password FROM users WHERE id = ? AND deleted_at IS NULL', [user_id]);

    if (users.length === 0) {
        return next(new AppError('Không tìm thấy người dùng!', 404));
    }

    const user = users[0];

    // 4. Kiểm tra mật khẩu hiện tại (Cũ)
    // TRƯỜNG HỢP 1: NẾU BẠN DÙNG PLAIN TEXT (Test)
    const isMatch = (currentPassword === user.password);

    // TRƯỜNG HỢP 2: NẾU BẠN ĐÃ DÙNG BCRYPT (Thực tế)
    // const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
        return next(new AppError('Mật khẩu hiện tại không chính xác!', 401));
    }

    // 5. Cập nhật mật khẩu mới vào Database
    // TRƯỜNG HỢP 2: NẾU BẠN ĐÃ DÙNG BCRYPT (Nhớ băm mật khẩu mới trước khi lưu)
    // const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    // await db.query('UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?', [hashedNewPassword, user_id]);

    // TRƯỜNG HỢP 1: NẾU BẠN DÙNG PLAIN TEXT
    await db.query('UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?', [newPassword, user_id]);

    // 6. Trả về kết quả thành công
    res.status(200).json({
        success: true,
        message: 'Đổi mật khẩu thành công! Vui lòng sử dụng mật khẩu mới cho lần đăng nhập tiếp theo.'
    });
});