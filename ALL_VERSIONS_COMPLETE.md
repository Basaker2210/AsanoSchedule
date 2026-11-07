# 🚀 Asano Schedule - Tất Cả 3 Versions (Web/iOS/Android)

Hướng dẫn **hoàn chỉnh** để chạy tất cả **3 phiên bản** của Asano Schedule.

---

## 📊 So Sánh Nhanh

| Tính Năng | 🌐 Web | 📱 React Native | 🎨 Flutter |
|-----------|--------|-----------------|-----------|
| **Platform** | Browser | iOS + Android | iOS + Android |
| **Setup Time** | 5 phút | 10 phút | 15 phút |
| **Chạy Ngay** | ✅ Vô tư | ✅ Scan QR | ❌ Cần build |
| **Hiệu Năng** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Dễ Phát Triển** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Native Features** | ❌ | ✅ | ✅ |
| **Offline Mode** | ✅ | ✅ | ✅ |

---

## 🌐 **Version 1: WEB (GitHub Pages) - CHẠY NGAY**

### ⭐ **Cách nhanh nhất để xem demo**

**👉 Click vào link này: [Asano Schedule Web](https://Basaker2210.github.io/AsanoSchedule/)**

Không cần cài gì! Chạy ngay trên trình duyệt.

### 📂 **Folder**: `AsanoSchedule/docs/`
- `index.html` - Full version với tất cả tính năng
- `app.html` - Version demo cũ

### ✨ **Tính Năng**
- ✅ Quản lý công việc (Thêm/Sửa/Xoá)
- ✅ Lịch tháng interactive
- ✅ Thống kê với Chart.js
- ✅ Mức ưu tiên (Cao/Trung bình/Thấp)
- ✅ Nhắc nhở & Thời gian
- ✅ Lưu dữ liệu (LocalStorage)

### 🛠️ **Phát Triển Locally**

```bash
# 1. Mở file index.html trong trình duyệt
open ~/projects/AsanoSchedule/docs/index.html

# Hoặc dùng Live Server (VS Code)
# - Cài Extension "Live Server"
# - Right-click index.html → Open with Live Server
```

### 📚 **Tech Stack**
- React 18 (CDN)
- HTML5 + CSS3
- Chart.js (CDN)
- LocalStorage API

---

## 📱 **Version 2: REACT NATIVE + EXPO (iOS + Android)**

### 🚀 **Cách chạy nhanh nhất: Expo Snack**

**Link:** https://snack.expo.dev/

Tạo file mới, paste code từ `AsanoScheduleRN/App.js`, scan QR code = app chạy!

### 📂 **Folder**: `AsanoScheduleRN/`

### ✅ **Setup Local (5 phút)**

```bash
# 1. Vào folder
cd ~/projects/AsanoScheduleRN

# 2. Cài dependencies
npm install

# 3. Chạy Expo
npm start
# hoặc
expo start

# 4. Scan QR code bằng:
# - iOS: Camera app → tap link
# - Android: Expo app → Scan QR

# 5. App load ngay!
```

### 🔄 **Hot Reload**
- Thay đổi code
- Save file
- App reload tự động ✨

### ✨ **Tính Năng**
- ✅ Quản lý công việc đầy đủ
- ✅ Bottom Tab Navigation
- ✅ HomeScreen (Trang chủ)
- ✅ CalendarScreen (Lịch)
- ✅ StatisticsScreen (Thống kê)
- ✅ AsyncStorage (Lưu dữ liệu)
- ✅ Notifications (Expo)
- ✅ Material Community Icons

### 📚 **Tech Stack**
- React Native
- Expo
- React Navigation
- AsyncStorage
- Expo Notifications
- Expo Icons

### 📦 **Package.json**
```json
{
  "dependencies": {
    "expo": "^51.0.0",
    "react": "^18.2.0",
    "react-native": "^0.74.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/bottom-tabs": "^6.5.0"
  }
}
```

### 🔧 **Troubleshooting**

```bash
# Module not found?
npm install
expo install

# Clear cache
expo start -c

# Or
rm -rf node_modules
npm install
```

---

## 🎨 **Version 3: FLUTTER (iOS + Android)**

### 📂 **Folder**: `AsanoScheduleFlutter/`

### ⚙️ **Setup (15 phút)**

```bash
# 1. Cài Flutter SDK
# Download: https://flutter.dev/docs/get-started/install
# Thêm vào PATH

# 2. Verify installation
flutter doctor

# 3. Vào folder Flutter
cd ~/projects/AsanoScheduleFlutter

# 4. Get dependencies
flutter pub get

# 5A. Chạy trên iOS Simulator (macOS)
flutter run -d ios

# 5B. Chạy trên Android Emulator
flutter run -d android

# 5C. Chạy trên thiết bị thực
flutter devices  # List devices
flutter run -d <device-id>
```

### 🔄 **Hot Reload**
```bash
# Khi app đang chạy:
r   # Hot reload (giữ state)
R   # Full restart (reset state)
```

### ✨ **Tính Năng**
- ✅ Quản lý công việc
- ✅ Calendar view (table_calendar)
- ✅ Statistics (fl_chart)
- ✅ Provider state management
- ✅ Shared Preferences + SQLite
- ✅ Material Design 3
- ✅ Fullscreen experience

### 📚 **Tech Stack**
- Flutter 3.0+
- Dart
- Provider (State Management)
- table_calendar
- fl_chart
- shared_preferences
- sqflite (Database)
- uuid

### 📦 **pubspec.yaml Dependencies**
```yaml
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2
  intl: ^0.19.0
  provider: ^6.0.0
  shared_preferences: ^2.2.0
  table_calendar: ^3.0.0
  fl_chart: ^0.65.0
  uuid: ^4.0.0
  sqflite: ^2.3.0
```

### 🏗️ **Project Structure**
```
lib/
├── main.dart
├── providers/
│   └── task_provider.dart
├── screens/
│   ├── home_screen.dart
│   ├── calendar_screen.dart
│   └── statistics_screen.dart
└── models/
    └── task_model.dart
```

### 🔧 **Build Production**

```bash
# Android APK (Release)
flutter build apk --release

# iOS (Release)
flutter build ios --release

# Android App Bundle (Google Play)
flutter build appbundle --release
```

---

## 🎯 **Khuyên Nghị Sử Dụng**

### 📌 **Web Version (RECOMMENDED cho DEMO)**
- ✅ Chạy ngay, không cần setup
- ✅ Chia sẻ link = mọi người xem được
- ✅ Responsive trên mọi thiết bị
- ✅ Production ready

**Sử dụng cho:** Demo, share, prototype

---

### 📌 **React Native (RECOMMENDED cho DEVELOPMENT)**
- ✅ Hot reload siêu nhanh
- ✅ Scan QR code chạy ngay
- ✅ Chung code iOS/Android
- ✅ Dễ maintain

**Sử dụng cho:** Development, rapid prototyping

---

### 📌 **Flutter (RECOMMENDED cho PRODUCTION)**
- ✅ Hiệu năng tốt nhất
- ✅ Compiled = nhanh hơn
- ✅ Beautiful native UI
- ✅ Tốt cho app store

**Sử dụng cho:** Production build, app store release

---

## 🚀 **Workflow Workflow Tổng Hợp**

### **Hôm nay tôi muốn...**

**...xem demo nhanh**
```
→ Dùng Web version
→ Click link: https://Basaker2210.github.io/AsanoSchedule/
→ Xong! 5 giây.
```

**...phát triển code**
```
→ Dùng React Native + Expo
→ npm start
→ Scan QR code
→ Code → Save → Auto reload
→ Perfect! 🎯
```

**...build app store**
```
→ Dùng Flutter
→ flutter build apk/ios --release
→ Publish lên app store
→ Production ready! 🚀
```

---

## 📂 **Cấu Trúc Repo**

```
~/projects/
├── AsanoSchedule/               ⭐ Web + iOS
│   ├── docs/
│   │   ├── index.html          (Full web version)
│   │   └── app.html            (Demo cũ)
│   ├── AsanoSchedule/          (iOS - SwiftUI)
│   ├── README.md
│   └── ALL_VERSIONS_COMPLETE.md (Guide này)
│
├── AsanoScheduleRN/             ⭐ React Native
│   ├── App.js
│   ├── src/screens/
│   ├── package.json
│   ├── app.json
│   └── README.md
│
└── AsanoScheduleFlutter/        ⭐ Flutter
    ├── lib/
    │   ├── main.dart
    │   ├── providers/
    │   └── screens/
    ├── pubspec.yaml
    ├── .gitignore
    └── README.md
```

---

## 🔗 **Useful Links**

### **Documentation**
- 🌐 **Web**: React docs (https://react.dev)
- 📱 **React Native**: https://reactnative.dev
- 🎨 **Flutter**: https://flutter.dev

### **Libraries**
- 📊 **Chart.js**: https://chartjs.org
- 📅 **table_calendar**: https://pub.dev/packages/table_calendar
- 📊 **fl_chart**: https://pub.dev/packages/fl_chart

### **Deployment**
- 🌐 **Web**: GitHub Pages (FREE)
- 📱 **Apps**: Google Play, Apple App Store

---

## ✅ **Checklist Sebelum Deploy**

### Web Version
- [ ] Test di Chrome, Firefox, Safari
- [ ] Test di mobile browser
- [ ] Test localStorage persistence
- [ ] Test offline mode
- [ ] Commit & push ke GitHub

### React Native
- [ ] npm install berjalan
- [ ] Expo start tanpa error
- [ ] QR code dapat di-scan
- [ ] Hot reload bekerja
- [ ] Semua screen berjalan

### Flutter
- [ ] flutter pub get success
- [ ] flutter doctor semua hijau
- [ ] flutter run tanpa error
- [ ] Hot reload bekerja
- [ ] Build release tanpa error

---

## 💡 **Tips & Tricks**

### **Web**
```bash
# Buka di live server
open docs/index.html

# Atau pakaiPython server
python -m http.server 8000
# Visit: http://localhost:8000/docs/index.html
```

### **React Native**
```bash
# Develop mode
expo start --dev-client

# Tunnel mode (untuk testing dari devices jauh)
expo start --tunnel

# LAN mode (faster)
expo start --lan
```

### **Flutter**
```bash
# Debug mode dengan verbose
flutter run -v

# Release mode
flutter run --release

# Profile mode (untuk performance testing)
flutter run --profile
```

---

## 🎓 **Belajat Thêm**

### Web Development
- React Hooks: https://react.dev/reference/react/hooks
- LocalStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- Chart.js: https://chartjs.org/docs/latest

### Mobile Development
- React Native: https://reactnative.dev/docs/getting-started
- Flutter: https://docs.flutter.dev

### State Management
- React Hooks: useState, useEffect
- React Native: AsyncStorage
- Flutter: Provider pattern

---

## ❓ **FAQ**

**Q: Sẽ chạy version nào?**
A: Tùy lục đích:
- Demo cepat? → Web ✅
- Develop? → React Native ✅
- Production? → Flutter ✅

**Q: Bisa chạy semua cùng lúc?**
A: Ya! Masing-masing folder terpisah, tidak conflict.

**Q: Data dari web version bisa dpakai di Flutter?**
A: Tidak langsung. Perlu export/import via JSON.

**Q: Mana yang paling cepat?**
A: Flutter > React Native > Web (tapi untuk casual use, semua sama cepat)

**Q: Perlu update apa untuk production?**
A: 
- Web: Sudah siap di GitHub Pages
- React Native: Perlu build & distribute
- Flutter: Perlu build & publish ke app store

---

**Happy coding! 🚀**

Butuh bantuan? Tanya saja! 😊
