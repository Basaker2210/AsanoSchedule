# Asano Schedule - Flutter

Ứng dụng quản lý lịch công việc cho iOS/Android sử dụng Flutter.

## 🚀 Tính năng

✅ **Quản lý công việc** - Thêm, xoá, đánh dấu hoàn thành  
✅ **Lịch linh hoạt** - Xem theo ngày, tuần, tháng  
✅ **Nhắc nhở** - Thông báo cho công việc quan trọng  
✅ **Thống kê** - Biểu đồ & phân tích tiến độ  
✅ **Lưu trữ** - Dữ liệu lưu trên thiết bị (SQLite)  
✅ **Hiệu năng cao** - Flutter's native performance  

## 📋 Yêu cầu

- Flutter SDK 3.0+ (download từ https://flutter.dev)
- Xcode 12+ (iOS) hoặc Android Studio (Android)
- Dart SDK (đi kèm với Flutter)

## 🔧 Cài đặt

### 1. Install Flutter
```bash
# Tải từ https://flutter.dev/docs/get-started/install
# Sau đó:
flutter doctor  # Kiểm tra setup
```

### 2. Clone repo
```bash
git clone https://github.com/Basaker2210/AsanoSchedule.git
cd AsanoScheduleFlutter
```

### 3. Get dependencies
```bash
flutter pub get
```

### 4. Run app

**iOS (macOS only)**
```bash
flutter run -d ios
```

**Android**
```bash
flutter run -d android
```

**All devices**
```bash
flutter run  # Chọn device từ list
```

## 📁 Cấu trúc Project

```
AsanoScheduleFlutter/
├── lib/
│   ├── main.dart
│   ├── models/
│   │   └── task.dart
│   ├── providers/
│   │   └── task_provider.dart
│   ├── screens/
│   │   ├── home_screen.dart
│   │   ├── calendar_screen.dart
│   │   └── statistics_screen.dart
│   ├── widgets/
│   │   ├── task_card.dart
│   │   └── add_task_modal.dart
│   └── services/
│       ├── storage_service.dart
│       └── notification_service.dart
├── assets/
│   ├── images/
│   └── fonts/
├── pubspec.yaml
└── README.md
```

## 🎯 Sử dụng

### Thêm công việc
1. Nhấn nút + 
2. Điền thông tin
3. Chọn ưu tiên
4. Nhấn Save

### Xem công việc
- **Trang chủ**: Công việc hôm nay
- **Lịch**: Xem theo tuần/tháng
- **Thống kê**: Biểu đồ & phân tích

### Đánh dấu hoàn thành
- Tap checkbox bên cạnh công việc

### Xoá công việc
- Swipe hoặc tap delete icon

## 📦 Công nghệ sử dụng

- **Flutter 3.0+** - UI Framework
- **Dart 3.0+** - Programming language
- **Provider** - State management
- **SharedPreferences** - Key-value storage
- **SQLite** - Local database
- **FL Chart** - Data visualization
- **Table Calendar** - Calendar widget

## 🚀 Build Production

### APK (Android)
```bash
flutter build apk --release
```

### AAB (Android App Bundle)
```bash
flutter build appbundle --release
```

### IPA (iOS)
```bash
flutter build ios --release
# Sau đó open Xcode:
open ios/Runner.xcworkspace
```

## 🐛 Troubleshooting

### "Flutter command not found"
```bash
export PATH="$PATH:`pwd`/flutter/bin"
```

### "No devices found"
```bash
flutter devices  # List devices
flutter run -d <device-id>
```

### "Build failed"
```bash
flutter clean
flutter pub get
flutter run
```

### "Plugin issues"
```bash
flutter pub get
flutter pub upgrade
```

## 📚 Tài liệu

- [Flutter Documentation](https://flutter.dev/docs)
- [Dart Language](https://dart.dev)
- [Provider Package](https://pub.dev/packages/provider)
- [FL Chart](https://pub.dev/packages/fl_chart)

## 📄 License

MIT License

## 👤 Tác giả

- **Thanh Phương**
- Email: thanhphuongw305@gmail.com
- GitHub: https://github.com/Basaker2210

---

**Chúc bạn phát triển ứng dụng thành công! 🎯**
