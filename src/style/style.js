// tailwind.js - Standalone Tailwind CSS to React Native StyleSheet mapper

import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base font size for rem/em conversion (standard is 16px)
const BASE_FONT_SIZE = 16;

// Font families - Poppins fonts from assets
const fonts = {
  thin: 'Poppins-Thin',
  extraLight: 'Poppins-ExtraLight',
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  extraBold: 'Poppins-ExtraBold',
  black: 'Poppins-Black',
  thinItalic: 'Poppins-ThinItalic',
  extraLightItalic: 'Poppins-ExtraLightItalic',
  lightItalic: 'Poppins-LightItalic',
  italic: 'Poppins-Italic',
  mediumItalic: 'Poppins-MediumItalic',
  semiBoldItalic: 'Poppins-SemiBoldItalic',
  boldItalic: 'Poppins-BoldItalic',
  extraBoldItalic: 'Poppins-ExtraBoldItalic',
  blackItalic: 'Poppins-BlackItalic',
};

// Font weights mapping
const fontWeights = {
  thin: '100',
  extraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
};

// Tailwind CSS Color Palette
const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: '#000000',
  white: '#ffffff',
  // Gray scale
  gray: {
    50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db',
    400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151',
    800: '#1f2937', 900: '#111827', 950: '#030712'
  },
  // Red
  red: {
    50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5',
    400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
    800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a'
  },
  // Orange
  orange: {
    50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
    400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
    800: '#9a3412', 900: '#7c2d12', 950: '#431407'
  },
  // Amber
  amber: {
    50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
    400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
    800: '#92400e', 900: '#78350f', 950: '#451a03'
  },
  // Yellow
  yellow: {
    50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047',
    400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207',
    800: '#854d0e', 900: '#713f12', 950: '#422006'
  },
  // Lime
  lime: {
    50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264',
    400: '#a3e635', 500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f',
    800: '#3f6212', 900: '#365314', 950: '#1a2e05'
  },
  // Green
  green: {
    50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
    400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
    800: '#166534', 900: '#14532d', 950: '#052e16'
  },
  // Emerald
  emerald: {
    50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
    400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
    800: '#065f46', 900: '#064e3b', 950: '#022c22'
  },
  // Teal
  teal: {
    50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
    400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
    800: '#115e59', 900: '#134e4a', 950: '#042f2e'
  },
  // Cyan
  cyan: {
    50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9',
    400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490',
    800: '#155e75', 900: '#164e63', 950: '#083344'
  },
  // Sky
  sky: {
    50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
    400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
    800: '#075985', 900: '#0c4a6e', 950: '#082f49'
  },
  // Blue
  blue: {
    50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
    400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
    800: '#1e40af', 900: '#1e3a8a', 950: '#172554'
  },
  // Indigo
  indigo: {
    50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
    400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
    800: '#3730a3', 900: '#312e81', 950: '#1e1b4b'
  },
  // Violet
  violet: {
    50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd',
    400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9',
    800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065'
  },
  // Purple
  purple: {
    50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe',
    400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce',
    800: '#6b21a8', 900: '#581c87', 950: '#3b0764'
  },
  // Fuchsia
  fuchsia: {
    50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc',
    400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf',
    800: '#86198f', 900: '#701a75', 950: '#4a044e'
  },
  // Pink
  pink: {
    50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4',
    400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d',
    800: '#9d174d', 900: '#831843', 950: '#500724'
  },
  // Rose
  rose: {
    50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af',
    400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c',
    800: '#9f1239', 900: '#881337', 950: '#4c0519'
  },
};

// Spacing scale (same as Tailwind)
const spacing = {
  0: 0, 0.5: 2, 1: 4, 1.5: 6, 2: 8, 2.5: 10, 3: 12, 3.5: 14, 4: 16,
  5: 20, 6: 24, 7: 28, 8: 32, 9: 36, 10: 40, 11: 44, 12: 48,
  14: 56, 16: 64, 20: 80, 24: 96, 28: 112, 32: 128, 36: 144,
  40: 160, 44: 176, 48: 192, 52: 208, 56: 224, 60: 240, 64: 256,
  72: 288, 80: 320, 96: 384,
  px: 1,
};

/**
 * Convert CSS unit values to React Native compatible numbers
 * @param {string} value - Value with unit (e.g., "5rem", "20px", "2em")
 * @returns {number|string} - Converted value for React Native
 */
