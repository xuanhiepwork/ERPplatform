const nodemailer = require('nodemailer');

// Cấu hình "Trạm bưu điện" (Sử dụng Gmail cho tiện)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Hàm gửi email có thể tái sử dụng ở bất kỳ đâu
const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: `"ERP System Notification" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`📧 [EMAIL] Đã gửi thông báo thành công tới: ${to} (MessageID: ${info.messageId})`);
        return true;
    } catch (error) {
        console.error('❌ [EMAIL ERROR] Không thể gửi email:', error.message);
        return false;
    }
};

module.exports = sendEmail;