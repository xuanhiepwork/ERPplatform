// backend/src/middlewares/restrictTo.js

const restrictTo = (...roles) => {
    return (req, res, next) => {
        // Lưu ý: req.user.role thường được gán sau khi qua bước verifyToken/protect
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'Bạn không có quyền thực hiện hành động này'
            });
        }
        next();
    };
};

module.exports = restrictTo;