# 🏠 Property App (React Native - Expo)

## 📦 Tech Stack

- React Native (with Expo)
- React Navigation
- React Query
- Expo Location API
- Expo Crypto for password hashing
- In-memory Map for mock user authentication

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone git@github.com:HiAkshatJain/JumboAssignment.git
cd JumboAssignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Expo development server

```bash
npx expo start --tunnel
```

### 4. Open in Expo Go (Mobile)

- Download the **Expo Go** app from Play Store / App Store
- Scan the QR code shown in the terminal or browser with Expo Go

---

## 📱 Demo

▶ [Watch Demo Video (autoplay)]("https://youtube.com/shorts/1Po1vc07BLc?feature=share")

## 📸 Screens

- Home Screen
- Register Screen
- Login Screen
- Properties Screen
- Property Detail Screen

---

## 🧪 Mock API

- Home data is fetched from a local JSON/mock API
- User registration & login use an in-memory map

---

## 📁 Folder Structure

```
/app
  - Register
  - Login
  - Properties
  - Property Detail
  - index.tsx (Home Page)
/api
  - auth.ts
  - homes.ts
/components
  - Button.tsx
/utils
  - location.ts
  - sessionMgmt.ts
App.js
```
