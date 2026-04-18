const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./backend/src/config/swagger');
const cors = require('cors');
const globalErrorHandler = require('./backend/src/middlewares/errorMiddleware');
const AppError = require('./backend/src/utils/AppError');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.set('view engine', 'ejs');
app.set('views', 'views');

const employeeRoutes = require('./backend/src/routes/employeeRoutes');
const departmentRoutes = require('./backend/src/routes/departmentRoutes');
const attendanceRoutes = require('./backend/src/routes/attendanceRoutes');

const AppError = require('./backend/src/utils/AppError');
const globalErrorHandler = require('./backend/src/middlewares/errorMiddleware');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
});
app.all('*', (req, res, next) => {
    next(new AppError(`Không thể tìm thấy đường dẫn ${req.originalUrl} trên máy chủ!`, 404));
});

app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/attendance', attendanceRoutes);

app.use(globalErrorHandler); // (Phải nằm ở vị trí CUỐI CÙNG)

module.exports = app;