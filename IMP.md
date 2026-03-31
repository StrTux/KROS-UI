# IMP — Important Notes & Architecture

> Internal architecture reference for **KROS UI** contributors and maintainers.

---

## 1. The `applyTw` Style Engine

**File**: `src/style/style.js`

`applyTw` is KROS UI's custom Tailwind CSS → React Native StyleSheet mapper. It replaces `StyleSheet.create()` with string-based utility classes.

### How It Works

```js
import { applyTw } from '../style/style';

// Input:  string of class names
// Output: React Native StyleSheet-compatible object
applyTw('flex-1 bg-black px-4 py-6 rounded-lg')
// → { flex: 1, backgroundColor: '#000000', paddingHorizontal: 16, paddingVertical: 24, borderRadius: 8 }
```

### Architecture

```
applyTw(classString)
    ↓
1. Split string by spaces → ['flex-1', 'bg-black', ...]
2. For each class:
   a. Check pre-generated styles map (exact match) → fast lookup
   b. Try parseArbitraryValue() for bracket values: bg-[#fff], h-[48px]
   c. Try parseColorWithOpacity() for opacity syntax: bg-black/50
3. Merge all matched style objects
4. Return final merged object
```

### Pre-generated Styles

On module load, `generateStyles()` builds a flat `{className: styleObject}` map covering:
- All spacing (p, m, gap) × all scale values
- All Tailwind colors (bg, text, border) × all shades
- Typography (font sizes, weights, families)
- Layout (flex, position, sizing)
- Borders, shadows, opacity

### Arbitrary Values

Syntax: `property-[value]` — supports px, rem, em, %, hex, rgba:

```js
applyTw('h-[5rem]')         // → { height: 80 }
applyTw('bg-[#1a1a1a]')     // → { backgroundColor: '#1a1a1a' }
applyTw('w-[80%]')          // → { width: '80%' }
applyTw('bg-[#000]/50')     // → { backgroundColor: 'rgba(0,0,0,0.5)' }
```

### Opacity Modifier

```js
applyTw('bg-white/20')       // → { backgroundColor: 'rgba(255,255,255,0.2)' }
applyTw('text-black/80')     // → { color: 'rgba(0,0,0,0.8)' }
```

---

## 2. Font System (Poppins)

**File**: `src/style/style.js` (top of file), `react-native.config.js`, `src/assest/font/`

### Linked Fonts

All 18 Poppins variants are linked via `react-native-asset`:

| Class | Font File | Weight |
|---|---|---|
| `font-thin` | Poppins-Thin.ttf | 100 |
| `font-extralight` | Poppins-ExtraLight.ttf | 200 |
| `font-light` | Poppins-Light.ttf | 300 |
| `font-regular` / `font-normal` | Poppins-Regular.ttf | 400 |
| `font-medium` | Poppins-Medium.ttf | 500 |
| `font-semibold` | Poppins-SemiBold.ttf | 600 |
| `font-bold` | Poppins-Bold.ttf | 700 |
| `font-extrabold` | Poppins-ExtraBold.ttf | 800 |
| `font-black` | Poppins-Black.ttf | 900 |

Italic variants: `Poppins-*Italic.ttf` for all weights.

### Re-linking Fonts

If fonts break after `npm install` or a clean build:

```bash
npm run link-assets       # Links font assets
cd ios && pod install     # iOS only
```

---

## 3. Icon System (Flaticon / UIcons)

**File**: `src/functions/iconUtils.js`, `src/functions/_fn.js`, `src/assest/icon/`

KROS UI uses the **UIcons** icon font from Flaticon.

### Usage Pattern

```jsx
import { renderFlaticon } from '../functions/iconUtils';

// Renders a Flaticon icon glyph via font
const ArrowIcon = () => renderFlaticon('fi fi-tr-arrow-right', { size: 16, color: '#ffffff' });
```

### Font Name

```
uicons-regular-rounded-J3WOUERV
```

This must be linked in `react-native.config.js` as an asset.

### Icon Name Format

Icons use the CSS class name format `fi fi-tr-icon-name`. The `renderFlaticon` helper strips the prefix and looks up the glyph character from the icon map.

---

## 4. Theme System

**File**: `src/style/theme.js`

```
ThemeContext
   ├── theme: 'dark' | 'light'
   ├── currentTheme: { background, foreground, primary, card, border, text: { primary, secondary, muted } }
   └── toggleTheme: () => void
```

### Usage

```jsx
// Wrap app
<ThemeProvider>
  <App />
</ThemeProvider>

// Use inside any component
const { theme, currentTheme, toggleTheme } = useTheme();
```

---

## 5. Navigation / Router

**File**: `src/functions/_router.js`, `App.js`

KROS UI uses a **custom minimal router** — no React Navigation dependency.

```
App.js
  state: currentScreen, screenParams
  ↓
renderScreen() → switch(currentScreen)
  'home'             → <HomeScreen onNavigate={...} />
  'component-detail' → <ComponentDemo componentId={...} onNavigate={...} />
```

`onNavigate(screenName, params)` is passed as a prop to each screen.

**Android back button** is handled in `ComponentDemo.js` via `BackHandler`.

---

## 6. Component Pattern Convention

Every component file follows this structure:

```
imports
  ↓
CONSTANTS (variant/size style maps)
  ↓
export const ComponentName = (props) => { ... }   ← named export (user copies this)
  ↓
export const ComponentNameDemo = () => { ... }     ← default demo (used in showcase app)
  ↓
export default ComponentNameDemo
```

---

## 7. Known Limitations

| Limitation | Notes |
|---|---|
| `applyTw` is runtime-computed | Not as fast as static StyleSheet. For production performance-critical lists, use StyleSheet directly. |
| No web support | Designed iOS + Android only. React Native Web not tested. |
| No React Navigation | Uses a custom minimal router. To use React Navigation, replace `App.js` router logic. |
| Animations | `react-native-reanimated` is installed but not all components use it yet. |
| Empty components | 16 components are registered but not yet implemented (see HomeScreen.js list). |
| Icon dependency | Flaticon UIcons font must be present and linked for icon rendering. |
