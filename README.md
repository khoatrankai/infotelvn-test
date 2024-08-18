## BACKEND
### VIETNAMESE

# Ứng Dụng Đặt Phòng Khách Sạn

## Giới Thiệu

Dự án này cung cấp backend cho ứng dụng đặt phòng khách sạn, được phát triển bằng **NestJS**. Các chức năng chính bao gồm:

- Xác thực người dùng với nhiều phương thức khác nhau.
- Chuyển đổi dữ liệu XML sang JSON để lấy thông tin đặt phòng.
- Tích hợp thanh toán với Vietcombank, xử lý giao dịch trực tuyến một cách bảo mật.

## Tính Năng Nổi Bật

### 1. Xác Thực Người Dùng

- **Xác Thực Cơ Bản:** Người dùng có thể đăng ký và đăng nhập bằng email và mật khẩu.
- **JWT Authentication:** Sử dụng JWT kèm cookie HTTP-only để bảo mật. Hỗ trợ cơ chế quay vòng refresh token để tự động cấp mới khi token truy cập hết hạn.
- **Đăng Nhập Google:** Người dùng có thể đăng nhập nhanh chóng thông qua Google OAuth.

### 2. Xử Lý XML

- **Chuyển Đổi XML Sang JSON:**
  - **Phương Pháp Tùy Chỉnh:** Chuyển đổi dữ liệu XML sang JSON bằng thuật toán duyệt và lặp.
  - **Sử Dụng Thư Viện `fast-xml-parser`:** Chuyển đổi XML sang JSON một cách nhanh chóng nhờ thư viện bên thứ ba.
- **API Chi Tiết Phòng Đặt:** Cung cấp thông tin chi tiết của phòng đặt từ tệp XML dựa trên `confirmation_no`, được bảo vệ bằng JWT.

### 3. Tích Hợp Thanh Toán Vietcombank

- **Xử Lý Thanh Toán:** Người dùng có thể thanh toán số tiền đặt phòng thông qua Vietcombank. API hỗ trợ bảo mật JWT và chuyển hướng người dùng dựa trên kết quả giao dịch thành công hoặc thất bại.

### 4. Công Nghệ Sử Dụng

- **NestJS:** Framework mạnh mẽ để phát triển backend với khả năng mở rộng tốt.
- **Swagger:** Tự động sinh tài liệu API.
- **JWT:** Bảo mật người dùng bằng JSON Web Token và cookie HTTP-only.
- **OAuth:** Hỗ trợ đăng nhập thông qua Google.

### 5. Các API

- **Khởi tạo database user:** POST /user/user-txt
- **Đăng ký bình thường:** POST /user/sign-up
- **Đăng nhập bình thường:** POST /auth/sign-in
- **Đăng nhập Google:** GET /auth/sign-in-google
- **RefreshToken:** POST /auth/refreshToken
- **Kiểm tra phòng đặt:** GET /booking/<confirmation_no>
- **Kiểm tra số tiền thanh toán phòng:** POST /payment/<confirmation_no>
- **Tạo đơn hàng:** POST /payment/create-order
- **Luồng thông báo kết quả giao dịch:** GET /payment/payment-response
- **Kiểm tra order:** POST /payment/check-order
- **Lấy mã bankcode của các phương thức ATM, IB, QRCODE:** POST /payment/get-bank

---

### ENGLISH

# Hotel Booking Application

## Introduction

This project provides the backend for a hotel booking application, developed using **NestJS**. The main features include:

- User authentication with multiple methods.
- Conversion of XML data to JSON for retrieving booking information.
- Payment integration with Vietcombank, securely processing online transactions.

## Key Features

### 1. User Authentication

- **Basic Authentication:** Users can register and log in with their email and password.
- **JWT Authentication:** Utilizes JWT with HTTP-only cookies for security. Supports a refresh token rotation mechanism to automatically issue new tokens when the access token expires.
- **Google Login:** Users can quickly log in via Google OAuth.

### 2. XML Processing

- **XML to JSON Conversion:**
  - **Custom Method:** Converts XML data to JSON using a traversal and iteration algorithm.
  - **Using `fast-xml-parser` Library:** Quickly converts XML to JSON using a third-party library.
- **Booking Details API:** Provides detailed booking information from an XML file based on the `confirmation_no`, protected by JWT.

### 3. Vietcombank Payment Integration

- **Payment Processing:** Users can pay the booking amount via Vietcombank. The API supports JWT security and redirects users based on the transaction result (successful or failed).

### 4. Technology Stack

- **NestJS:** A powerful framework for developing scalable backend applications.
- **Swagger:** Automatically generates API documentation.
- **JWT:** Secures user authentication with JSON Web Tokens and HTTP-only cookies.
- **OAuth:** Supports Google login for quick authentication.

### 5. API Endpoints

- **Initialize User Database:** POST /user/user-txt
- **Standard Registration:** POST /user/sign-up
- **Standard Login:** POST /auth/sign-in
- **Google Login:** GET /auth/sign-in-google
- **RefreshToken:** POST /auth/refreshToken
- **Check Booking:** GET /booking/<confirmation_no>
- **Check Booking Payment Amount:** POST /payment/<confirmation_no>
- **Create Order:** POST /payment/create-order
- **Payment Result Notification:** GET /payment/payment-response
- **Check Order:** POST /payment/check-order
- **Retrieve Bank Code for ATM, IB, QRCODE:** POST /payment/get-bank
