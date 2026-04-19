# Sử dụng môi trường Node.js nhẹ nhất (Alpine)
FROM node:20-alpine

# Khai báo thư mục làm việc trong Container
WORKDIR /app

# Copy các file quản lý thư viện vào trước để tối ưu cache
COPY package*.json ./

# Cài đặt các thư viện (Chỉ cài dependencies, bỏ qua devDependencies)
RUN npm install --omit=dev

# Copy toàn bộ code còn lại vào container
COPY . .

# Mở cổng 3000 để giao tiếp ra bên ngoài
EXPOSE 3000

# Lệnh khởi chạy server (Gọi thẳng file server.js)
CMD ["node", "server.js"]