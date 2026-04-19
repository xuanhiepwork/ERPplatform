const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
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

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/approvals', approvalRoutes);
app.use('/api/v1/leaves', leaveRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/payroll', payrollRoutes);

app.use((req, res, next) => {
    next(new AppError(`Không thể tìm thấy đường dẫn ${req.originalUrl} trên máy chủ!`, 404));
});

app.use(globalErrorHandler); //(PHẢI NẰM Ở CUỐI CÙNG)

module.exports = app;