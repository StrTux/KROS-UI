export const VARIANT_TYPES = {
  sm: true,
  md: true,
  lg: true,
  tablet: true,
  landscape: true,
  portrait: true,
  ios: true,
  android: true,
  web: true,
  native: true,
  dark: true,
  light: true,
};

const appendClassValue = (value, bucket) => {
  if (!value) return;

  if (typeof value === 'string') {
    bucket.push(value);
    return;
  }

  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      appendClassValue(value[index], bucket);
    }
    return;
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);

    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      if (value[key]) bucket.push(key);
    }
  }
};

export const normalizeClassNames = classNames => {
  const bucket = [];
  appendClassValue(classNames, bucket);
  return bucket.join(' ').trim().replace(/\s+/g, ' ');
};

export const splitClassNames = classNames => {
  const normalized = normalizeClassNames(classNames);
  return normalized ? normalized.split(' ') : [];
};

export const parseVariantClass = className => {
  const separatorIndex = className.indexOf(':');

  if (separatorIndex <= 0) {
    return { variants: null, utility: className };
  }

  const segments = className.split(':');
  const utility = segments.pop();
  const variants = [];

  for (let index = 0; index < segments.length; index += 1) {
    const variant = segments[index];

    if (!VARIANT_TYPES[variant]) {
      return { variants: null, utility: className };
    }

    variants.push(variant);
  }

  return {
    variants,
    utility,
  };
};
