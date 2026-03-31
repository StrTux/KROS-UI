# GUID — Component Development Guide

> Step-by-step guide to building a new component for **KROS UI**.

---

## Overview

Every component in KROS UI has the same structure:

```
src/components/ui/your_component.js
    ├── Imports
    ├── Style constants (variant/size maps)
    ├── export const YourComponent = ...    ← The actual reusable component
    ├── export const YourComponentDemo = ... ← Showcase demo
    └── export default YourComponentDemo
```

You then register the component in 3 more places so it appears in the showcase app.

---

## Step-by-Step Guide

### Step 1 — Look at an existing component

Before writing a new one, read a complete, simple component:

- Simple: `src/components/ui/badge.js`, `src/components/ui/progress.js`
- Medium: `src/components/ui/input.js`, `src/components/ui/switch.js`
- Complex: `src/components/ui/button.js`, `src/components/ui/dialog.js`

### Step 2 — Create your component file

**File**: `src/components/ui/your_component.js`

```jsx
import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';

// ==========================================
// STEP A: Define style constant maps
// ==========================================

// Map variant names to applyTw class strings
const VARIANT_STYLES = {
  default: 'bg-white border-gray-300',
  outline: 'bg-transparent border-gray-600',
  ghost:   'bg-transparent border-transparent',
};

const TEXT_VARIANT_STYLES = {
  default: 'text-black',
  outline: 'text-white',
  ghost:   'text-white',
};

const SIZE_STYLES = {
  sm:      'h-8 px-3',
  default: 'h-10 px-4',
  lg:      'h-12 px-6',
};

// ==========================================
// STEP B: The reusable component (NAMED EXPORT)
// ==========================================

/**
 * YourComponent — Brief description of what this component does.
 *
 * @param {string} variant - Visual style: 'default' | 'outline' | 'ghost'
 * @param {string} size    - Size: 'sm' | 'default' | 'lg'
 * @param {function} onPress - Callback when pressed
 * @param {boolean} disabled - Disable interaction
 * @param {ReactNode} children - Content
 */
export const YourComponent = ({
  variant = 'default',
  size = 'default',
  onPress,
  disabled = false,
  children,
}) => {
  const variantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.default;
  const textClass    = TEXT_VARIANT_STYLES[variant] || TEXT_VARIANT_STYLES.default;
  const sizeClass    = SIZE_STYLES[size] || SIZE_STYLES.default;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={applyTw(
        `${variantClass} ${sizeClass} border rounded-md items-center justify-center ${
          disabled ? 'opacity-50' : ''
        }`
      )}
    >
      <Text style={applyTw(`${textClass} font-medium text-sm`)}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

// ==========================================
// STEP C: Demo component (DEFAULT EXPORT)
// ==========================================

const YourComponentDemo = () => {
  return (
    <ScrollView
      style={applyTw('flex-1')}
      contentContainerStyle={applyTw('p-5 gap-8')}
    >
      {/* Header ------------------------------------------------- */}
      <View style={applyTw('gap-2')}>
        <Text style={applyTw('text-white text-3xl font-bold')}>
          YourComponent
        </Text>
        <Text style={applyTw('text-gray-400 text-base')}>
          Brief description of this component and its use cases.
        </Text>
      </View>

      {/* Section 1: Variants ------------------------------------ */}
      <View style={applyTw('gap-4')}>
        <Text style={applyTw('text-white text-xl font-semibold')}>
          🎨 Variants
        </Text>
        <Text style={applyTw('text-gray-400 text-sm')}>
          Different visual styles for various use cases.
        </Text>

        <View style={applyTw('bg-black border border-[#ffffff20] rounded-lg p-4 gap-3')}>
          <View style={applyTw('gap-2')}>
            <Text style={applyTw('text-gray-400 text-xs')}>Default</Text>
            <YourComponent variant="default">Default</YourComponent>
          </View>
          <View style={applyTw('gap-2')}>
            <Text style={applyTw('text-gray-400 text-xs')}>Outline</Text>
            <YourComponent variant="outline">Outline</YourComponent>
          </View>
          <View style={applyTw('gap-2')}>
            <Text style={applyTw('text-gray-400 text-xs')}>Ghost</Text>
            <YourComponent variant="ghost">Ghost</YourComponent>
          </View>
        </View>
      </View>

      {/* Section 2: Sizes -------------------------------------- */}
      <View style={applyTw('gap-4')}>
        <Text style={applyTw('text-white text-xl font-semibold')}>
          📏 Sizes
        </Text>
        <View style={applyTw('bg-black border border-[#ffffff20] rounded-lg p-4 gap-3')}>
          <YourComponent variant="outline" size="sm">Small</YourComponent>
          <YourComponent variant="outline" size="default">Default</YourComponent>
          <YourComponent variant="outline" size="lg">Large</YourComponent>
        </View>
      </View>

      {/* Section 3: States ------------------------------------- */}
      <View style={applyTw('gap-4 mb-8')}>
        <Text style={applyTw('text-white text-xl font-semibold')}>
          ⚙️ States
        </Text>
        <View style={applyTw('bg-black border border-[#ffffff20] rounded-lg p-4 gap-3')}>
          <YourComponent disabled>Disabled</YourComponent>
        </View>
      </View>
    </ScrollView>
  );
};

export default YourComponentDemo;
```

