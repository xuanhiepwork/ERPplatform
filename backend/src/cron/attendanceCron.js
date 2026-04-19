const cron = require('node-cron');
const { db } = require('../config/db');

const runDailyAttendanceCheck = () => {
    // Chạy vào lúc 23:59 mỗi ngày (Cú pháp: Phút Giờ Ngày Tháng Ngày_trong_tuần)
    cron.schedule('59 23 * * *', async () => {
        console.log('⏳ [CRON JOB] Đang chạy kiểm tra điểm danh tự động...');
        try {
            // 1. Lấy danh sách ID của tất cả nhân viên đang đi làm (Active)
            const [users] = await db.query('SELECT id FROM users WHERE status = "Active" AND deleted_at IS NULL');

            // 2. Lấy danh sách ID những người ĐÃ chấm công hôm nay
            const [attended] = await db.query(`
                SELECT DISTINCT user_id FROM attendance_logs 
                WHERE DATE(check_in) = CURDATE() AND deleted_at IS NULL
            `);
            const attendedIds = attended.map(record => record.user_id);

            // 3. Lọc ra những người CHƯA chấm công
            const absentUsers = users.filter(user => !attendedIds.includes(user.id));

            // 4. Tự động Insert trạng thái 'Absent' (Vắng mặt không phép) cho họ
            if (absentUsers.length > 0) {
                const values = absentUsers.map(user => [user.id, new Date(), 'Absent', 'Hệ thống tự động ghi nhận']);
                await db.query(`
                    INSERT INTO attendance_logs (user_id, check_in, status, location_data) 
                    VALUES ?
                `, [values]);

                console.log(`✅ [CRON JOB] Đã đánh dấu vắng mặt cho ${absentUsers.length} nhân viên.`);
            } else {
                console.log(`✅ [CRON JOB] Hôm nay đi làm đầy đủ, không ai vắng mặt.`);
            }
        } catch (error) {
            console.error('❌ [CRON JOB] Lỗi khi chạy tự động điểm danh:', error.message);
        }
    }, {
        scheduled: true,
        timezone: "Asia/Ho_Chi_Minh" // Set đúng múi giờ Việt Nam
    });
};

module.exports = runDailyAttendanceCheck;