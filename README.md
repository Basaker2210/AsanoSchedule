# Asano Schedule

Ứng dụng quản lý lịch công việc cho iOS, Android & Web với SwiftUI, React Native & Flutter.

---

## 🌐 Demo Trực Tuyến (Click & Chạy Ngay)

### **👉 [Asano Schedule - Full Version (GitHub Pages)](https://Basaker2210.github.io/AsanoSchedule/)**

✅ **Đầy đủ tính năng** - Không cắt xén  
✅ **Chạy ngay** - Không cần cài đặt  
✅ **Toàn nền tảng** - Desktop/Tablet/Mobile  
✅ **Dữ liệu an toàn** - Lưu trên máy (không mất khi F5)  
✅ **Ngoại tuyến** - Chạy offline khi cần

---

## 📱 Các Phiên Bản Khác

| Phiên bản | Platform | Công nghệ | Link |
|----------|----------|-----------|------|
| **Web (Demo)** ⭐ | Browser | React + HTML | [GitHub Pages](#-demo-trực-tuyến-click--chạy-ngay) |
| **iOS** | iPhone/iPad | SwiftUI | Folder: `AsanoSchedule/` |
| **Android** | Android Phone | React Native + Expo | Folder: `AsanoScheduleRN/` |
| **Cross-platform** | iOS + Android | Flutter | Folder: `AsanoScheduleFlutter/` |

---

## Tính năng

### 📋 **Tính Năng Chính (Web Version)**

✅ **🎯 Quản lý công việc**
- ➕ Thêm công việc mới nhanh chóng
- ✏️ Chỉnh sửa công việc bất kỳ lúc nào
- 🗑️ Xoá công việc không cần
- ✓ Đánh dấu hoàn thành với 1 click
- 📝 Mô tả chi tiết cho mỗi công việc

✅ **📅 Lịch công việc**
- 🗓️ Xem toàn bộ tháng trực quan
- 📍 Đánh dấu ngày có công việc
- 📊 Danh sách công việc theo tháng
- 🔄 Điều hướng tháng trước/sau dễ dàng

✅ **🚨 Mức ưu tiên**
- 🔴 **Cao** (Màu đỏ) - Cần xử lý ngay
- 🟠 **Trung bình** (Màu vàng) - Bình thường
- 🟢 **Thấp** (Màu xanh) - Có thể để sau

✅ **📊 Thống kê & Phân tích**
- 📈 Biểu đồ tiến độ 4 tuần gần nhất
- 📉 Tỉ lệ hoàn thành % theo tuần
- 🎯 Tổng số công việc & hoàn thành
- 📌 Phân tích theo mức ưu tiên
- ⏳ Thống kê công việc hôm nay

✅ **🔔 Nhắc nhở**
- ⏰ Đặt giờ cụ thể cho công việc
- 🔔 Bật/tắt nhắc nhở dễ dàng
- 📱 Tương thích tất cả thiết bị

✅ **💾 Lưu trữ dữ liệu**
- 🔒 Dữ liệu lưu trên máy của bạn
- 🚫 Không upload lên server
- ⚡ Nhanh chóng & an toàn
- 📵 Chạy offline mà không vấn đề

✅ **Lưu trữ dữ liệu**
- Lưu công việc trên thiết bị (UserDefaults)
- Dữ liệu được lưu tự động

## Cài đặt

### Yêu cầu
- Xcode 14.0 hoặc cao hơn
- iOS 16.0 hoặc cao hơn
- Swift 5.7 hoặc cao hơn

### Hướng dẫn

1. **Clone hoặc tải project**
```bash
cd ~/projects/AsanoSchedule
```

2. **Mở trong Xcode**
```bash
open AsanoSchedule.xcodeproj
```

Hoặc nếu chưa có .xcodeproj file:
- Mở Xcode
- Chọn File → New → Project
- Chọn iOS → App
- Điền tên: "Asano Schedule"
- Chọn SwiftUI cho UI

3. **Sao chép các file Source**
- Sao chép tất cả file .swift từ thư mục `AsanoSchedule/` vào project Xcode
- Chuối các file cần:
  - AsanoScheduleApp.swift
  - ContentView.swift
  - HomeView.swift
  - CalendarView.swift
  - StatisticsView.swift
  - AddTaskView.swift
  - Models.swift
  - DataManager.swift

4. **Build và Run**
- Chọn iOS Simulator hoặc thiết bị thực
- Nhấn Cmd + R để chạy

## Cấu trúc Project

```
AsanoSchedule/
├── Models.swift           # Task & WeeklyStats models
├── DataManager.swift      # Quản lý dữ liệu & notifications
├── AsanoScheduleApp.swift # App entry point
├── ContentView.swift      # Main TabView
├── HomeView.swift         # Danh sách công việc hôm nay
├── CalendarView.swift     # Xem theo tuần/tháng
├── StatisticsView.swift   # Biểu đồ thống kê
└── AddTaskView.swift      # Thêm công việc mới
```

## Sử dụng

### Thêm công việc
1. Nhấn nút "+" trên tab Trang chủ
2. Điền thông tin:
   - Tên công việc
   - Mô tả (tuỳ chọn)
   - Ngày hết hạn
   - Mức ưu tiên
   - Bật nhắc nhở (tuỳ chọn)
3. Nhấn "Lưu"

### Xem công việc
- **Trang chủ**: Xem công việc của ngày đã chọn
- **Lịch**: Xem tất cả công việc theo tuần hoặc tháng
- **Thống kê**: Xem tiến độ hoàn thành

### Đánh dấu hoàn thành
- Nhấn biểu tượng hình tròn bên cạnh công việc
- Công việc hoàn thành sẽ được gạch xuyên

### Xoá công việc
- Vuốt sang trái trên công việc
- Nhấn "Delete"

## Tính năng nâng cao

### Thông báo
- Ứng dụng yêu cầu quyền thông báo khi khởi động
- Chọn thời gian nhắc nhở cho mỗi công việc
- Nhận thông báo khi đến thời gian

### Thống kê
- Xem biểu đồ tiến độ 4 tuần gần nhất
- Tỉ lệ hoàn thành được tính theo công thức:
  - (Công việc hoàn thành / Tổng công việc) × 100%
- Màu sắc biểu đồ:
  - Xanh: Hoàn thành ≥ 70%
  - Vàng: Hoàn thành 40-70%
  - Đỏ: Hoàn thành < 40%

## Công nghệ sử dụng

- **SwiftUI**: Framework UI hiện đại
- **Combine**: Reactive programming
- **Charts**: Biểu đồ dữ liệu (iOS 16+)
- **UserNotifications**: Thông báo
- **UserDefaults**: Lưu trữ dữ liệu

## License

MIT License - Tự do sử dụng cho mục đích cá nhân

## Liên hệ

Tạo bởi: Thanh Phương
Email: thanhphuongw305@gmail.com
GitHub: github.com/thanhphuongw305

---

**Chúc bạn sử dụng Asano Schedule một cách hiệu quả! 🎯**
