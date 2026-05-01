
# Cấu trúc dự án:

my-react-app/
├── public/              # Chứa các file tĩnh (index.html, favicon.ico, hình ảnh tĩnh)
├── src/
│   ├── api/             # Nơi chứa các hàm gọi API đến Backend (sử dụng axios hoặc fetch)
│   │   ├── axiosClient.js # Cấu hình sẵn base URL (http://localhost:8080/api)
│   │   └── expenseApi.js  # Các hàm gọi API cụ thể (getExpenses, addExpense...)
│   ├── assets/          # Hình ảnh, icon, file CSS/SCSS dùng chung
│   ├── components/      # Các UI component có thể tái sử dụng (Button, Modal, Navbar, Form nhập liệu)
│   │   └── ExpenseItem.jsx
│   ├── context/         # (Hoặc store/ nếu dùng Redux) Quản lý state toàn cục (Auth Context, Theme Context)
│   ├── hooks/           # Các Custom Hook (VD: useFetch, useAuth)
│   ├── pages/           # Các component đại diện cho một trang hoàn chỉnh
│   │   ├── Dashboard.jsx
│   │   └── Login.jsx
│   ├── utils/           # Các hàm tiện ích (format tiền tệ, format ngày tháng trên giao diện)
│   ├── App.jsx          # Component gốc, thường chứa Cấu hình Routing (React Router)
│   └── main.jsx         # Entry point, render App vào DOM
├── .env                 # Biến môi trường của React (VITE_API_URL...)
├── package.json
└── vite.config.js       # Cấu hình Vite (nếu bạn dùng Vite để khởi tạo React)

# RUN 
```bash
npm run dev
```


my-backend-api/
├── src/
│   ├── config/          # Cấu hình hệ thống (kết nối Database, biến môi trường)
│   │   └── db.js
│   ├── controllers/     # Xử lý logic Request/Response (nhận req, gọi service, trả res.json)
│   │   ├── expense.js   
│   │   └── user.js
│   ├── middlewares/     # Các hàm trung gian (xác thực token, bắt lỗi, kiểm tra dữ liệu)
│   │   ├── is-auth.js
│   │   └── error-handler.js
│   ├── models/          # Định nghĩa cấu trúc dữ liệu (Schema Database)
│   │   ├── expense.js
│   │   └── user.js
│   ├── routes/          # Định nghĩa các Endpoints (đường dẫn API)
│   │   ├── expense.js   # VD: router.get('/api/expenses', expenseController.getAll)
│   │   └── user.js
│   ├── services/        # (Tùy chọn) Chứa logic nghiệp vụ phức tạp để Controller gọn gàng hơn
│   └── utils/           # Các hàm tiện ích dùng chung (format ngày tháng, mã hóa password)
├── .env                 # File chứa các biến bảo mật (DB_URI, JWT_SECRET...)
├── .gitignore
├── package.json
└── server.js            # File gốc: Khởi tạo Express app, middleware (express.json, cors) và lắng nghe Port


# RUN 
```bash
node server.js
npm run dev
npm start
```


# Xóa toàn bộ file khỏi bộ nhớ đệm của Git
```bash
git rm -r --cached .
```

# Đảm bảo bạn đang ở nhánh main
```bash
git checkout main
```

# Ép Git ghi đè (force push) lên nhánh main trên Github để xóa các file rác cũ
```bash
git push -f origin main
```

# Tạo và chuyển ngay sang nhánh dev mới
```bash
git checkout -b dev
```

# CẬP NHẬT LÊN NHÁNH MAIN:
git checkout main
git merge dev
git push origin main
git checkout dev


# ADMIN
admin1
456




# Chức năng:
Chấm công
Nghỉ phép
Tính lương

Sử dụng docker, socker.io
Lưu data trên S3 của AWS (hỏi Kiệt)


# Tổng kết Hệ thống (Bạn đã đi đến vạch đích!)
Hiện tại, Backend của bạn đã có đủ:
✅ Đăng nhập & Phân quyền RBAC.
✅ CRUD Nhân sự & Phòng ban.
✅ Chấm công tự động (Cron Job) & Xem bảng công.
✅ Luồng gửi đơn từ, tính chi phí & Phê duyệt (Dùng Transaction SQL).
✅ Bắn thông báo Real-time với Socket.io.
✅ Logic chốt lương cuối tháng tự động gom dữ liệu.
✅ Hệ thống "mắt thần" AuditLogger ghi nhận mọi thao tác.


# Connect to Oracle's Server:
cd "D:\practiceCode\Uni\OracleServer\key"
ssh -i "ssh-key-2026-04-20.key" ubuntu@147.224.134.26

# Bật Database và Backend lên
cd ~/ERPplatform/backend
docker-compose up -d
docker ps

# Bật ngrok lên
cd ~/ERPplatform/backend
.\ngrok.exe config add-authtoken 3CkZcLZmjoGaHe1TfunyYUCY5Ya_48zTkQ4N5NiUdYQGkFG2t

# Account Admin
{
    "email": "xuanhiep.ht4f@gmail.com",
    "password": "Hiepcute2@"
}




---

src/app/components/finance/
├── FinancialDashboard.tsx     (File gốc: Container quản lý State)
├── DashboardHeader.tsx        (Phần tiêu đề, chọn ngày, xuất báo cáo)
├── KeyMetricsGrid.tsx         (4 thẻ thống kê: Revenue, Expenses, Net Profit...)
├── CashflowChart.tsx          (Biểu đồ đường Recharts)
├── ProfitAndLossSection.tsx   (Biểu đồ cột P&L và danh sách chi tiết)
└── FinancialRatios.tsx        (Các thẻ phụ: Operating Margin, Quick Ratio...)


---

# Cách push code lên github
# 1. Tạo và chuyển sang nhánh của bộ phận Finance
git checkout -b feature/finance/financial-dashboard

# 2. Đưa các file đã sửa vào staging area
git add .

# 3. Commit với message có tiền tố phòng ban (theo chuẩn Conventional Commits)
git commit -m "feat(finance): refactor financial dashboard using container-presenter pattern and separate mocks"

# 4. Push nhánh mới lên remote repository
git push origin feature/finance/financial-dashboard

# 5. Chuyển về nhánh dev (hoặc nhánh chính của bạn)
git checkout dev

# 6. Kéo code mới nhất về trước khi gộp (tránh xung đột)
git pull origin dev

# 7. Gộp nhánh tính năng tài chính vào nhánh dev
git merge feature/finance/financial-dashboard

# 8. Push nhánh dev đã hoàn thiện lên GitHub
git push origin dev