const { db } = require('../config/db');
const payos = require('../config/payos');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const AuditLogger = require('../utils/auditLogger');

// 1. Dành cho BD: Nhấn nút tạo Link thanh toán gửi cho khách
exports.createPaymentLink = catchAsync(async (req, res, next) => {
    const { deal_id, amount, description } = req.body;

    if (!deal_id || !amount) {
        return next(new AppError('Vui lòng cung cấp deal_id và số tiền hợp lệ.', 400));
    }

    const orderCode = Number(String(Date.now()).slice(-6) + Math.floor(Math.random() * 1000));

    await db.query(
        'INSERT INTO payments (order_code, deal_id, amount, status) VALUES (?, ?, ?, ?)',
        [orderCode, deal_id, amount, 'PENDING']
    );

    const body = {
        orderCode: orderCode,
        amount: amount,
        description: description || `Thanh toan Deal ${deal_id}`,
        returnUrl: process.env.PAYOS_RETURN_URL,
        cancelUrl: process.env.PAYOS_CANCEL_URL
    };

    // Gọi SDK PayOS v2 để tạo link
    const paymentLinkData = await payos.paymentRequests.create(body);

    AuditLogger.log(req, {
        action: 'CREATE',
        table_name: 'payments',
        entity_id: deal_id,
        new_values: { orderCode, amount, status: 'PENDING' }
    });

    res.status(200).json({
        success: true,
        message: 'Đã tạo link thanh toán.',
        data: {
            checkoutUrl: paymentLinkData.checkoutUrl,
            qrCode: paymentLinkData.qrCode,
            orderCode: orderCode
        }
    });
});

// 2. Dành cho Server: Lắng nghe Ngân hàng báo tin (Webhook)
exports.handlePayOSWebhook = catchAsync(async (req, res, next) => {
    const webhookBody = req.body;

    try {
        // Xác thực webhook từ PayOS v2
        const webhookData = payos.webhooks.verify(webhookBody);
        const actualData = webhookData.data || webhookData;
        const orderCode = actualData.orderCode;
        const amount = actualData.amount;

        await db.query(
            'UPDATE payments SET status = "PAID", updated_at = NOW() WHERE order_code = ?',
            [orderCode]
        );

        await db.query(
            `UPDATE deals 
             SET stage = 'Onboarding', updated_at = NOW() 
             WHERE id = (SELECT deal_id FROM payments WHERE order_code = ?)`,
            [orderCode]
        );

        // Bắn Socket thông báo cho toàn bộ máy tính trong công ty
        req.io.emit('payment_received', {
            action: 'DEAL_PAID',
            orderCode: orderCode,
            amount: amount,
            message: `🎉 TING TING! Khách hàng vừa thanh toán ${amount.toLocaleString('vi-VN')} VND cho mã đơn ${orderCode}!`
        });

        return res.status(200).json({ success: true, message: 'Webhook received and processed' });

    } catch (error) {
        console.error('❌ [WEBHOOK ERROR]:', error.message);
        res.status(200).json({ success: false, message: 'Invalid Webhook Signature' });
    }
});

exports.handleWebhook = catchAsync(async (req, res) => {
    const webhookData = req.body;
    // ... Kiểm tra checksum/signature của PayOS ...

    if (webhookData.success) {
        // 1. Cập nhật DB
        await updateOrderInDB(webhookData.orderCode, 'PAID');

        // 2. Bắn tin Real-time (Sử dụng global socket object)
        const io = req.app.get('socketio');
        io.emit('TING_TING_PAYMENT', {
            amount: webhookData.amount,
            description: webhookData.description,
            time: new Date().toLocaleTimeString()
        });
    }
    res.json({ success: true });
});