// backend/src/config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HRM System API',
            version: '1.0.0',
            description: 'Tài liệu API cho Hệ thống Quản lý Nhân sự',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        // Áp dụng bảo mật JWT mặc định cho toàn bộ API
        security: [{ bearerAuth: [] }],
    },
    // Đường dẫn tới các file chứa comment định nghĩa API
    apis: ['./backend/src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;