const convertUnit = (value) => {
  // Handle percentage
  if (value.endsWith('%')) {
    return value;
  }

  // Handle rem units (1rem = 16px by default)
  if (value.endsWith('rem')) {
    const num = parseFloat(value);
    return num * BASE_FONT_SIZE;
  }

  // Handle em units (1em = 16px by default in React Native)
  if (value.endsWith('em')) {
    const num = parseFloat(value);
    return num * BASE_FONT_SIZE;
  }

  // Handle px units (just remove 'px' since RN uses unitless pixels)
  if (value.endsWith('px')) {
    return parseFloat(value);
  }

  // Handle hex colors
  if (value.startsWith('#')) {
    return value;
  }

  // Handle rgb/rgba
  if (value.startsWith('rgb')) {
    return value;
  }

  // Return as number if it's a plain number
  const num = parseFloat(value);
  return isNaN(num) ? value : num;
};

/**
 * Parse arbitrary value from class name
 * Examples: h-[5rem], w-[20px], p-[2em], bg-[#ff0000], text-[18px]
 * @param {string} className - Class name with arbitrary value
 * @returns {object|null} - Style object or null
 */
const parseArbitraryValue = (className) => {
  // Match pattern like "property-[value]"
  const match = className.match(/^([a-z-]+)-\[([^\]]+)\]$/);

  if (!match) return null;

  const [, property, value] = match;
  const convertedValue = convertUnit(value);

  // Property mappings for arbitrary values
  const propertyMap = {
    // Width & Height
    'w': { width: convertedValue },
    'h': { height: convertedValue },
    'min-w': { minWidth: convertedValue },
    'min-h': { minHeight: convertedValue },
    'max-w': { maxWidth: convertedValue },
    'max-h': { maxHeight: convertedValue },

    // Padding
    'p': { padding: convertedValue },
    'px': { paddingHorizontal: convertedValue },
    'py': { paddingVertical: convertedValue },
    'pt': { paddingTop: convertedValue },
    'pr': { paddingRight: convertedValue },
    'pb': { paddingBottom: convertedValue },
    'pl': { paddingLeft: convertedValue },

    // Margin
    'm': { margin: convertedValue },
    'mx': { marginHorizontal: convertedValue },
    'my': { marginVertical: convertedValue },
    'mt': { marginTop: convertedValue },
    'mr': { marginRight: convertedValue },
    'mb': { marginBottom: convertedValue },
    'ml': { marginLeft: convertedValue },

    // Negative margins
    '-m': { margin: -convertedValue },
    '-mx': { marginHorizontal: -convertedValue },
    '-my': { marginVertical: -convertedValue },
    '-mt': { marginTop: -convertedValue },
    '-mr': { marginRight: -convertedValue },
    '-mb': { marginBottom: -convertedValue },
    '-ml': { marginLeft: -convertedValue },

    // Position
    'top': { top: convertedValue },
    'right': { right: convertedValue },
    'bottom': { bottom: convertedValue },
    'left': { left: convertedValue },

    // Border radius
    'rounded': { borderRadius: convertedValue },
    'rounded-t': { borderTopLeftRadius: convertedValue, borderTopRightRadius: convertedValue },
    'rounded-r': { borderTopRightRadius: convertedValue, borderBottomRightRadius: convertedValue },
    'rounded-b': { borderBottomLeftRadius: convertedValue, borderBottomRightRadius: convertedValue },
    'rounded-l': { borderTopLeftRadius: convertedValue, borderBottomLeftRadius: convertedValue },
    'rounded-tl': { borderTopLeftRadius: convertedValue },
    'rounded-tr': { borderTopRightRadius: convertedValue },
    'rounded-br': { borderBottomRightRadius: convertedValue },
    'rounded-bl': { borderBottomLeftRadius: convertedValue },

    // Border width
    'border': { borderWidth: convertedValue },
    'border-t': { borderTopWidth: convertedValue },
    'border-r': { borderRightWidth: convertedValue },
    'border-b': { borderBottomWidth: convertedValue },
    'border-l': { borderLeftWidth: convertedValue },

    // Colors
    'bg': { backgroundColor: convertedValue },
    'text': typeof convertedValue === 'number' ? { fontSize: convertedValue } : { color: convertedValue },
    'border-color': { borderColor: convertedValue },
    'border': { borderColor: convertedValue }, // Support border-[#xxxxxx] syntax
    // Font size
    'text-size': { fontSize: convertedValue },

    // Line height
    'leading': { lineHeight: convertedValue },

    // Letter spacing
    'tracking': { letterSpacing: convertedValue },

    // Gap
    'gap': { gap: convertedValue },

    // Z-index
    'z': { zIndex: convertedValue },

    // Opacity
    'opacity': { opacity: convertedValue },
  };

  return propertyMap[property] || null;
};

