
  # Enterprise Web App Layout

  This is a code bundle for Enterprise Web App Layout. The original project is available at https://www.figma.com/design/6bd7Htij7KN7eDOzIRf71O/Enterprise-Web-App-Layout.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  



---
# Note các phần cần sửa:

- Bỏ phần đăng ký ra, thêm phần tạo tài khoản mới vào cho mục của Human Resource Management
- Chưa có nút đăng xuất
- Hiện tại chỉ có thể vào duy nhất 2 nút là Dashboard và View All Roles







  ---
#  ĐỀ XUẤT:
  Lưu trữ JWT Token (src/api/axiosClient.ts):
  Việc lấy token từ localStorage.getItem('token') là cách làm phổ biến, nhưng với các hệ thống ERP / Enterprise, nó dễ bị tấn công XSS (Cross-Site Scripting).
  Khuyến nghị cho tương lai: Cân nhắc chuyển sang sử dụng httpOnly cookies được set trực tiếp từ backend để bảo mật tối đa.