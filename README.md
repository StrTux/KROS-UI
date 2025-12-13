# React Native Template with Tailwind CSS and Poppins Fonts

A React Native template that includes Tailwind CSS styling utilities and properly linked Poppins fonts.

## Features

- ✅ **Tailwind CSS Integration**: Complete Tailwind-style utility classes for React Native
- ✅ **Poppins Fonts**: All Poppins font weights and italic variants properly linked
- ✅ **Theme System**: Dark/light theme support with context provider
- ✅ **Font Demo**: Interactive demo showing all available fonts
- ✅ **Navigation**: Basic router with Home, Profile, and Settings screens
- ✅ **Modern Setup**: React Native 0.74.3 with latest dependencies

## Font Usage

The template includes all Poppins font variants:

### Font Weights
- `font-thin` - Poppins Thin (100)
- `font-extralight` - Poppins Extra Light (200)
- `font-light` - Poppins Light (300)
- `font-regular` - Poppins Regular (400)
- `font-medium` - Poppins Medium (500)
- `font-semibold` - Poppins Semi Bold (600)
- `font-bold` - Poppins Bold (700)
- `font-extrabold` - Poppins Extra Bold (800)
- `font-black` - Poppins Black (900)

### Italic Variants
- `font-thin-italic` - Poppins Thin Italic
- `font-extralight-italic` - Poppins Extra Light Italic
- `font-light-italic` - Poppins Light Italic
- `font-italic` - Poppins Italic
- `font-medium-italic` - Poppins Medium Italic
- `font-semibold-italic` - Poppins Semi Bold Italic
- `font-bold-italic` - Poppins Bold Italic
- `font-extrabold-italic` - Poppins Extra Bold Italic
- `font-black-italic` - Poppins Black Italic

### Example Usage

```jsx
import { applyTw } from './src/style/style';

// Basic font usage
<Text style={applyTw('font-bold text-xl text-white')}>
  Bold Text
</Text>

// With theme
<Text style={applyTw(`${theme.text} font-medium text-lg`)}>
  Themed Text
</Text>

// Italic variant
<Text style={applyTw('font-light-italic text-base')}>
  Light Italic Text
</Text>
```

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Link fonts** (if not already done):
   ```bash
   npx react-native-asset
   ```

3. **For iOS**:
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the app**:
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   ```

## Project Structure

```
src/
├── assest/
│   └── font/           # Poppins font files
├── components/         # Reusable components
├── functions/          # Router and utilities
├── screen/            # App screens
│   ├── HomeScreen.js
│   ├── ProfileScreen.js
│   └── SettingsScreen.js
└── style/
    ├── style.js       # Tailwind utilities and font definitions
    └── theme.js       # Theme context and colors
```

## Key Files

- `src/style/style.js` - Main Tailwind utilities and font definitions
- `src/style/theme.js` - Theme context provider
- `react-native.config.js` - Font asset linking configuration
- `babel.config.js` - Module resolver aliases

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint
- `npm run link-assets` - Link font assets

## Font Linking

Fonts are automatically linked through `react-native.config.js`:

```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assest/font/'],
};
```

All Poppins font files in `src/assest/font/` are automatically available for use in your React Native components.