// Generate all Tailwind-style classes
const generateStyles = () => {
  let styles = {};

  // Display utilities
  styles.hidden = { display: 'none' };
  styles.flex = { display: 'flex' };
  styles['inline-flex'] = { display: 'flex' }; // React Native doesn't support true inline-flex, but uses flex

  // Flex direction
  styles['flex-row'] = { flexDirection: 'row' };
  styles['flex-col'] = { flexDirection: 'column' };
  styles['flex-row-reverse'] = { flexDirection: 'row-reverse' };
  styles['flex-col-reverse'] = { flexDirection: 'column-reverse' };

  // Flex wrap
  styles['flex-wrap'] = { flexWrap: 'wrap' };
  styles['flex-nowrap'] = { flexWrap: 'nowrap' };
  styles['flex-wrap-reverse'] = { flexWrap: 'wrap-reverse' };

  // Flex
  styles['flex-1'] = { flex: 1 };
  styles['flex-2'] = { flex: 2 };
  styles['flex-3'] = { flex: 3 };
  styles['flex-4'] = { flex: 4 };
  styles['flex-auto'] = { flex: 1 };
  styles['flex-initial'] = { flex: 0 };
  styles['flex-none'] = { flex: 0 };

  // Flex grow/shrink
  styles['grow'] = { flexGrow: 1 };
  styles['grow-0'] = { flexGrow: 0 };
  styles['shrink'] = { flexShrink: 1 };
  styles['shrink-0'] = { flexShrink: 0 };

  // Justify content
  styles['justify-start'] = { justifyContent: 'flex-start' };
  styles['justify-end'] = { justifyContent: 'flex-end' };
  styles['justify-center'] = { justifyContent: 'center' };
  styles['justify-between'] = { justifyContent: 'space-between' };
  styles['justify-around'] = { justifyContent: 'space-around' };
  styles['justify-evenly'] = { justifyContent: 'space-evenly' };

  // Align items
  styles['items-start'] = { alignItems: 'flex-start' };
  styles['items-end'] = { alignItems: 'flex-end' };
  styles['items-center'] = { alignItems: 'center' };
  styles['items-baseline'] = { alignItems: 'baseline' };
  styles['items-stretch'] = { alignItems: 'stretch' };

  // Align self
  styles['self-auto'] = { alignSelf: 'auto' };
  styles['self-start'] = { alignSelf: 'flex-start' };
  styles['self-end'] = { alignSelf: 'flex-end' };
  styles['self-center'] = { alignSelf: 'center' };
  styles['self-stretch'] = { alignSelf: 'stretch' };
  styles['self-baseline'] = { alignSelf: 'baseline' };

  // Align content
  styles['content-start'] = { alignContent: 'flex-start' };
  styles['content-end'] = { alignContent: 'flex-end' };
  styles['content-center'] = { alignContent: 'center' };
  styles['content-between'] = { alignContent: 'space-between' };
  styles['content-around'] = { alignContent: 'space-around' };
  styles['content-stretch'] = { alignContent: 'stretch' };

  // Position
  styles['absolute'] = { position: 'absolute' };
  styles['relative'] = { position: 'relative' };

  // Inset
  Object.entries(spacing).forEach(([key, value]) => {
    styles[`top-${key}`] = { top: value };
    styles[`right-${key}`] = { right: value };
    styles[`bottom-${key}`] = { bottom: value };
    styles[`left-${key}`] = { left: value };
    styles[`inset-${key}`] = { top: value, right: value, bottom: value, left: value };
  });

  // Width & Height
  styles['w-auto'] = { width: 'auto' };
  styles['w-full'] = { width: '100%' };
  styles['w-screen'] = { width: SCREEN_WIDTH };
  styles['h-auto'] = { height: 'auto' };
  styles['h-full'] = { height: '100%' };
  styles['h-screen'] = { height: SCREEN_HEIGHT };

  // Fractional widths and heights
  const fractions = {
    '1/2': '50%',
    '1/3': '33.333333%',
    '2/3': '66.666667%',
    '1/4': '25%',
    '2/4': '50%',
    '3/4': '75%',
    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
    '1/6': '16.666667%',
    '2/6': '33.333333%',
    '3/6': '50%',
    '4/6': '66.666667%',
    '5/6': '83.333333%',
    '1/12': '8.333333%',
    '2/12': '16.666667%',
    '3/12': '25%',
    '4/12': '33.333333%',
    '5/12': '41.666667%',
    '6/12': '50%',
    '7/12': '58.333333%',
    '8/12': '66.666667%',
    '9/12': '75%',
    '10/12': '83.333333%',
    '11/12': '91.666667%'
  };

  Object.entries(fractions).forEach(([key, value]) => {
    styles[`w-${key}`] = { width: value };
    styles[`h-${key}`] = { height: value };
  });

  // Width/Height with spacing
  Object.entries(spacing).forEach(([key, value]) => {
    styles[`w-${key}`] = { width: value };
    styles[`h-${key}`] = { height: value };
    styles[`min-w-${key}`] = { minWidth: value };
    styles[`min-h-${key}`] = { minHeight: value };
    styles[`max-w-${key}`] = { maxWidth: value };
    styles[`max-h-${key}`] = { maxHeight: value };
  });

  // Extended max-width values
  const maxWidths = {
    'xs': 320,
    'sm': 384,
    'md': 448,
    'lg': 512,
    'xl': 576,
    '2xl': 672,
    '3xl': 768,
    '4xl': 896,
    '5xl': 1024,
    '6xl': 1152,
    '7xl': 1280
  };

  Object.entries(maxWidths).forEach(([key, value]) => {
    styles[`max-w-${key}`] = { maxWidth: value };
  });

  // Padding
  Object.entries(spacing).forEach(([key, value]) => {
    styles[`p-${key}`] = { padding: value };
    styles[`px-${key}`] = { paddingHorizontal: value };
    styles[`py-${key}`] = { paddingVertical: value };
    styles[`pt-${key}`] = { paddingTop: value };
    styles[`pr-${key}`] = { paddingRight: value };
    styles[`pb-${key}`] = { paddingBottom: value };
    styles[`pl-${key}`] = { paddingLeft: value };
  });

  // Margin
  Object.entries(spacing).forEach(([key, value]) => {
    styles[`m-${key}`] = { margin: value };
    styles[`mx-${key}`] = { marginHorizontal: value };
    styles[`my-${key}`] = { marginVertical: value };
    styles[`mt-${key}`] = { marginTop: value };
    styles[`mr-${key}`] = { marginRight: value };
    styles[`mb-${key}`] = { marginBottom: value };
    styles[`ml-${key}`] = { marginLeft: value };

    // Negative margins
    styles[`-m-${key}`] = { margin: -value };
    styles[`-mx-${key}`] = { marginHorizontal: -value };
    styles[`-my-${key}`] = { marginVertical: -value };
    styles[`-mt-${key}`] = { marginTop: -value };
    styles[`-mr-${key}`] = { marginRight: -value };
    styles[`-mb-${key}`] = { marginBottom: -value };
    styles[`-ml-${key}`] = { marginLeft: -value };
  });

  // Auto margins
  styles['m-auto'] = { margin: 'auto' };
  styles['mx-auto'] = { marginHorizontal: 'auto' };
  styles['my-auto'] = { marginVertical: 'auto' };
  styles['mt-auto'] = { marginTop: 'auto' };
  styles['mr-auto'] = { marginRight: 'auto' };
  styles['mb-auto'] = { marginBottom: 'auto' };
  styles['ml-auto'] = { marginLeft: 'auto' };

  // Gap (spacing between flex children)
  Object.entries(spacing).forEach(([key, value]) => {
    styles[`gap-${key}`] = { gap: value };
  });

  // Background colors
  Object.entries(colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'string') {
      styles[`bg-${colorName}`] = { backgroundColor: colorValue };
    } else {
      Object.entries(colorValue).forEach(([shade, hex]) => {
        styles[`bg-${colorName}-${shade}`] = { backgroundColor: hex };
      });
    }
  });

  // Text colors
  Object.entries(colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'string') {
      styles[`text-${colorName}`] = { color: colorValue };
    } else {
      Object.entries(colorValue).forEach(([shade, hex]) => {
        styles[`text-${colorName}-${shade}`] = { color: hex };
      });
    }
  });

  // Border colors
  Object.entries(colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'string') {
      styles[`border-${colorName}`] = { borderColor: colorValue };
    } else {
      Object.entries(colorValue).forEach(([shade, hex]) => {
        styles[`border-${colorName}-${shade}`] = { borderColor: hex };
      });
    }
  });

  // Font size
  const fontSizes = {
    xs: 12, sm: 14, base: 16, lg: 18, xl: 20,
    '2xl': 24, '3xl': 30, '4xl': 36, '5xl': 48,
    '6xl': 60, '7xl': 72, '8xl': 96, '9xl': 128,
  };

  Object.entries(fontSizes).forEach(([key, value]) => {
    styles[`text-${key}`] = { fontSize: value };
  });

  // Font family
  styles['font-regular'] = { fontFamily: fonts.regular };
  styles['font-thin'] = { fontFamily: fonts.thin, fontWeight: fontWeights.thin };
  styles['font-light'] = { fontFamily: fonts.light, fontWeight: fontWeights.light };
  styles['font-normal'] = { fontFamily: fonts.regular, fontWeight: fontWeights.regular };
  styles['font-medium'] = { fontFamily: fonts.medium, fontWeight: fontWeights.medium };
  styles['font-semibold'] = { fontFamily: fonts.semiBold, fontWeight: fontWeights.semiBold };
  styles['font-bold'] = { fontFamily: fonts.bold, fontWeight: fontWeights.bold };
  styles['font-extrabold'] = { fontFamily: fonts.extraBold, fontWeight: fontWeights.extraBold };
  styles['font-black'] = { fontFamily: fonts.black, fontWeight: fontWeights.black };

  // Text align
  styles['text-left'] = { textAlign: 'left' };
  styles['text-center'] = { textAlign: 'center' };
  styles['text-right'] = { textAlign: 'right' };
  styles['text-justify'] = { textAlign: 'justify' };

  // Text decoration
  styles['underline'] = { textDecorationLine: 'underline' };
  styles['line-through'] = { textDecorationLine: 'line-through' };
  styles['no-underline'] = { textDecorationLine: 'none' };

  // Text transform
  styles['uppercase'] = { textTransform: 'uppercase' };
  styles['lowercase'] = { textTransform: 'lowercase' };
  styles['capitalize'] = { textTransform: 'capitalize' };
  styles['normal-case'] = { textTransform: 'none' };

  // Font style
  styles['italic'] = { fontStyle: 'italic' };
  styles['not-italic'] = { fontStyle: 'normal' };

  // Line height (semantic names)
  styles['leading-none'] = { lineHeight: 16 };
  styles['leading-tight'] = { lineHeight: 20 };
  styles['leading-snug'] = { lineHeight: 22 };
  styles['leading-normal'] = { lineHeight: 24 };
  styles['leading-relaxed'] = { lineHeight: 28 };
  styles['leading-loose'] = { lineHeight: 32 };

  // Line height (numeric values)
  const lineHeights = {
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40
  };

  Object.entries(lineHeights).forEach(([key, value]) => {
    styles[`leading-${key}`] = { lineHeight: value };
  });

  // Letter spacing
  styles['tracking-tighter'] = { letterSpacing: -0.8 };
  styles['tracking-tight'] = { letterSpacing: -0.4 };
  styles['tracking-normal'] = { letterSpacing: 0 };
  styles['tracking-wide'] = { letterSpacing: 0.4 };
  styles['tracking-wider'] = { letterSpacing: 0.8 };
  styles['tracking-widest'] = { letterSpacing: 1.6 };

  // Border width
  styles['border'] = { borderWidth: 1 };
  styles['border-0'] = { borderWidth: 0 };
  styles['border-2'] = { borderWidth: 2 };
  styles['border-4'] = { borderWidth: 4 };
  styles['border-8'] = { borderWidth: 8 };

  styles['border-t'] = { borderTopWidth: 1 };
  styles['border-r'] = { borderRightWidth: 1 };
  styles['border-b'] = { borderBottomWidth: 1 };
  styles['border-l'] = { borderLeftWidth: 1 };

  styles['border-t-0'] = { borderTopWidth: 0 };
  styles['border-t-2'] = { borderTopWidth: 2 };
  styles['border-t-4'] = { borderTopWidth: 4 };

  styles['border-r-0'] = { borderRightWidth: 0 };
  styles['border-r-2'] = { borderRightWidth: 2 };
  styles['border-r-4'] = { borderRightWidth: 4 };

  styles['border-b-0'] = { borderBottomWidth: 0 };
  styles['border-b-2'] = { borderBottomWidth: 2 };
  styles['border-b-4'] = { borderBottomWidth: 4 };

  styles['border-l-0'] = { borderLeftWidth: 0 };
  styles['border-l-2'] = { borderLeftWidth: 2 };
  styles['border-l-4'] = { borderLeftWidth: 4 };

  // Border radius
  styles['rounded-none'] = { borderRadius: 0 };
  styles['rounded-sm'] = { borderRadius: 2 };
  styles['rounded'] = { borderRadius: 4 };
  styles['rounded-md'] = { borderRadius: 6 };
  styles['rounded-lg'] = { borderRadius: 8 };
  styles['rounded-xl'] = { borderRadius: 12 };
  styles['rounded-2xl'] = { borderRadius: 16 };
  styles['rounded-3xl'] = { borderRadius: 24 };
  styles['rounded-full'] = { borderRadius: 9999 };

  // Border radius (specific corners)
  ['t', 'r', 'b', 'l', 'tl', 'tr', 'br', 'bl'].forEach(corner => {
    const radiusSizes = { none: 0, sm: 2, DEFAULT: 4, md: 6, lg: 8, xl: 12, '2xl': 16, '3xl': 24, full: 9999 };
    Object.entries(radiusSizes).forEach(([size, value]) => {
      const className = size === 'DEFAULT' ? `rounded-${corner}` : `rounded-${corner}-${size}`;
      if (corner === 't') {
        styles[className] = { borderTopLeftRadius: value, borderTopRightRadius: value };
      } else if (corner === 'r') {
        styles[className] = { borderTopRightRadius: value, borderBottomRightRadius: value };
      } else if (corner === 'b') {
        styles[className] = { borderBottomLeftRadius: value, borderBottomRightRadius: value };
      } else if (corner === 'l') {
        styles[className] = { borderTopLeftRadius: value, borderBottomLeftRadius: value };
      } else if (corner === 'tl') {
        styles[className] = { borderTopLeftRadius: value };
      } else if (corner === 'tr') {
        styles[className] = { borderTopRightRadius: value };
      } else if (corner === 'br') {
        styles[className] = { borderBottomRightRadius: value };
      } else if (corner === 'bl') {
        styles[className] = { borderBottomLeftRadius: value };
      }
    });
  });

  // Border style
  styles['border-solid'] = { borderStyle: 'solid' };
  styles['border-dashed'] = { borderStyle: 'dashed' };
  styles['border-dotted'] = { borderStyle: 'dotted' };

  // Opacity
  [0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100].forEach(value => {
    styles[`opacity-${value}`] = { opacity: value / 100 };
  });

  // Shadow (limited support in RN)
  styles['shadow-sm'] = {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: { elevation: 1 },
    }),
  };

  styles['shadow'] = {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: { elevation: 3 },
    }),
  };

  styles['shadow-md'] = {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: { elevation: 6 },
    }),
  };

  styles['shadow-lg'] = {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
      },
      android: { elevation: 10 },
    }),
  };

  styles['shadow-xl'] = {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.25,
        shadowRadius: 25,
      },
      android: { elevation: 15 },
    }),
  };

  styles['shadow-2xl'] = {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 25 },
        shadowOpacity: 0.3,
        shadowRadius: 50,
      },
      android: { elevation: 20 },
    }),
  };

  styles['shadow-none'] = {
    ...Platform.select({
      ios: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
      },
      android: { elevation: 0 },
    }),
  };

  // Overflow
  styles['overflow-visible'] = { overflow: 'visible' };
  styles['overflow-hidden'] = { overflow: 'hidden' };
  styles['overflow-scroll'] = { overflow: 'scroll' };

  // Z-index
  [0, 10, 20, 30, 40, 50].forEach(value => {
    styles[`z-${value}`] = { zIndex: value };
  });

  // ==================== ADVANCED CSS UTILITIES ====================

  // Aspect Ratio (React Native specific with aspectRatio property)
  styles['aspect-square'] = { aspectRatio: 1 };
  styles['aspect-video'] = { aspectRatio: 16 / 9 };
  styles['aspect-auto'] = { aspectRatio: undefined };

  // Object Fit (for Images) - use resizeMode in React Native
  styles['object-contain'] = { resizeMode: 'contain' };
  styles['object-cover'] = { resizeMode: 'cover' };
  styles['object-fill'] = { resizeMode: 'stretch' };
  styles['object-none'] = { resizeMode: 'center' };

  // Pointer Events
  styles['pointer-events-none'] = { pointerEvents: 'none' };
  styles['pointer-events-auto'] = { pointerEvents: 'auto' };
  styles['pointer-events-box-none'] = { pointerEvents: 'box-none' };
  styles['pointer-events-box-only'] = { pointerEvents: 'box-only' };

  // Transform Origin (limited support in RN)
  styles['origin-center'] = { transformOrigin: 'center' };
  styles['origin-top'] = { transformOrigin: 'top' };
  styles['origin-bottom'] = { transformOrigin: 'bottom' };
  styles['origin-left'] = { transformOrigin: 'left' };
  styles['origin-right'] = { transformOrigin: 'right' };

  // Scale transforms
  const scales = [0, 50, 75, 90, 95, 100, 105, 110, 125, 150];
  scales.forEach(value => {
    const scaleValue = value / 100;
    styles[`scale-${value}`] = { transform: [{ scale: scaleValue }] };
    styles[`scale-x-${value}`] = { transform: [{ scaleX: scaleValue }] };
    styles[`scale-y-${value}`] = { transform: [{ scaleY: scaleValue }] };
  });

  // Rotate transforms
  const rotations = [0, 45, 90, 180, 270];
  rotations.forEach(value => {
    styles[`rotate-${value}`] = { transform: [{ rotate: `${value}deg` }] };
    styles[`-rotate-${value}`] = { transform: [{ rotate: `-${value}deg` }] };
  });

  // Translate transforms (using spacing scale)
  Object.entries(spacing).forEach(([key, value]) => {
    styles[`translate-x-${key}`] = { transform: [{ translateX: value }] };
    styles[`translate-y-${key}`] = { transform: [{ translateY: value }] };
    styles[`-translate-x-${key}`] = { transform: [{ translateX: -value }] };
    styles[`-translate-y-${key}`] = { transform: [{ translateY: -value }] };
  });

  // Flex basis
  Object.entries(spacing).forEach(([key, value]) => {
    styles[`basis-${key}`] = { flexBasis: value };
  });
  styles['basis-auto'] = { flexBasis: 'auto' };
  styles['basis-full'] = { flexBasis: '100%' };
  styles['basis-1/2'] = { flexBasis: '50%' };
  styles['basis-1/3'] = { flexBasis: '33.333333%' };
  styles['basis-2/3'] = { flexBasis: '66.666667%' };
  styles['basis-1/4'] = { flexBasis: '25%' };
  styles['basis-3/4'] = { flexBasis: '75%' };

  // Order
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(value => {
    styles[`order-${value}`] = { order: value };
  });
  styles['order-first'] = { order: -9999 };
  styles['order-last'] = { order: 9999 };
  styles['order-none'] = { order: 0 };

  // Text Vertical Align
  styles['align-top'] = { textAlignVertical: 'top' };
  styles['align-middle'] = { textAlignVertical: 'center' };
  styles['align-bottom'] = { textAlignVertical: 'bottom' };

  // Include Font Padding (Android specific)
  styles['include-font-padding'] = { includeFontPadding: true };
  styles['exclude-font-padding'] = { includeFontPadding: false };

  // Text Shadow (basic support)
  styles['text-shadow-sm'] = {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  };
  styles['text-shadow'] = {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  };
  styles['text-shadow-lg'] = {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  };

  // Backface Visibility
  styles['backface-visible'] = { backfaceVisibility: 'visible' };
  styles['backface-hidden'] = { backfaceVisibility: 'hidden' };

  // Direction (for RTL support)
  styles['direction-ltr'] = { direction: 'ltr' };
  styles['direction-rtl'] = { direction: 'rtl' };

  // Writing Mode (limited support)
  styles['writing-mode-horizontal'] = { writingDirection: 'ltr' };
  styles['writing-mode-vertical'] = { writingDirection: 'rtl' };

  // Elevation (Android specific - alternative to shadow)
  [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].forEach(value => {
    styles[`elevation-${value}`] = Platform.OS === 'android' ? { elevation: value } : {};
  });

  // Image Tint Color helpers
  Object.entries(colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'string') {
      styles[`tint-${colorName}`] = { tintColor: colorValue };
    } else {
      Object.entries(colorValue).forEach(([shade, hex]) => {
        styles[`tint-${colorName}-${shade}`] = { tintColor: hex };
      });
    }
  });

  // Additional Flex utilities
  styles['flex-2'] = { flex: 2 };
  styles['flex-3'] = { flex: 3 };
  styles['flex-4'] = { flex: 4 };
  styles['flex-5'] = { flex: 5 };

  // Justify Self (for flex items)
  styles['justify-self-auto'] = { alignSelf: 'auto' };
  styles['justify-self-start'] = { alignSelf: 'flex-start' };
  styles['justify-self-end'] = { alignSelf: 'flex-end' };
  styles['justify-self-center'] = { alignSelf: 'center' };
  styles['justify-self-stretch'] = { alignSelf: 'stretch' };

  // Additional Width/Height utilities
  styles['min-w-full'] = { minWidth: '100%' };
  styles['min-h-full'] = { minHeight: '100%' };
  styles['max-w-full'] = { maxWidth: '100%' };
  styles['max-h-full'] = { maxHeight: '100%' };
  styles['min-w-0'] = { minWidth: 0 };
  styles['min-h-0'] = { minHeight: 0 };
  styles['max-w-none'] = { maxWidth: undefined };
  styles['max-h-none'] = { maxHeight: undefined };

  // Inset shortcuts
  styles['inset-0'] = { top: 0, right: 0, bottom: 0, left: 0 };
  styles['inset-x-0'] = { left: 0, right: 0 };
  styles['inset-y-0'] = { top: 0, bottom: 0 };
  styles['inset-auto'] = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };

  // Additional overflow utilities
  styles['overflow-x-hidden'] = { overflowX: 'hidden' };
  styles['overflow-y-hidden'] = { overflowY: 'hidden' };
  styles['overflow-x-visible'] = { overflowX: 'visible' };
  styles['overflow-y-visible'] = { overflowY: 'visible' };
  styles['overflow-x-scroll'] = { overflowX: 'scroll' };
  styles['overflow-y-scroll'] = { overflowY: 'scroll' };

  // Cursor (for web compatibility - no effect on mobile)
  styles['cursor-auto'] = {};
  styles['cursor-pointer'] = {};
  styles['cursor-default'] = {};
  styles['cursor-not-allowed'] = {};

  // User Select (for web compatibility)
  styles['select-none'] = { userSelect: 'none' };
  styles['select-text'] = { userSelect: 'text' };
  styles['select-all'] = { userSelect: 'all' };
  styles['select-auto'] = { userSelect: 'auto' };

  return StyleSheet.create(styles);
};

