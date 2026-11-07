# Asano Schedule

Ứng dụng quản lý lịch công việc cho iOS, Android & Web với SwiftUI, React Native & Flutter.

---

## 🌐 Demo Trực Tuyến (Click & Chạy Ngay)

### **👉 [Asano Schedule - Web Demo (GitHub Pages)](https://Basaker2210.github.io/AsanoSchedule/app.html)**

✅ Chạy ngay trên trình duyệt  
✅ Không cần cài đặt gì  
✅ Chạy trên mọi thiết bị (Desktop/Tablet/Mobile)  
✅ Dữ liệu lưu ở trình duyệt (không mất khi F5)

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

✅ **Quản lý công việc**
- Thêm, chỉnh sửa, xoá công việc
- Đánh dấu hoàn thành công việc
- Phân loại mức ưu tiên (Thấp, Trung bình, Cao)
- Mô tả chi tiết cho mỗi công việc

✅ **Lịch công việc**
- Xem công việc theo ngày
- Xem công việc theo tuần
- Xem công việc theo tháng

✅ **Nhắc nhở**
- Đặt thời gian nhắc nhở cho công việc
- Thông báo trên thiết bị

✅ **Thống kê**
- Biểu đồ tiến độ hoàn thành theo tuần
- Tỉ lệ hoàn thành trung bình
- Thống kê tổng quát

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
