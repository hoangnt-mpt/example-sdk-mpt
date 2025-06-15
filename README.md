# Multi-Framework Frontend Call Manager

Dự án này bao gồm 5 ứng dụng frontend khác nhau được xây dựng bằng các framework/tool khác nhau, tất cả đều có tính năng **Call Controls** đầy đủ.

## 📞 Tính năng Call Controls

Tất cả 5 dự án đều có các tính năng call management sau:

### Trạng thái cuộc gọi:

- **Incoming Call**: Cuộc gọi đến
- **Active Call**: Cuộc gọi đang hoạt động
- **Ended Call**: Cuộc gọi đã kết thúc

### Các nút điều khiển:

- 📞 **Nghe**: Trả lời cuộc gọi
- ❌ **Từ chối**: Từ chối cuộc gọi
- ⏸️ **Hold**: Tạm dừng cuộc gọi
- ▶️ **Tiếp tục**: Tiếp tục cuộc gọi
- 🔇 **Tắt mic**: Tắt tiếng microphone
- 🔊 **Bật mic**: Bật tiếng microphone
- 📵 **Kết thúc**: Kết thúc cuộc gọi
- 🔄 **Tạo cuộc gọi mới**: Reset để tạo cuộc gọi mới

### Hiệu ứng và UI:

- Animations pulse cho các nút incoming call
- Gradient backgrounds độc đáo cho mỗi framework
- Responsive design tương thích mobile
- Bootstrap integration cho styling hiện đại

## 🚀 Danh sách dự án

### 1. React Vite TypeScript (Port 3001)

```bash
cd react-vite-ts
npm start
```

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Bootstrap + Custom CSS
- **Call Controls**: Gradient tím-xanh với pulse animations

### 2. React Webpack TypeScript (Port 3000)

```bash
cd react-webpack-ts
npm start
```

- **Framework**: React 18 + TypeScript
- **Build Tool**: Webpack 5
- **Styling**: Bootstrap + Custom CSS
- **Call Controls**: Gradient xanh-tím với pulse animations

### 3. Angular TypeScript (Port 4200)

```bash
cd angular-app
npm start
```

- **Framework**: Angular 17 + TypeScript
- **Build Tool**: Angular CLI
- **Styling**: Bootstrap + Custom CSS
- **Call Controls**: Gradient đỏ-tím với pulse animations

### 4. Vue 3 TypeScript (Port 3002)

```bash
cd vue3-ts
npm dev
```

- **Framework**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **Styling**: Bootstrap + Custom CSS
- **Call Controls**: Gradient xanh lá-xanh dương với pulse animations

### 5. Vue 2 TypeScript (Port 3003)

```bash
cd vue2-ts
npm run serve
```

- **Framework**: Vue 2 + TypeScript
- **Build Tool**: Vue CLI
- **Styling**: Bootstrap + Custom CSS
- **Call Controls**: Gradient cam-hồng với pulse animations

## �� Cài đặt

### Cài đặt tất cả dependencies:

```bash
./install-all.sh
```

### Hoặc cài đặt từng dự án:

```bash
# React Vite
cd react-vite-ts && npm install

# React Webpack
cd react-webpack-ts && npm install

# Angular
cd angular-app && npm install

# Vue 3
cd vue3-ts && npm install

# Vue 2
cd vue2-ts && npm install
```

## 🔧 Packages đã cài đặt

Tất cả dự án đều có:

- **@mptransformation/omisdk**: SDK chính cho call management
- **bootstrap**: Framework CSS cho UI hiện đại

## 🎨 Thiết kế UI

Mỗi dự án có:

- **Unique gradient colors** để phân biệt framework
- **Responsive design** hoạt động tốt trên mobile
- **Modern UI components** với Bootstrap
- **Smooth animations** và transitions
- **Vietnamese interface** với các label tiếng Việt

## 🔗 SDK Integration

Tất cả components đều có placeholder comments để tích hợp với `@mptransformation/omisdk`:

```typescript
// Thêm logic tích hợp với @mptransformation/omisdk tại đây
```

## 🏃‍♂️ Chạy tất cả dự án

Để chạy tất cả 5 dự án cùng lúc, mở 5 terminal riêng biệt:

```bash
# Terminal 1 - React Webpack (Port 3000)
cd react-webpack-ts && npm start

# Terminal 2 - React Vite (Port 3001)
cd react-vite-ts && npm start

# Terminal 3 - Vue 3 (Port 3002)
cd vue3-ts && npm run dev

# Terminal 4 - Vue 2 (Port 3003)
cd vue2-ts && npm run serve

# Terminal 5 - Angular (Port 4200)
cd angular-app && npm start
```

## 📱 Trải nghiệm

- Mỗi ứng dụng có màu sắc và gradient riêng biệt
- Call controls hoạt động independently cho mỗi framework
- Todo manager để test các tính năng cơ bản
- Console logging để debug các hành động call
- Responsive design tương thích với mọi thiết bị

## 🚀 Tính năng nổi bật

✅ **5 frameworks** trong 1 workspace
✅ **Call management** đầy đủ chức năng  
✅ **Modern UI/UX** với Bootstrap
✅ **TypeScript** cho type safety
✅ **Responsive design** cho mobile
✅ **Pulse animations** cho incoming calls
✅ **Vietnamese interface** thân thiện
✅ **SDK ready** cho production integration
