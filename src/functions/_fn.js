// Zest UI - Common utility functions for React Native CLI components
import React from 'react';
import { Text } from 'react-native';

// Note: Ensure FlaticonIcons is imported or available in your scope
// import FlaticonIcons from './your-icon-font-map'; 

/**
 * Format component name for display
 * @param {string} id - Component ID (e.g., 'button', 'alert-dialog')
 * @returns {string} - Formatted name (e.g., 'Button', 'Alert Dialog')
 */
export const formatComponentName = (id) => {
  if (!id) return '';
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Generate random value for demos
 */
export const randomValue = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Delay function for async operations
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Check if component demo exists
 */
export const componentExists = (componentId, componentMap) => {
  return componentId && componentMap ? componentId in componentMap : false;
};

/**
 * Get demo data for components
 */
export const getDemoData = (type) => {
  const demoData = {
    colors: ['#000000', '#FFFFFF', '#333333', '#666666'], // Professional B&W Palette
    sizes: ['sm', 'md', 'lg', 'xl'],
    variants: ['default', 'outline', 'ghost', 'destructive', 'secondary'],
    users: [
      { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    ],
    loremShort: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    loremLong: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  };

  return demoData[type] || null;
};

/**
 * Create section wrapper for demos
 */
export const createDemoSection = (title) => {
  return {
    title,
    containerStyle: { marginBottom: 24 },
    titleStyle: { color: '#FFFFFF', fontSize: 18, fontWeight: '600', marginBottom: 12 },
    contentStyle: { flexDirection: 'row', gap: 12 },
  };
};

/**
 * Format icon name (Removes prefix and returns clean key)
 */
export const formatIconName = (iconString) => {
  if (!iconString || typeof iconString !== 'string') return '';
  const parts = iconString.split('-');
  // If your string is "fi-rr-home", this returns "home"
  return parts.length > 2 ? parts.slice(2).join('-') : iconString;
};

/**
 * Render Flaticon component
 * Professional Black & White styling
 */
export const renderFlaticon = (icon, { size = 22, color = '#FFFFFF', isSelected = false } = {}, FlaticonIcons) => {
  if (!icon || typeof icon !== 'string' || !FlaticonIcons) return null;

  const iconKey = formatIconName(icon);
  const glyph = FlaticonIcons[iconKey];

  if (!glyph) return null;

  return (
    <Text
      style={{
        fontFamily: 'uicons-regular-rounded-J3WOUERV', // Ensure this font is linked in your CLI project
        fontSize: size,
        color: isSelected ? '#FFFFFF' : color,
      }}
    >
      {glyph}
    </Text>
  );
};