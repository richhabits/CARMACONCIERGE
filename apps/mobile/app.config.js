export default {
  expo: {
    name: 'CARMACONCIERGE',
    slug: 'carmaconcierge-mobile',
    scheme: 'carmaconcierge',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.carmaconcierge.mobile',
      infoPlist: {
        NSCameraUsageDescription: 'This app needs access to camera to upload vehicle photos.',
        NSPhotoLibraryUsageDescription: 'This app needs access to photo library to upload images.',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.carmaconcierge.mobile',
      permissions: ['CAMERA', 'READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE'],
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-notifications',
        {
          icon: './assets/notification-icon.png',
          color: '#ffffff',
        },
      ],
    ],
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'your-project-id',
      },
    },
  },
};
