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

# 15.Force push để dọn sạch lịch sử trên GitHub (Vì chúng ta vừa xóa 55MB dữ liệu)
git push origin main --force

# 16. Merge từ main sang để lấy .gitignore chuẩn
git merge main

# 17. Xóa cưỡng ép nhánh dev cục bộ (Dùng -D viết hoa)
git branch -D dev

# 18. Hủy bỏ trạng thái chờ
git reset

# 19. Push lên nhánh test
git commit -m "chore: cleanup node_modules and update project structure"
git push origin test --force

# 1. Commit và Push lên nhánh test (Vì bạn đang ở nhánh test)
git commit -m "chore: clean up node_modules and fix gitignore structure"
git push origin test --force

# 2. Đồng bộ sang nhánh dev (nhánh ổn định hơn)
git checkout dev
git merge test
git push origin dev

# 3. Đồng bộ sang nhánh main (chỉ để lại README)
# Lưu ý: Vì main chỉ để README, bạn có thể dùng lệnh xóa file trên nhánh này
git checkout main
# (Thực hiện xóa các folder backend/app nếu main chỉ muốn giữ README)


git checkout test
git pull origin test
git checkout -b feature/auth-rbac

# 1. Gỡ cài đặt các gói ở root
npm uninstall helmet express-validator

# 2. Xóa bỏ node_modules ở root (nếu còn) để tránh nhầm lẫn
# Windows (PowerShell):
rm -Recurse -Force node_modules, package-lock.json


---

# PUSH CODE:
git checkout test
git pull origin test
git checkout -b feature/approvals-cron

# Thêm code và đẩy lên
git add .
git commit -m "feat: implement daily attendance cron job and approval engine routes"
git push origin feature/approvals-cron

# Merge vào test
git checkout test
git merge feature/approvals-cron
git push origin test

---

# 