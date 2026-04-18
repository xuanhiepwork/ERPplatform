// backend/src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { db } = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({ success: false, message: "Bạn chưa đăng nhập! Vui lòng cung cấp Token." });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(403).json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn." });

        req.user = decoded;
        next();
    });
};

exports.checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Truy cập bị từ chối! Yêu cầu quyền: ${allowedRoles.join(' hoặc ')}`
            });
        }
        next();
    };
};

// Middleware RBAC nâng cao dựa trên Permission Key
exports.requirePermission = (requiredPermission) => {
    return catchAsync(async (req, res, next) => {
        // req.user.role đã được gắn từ hàm verifyToken chạy trước đó
        const userRole = req.user.role;

        // Bỏ qua kiểm tra nếu là Founder (Super Admin)
        if (userRole === 'Founder') {
            return next();
        }

        // Query kiểm tra xem Role này có chứa Permission Key yêu cầu không
        const query = `
            SELECT id FROM roles_permissions 
            WHERE role_name = ? AND permission_key = ? AND deleted_at IS NULL
        `;
        const [permissions] = await db.query(query, [userRole, requiredPermission]);

        if (permissions.length === 0) {
            return next(new AppError(`Truy cập bị từ chối! Bạn không có quyền: ${requiredPermission}`, 403));
        }

        // Nếu có quyền, cho đi tiếp
        next();
    });
};