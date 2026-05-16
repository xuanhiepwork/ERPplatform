require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { connectDB } = require('./src/core/config/db');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const allowedOrigins = (process.env.CORS_ORIGIN || process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});

const runDailyAttendanceCheck = require('./src/features/humanResource/attendance/attendanceCron');

io.on('connection', (socket) => {
    console.log('Có người vừa kết nối Socket:', socket.id);
});

app.set('socketio', io);

connectDB();
runDailyAttendanceCheck();

server.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
