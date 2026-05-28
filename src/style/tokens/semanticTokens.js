import { getActiveTheme } from '../themes/themeRuntime';

const TOKEN_KEYS = {
  background: theme => theme.background,
  foreground: theme => theme.foreground,
  primary: theme => theme.primary,
  secondary: theme => theme.secondary,
  accent: theme => theme.accent,
  muted: theme => theme.muted,
  border: theme => theme.border,
  card: theme => theme.card,
  'text-primary': theme => theme.text && theme.text.primary,
  'text-secondary': theme => theme.text && theme.text.secondary,
  'text-muted': theme => theme.text && theme.text.muted,
};

const resolveToken = token => {
  const theme = getActiveTheme();
  const resolver = TOKEN_KEYS[token];

  if (!theme || !resolver) return null;
  return resolver(theme) || null;
};

export const resolveSemanticTokenStyle = className => {
  if (!className || typeof className !== 'string') return null;

  if (className.startsWith('bg-')) {
    const value = resolveToken(className.slice(3));
    return value ? { backgroundColor: value } : null;
  }

  if (className.startsWith('border-')) {
    const value = resolveToken(className.slice(7));
    return value ? { borderColor: value } : null;
  }

  if (className.startsWith('text-')) {
    const token = className.slice(5);
    const value = resolveToken(`text-${token}`) || resolveToken(token);
    return value ? { color: value } : null;
  }

  return null;
};
