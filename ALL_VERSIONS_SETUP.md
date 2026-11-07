# Asano Schedule - Hướng dẫn Setup Tất Cả Versions

Hướng dẫn chi tiết để test **cả 3 versions** của Asano Schedule.

---

## 📱 Version 1: SwiftUI (iOS Only)

### Yêu cầu
- macOS với Xcode 14+
- iPhone/iPad với iOS 16+

### Setup

```bash
# 1. Clone/Download project
cd ~/projects/AsanoSchedule/AsanoSchedule

# 2. Mở Xcode
open .

# 3. Trong Xcode:
# - Chọn Project → AsanoScheduleApp
# - Tab "Signing & Capabilities"
# - Team: Chọn Apple ID của bạn
# - Bundle ID: com.Basaker2210.AsanoSchedule

# 4. Chọn iPhone làm target
# - Phía trên, click device dropdown
# - Chọn iPhone của bạn (kết nối USB)

# 5. Build & Run
# Cmd + R (hoặc click Play button)
```

### Kết quả
- App sẽ cài đặt trên iPhone
- Test tất cả chức năng iOS native
- Hiệu năng cao nhất ⚡

---

## 🌐 Version 2: React Native + Expo (iOS + Android) ⭐

### Yêu cầu
- Node.js 14+
- npm hoặc yarn
- Expo app trên iPhone/Android
  - iOS: Download từ App Store
  - Android: Download từ Play Store

### Setup - **Cách 1: QR Code (NHANH NHẤT)** 🎯

```bash
# 1. Vào folder React Native
cd ~/projects/AsanoScheduleRN

# 2. Cài dependencies (1 lần)
npm install

# 3. Chạy Expo
npm start
# hoặc
expo start

# 4. Trên điện thoại:
# - Mở Expo app
# - Scan QR code hiển thị trên terminal
# - App load ngay!

# 5. Phát triển
# - Thay đổi code
# - Lưu file
# - App reload tự động (Hot Reload)
```

### Setup - **Cách 2: Build APK/IPA**

```bash
# iOS (chỉ macOS)
eas build --platform ios
eas build:run --ios

# Android
eas build --platform android
eas build:run --android
```

### Setup - **Cách 3: Local Emulator**

**iOS Simulator (macOS):**
```bash
expo start --ios
```

**Android Emulator:**
```bash
expo start --android
```

### Kết quả
- ✅ Chạy iOS + Android từ 1 codebase
- ✅ Hot reload = develop nhanh
- ✅ Test trực tiếp trên thiết bị
- ✅ Dễ share cho bạn (chỉ scan QR)

---

## 🎨 Version 3: Flutter (iOS + Android)

### Yêu cầu
- Flutter SDK 3.0+ (https://flutter.dev)
- Xcode 12+ (iOS) hoặc Android Studio (Android)
- Xcode command line tools: `xcode-select --install`

### Setup

```bash
# 1. Cài Flutter (1 lần)
# Download từ https://flutter.dev/docs/get-started/install
# Thêm vào PATH:
export PATH="$PATH:`pwd`/flutter/bin"

# 2. Kiểm tra setup
flutter doctor

# 3. Vào folder Flutter
cd ~/projects/AsanoScheduleFlutter

# 4. Cài dependencies
flutter pub get

# 5A. Chạy trên iOS (macOS)
flutter run -d ios

# 5B. Chạy trên Android
flutter run -d android

# 5C. Chạy trên thiết bị
flutter devices  # List devices
flutter run -d <device-id>
```

### Build Production

```bash
# Android APK
flutter build apk --release

# Android AAB (Google Play)
flutter build appbundle --release

# iOS
flutter build ios --release
```

### Kết quả
- ✅ Native performance + single codebase
- ✅ Compiled = nhanh hơn React Native
- ✅ Beautiful Material Design UI
- ✅ Test iOS + Android

---

## 🎯 So Sánh Nhanh

| Tính năng | SwiftUI | React Native | Flutter |
|----------|---------|--------------|---------|
| **Platform** | iOS only | iOS + Android | iOS + Android |
| **Setup time** | 30 phút | 5 phút | 15 phút |
| **Hiệu năng** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Ease of dev** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Build time** | Lâu | Nhanh | Nhanh |
| **Hot reload** | ❌ | ✅ | ✅ |
| **Community** | Lớn | Rất lớn | Lớn |

---

## 🚀 Khuyên nghị

### Để **test nhanh nhất**: **React Native + Expo** ⭐
- Scan QR code = app load ngay
- 5 phút setup
- Hoàn hảo để demo

### Để **hiệu năng tốt nhất**: **Flutter hoặc SwiftUI**
- Compiled = nhanh hơn
- Cho production app

### Để **iOS native features**: **SwiftUI**
- Tối ưu iOS
- Best Apple integration

---

## 🛠️ Troubleshooting

### React Native
```bash
# Module not found
npm install
expo install

# Clear cache
npm cache clean --force
expo start -c
```

### Flutter
```bash
# Get dependencies
flutter pub get

# Clean & rebuild
flutter clean
flutter pub get
flutter run
```

### SwiftUI (Xcode)
```bash
# Xcode build issues
rm -rf ~/Library/Developer/Xcode/DerivedData/*
open ios/Runner.xcworkspace
# Clean Build Folder: Cmd + Shift + K
# Build: Cmd + B
```

---

## 📊 Development Workflow

### React Native (Recommended)
```
1. expo start
2. Scan QR code
3. Edit code
4. Save
5. App reloads automatically
6. Test features
```

### Flutter
```
1. flutter run
2. Edit code
3. Press 'r' for hot reload
4. Or 'R' for full restart
5. Test features
```

### SwiftUI
```
1. Cmd + R in Xcode
2. Edit code
3. Cmd + R again
4. Test on device
```

---

## 🎓 Học thêm

- **SwiftUI**: https://developer.apple.com/tutorials/swiftui
- **React Native**: https://reactnative.dev
- **Flutter**: https://flutter.dev/docs
- **Expo**: https://docs.expo.dev

---

## 📝 Ghi chú

- Cả 3 versions có **cùng chức năng**
- SwiftUI không chạy trên Android
- React Native dễ develop nhất
- Flutter compile = performance tốt
- Chọn dựa trên **nhu cầu của bạn**

---

**Chúc bạn test thành công!** 🎉

Nếu gặp lỗi, cho tôi biết:
- Error message
- Máy gì (Windows/Mac/Linux)
- Version nào (1/2/3)

Tôi sẽ help! 😊
