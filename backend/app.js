const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// const bodyParser = require('body-parser'); // Có thể gỡ bỏ thư viện này để giảm nhẹ node_modules

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/core/config/swagger');
const AppError = require('./src/core/utils/AppError');
const globalErrorHandler = require('./src/core/middlewares/errorMiddleware');

// 2. Import Routes
const authRoutes = require('./src/core/auth/authRoutes');
const userRoutes = require('./src/core/users/userRoutes');
const employeeRoutes = require('./src/features/humanResource/employee/employeeRoutes');
const departmentRoutes = require('./src/core/departments/departmentRoutes');
const attendanceRoutes = require('./src/features/humanResource/attendance/attendanceRoutes');
const approvalRoutes = require('./src/core/approvals/approvalRoutes');
const leaveRoutes = require('./src/features/humanResource/leave/leaveRoutes');
const expenseRoutes = require('./src/features/finance/expenses/expenseRoutes');
const payrollRoutes = require('./src/features/humanResource/payroll/payrollRoutes');
const bdRoutes = require('./src/features/businessDevelopment/core/bdRoutes');
const quotationRoutes = require('./src/features/businessDevelopment/quotations/quotationRoutes');
const pmRoutes = require('./src/features/projectManagement/core/pmRoutes');
const marketingRoutes = require('./src/features/marketing/core/marketingRoutes');
const commsRoutes = require('./src/core/communications/commsRoutes'); // Giữ lại 1 cái duy nhất
const paymentRoutes = require('./src/features/finance/payments/paymentRoutes');
const financeRouter = require('./src/features/finance/core/financeRoutes');
const taskRouter = require('./src/features/projectManagement/tasks/taskRoutes');
const contractRoutes = require('./src/features/contracts/core/contractRoutes');
const systemRoutes = require('./src/core/system/systemRoutes');

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new AppError(`Origin ${origin} is not allowed by CORS`, 403));
    },
    credentials: true
};

// 3. Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' })); // Giới hạn size để tránh tấn công DoS
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
    req.io = req.app.get('socketio');
    next();
});

// 4. Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 5. Mounting Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/approvals', approvalRoutes);
app.use('/api/v1/leaves', leaveRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/payroll', payrollRoutes);
app.use('/api/v1/bd', bdRoutes);
app.use('/api/v1/bd/quotations', quotationRoutes);
app.use('/api/v1/pm', pmRoutes);
app.use('/api/v1/marketing', marketingRoutes);
app.use('/api/v1/contracts', contractRoutes);
app.use('/api/v1/comms', commsRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/finance', financeRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/system', systemRoutes);

// 6. Error Handling
app.all('/{*splat}', (req, res, next) => {
    next(new AppError(`Không thể tìm thấy đường dẫn ${req.originalUrl} trên máy chủ!`, 404));
});

app.use(globalErrorHandler); // (PHẢI NẰM Ở CUỐI CÙNG)

module.exports = app;
