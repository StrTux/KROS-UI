// Icon rendering utility for Flaticon fonts
import React from 'react';
import { Text } from 'react-native';
import FlaticonIcons from '../assest/icon/iconMap';

/**
 * Format icon name from full string to key
 * Example: 'fi-rr-waveform' => 'waveform'
 */
export const formatIconName = (iconString) => {
    if (!iconString || typeof iconString !== 'string') return '';
    const parts = iconString.split('-');
    const remainingParts = parts.slice(2);
    return remainingParts.join('-');
};

/**
 * Render Flaticon font icon
 * @param {string} icon - Icon name or full icon string
 * @param {object} options - Rendering options
 * @param {number} options.size - Icon size in pixels
 * @param {string} options.color - Icon color
 * @returns {React.Element} Text component with icon glyph
 */
export const renderFlaticon = (icon, { size = 22, color = '#4B5563' } = {}) => {
    if (!icon || typeof icon !== 'string') return null;

    // Try to get the icon key
    let iconKey = icon.includes('-') ? formatIconName(icon) : icon;
    const glyph = FlaticonIcons[iconKey];

    if (!glyph) {
        console.warn(`Icon "${iconKey}" not found in FlaticonIcons`);
        return null;
    }

    return (
        <Text
            style={{
                fontFamily: 'uicons-regular-rounded-J3WOUERV',
                fontSize: size,
                color: color,
            }}
        >
            {glyph}
        </Text>
    );
};

// Export icon map for direct access
export { FlaticonIcons };