// Create stylesheet
const tw = generateStyles();

/**
 * Convert hex color to rgba with opacity
 * @param {string} hex - Hex color code
 * @param {number} opacity - Opacity value (0-100)
 * @returns {string} - rgba color string
 */
const hexToRgba = (hex, opacity) => {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Convert opacity from 0-100 to 0-1
  const alpha = opacity / 100;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


/**
 * Apply Tailwind-style classes to React Native components
 * Now supports arbitrary values like h-[5rem], w-[20px], p-[2em]
 * @param {string} classNames - Space-separated class names
 * @returns {object} - Combined style object
 *
 * Usage:
 * <View style={applyTw('flex items-center h-[5rem] w-[300px] p-[2em]')}>
 *   <Text style={applyTw('text-[18px] text-blue-500')}>Hello</Text>
 * </View>
 */
export const applyTw = (classNames) => {
  if (!classNames) return {};

  const classes = classNames.trim().split(/\s+/);
  const combinedStyle = classes.reduce((acc, className) => {
    // Check for opacity modifier (e.g., bg-black/50, text-white/80)
    if (className.includes('/')) {
      const [baseClass, opacityStr] = className.split('/');
      const opacity = parseInt(opacityStr, 10);

      if (!isNaN(opacity) && opacity >= 0 && opacity <= 100) {
        // Handle background colors with opacity
        if (baseClass.startsWith('bg-')) {
          const colorName = baseClass.replace('bg-', '');
          let colorValue = null;

          // Check if it's a simple color (black, white, transparent)
          if (colorName === 'black') colorValue = '#000000';
          else if (colorName === 'white') colorValue = '#ffffff';
          else if (colorName === 'transparent') return acc; // Skip transparent with opacity

          // Check if it's a color with shade (e.g., gray-500, blue-600)
          if (!colorValue) {
            const parts = colorName.split('-');
            if (parts.length === 2) {
              const [color, shade] = parts;
              if (colors[color] && colors[color][shade]) {
                colorValue = colors[color][shade];
              }
            }
          }

          if (colorValue) {
            return { ...acc, backgroundColor: hexToRgba(colorValue, opacity) };
          }
        }

        // Handle text colors with opacity
        if (baseClass.startsWith('text-')) {
          const colorName = baseClass.replace('text-', '');
          let colorValue = null;

          // Check if it's a simple color
          if (colorName === 'black') colorValue = '#000000';
          else if (colorName === 'white') colorValue = '#ffffff';

          // Check if it's a color with shade
          if (!colorValue) {
            const parts = colorName.split('-');
            if (parts.length === 2) {
              const [color, shade] = parts;
              if (colors[color] && colors[color][shade]) {
                colorValue = colors[color][shade];
              }
            }
          }

          if (colorValue) {
            return { ...acc, color: hexToRgba(colorValue, opacity) };
          }
        }

        // Handle border colors with opacity
        if (baseClass.startsWith('border-') && !baseClass.includes('-t') && !baseClass.includes('-b') && !baseClass.includes('-l') && !baseClass.includes('-r')) {
          const colorName = baseClass.replace('border-', '');
          let colorValue = null;

          // Check if it's a simple color
          if (colorName === 'black') colorValue = '#000000';
          else if (colorName === 'white') colorValue = '#ffffff';

          // Check if it's a color with shade
          if (!colorValue) {
            const parts = colorName.split('-');
            if (parts.length === 2) {
              const [color, shade] = parts;
              if (colors[color] && colors[color][shade]) {
                colorValue = colors[color][shade];
              }
            }
          }

          if (colorValue) {
            return { ...acc, borderColor: hexToRgba(colorValue, opacity) };
          }
        }
      }
    }

    // Check for arbitrary values
    if (className.includes('[') && className.includes(']')) {
      const arbitraryStyle = parseArbitraryValue(className);
      if (arbitraryStyle) {
        return { ...acc, ...arbitraryStyle };
      }
    }

    // Fall back to predefined styles
    if (tw[className]) {
      return { ...acc, ...StyleSheet.flatten(tw[className]) };
    }

    console.warn(`Tailwind class not found: ${className}`);
    return acc;
  }, {});

  return combinedStyle;
};

/**
 * Create a custom className prop for any component
 * Wraps a component to accept className instead of style
 *
 * Usage:
 * const StyledView = withClassName(View);
 * <StyledView className="flex items-center h-[5rem]">
 *   ...
 * </StyledView>
 */
export const withClassName = (Component) => {
  return ({ className, style, ...props }) => {
    const twStyle = className ? applyTw(className) : {};
    return <Component style={[twStyle, style]} {...props} />;
  };
};

// Export individual style objects if needed
export { tw, colors, spacing };

// Default export
export default applyTw;
