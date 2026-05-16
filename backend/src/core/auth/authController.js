const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const allowedRoles = ['Employee', 'HR Admin', 'Finance & Accounting', 'Project Manager', 'Marketing Lead', 'Super Admin', 'Founder'];

const signToken = (user) => jwt.sign(
    { id: user.id, role: user.role, dept_id: user.dept_id },
    process.env.JWT_SECRET || 'dev_jwt_secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
);

const publicUser = (user) => ({
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    dept_id: user.dept_id
});

const sendAuthResponse = (res, statusCode, user, message) => {
    res.status(statusCode).json({
        success: true,
        message,
        token: signToken(user),
        data: { user: publicUser(user) }
    });
};

const passwordMatches = async (candidatePassword, storedPassword) => {
    if (!storedPassword) return false;
    if (storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2y$')) {
        return bcrypt.compare(candidatePassword, storedPassword);
    }

    return candidatePassword === storedPassword;
};

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password.', 400));
    }

    const [users] = await db.query(
        'SELECT * FROM users WHERE email = ? AND deleted_at IS NULL',
        [email]
    );

    if (users.length === 0) {
        return next(new AppError('Email or password is incorrect.', 401));
    }

    const user = users[0];
    const isMatch = await passwordMatches(password, user.password);

    if (!isMatch) {
        return next(new AppError('Email or password is incorrect.', 401));
    }

    if (user.status === 'Suspended' || user.status === 'Offboarding') {
        return next(new AppError('Your account is currently disabled.', 403));
    }

    sendAuthResponse(res, 200, user, 'Login successful');
});

exports.register = catchAsync(async (req, res, next) => {
    const { full_name, email, password, confirmPassword } = req.body;
    const role = allowedRoles.includes(req.body.role) ? req.body.role : 'Employee';
    const deptId = Number(req.body.dept_id || 1);

    if (!full_name || !email || !password) {
        return next(new AppError('Please provide full name, email, and password.', 400));
    }

    if (password.length < 6) {
        return next(new AppError('Password must be at least 6 characters.', 400));
    }

    if (confirmPassword && password !== confirmPassword) {
        return next(new AppError('Password confirmation does not match.', 400));
    }

    const [existing] = await db.query(
        'SELECT id FROM users WHERE email = ? AND deleted_at IS NULL LIMIT 1',
        [email]
    );

    if (existing.length > 0) {
        return next(new AppError('An account with this email already exists.', 409));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
        `INSERT INTO users (full_name, email, password, role, dept_id, status, created_at)
         VALUES (?, ?, ?, ?, ?, 'Active', NOW())`,
        [full_name, email, hashedPassword, role, Number.isFinite(deptId) ? deptId : 1]
    );

    const user = {
        id: result.insertId,
        full_name,
        email,
        role,
        dept_id: Number.isFinite(deptId) ? deptId : 1
    };

    sendAuthResponse(res, 201, user, 'Registration successful');
});

exports.changePassword = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return next(new AppError('Please provide current password, new password, and confirmation.', 400));
    }

    if (newPassword !== confirmPassword) {
        return next(new AppError('Password confirmation does not match.', 400));
    }

    if (newPassword.length < 6) {
        return next(new AppError('New password must be at least 6 characters.', 400));
    }

    const [users] = await db.query('SELECT password FROM users WHERE id = ? AND deleted_at IS NULL', [userId]);
    if (users.length === 0) {
        return next(new AppError('User not found.', 404));
    }

    const isMatch = await passwordMatches(currentPassword, users[0].password);
    if (!isMatch) {
        return next(new AppError('Current password is incorrect.', 401));
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?', [hashedNewPassword, userId]);

    res.status(200).json({ success: true, message: 'Password changed successfully.' });
});
