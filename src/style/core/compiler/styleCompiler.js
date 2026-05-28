import { Platform, StyleSheet } from 'react-native';
import { splitClassNames, parseVariantClass } from '../parser/classParser';
import { createTransformCollector, stripTransform } from '../transforms/transformCollector';
import { matchesResponsiveVariant } from '../../responsive/deviceContext';
import { resolveSemanticTokenStyle } from '../../tokens/semanticTokens';
import { getActiveThemeName } from '../../themes/themeRuntime';
import { resolveCustomUtility } from '../registry/customRegistry';

const EMPTY_STYLE = Object.freeze({});

const RESPONSIVE_VARIANTS = {
  sm: true,
  md: true,
  lg: true,
  tablet: true,
  landscape: true,
  portrait: true,
};

const matchesVariant = (variant, deviceContext) => {
  if (RESPONSIVE_VARIANTS[variant]) {
    return matchesResponsiveVariant(variant, deviceContext);
  }

  if (variant === 'ios') return Platform.OS === 'ios';
  if (variant === 'android') return Platform.OS === 'android';
  if (variant === 'web') return Platform.OS === 'web';
  if (variant === 'native') return Platform.OS === 'ios' || Platform.OS === 'android';
  if (variant === 'dark') return getActiveThemeName() === 'dark';
  if (variant === 'light') return getActiveThemeName() === 'light';

  return false;
};

const matchesVariants = (variants, deviceContext) => {
  if (!variants || !variants.length) return true;

  for (let index = 0; index < variants.length; index += 1) {
    if (!matchesVariant(variants[index], deviceContext)) {
      return false;
    }
  }

  return true;
};

export const createStyleCompiler = ({
  registry,
  parseArbitraryValue,
  warnUnknownClass = () => {},
}) => {
  const atomicCache = new Map();

  const resolveAtomicStyle = className => {
    const tokenStyle = resolveSemanticTokenStyle(className);
    if (tokenStyle) {
      return tokenStyle;
    }

    if (atomicCache.has(className)) {
      return atomicCache.get(className);
    }

    const customStyle = resolveCustomUtility(className);
    if (customStyle) {
      atomicCache.set(className, customStyle);
      return customStyle;
    }

    if (className.includes('[') && className.includes(']')) {
      const arbitraryStyle = parseArbitraryValue(className);
      if (arbitraryStyle) {
        atomicCache.set(className, arbitraryStyle);
        return arbitraryStyle;
      }
    }

    const registeredStyle = registry[className];
    if (registeredStyle) {
      const flattened = StyleSheet.flatten(registeredStyle) || EMPTY_STYLE;
      atomicCache.set(className, flattened);
      return flattened;
    }

    atomicCache.set(className, null);
    return null;
  };

  const compile = (classNames, deviceContext) => {
    const classes = splitClassNames(classNames);
    if (!classes.length) return EMPTY_STYLE;

    const style = {};
    const transformCollector = createTransformCollector();
    let hasStyle = false;
    let hasTransform = false;

    for (let index = 0; index < classes.length; index += 1) {
      const parsed = parseVariantClass(classes[index]);

      if (!matchesVariants(parsed.variants, deviceContext)) {
        continue;
      }

      const atomicStyle = resolveAtomicStyle(parsed.utility);

      if (!atomicStyle) {
        warnUnknownClass(parsed.utility);
        continue;
      }

      if (atomicStyle.transform) {
        hasTransform = transformCollector.add(atomicStyle) || hasTransform;
      }

      const source = atomicStyle.transform ? stripTransform(atomicStyle) : atomicStyle;
      const keys = Object.keys(source);

      for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
        const key = keys[keyIndex];
        style[key] = source[key];
        hasStyle = true;
      }
    }

    if (hasTransform && transformCollector.hasValues()) {
      style.transform = transformCollector.toArray();
      hasStyle = true;
    }

    return hasStyle ? style : EMPTY_STYLE;
  };

  return {
    compile,
    clearAtomicCache: () => atomicCache.clear(),
  };
};

export default createStyleCompiler;
