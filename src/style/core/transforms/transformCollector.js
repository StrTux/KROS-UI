const TRANSFORM_KEYS = {
  scale: true,
  scaleX: true,
  scaleY: true,
  rotate: true,
  rotateX: true,
  rotateY: true,
  skewX: true,
  skewY: true,
  translateX: true,
  translateY: true,
};

export const createTransformCollector = () => {
  const transforms = [];

  const add = style => {
    if (!style || !Array.isArray(style.transform)) return false;

    for (let index = 0; index < style.transform.length; index += 1) {
      const item = style.transform[index];
      if (!item) continue;

      const key = Object.keys(item)[0];
      if (TRANSFORM_KEYS[key]) {
        transforms.push(item);
      }
    }

    return transforms.length > 0;
  };

  return {
    add,
    hasValues: () => transforms.length > 0,
    toArray: () => transforms.slice(),
  };
};

export const stripTransform = style => {
  if (!style || !style.transform) return style;

  const next = {};
  const keys = Object.keys(style);

  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    if (key !== 'transform') {
      next[key] = style[key];
    }
  }

  return next;
};
