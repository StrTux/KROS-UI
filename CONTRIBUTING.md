# Contributing to KROS UI

Thank you for your interest in contributing to **KROS UI**! 🎉

KROS UI is a React Native CLI component library for iOS & Android — like shadcn/ui but for React Native. Contributors add new components, fix bugs, improve documentation, or help review PRs.

---

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Adding a New Component](#adding-a-new-component)
- [Component File Structure](#component-file-structure)
- [Demo Component Pattern](#demo-component-pattern)
- [Style Guidelines](#style-guidelines)
- [PR Checklist](#pr-checklist)
- [Code of Conduct](#code-of-conduct)

---

## How to Contribute

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/KROS-UI.git
   cd KROS-UI
   npm install
   ```
3. **Create a branch** with a descriptive name:
   ```bash
   git checkout -b feat/add-tooltip-component
   git checkout -b fix/button-disabled-state
   git checkout -b docs/improve-readme
   ```
4. **Make your changes** (see below)
5. **Test on both platforms** (Android + iOS)
6. **Submit a Pull Request** against `main`

---

## Adding a New Component

Every component in KROS UI requires changes to **4 files**:

### Step 1 — Create the component file

```
src/components/ui/your_component.js
```

Use this template:

```jsx
import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';

// ==================== COMPONENT ====================

export const YourComponent = ({
  children,
  variant = 'default',
  // ...other props
}) => {
  return (
    <View style={applyTw('...')}>
      {children}
    </View>
  );
};

// ==================== DEMO ====================

const YourComponentDemo = () => {
  return (
    <ScrollView
      style={applyTw('flex-1')}
      contentContainerStyle={applyTw('p-5 gap-8')}
    >
      {/* Header */}
      <View style={applyTw('gap-2')}>
        <Text style={applyTw('text-white text-3xl font-bold')}>
          YourComponent
        </Text>
        <Text style={applyTw('text-gray-400 text-base')}>
          Brief description of this component
        </Text>
      </View>

      {/* Demo sections */}
      <View style={applyTw('gap-4')}>
        <Text style={applyTw('text-white text-xl font-semibold')}>
          🎨 Variants
        </Text>
        <YourComponent variant="default">Default</YourComponent>
      </View>
    </ScrollView>
  );
};

export default YourComponentDemo;
```

### Step 2 — Register in index.js

Open `src/components/ui/index.js` and add:

```js
// Demo export (for the showcase app)
export { default as YourComponentDemo } from './your_component';

// Individual component exports (for users copying the file)
export { YourComponent } from './your_component';
```

### Step 3 — Add to HomeScreen list

Open `src/screen/HomeScreen.js` and add to the `components` array:

```js
{ id: 'your-component', name: 'Your Component', status: 'done' },
```

### Step 4 — Add to ComponentDemo map

Open `src/screen/ComponentDemo.js` and add to `COMPONENT_MAP`:

```js
'your-component': UIComponents.YourComponentDemo,
```

---

## Component File Structure

Every component file **must** contain:

| Section | Required | Description |
|---|---|---|
| Component export | ✅ | The actual reusable component (named export) |
| Demo export | ✅ | `default export` — a demo/showcase of the component |
| JSDoc comments | ✅ | At minimum a `/** Component description */` block |
| No hardcoded colors | ✅ | Use `applyTw()` classes, not inline `style={{ color: '#fff' }}` |

---

## Demo Component Pattern

All demos must follow this structure:

```jsx
const YourComponentDemo = () => (
  <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8')}>
    {/* 1. Header */}
    <View style={applyTw('gap-2')}>
      <Text style={applyTw('text-white text-3xl font-bold')}>Component Name</Text>
      <Text style={applyTw('text-gray-400 text-base')}>Short description</Text>
    </View>

    {/* 2. Sections — one per variant/feature */}
    <View style={applyTw('gap-4')}>
      <Text style={applyTw('text-white text-xl font-semibold')}>🎨 Variants</Text>
      {/* demo content */}
    </View>
  </ScrollView>
);
```

---

## Style Guidelines

### ✅ Do

```jsx
// Use applyTw for ALL styles
<View style={applyTw('flex-1 bg-black px-4 gap-3')}>

// Use arbitrary values for custom values
<View style={applyTw('bg-[#1a1a1a] h-[48px] rounded-[10px]')}>

// Use opacity modifier
<View style={applyTw('bg-white/10 border-white/20')}>
```

### ❌ Don't

```jsx
// Don't use StyleSheet.create
const styles = StyleSheet.create({ container: { flex: 1 } });

// Don't use inline style objects (for standard values)
<View style={{ flex: 1, backgroundColor: '#000000', padding: 16 }}>

// Don't hardcode font sizes (use class names)
<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
```

### Font Usage

Always use Poppins via `applyTw` font classes:

```jsx
<Text style={applyTw('font-regular text-base text-white')}>Regular</Text>
<Text style={applyTw('font-semibold text-lg text-white')}>SemiBold</Text>
<Text style={applyTw('font-bold text-xl text-white')}>Bold</Text>
```

---

## PR Checklist

Before submitting your PR, confirm:

- [ ] Component renders correctly on **Android**
- [ ] Component renders correctly on **iOS**
- [ ] `applyTw` used for all styles (no raw StyleSheet or inline styles)
- [ ] Named export for the component (for users to import)
- [ ] Default export for the demo component
- [ ] Registered in `src/components/ui/index.js`
- [ ] Added to `HomeScreen.js` components list
- [ ] Added to `ComponentDemo.js` COMPONENT_MAP
- [ ] Status set to `'done'` (or `'progress'` if partial)
- [ ] No `console.log` left in production code
- [ ] JSDoc comment on the main component export

---

## Code of Conduct

Be kind, be helpful, be respectful. Contributions from all experience levels are welcome.

---

## Questions?

Open a [GitHub Issue](../../issues) or start a [Discussion](../../discussions).

Thank you for contributing to KROS UI! 🚀
