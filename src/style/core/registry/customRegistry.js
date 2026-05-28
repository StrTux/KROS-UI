const customUtilities = new Map();
let registryVersion = 0;

const normalizeStyle = value => {
  if (!value || typeof value !== 'object') return null;
  return Object.freeze({ ...value });
};

export const registerTwUtility = (className, style) => {
  if (!className || typeof className !== 'string') {
    return registryVersion;
  }

  const normalized = normalizeStyle(style);
  if (!normalized) return registryVersion;

  customUtilities.set(className, normalized);
  registryVersion += 1;
  return registryVersion;
};

export const registerTwUtilities = utilities => {
  if (!utilities || typeof utilities !== 'object') {
    return registryVersion;
  }

  const keys = Object.keys(utilities);
  let changed = false;

  for (let index = 0; index < keys.length; index += 1) {
    const className = keys[index];
    const normalized = normalizeStyle(utilities[className]);

    if (normalized) {
      customUtilities.set(className, normalized);
      changed = true;
    }
  }

  if (changed) registryVersion += 1;
  return registryVersion;
};

export const resolveCustomUtility = className => customUtilities.get(className) || null;

export const getRegistrySignature = () => `custom:${registryVersion}`;

export const clearCustomUtilities = () => {
  customUtilities.clear();
  registryVersion += 1;
  return registryVersion;
};
