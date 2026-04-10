🏥 CarePlus Hospital Management System
Dự án Full-stack quản lý phòng khám y tế, cho phép bệnh nhân đặt lịch hẹn trực tuyến, bác sĩ quản lý lịch khám và admin quản lý hệ thống người dùng. Dự án tập trung vào tính bảo mật với xác thực JWT và quy trình xác minh qua Email.

# Tính năng chính
## Đối với Bệnh nhân (Patient)
Đăng ký/Đăng nhập: Hệ thống xác thực qua email để kích hoạt tài khoản.

Đặt lịch hẹn: Chọn bác sĩ và thời gian khám mong muốn.

Quản lý lịch cá nhân: Xem danh sách lịch hẹn và hủy lịch (trạng thái pending).

Hồ sơ y tế: Xem lại chẩn đoán và đơn thuốc sau khi hoàn thành lịch khám.

## Đối với Bác sĩ (Doctor)
Quản lý lịch khám: Theo dõi danh sách bệnh nhân đã đặt lịch.

Cập nhật trạng thái: Xác nhận hoặc hoàn thành ca khám.

Tạo hồ sơ y tế: Nhập kết quả chẩn đoán và kê đơn thuốc cho bệnh nhân.

## Đối với Quản trị viên (Admin)
Quản lý người dùng: Tạo mới, cập nhật hoặc xóa tài khoản bác sĩ và bệnh nhân.

Thống kê: Theo dõi tổng quan hoạt động của phòng khám.

# Công nghệ sử dụng
Frontend: React.js, Ant Design (UI Library), Axios.

Backend: Node.js, Express.

Database: MongoDB 

Authentication: JSON Web Token (JWT), Bcrypt (mã hóa mật khẩu).

Email Service: Nodemailer (Gửi mail xác thực qua Gmail App Password).

# Hướng dẫn cài đặt

## Cấu hình Biến môi trường (.env)
Tạo file .env trong thư mục /Be và /Fe với các thông số sau:

### Backend (Be/.env):

PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1d

#### Email Config

EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
URL_FRONTEND=http://localhost:5173

## Cài đặt Backend

cd Be
npm install
npm run dev

## Cài đặt Frontend

cd Fe
npm install
npm run dev

# Cấu trúc thư mục
```text
.
├── Be (Backend)
│   ├── src
│   │   ├── config
│   │   │   ├── database.js         # Cấu hình kết nối MongoDB
│   │   │   └── seed.js             # File khởi tạo dữ liệu mẫu (Admin, Doctor, Patient, Appointment)
│   │   ├── controllers
│   │   │   ├── adminController.js      
│   │   │   ├── doctorController.js
│   │   │   ├── homeController.js
│   │   │   └── userController.js
│   │   ├── middleware
│   │   │   ├── auth.js             # Middleware xác thực JWT & Role
│   │   │   └── delay.js            # Middleware giả lập độ trễ (nếu cần)
│   │   ├── models
│   │   │   ├── appointment.js      # Schema lịch hẹn
│   │   │   ├── medicalRecord.js    # Schema hồ sơ y tế
│   │   │   └── user.js             # Schema người dùng (Admin, Doctor, Patient)
│   │   ├── routes
│   │   │   └── api.js              # Khai báo toàn bộ API Endpoints
│   │   ├── services                # Xử lí logic
│   │   │   ├── adminService.js
│   │   │   ├── doctorService.js
│   │   │   └── userService.js   
│   │   ├── util
│   │   │   └── mailer.js           # Cấu hình Nodemailer & App Password
│   │   └── server.js               # File khởi chạy server Node.js
│   ├── .env                        # Biến môi trường (JWT_SECRET, EMAIL_PASS,...)
│   ├── package.json
│   └── README.MD
│
├── Fe (Frontend)
│   ├── public
│   ├── src
│   │   ├── assets
│   │   │   ├── images              # Chứa Logo và hình ảnh banner
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── context
│   │   │   │   └── auth.context.jsx  # Quản lý trạng thái đăng nhập toàn cục
│   │   │   └── layout
│   │   │       ├── header.jsx          
│   │   │       └── footer.jsx
│   │   ├── pages
│   │   │   ├── appointment.jsx         # Trang quản lý lịch hẹn
│   │   │   ├── home.jsx                # Trang chủ
│   │   │   ├── login.jsx               # Trang đăng nhập
│   │   │   ├── medicalRecordPage.jsx   # Trang xem hồ sơ y tế
│   │   │   ├── register.jsx            # Trang đăng ký
│   │   │   ├── schedule.jsx            # Trang đặt lịch khám
│   │   │   ├── user.jsx                # Trang quản lý thông tin cá nhân
│   │   │   └── verify.jsx              # Trang xử lý xác thực từ Email
│   │   ├── styles
│   │   │   └── global.css
│   │   ├── util
│   │   │   ├── api.js                  # Định nghĩa các hàm gọi API
│   │   │   └── axios.customize.js      # Cấu hình Axios Interceptor (gắn Token)
│   │   ├── App.jsx                     # Cấu hình Routing chính
│   │   ├── main.jsx                    # Điểm đầu vào của React
│   │   └── App.css
│   ├── .env.development                # Cấu hình URL Backend (VITE_BACKEND_URL)
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md                           # Hướng dẫn tổng quát dự án
```

# Giấy phép
Dự án được thực hiện phục vụ mục đích học tập tại HCMUT.