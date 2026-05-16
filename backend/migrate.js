const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Bản đồ ánh xạ: [Tên file hoặc tiền tố] -> [Thư mục đích]
const migrationMap = [
    // 1. Lỗi & Middleware
    { match: 'error.js', dest: 'core/middlewares' },

    // 2. Core (Dùng chung)
    { match: 'department', dest: 'core/departments' },
    { match: 'auth', dest: 'core/auth' },
    { match: 'user', dest: 'core/users' },
    { match: 'approval', dest: 'core/approvals' },
    { match: 'comms', dest: 'core/communications' },

    // 3. Human Resource
    { match: 'attendance', dest: 'features/humanResource/attendances' },
    { match: 'employee', dest: 'features/humanResource/employees' },
    { match: 'leave', dest: 'features/humanResource/leaves' },
    { match: 'payroll', dest: 'features/humanResource/payrolls' },
    { match: 'hr', dest: 'features/humanResource/core' },

    // 4. Finance
    { match: 'expense', dest: 'features/finance/expenses' },
    { match: 'payment', dest: 'features/finance/payments' },
    { match: 'finance', dest: 'features/finance/core' },

    // 5. Business Development
    { match: 'bd', dest: 'features/businessDevelopment/core' },
    { match: 'quotation', dest: 'features/businessDevelopment/quotations' },

    // 6. Project Management
    { match: 'pm', dest: 'features/projectManagement/core' },
    { match: 'project', dest: 'features/projectManagement/projects' },
    { match: 'task', dest: 'features/projectManagement/tasks' },

    // 7. Marketing
    { match: 'marketing', dest: 'features/marketing/core' },
];

const sourceFolders = ['controllers', 'routes', 'models', 'services', 'cron'];

sourceFolders.forEach(folder => {
    const folderPath = path.join(srcDir, folder);
    if (!fs.existsSync(folderPath)) return;

    const files = fs.readdirSync(folderPath);

    files.forEach(file => {
        // Bỏ qua thư mục con nếu có
        if (fs.statSync(path.join(folderPath, file)).isDirectory()) return;

        // Tìm thư mục đích dựa vào mapping
        const mapping = migrationMap.find(m => file.toLowerCase().includes(m.match));

        if (mapping) {
            const destPath = path.join(srcDir, mapping.dest);

            // Tạo thư mục đích nếu chưa có
            if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true });
            }

            // Di chuyển file
            const oldPath = path.join(folderPath, file);
            const newPath = path.join(destPath, file);
            fs.renameSync(oldPath, newPath);
            console.log(`✅ Đã chuyển: ${folder}/${file} -> ${mapping.dest}/${file}`);
        }
    });
});

console.log('🚀 Chuyển đổi hoàn tất! Hãy nhớ cập nhật lại các dòng require() nhé.');