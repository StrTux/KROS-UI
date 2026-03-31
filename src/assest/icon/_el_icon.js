import React from 'react';
import { Text } from 'react-native';
import FlaticonIcons from './iconMap';

// Load the Flaticon font family
const ICON_FONT_FAMILY = 'uicons-regular-rounded';

/**
 * Render a Flaticon icon
 * @param {string} name - Icon name from iconMap (e.g., 'bag-shopping-minus', 'home', 'heart')
 * @param {number} size - Icon size in pixels
 * @param {string} color - Icon color
 * @param {object} style - Additional style object
 */
const renderIcon = (name, size = 24, color = '#000', style = {}) => {
  const iconCode = FlaticonIcons[name];

  if (!iconCode) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return (
    <Text
      style={[
        {
          fontFamily: ICON_FONT_FAMILY,
          fontSize: size,
          color: color,
        },
        style,
      ]}
    >
      {iconCode}
    </Text>
  );
};

export default renderIcon;
