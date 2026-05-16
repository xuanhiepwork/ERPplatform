module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Môi trường Development: In ra toàn bộ Stack Trace để dễ debug
    if (process.env.NODE_ENV !== 'production') {
        res.status(err.statusCode).json({
            success: false,
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }
    // Môi trường Production: Ẩn Stack Trace, chỉ hiện message chuẩn
    else {
        // Chỉ gửi lỗi chi tiết nếu là lỗi Operational (lỗi do dev tự định nghĩa)
        if (err.isOperational) {
            res.status(err.statusCode).json({
                success: false,
                status: err.status,
                message: err.message
            });
        }
        // Nếu là lỗi hệ thống lạ (Programming error), gửi thông báo chung chung
        else {
            console.error('ERROR 💥', err);
            res.status(500).json({
                success: false,
                status: 'error',
                message: 'Đã có lỗi hệ thống xảy ra!'
            });
        }
    }
};