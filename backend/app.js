const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// const bodyParser = require('body-parser'); // Có thể gỡ bỏ thư viện này để giảm nhẹ node_modules

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const AppError = require('./src/utils/AppError');
const globalErrorHandler = require('./src/middlewares/errorMiddleware');

// 2. Import Routes
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');
const departmentRoutes = require('./src/routes/departmentRoutes');
const attendanceRoutes = require('./src/routes/attendanceRoutes');
const approvalRoutes = require('./src/routes/approvalRoutes');
const leaveRoutes = require('./src/routes/leaveRoutes');
const expenseRoutes = require('./src/routes/expenseRoutes');
const payrollRoutes = require('./src/routes/payrollRoutes');
const bdRoutes = require('./src/routes/bdRoutes');
const pmRoutes = require('./src/routes/pmRoutes');
const marketingRoutes = require('./src/routes/marketingRoutes');
const commsRoutes = require('./src/routes/commsRoutes'); // Giữ lại 1 cái duy nhất
const paymentRoutes = require('./src/routes/paymentRoutes');
const financeRouter = require('./src/routes/financeRoutes');
const taskRouter = require('./src/routes/taskRoutes');

const app = express();

// 3. Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Giới hạn size để tránh tấn công DoS
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

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
app.use('/api/v1/pm', pmRoutes);
app.use('/api/v1/marketing', marketingRoutes);
app.use('/api/v1/comms', commsRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/finance', financeRouter);
app.use('/api/v1/tasks', taskRouter);

// 6. Error Handling
app.all('*', (req, res, next) => {
    next(new AppError(`Không thể tìm thấy đường dẫn ${req.originalUrl} trên máy chủ!`, 404));
});

app.use(globalErrorHandler); // (PHẢI NẰM Ở CUỐI CÙNG)

module.exports = app;