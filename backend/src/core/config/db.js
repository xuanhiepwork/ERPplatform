// backend/src/config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Chuyển sang dạng Promise để dùng async/await
const promisePool = pool.promise();

const connectDB = async () => {
    try {
        const connection = await promisePool.getConnection();
        console.log('Yessirrr... Kết nối Database MySQL thành công!');
        connection.release();
    } catch (error) {
        console.error('OH NOooooo.... Lỗi kết nối Database:', error.message);
        // Do not exit the process here. Keep the server running so the frontend
        // and non-DB-dependent routes can be used for development/testing.
        // DB errors will surface at query time and should be handled there.
        // process.exit(1);
    }
};

// Export thành 1 object duy nhất
module.exports = { db: promisePool, connectDB };