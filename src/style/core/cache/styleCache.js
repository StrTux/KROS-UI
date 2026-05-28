const DEFAULT_MAX_ENTRIES = 1500;

/**
 * Small LRU cache tuned for repeated class strings in render-heavy RN views.
 * Map preserves insertion order, so refresh-on-read is O(1) enough for Hermes.
 */
export const createStyleCache = ({ maxEntries = DEFAULT_MAX_ENTRIES } = {}) => {
  const entries = new Map();

  const get = key => {
    if (!entries.has(key)) return undefined;

    const value = entries.get(key);
    entries.delete(key);
    entries.set(key, value);
    return value;
  };

  const set = (key, value) => {
    if (entries.has(key)) {
      entries.delete(key);
    } else if (entries.size >= maxEntries) {
      const oldestKey = entries.keys().next().value;
      entries.delete(oldestKey);
    }

    entries.set(key, value);
    return value;
  };

  return {
    get,
    set,
    clear: () => entries.clear(),
    size: () => entries.size,
  };
};

export default createStyleCache;
