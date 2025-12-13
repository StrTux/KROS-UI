// Common utility functions for UI components

/**
 * Format component name for display
 * @param {string} id - Component ID (e.g., 'button', 'alert-dialog')
 * @returns {string} - Formatted name (e.g., 'Button', 'Alert Dialog')
 */
export const formatComponentName = (id) => {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Generate random value for demos
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random number
 */
export const randomValue = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Delay function for async operations
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Check if component demo exists
 * @param {string} componentId - Component ID
 * @param {object} componentMap - Component mapping object
 * @returns {boolean}
 */
export const componentExists = (componentId, componentMap) => {
  return componentId in componentMap;
};

/**
 * Get demo data for components
 * @param {string} type - Type of demo data needed
 * @returns {array|object}
 */
export const getDemoData = (type) => {
  const demoData = {
    colors: ['red', 'blue', 'green', 'yellow', 'purple', 'pink'],
    sizes: ['sm', 'md', 'lg', 'xl'],
    variants: ['default', 'outline', 'ghost', 'destructive', 'secondary'],
    users: [
      { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      { name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
    ],
    loremShort: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    loremLong: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  };

  return demoData[type] || null;
};

/**
 * Create section wrapper for demos
 * @param {string} title - Section title
 * @returns {object} - Style configuration
 */
export const createDemoSection = (title) => {
  return {
    title,
    containerStyle: 'mb-6',
    titleStyle: 'text-white text-lg font-semibold mb-3',
    contentStyle: 'gap-3',
  };
<<<<<<< HEAD






  formatIconName = (iconString) => {
    // console.log('Formatting icon name:', iconString);
    if (!iconString || typeof iconString !== 'string') return '';
    const parts = iconString.split('-');
    const remainingParts = parts.slice(2);
    // console.log('Remaining parts:', remainingParts.join('-'));
    // Sirf icon key output (e.g. "home", "user", "terms-check")
    return remainingParts.join('-');
  };



  renderFlaticon = (icon, { size = 22, color = '#4B5563', isSelected = false } = {}) => {
    // console.log('Rendering icon:', icon, size, color, isSelected);
    // console.log('FlaticonIcons available:', !!FlaticonIcons);
    let glyph;
    let iconKey;
    if (!icon || typeof icon !== 'string') return null;
    // console.log('Icon string:', icon);
    iconKey = this.formatIconName(icon);
    // console.log('Formatted icon key:', iconKey);
    glyph = iconKey && FlaticonIcons[iconKey];
    // console.log('Rendering icon:', iconKey, 'glyph:', glyph);
    if (!glyph) {
      // console.log('No glyph found for key:', iconKey);
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

=======
>>>>>>> c5488638a7dcafba53c26bf5bfa83913d44a125f
};