---

### Step 3 — Register in `index.js`

Open `src/components/ui/index.js` and add these two exports:

```js
// 1. Demo export (for the showcase app)
export { default as YourComponentDemo } from './your_component';

// 2. Component export (for users copying the file into their projects)
export { YourComponent } from './your_component';
```

**Naming convention:**

| Export type | Pattern | Example |
|---|---|---|
| Demo | `{Name}Demo` default export | `export { default as ButtonDemo }` |
| Component | Named export | `export { Button }` |

---

### Step 4 — Add to `HomeScreen.js`

Open `src/screen/HomeScreen.js` and add to the `components` array (keep it alphabetically sorted):

```js
const components = [
  // ... existing components ...
  { id: 'your-component', name: 'Your Component', status: 'done' },
  // ...
];
```

**`status` values:**
- `'done'` → shows green badge, component is fully working
- `'progress'` → shows gray badge, component is in progress

---

### Step 5 — Add to `ComponentDemo.js`

Open `src/screen/ComponentDemo.js` and add to `COMPONENT_MAP`:

```js
const COMPONENT_MAP = {
  // ... existing entries ...
  'your-component': UIComponents.YourComponentDemo,
};
```

The key must match the `id` you used in `HomeScreen.js`.

---

## Checklist Before Submitting

```
✅ Component file created at src/components/ui/your_component.js
✅ Named export for reusable component
✅ Default export for demo component
✅ All styles use applyTw() — no StyleSheet.create, no inline style objects
✅ JSDoc comment on the main component
✅ Registered in src/components/ui/index.js (both demo and component exports)
✅ Added to HomeScreen.js components array
✅ Added to ComponentDemo.js COMPONENT_MAP
✅ Tested on Android
✅ Tested on iOS
✅ No console.log in production code
```

---

## Common Patterns

### State-based component

```jsx
export const Toggle = ({ defaultValue = false, onChange }) => {
  const [isOn, setIsOn] = useState(defaultValue);

  const handlePress = () => {
    const next = !isOn;
    setIsOn(next);
    onChange?.(next);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}
      style={applyTw(`w-12 h-6 rounded-full ${isOn ? 'bg-white' : 'bg-gray-600'}`)}>
    </TouchableOpacity>
  );
};
```

### Compound component pattern (like Card)

```jsx
export const Card = ({ children, className = '' }) => (
  <View style={applyTw(`bg-[#111111] border border-[#2A2A2A] rounded-lg ${className}`)}>
    {children}
  </View>
);

export const CardHeader = ({ children }) => (
  <View style={applyTw('px-4 pt-4 pb-2')}>{children}</View>
);

export const CardContent = ({ children }) => (
  <View style={applyTw('px-4 pb-4')}>{children}</View>
);
```

### Using icons

```jsx
import { renderFlaticon } from '../../functions/iconUtils';

const StarIcon = () => renderFlaticon('fi fi-tr-star', { size: 16, color: '#ffffff' });

// Use in JSX:
<StarIcon />
```

---

## File Naming Convention

| What | Convention | Example |
|---|---|---|
| Component file | `snake_case.js` | `input_otp.js` |
| Component ID (HomeScreen/ComponentDemo) | `kebab-case` | `'input-otp'` |
| Export name | `PascalCase` | `InputOTP`, `InputOTPDemo` |

---

## Questions?

- See [IMP.md](./IMP.md) for architecture details
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for PR process
- Open an issue on GitHub if you're stuck
