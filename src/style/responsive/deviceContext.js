import { Dimensions, PixelRatio, Platform } from 'react-native';

const BREAKPOINTS = {
  sm: 360,
  md: 768,
  lg: 1024,
};

let lastSignature = '';
let lastContext = null;

const classifyDevice = ({ width, height }) => {
  const shortest = Math.min(width, height);
  const longest = Math.max(width, height);

  return {
    isTablet: shortest >= 600 || longest >= 900,
    orientation: width >= height ? 'landscape' : 'portrait',
  };
};

export const getDeviceContext = () => {
  const window = Dimensions.get('window');
  const width = Math.round(window.width);
  const height = Math.round(window.height);
  const density = PixelRatio.get();
  const fontScale = PixelRatio.getFontScale();
  const device = classifyDevice({ width, height });

  const signature = [
    width,
    height,
    density,
    fontScale,
    Platform.OS,
    device.orientation,
    device.isTablet ? 'tablet' : 'phone',
  ].join('|');

  if (signature === lastSignature && lastContext) {
    return lastContext;
  }

  lastSignature = signature;
  lastContext = {
    width,
    height,
    density,
    fontScale,
    platform: Platform.OS,
    orientation: device.orientation,
    isTablet: device.isTablet,
    breakpoints: BREAKPOINTS,
    signature,
  };

  return lastContext;
};

export const getResponsiveSignature = () => getDeviceContext().signature;

export const matchesResponsiveVariant = (variant, context = getDeviceContext()) => {
  if (!variant) return true;

  if (variant === 'sm') return context.width >= context.breakpoints.sm;
  if (variant === 'md') return context.width >= context.breakpoints.md;
  if (variant === 'lg') return context.width >= context.breakpoints.lg;
  if (variant === 'tablet') return context.isTablet;
  if (variant === 'landscape') return context.orientation === 'landscape';
  if (variant === 'portrait') return context.orientation === 'portrait';

  return false;
};

export default getDeviceContext;
