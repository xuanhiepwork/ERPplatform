# CONNECT GITHUB
# 1. Hủy liên kết với repo cũ (Crmwebapp.git)
git remote remove origin

# 2. Kết nối với repo mới
git remote add origin https://github.com/xuanhiepwork/ERPplatform.git

# 3. Kiểm tra lại xem đã đúng chưa
git remote -v

# 4. Tạo và chuyển sang nhánh main
git checkout -b main

# 5. Tạo file 
# Nếu đã có rồi thì bỏ qua bước tạo file này
echo "# ERP Platform - Enterprise Management System" > README.md

# 6. Chỉ add và commit file README.md
git add README.md
git commit -m "Initial commit: Setup README for Deployment branch"

# 7. Push lên main
git push -u origin main

# 8. Từ main, tạo nhánh dev
git checkout -b dev

# 9. Push nhánh dev trống (chỉ có README) lên GitHub
git push -u origin dev

# 10. Từ dev, tạo nhánh test
git checkout -b test

# 11. Thêm toàn bộ code hiện tại (MVC, Auth, Attendance...) vào nhánh này
git add .

# 12. Commit toàn bộ code
git commit -m "feat: push current source code to test branch for continuous development"

# 13. Push lên nhánh test
git push -u origin test

# 14. Gỡ bỏ tất cả các file đang bị theo dõi khỏi Cache của Git
git rm -r --cached .