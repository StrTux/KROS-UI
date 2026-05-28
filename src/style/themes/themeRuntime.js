const DEFAULT_THEME_NAME = 'dark';
const DEFAULT_THEME = {
  background: '#000000',
  foreground: '#ffffff',
  primary: '#3b82f6',
  secondary: '#9ca3af',
  accent: '#8b5cf6',
  muted: '#1f2937',
  border: '#2A2A2A',
  card: '#111111',
  text: {
    primary: '#ffffff',
    secondary: '#d1d5db',
    muted: '#9ca3af',
  },
};

let activeThemeName = DEFAULT_THEME_NAME;
let activeTheme = DEFAULT_THEME;
let themeVersion = 0;

export const setActiveTheme = (themeName, theme) => {
  if (!themeName || !theme) return themeVersion;

  if (activeThemeName === themeName && activeTheme === theme) {
    return themeVersion;
  }

  activeThemeName = themeName;
  activeTheme = theme;
  themeVersion += 1;
  return themeVersion;
};

export const getActiveThemeName = () => activeThemeName;

export const getActiveTheme = () => activeTheme;

export const getThemeSignature = () => `${activeThemeName}|${themeVersion}`;

export const primeThemeRuntime = themes => {
  if (!activeTheme && themes && themes[activeThemeName]) {
    activeTheme = themes[activeThemeName];
  }
};
