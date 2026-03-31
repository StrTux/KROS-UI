import { Dimensions, PixelRatio, Platform, Appearance } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const scale = SCREEN_WIDTH / BASE_WIDTH;
const verticalScale = SCREEN_HEIGHT / BASE_HEIGHT;
const moderateScale = (size, factor = 0.5) => size + (scale - 1) * size * factor;

// Responsive scaling for width
export const scaleWidth = (size) => moderateScale(size);

// Responsive scaling for height
export const scaleHeight = (size) => moderateScale(size, 0.5);

// Responsive font scaling considering platform differences
export const scaleFont = (size) => {
  let newSize = size * scale;
  if (Platform.OS === 'android') {
    newSize = newSize * 0.9; // Android specific adjustment
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Icon size scaling
export const scaleIcon = (size) => moderateScale(size, 0.3);

// Responsive width percentage
export const wp = (percent) => (SCREEN_WIDTH * percent) / 100;

// Responsive height percentage
export const hp = (percent) => (SCREEN_HEIGHT * percent) / 100;

// Generic scaling for spacing/padding/margin
export const scaleSize = (size) => moderateScale(size);

// Responsive spacing presets
export const spacing = {
  xs: scaleSize(4),
  sm: scaleSize(8),
  md: scaleSize(12),
  lg: scaleSize(16),
  xl: scaleSize(20),
  '2xl': scaleSize(24),
  '3xl': scaleSize(32),
  '4xl': scaleSize(40),
};

// Responsive font size presets
export const fontSizes = {
  xs: scaleFont(10),
  sm: scaleFont(12),
  base: scaleFont(14),
  md: scaleFont(16),
  lg: scaleFont(18),
  xl: scaleFont(20),
  '2xl': scaleFont(24),
  '3xl': scaleFont(30),
  '4xl': scaleFont(36),
};

// Responsive border radii
export const borderRadius = {
  sm: scaleSize(4),
  md: scaleSize(8),
  lg: scaleSize(12),
  xl: scaleSize(16),
  '2xl': scaleSize(20),
  '3xl': scaleSize(24),
  full: 9999,
};

// Detect small screen
export const isSmallScreen = () => SCREEN_WIDTH < 375;

// Detect large screen
export const isLargeScreen = () => SCREEN_WIDTH > 414;

// Icon size contextual scaling
export const getIconSize = (context = 'medium') => {
  const sizes = {
    small: scaleIcon(16),
    medium: scaleIcon(24),
    large: scaleIcon(32),
    xlarge: scaleIcon(48),
  };
  return sizes[context] || sizes.medium;
};

// Responsive font scaling with user accessibility font scale
export const scaleFontWithAccessibility = (size) => {
  const fontScale = PixelRatio.getFontScale();
  const scaledSize = scaleFont(size) * fontScale;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

// Responsive image size scaling
export const scaleImageSize = (width, height) => {
  return {
    width: scaleWidth(width),
    height: scaleHeight(height),
  };
};

// Responsive video frame scaling maintaining aspect ratio
export const scaleVideoSize = (width, height) => {
  const scaledWidth = scaleWidth(width);
  const scaledHeight = (height / width) * scaledWidth;
  return {
    width: scaledWidth,
    height: scaledHeight,
  };
};

// Detect color scheme (dark mode)
export const isDarkMode = () => Appearance.getColorScheme() === 'dark';

// Generic responsive spacing scaling utility
export const scaleSpacing = (size) => moderateScale(size);

export default {
  scaleWidth,
  scaleHeight,
  scaleFont,
  scaleFontWithAccessibility,
  scaleIcon,
  wp,
  hp,
  scaleSize,
  spacing,
  fontSizes,
  borderRadius,
  isSmallScreen,
  isLargeScreen,
  getIconSize,
  scaleImageSize,
  scaleVideoSize,
  isDarkMode,
  scaleSpacing,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};
