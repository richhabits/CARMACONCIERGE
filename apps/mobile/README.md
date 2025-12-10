# CARMACONCIERGE Mobile App

React Native mobile application built with Expo.

## Features

- **Authentication**: User registration and login
- **Home Dashboard**: Overview of vehicles and jobs
- **Vehicles Management**: Add, view, and manage vehicles
- **Jobs Management**: Book and track MOT, services, and repairs
- **Messaging**: Communicate with suppliers and support
- **Profile**: Manage account settings

## Tech Stack

- React Native
- Expo 50
- React Navigation
- TypeScript
- Axios for API calls

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (Mac) or Android Studio (for Android)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update EXPO_PUBLIC_API_URL in .env with your backend API URL
```

### Development

```bash
# Start Expo development server
npm run dev

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

### Testing on Device

1. Install Expo Go app on your iOS or Android device
2. Scan the QR code from the terminal
3. The app will load on your device

## Project Structure

```
src/
├── screens/        # Screen components
├── components/     # Reusable UI components
├── navigation/     # Navigation configuration
├── services/       # API services
├── context/        # React Context providers
├── hooks/          # Custom React hooks
└── utils/          # Utility functions
```

## API Configuration

The app connects to the backend API. Make sure to:
1. Update `EXPO_PUBLIC_API_URL` in `.env`
2. Ensure the backend is running
3. Use the correct network IP if testing on a physical device

## Building for Production

```bash
# Configure EAS Build (first time)
npx eas build:configure

# Build for Android
npm run build:android

# Build for iOS
npm run build:ios
```
