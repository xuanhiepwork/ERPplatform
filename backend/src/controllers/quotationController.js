// src/controllers/quotationController.js
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const fs = require('fs');

exports.sendQuotation = catchAsync(async (req, res, next) => {
    const { partnerEmail, items, partnerName, totalAmount } = req.body;

    // 1. Tạo PDF
    const doc = new PDFDocument();
    const filePath = `./temp/quotation_${Date.now()}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(25).text('BÁO GIÁ DỊCH VỤ', { align: 'center' });
    doc.text(`Kính gửi: ${partnerName}`, 100, 100);
    items.forEach(item => doc.fontSize(12).text(`- ${item.name}: ${item.price} VND`));
    doc.text(`Tổng cộng: ${totalAmount} VND`, { stroke: true });
    doc.end();

    // 2. Gửi Email (Đợi PDF ghi xong file)
    setTimeout(async () => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });

        await transporter.sendMail({
            from: '"ERP System" <noreply@erp.com>',
            to: partnerEmail,
            subject: `Báo giá từ ${process.env.COMPANY_NAME}`,
            text: 'Xin chào, vui lòng xem file đính kèm để biết chi tiết báo giá.',
            attachments: [{ filename: 'BaoGia.pdf', path: filePath }]
        });

        fs.unlinkSync(filePath); // Xóa file tạm sau khi gửi
        res.status(200).json({ success: true, message: 'Đã gửi báo giá thành công!' });
    }, 1000);
});