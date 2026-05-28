import { createStyleCache } from '../cache/styleCache';
import { createStyleCompiler } from '../compiler/styleCompiler';
import { normalizeClassNames } from '../parser/classParser';
import { getDeviceContext } from '../../responsive/deviceContext';
import { getThemeSignature } from '../../themes/themeRuntime';
import { getRegistrySignature } from '../registry/customRegistry';

const EMPTY_STYLE = Object.freeze({});

export const createApplyTwRuntime = options => {
  const styleCache = createStyleCache(options.cache);
  const warnedClasses = new Set();

  const warnUnknownClass = className => {
    if (!className || warnedClasses.has(className)) return;
    warnedClasses.add(className);

    if (typeof options.onUnknownClass === 'function') {
      options.onUnknownClass(className);
    }
  };

  const compiler = createStyleCompiler({
    ...options,
    warnUnknownClass,
  });

  const applyTw = classNames => {
    const normalized = normalizeClassNames(classNames);
    if (!normalized) return EMPTY_STYLE;

    const deviceContext = getDeviceContext();
    const cacheKey = [
      deviceContext.signature,
      getThemeSignature(),
      getRegistrySignature(),
      normalized,
    ].join('|');
    const cached = styleCache.get(cacheKey);

    if (cached) return cached;

    return styleCache.set(
      cacheKey,
      compiler.compile(normalized, deviceContext)
    );
  };

  return {
    applyTw,
    clearCache: () => {
      styleCache.clear();
      compiler.clearAtomicCache();
      warnedClasses.clear();
    },
    getCacheSize: styleCache.size,
  };
};

export default createApplyTwRuntime;
