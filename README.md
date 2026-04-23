# HỆ THỐNG QUẢN TRỊ NHÂN SỰ 

Hệ thống quản lý nhân sự tích hợp chấm công, quản lý nghỉ phép và tính lương tự động.

---

## THÔNG TIN 
| Tiêu chí | Chi tiết |
| :--- | :--- |
| **Họ và tên** | **Trần Xuân Hiệp** |
| **Mã số sinh viên** | `2280618989` |
| **Lớp** | `22DTHD2` |
| **Học phần** | Đồ án Ngôn ngữ Phát triển Ứng dụng mới |

---

## 1. TỔNG QUAN DỰ ÁN
Dự án là một ứng dụng **Web Fullstack** hỗ trợ quản lý nhân sự chuyên sâu cho doanh nghiệp. Hệ thống giải quyết bài toán vận hành nhân sự thông qua việc tự động hóa quy trình quản lý hồ sơ, theo dõi chấm công, phê duyệt nghỉ phép và đặc biệt là **tự động kết xuất bảng lương** dựa trên dữ liệu thực tế từ hệ thống.

---

## 2. CÔNG NGHỆ SỬ DỤNG

### Frontend
- React
- Vite
- Ant-Design
- Socket.io

### Backend
- NodeJS
- Express.js
- Database: Docker destop | raw SQL queries | Prisma
- JWT
- CI/CD
- Docker
- Debug: Global Error Handler | Swagger
- Deploy: Oracle Cloud [https://www.oracle.com/cloud/free/]
- Cổng thanh toán: payOS
- Test các đường dẫn API: Postman
- Test các đường dẫn tại môi trường local: ngrok 

---

## 3. CÁC CÔNG VIỆC ĐÃ THỰC HIỆN
- [x] **Thiết kế Cơ sở dữ liệu:** Xây dựng cấu trúc DB tối ưu gồm 9 bảng với các ràng buộc quan hệ chặt chẽ.
- [x] **Xây dựng API (RESTful):** Hoàn thiện hệ thống Endpoint xử lý nghiệp vụ CRUD và tính toán logic phức tạp.
- [x] **Tích hợp Real-time:** Triển khai **Socket.io** để xử lý thông báo tức thời (Ting-ting) khi có sự kiện mới.
- [x] **Phân quyền người dùng (RBAC):** Xây dựng Middleware bảo mật lớp ứng dụng, chia quyền Admin và Nhân viên.
- [x] **Xử lý Logic tính toán:** Phát triển thuật toán tự động đối soát ngày công và ngày nghỉ để tính lương.

---

## 4. CÁC CHỨC NĂNG CHÍNH

### A. Bảo mật & Phân quyền
* **Xác thực:** Đăng nhập/Đăng ký với mật khẩu được mã hóa **Bcrypt**.
* **Phân quyền (RBAC):** 
    * **Admin:** Toàn quyền quản lý, duyệt nghỉ phép, cấu hình thiết bị và chi trả lương.
    * **Nhân viên:** Chỉ truy cập các chức năng cá nhân: Chấm công, gửi đơn nghỉ phép và xem phiếu lương.

### B. Quản lý Nhân sự & Tài sản
* **Hồ sơ nhân viên:** Quản lý thông tin tập trung, hỗ trợ upload ảnh đại diện (Multer).
* **Quản lý thiết bị:** Theo dõi tài sản công ty, phân trang, tìm kiếm và **xuất báo cáo Excel** chuyên nghiệp.

### C. Luồng nghiệp vụ "Master Flow"
1.  **Chấm công (Attendance):** Ghi nhận ngày công thực tế thông qua tính năng Check-in hàng ngày.
2.  **Nghỉ phép (Leave Management):** Gửi đơn online. Admin nhận thông báo **Real-time** và phê duyệt trực tiếp.
3.  **Tính lương tự động (Payroll):** * Công thức: `Thực nhận = Lương cứng - (Ngày nghỉ không phép * Đơn giá ngày công)`.
    * Hệ thống tự động quét đơn nghỉ phép đã duyệt để tính toán khấu trừ chính xác.

---

## 📂 5. CẤU TRÚC THƯ MỤC
```text
├── app/                # Mã nguồn Frontend (ReactJS + Vite)
├── backend/            # Mã nguồn Backend (NodeJS + Express)
│   ├── src/
│   │   ├── config/     # Kết nối Database
│   │   ├── controllers/# Logic xử lý nghiệp vụ
│   │   ├── routes/     # Định tuyến API
│   │   └── middlewares/# Phân quyền & Bảo mật
│   └── uploads/        # Nơi lưu trữ tài nguyên tĩnh (Ảnh thẻ)
└── database.sql        # File script khởi tạo Database
```

---

## 6.NOTE
Swagger: http://localhost:3000/api-docs - Test API trực tiếp giống như Postman.
---

Lần cập nhật cuối: 09/04/2026..
Đồ án được thực hiện bởi Trần Xuân Hiệp - MSSV: 2280618989...











------
# 🚀 AI-DRIVEN ERP PLATFORM: HỆ THỐNG QUẢN TRỊ DOANH NGHIỆP THÔNG MINH

Hệ thống ERP Fullstack tích hợp Trí tuệ nhân tạo (Gemini AI), Cổng thanh toán trực tuyến và cơ chế xử lý dữ liệu thời gian thực.

---

## 👤 THÔNG TIN SINH VIÊN
| Tiêu chí | Chi tiết |
| :--- | :--- |
| **Họ và tên** | **Trần Xuân Hiệp** |
| **Mã số sinh viên** | `2280618989` |
| **Lớp** | `22DTHD2` |
| **Học phần** | Đồ án Ngôn ngữ Phát triển Ứng dụng mới |
| **Vai trò** | Fullstack Developer & System Architect |

---

## 🌟 1. TỔNG QUAN DỰ ÁN
Dự án là một hệ thống **AI-Driven ERP** (Enterprise Resource Planning) hiện đại, giải quyết bài toán vận hành doanh nghiệp đa phòng ban. Không dừng lại ở quản lý nhân sự truyền thống, hệ thống tích hợp các công nghệ tiên tiến để tự động hóa dòng tiền, tối ưu hóa quản lý dự án bằng AI và hỗ trợ tra cứu chính sách nội bộ thông qua mô hình RAG.

---

## 🛠 2. CÔNG NGHỆ SỬ DỤNG

### 🎨 Frontend
- **Core:** React (Vite), Ant Design (UI Components).
- **Visualization:** Recharts / Ant Design Charts (Báo cáo tài chính).
- **Communication:** Socket.io-client (Real-time notifications).

### ⚙️ Backend & AI
- **Runtime:** NodeJS, Express.js.
- **Artificial Intelligence:** **Gemini 1.5 Flash** (Task Decomposition & ATS), **Text Embeddings** (RAG System).
- **Database:** MySQL (Raw SQL queries), **ChromaDB** (Vector Database cho AI).
- **Security:** JWT, Bcrypt, Helmet, Express Rate Limit.
- **Infrastructure:** Docker Desktop, Ngrok (Webhook Tunneling), Oracle Cloud (Deploy).
- **Payment:** **PayOS Gateway** (VietQR Automation).
- **Utilities:** PDFKit (Quotation/Payroll), Nodemailer (Email Automation), Multer.

---

## 🏗 3. CÁC CÔNG VIỆC ĐÃ THỰC HIỆN
- [x] **Thiết kế DB quy mô:** Xây dựng cấu trúc dữ liệu ERP phức tạp với hơn 16 bảng quan hệ chặt chẽ.
- [x] **Tích hợp Cổng thanh toán:** Triển khai luồng thanh toán tự động qua PayOS, xử lý Webhook và đối soát trạng thái đơn hàng real-time.
- [x] **Trợ lý AI PM:** Ứng dụng khung **C.R.E.A.T.E** để AI tự động chia nhỏ Task lớn thành Sub-tasks kỹ thuật.
- [x] **Hệ thống RAG Comms:** Xây dựng Chatbot nội bộ tra cứu Wiki công ty dựa trên cơ chế tìm kiếm ngữ nghĩa (Semantic Search).
- [x] **Tài chính & Phê duyệt:** Phát triển luồng Transaction an toàn cho hệ thống Phê duyệt đa cấp (Multi-level Approval).

---

## 🎯 4. CÁC PHÂN HỆ CHỨC NĂNG CHÍNH

### 💼 A. Business Development (BD) & Sales
* **Deal Pipeline:** Quản lý cơ hội kinh doanh qua mô hình Kanban.
* **Smart Payment:** Tự động tạo mã QR thanh toán. Nhận thông báo **"Ting Ting"** và tự động chuyển trạng thái Deal ngay khi khách hàng chuyển khoản thành công.
* **Quotation System:** Tự động xuất file PDF báo giá chuyên nghiệp và gửi email cho đối tác.

### 💰 B. Tài chính & Kế toán (Finance)
* **Cashflow Dashboard:** Biểu đồ trực quan hóa doanh thu từ PayOS và chi phí từ Payroll/Expense.
* **Multi-level Approval:** Cơ chế phê duyệt chi phí thông minh (Dưới 5M: Manager duyệt; Trên 5M: Founder duyệt).

### 🚀 C. Quản trị Dự án (PM) với AI
* **AI Task Assistant:** Sử dụng Gemini 1.5 Flash để bẻ nhỏ các Task phức tạp thành đầu việc cụ thể cho Frontend/Backend/QA.
* **Resource Map:** Theo dõi độ tải công việc (Workload) của từng nhân viên dựa trên data thực tế.

### 👥 D. Nhân sự (HR) & Truyền thông (Comms)
* **Payroll Automation:** Tính lương tự động dựa trên ngày công và các khoản khấu trừ từ đơn nghỉ phép.
* **Smart ATS:** AI hỗ trợ đọc file CV (PDF), phân tích kỹ năng và chấm điểm độ khớp với mô tả công việc (JD).
* **Wiki RAG Bot:** Trợ lý ảo trả lời các câu hỏi về quy định, chính sách công ty 24/7.

---

**AI integration, Payment Gateway, System Design và Business Logic**

---

## 📂 5. CẤU TRÚC THƯ MỤC
```text
├── app/                  # Frontend (ReactJS + Vite + AntD)
├── backend/              # Backend (NodeJS + Express)
│   ├── src/
│   │   ├── config/       # Database, PayOS, Gemini, Swagger Config
│   │   ├── controllers/  # Logic xử lý (Auth, Finance, AI, Task...)
│   │   ├── services/     # AI Service (RAG, Gemini Prompting)
│   │   ├── routes/       # RESTful API Endpoints
│   │   └── middlewares/  # RBAC, Error Handling, File Upload
│   ├── scripts/          # Ingestion scripts (Seed Vector DB)
│   └── uploads/          # Digital Assets & Receipts
└── erp_platform.sql      # Script khởi tạo toàn bộ hệ thống Database