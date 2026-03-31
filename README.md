# KROS UI

> **The shadcn/ui for React Native CLI** — Copy, paste, and customize beautiful components directly into your project.

**KROS UI** is a free, open-source collection of beautifully crafted React Native components for **iOS & Android**. Built for React Native CLI (no Expo). Copy components directly into your codebase — you own the code.

---

## ✨ Why KROS UI?

| Feature | Description |
|---|---|
| 📋 **Copy & Paste** | Like shadcn/ui — no package to install, just copy the component file |
| 🎨 **Tailwind-style Classes** | Use `applyTw('flex-1 bg-black text-white')` in React Native |
| 🅿️ **Poppins Fonts** | All 18 Poppins variants pre-linked and ready to use |
| 🌗 **Dark / Light Theme** | Built-in theme context with toggle support |
| 📱 **iOS & Android** | Every component tested on both platforms |
| 🚫 **No Expo** | Pure React Native CLI only |
| ⚡ **No config needed** | Drop files in, import, done |

---

## 📦 Components

| Component | Status | Component | Status |
|---|---|---|---|
| Accordion | ✅ Done | Item | ✅ Done |
| Alert | ✅ Done | Kbd | ✅ Done |
| Alert Dialog | ✅ Done | Label | ✅ Done |
| AI Input | ✅ Done | Menubar | ✅ Done |
| Article | ✅ Done | Music Player | ✅ Done |
| Aspect Ratio | ✅ Done | Popover | ✅ Done |
| Avatar | ✅ Done | Progress | ✅ Done |
| Badge | ✅ Done | Profile Card | ✅ Done |
| Breadcrumb | ✅ Done | Purchase Card | ✅ Done |
| Button | ✅ Done | Radio Group | ✅ Done |
| Button Group | ✅ Done | Spinner | ✅ Done |
| Calendar | ✅ Done | Streaming | ✅ Done |
| Card | ✅ Done | Switch | ✅ Done |
| Carousel | ✅ Done | Table | ✅ Done |
| Chart | ✅ Done | Tabs | ✅ Done |
| Checkbox | ✅ Done | Textarea | ✅ Done |
| Data Table | ✅ Done | Text | ✅ Done |
| Date Picker | ✅ Done | Navigation Menu | 🔄 In Progress |
| Dialog | ✅ Done | Pagination | 🔄 In Progress |
| Drawer | ✅ Done | Resizable | 🔄 In Progress |
| Dropdown Menu | ✅ Done | Scroll Area | 🔄 In Progress |
| Empty | ✅ Done | Select | 🔄 In Progress |
| Field | ✅ Done | Separator | 🔄 In Progress |
| Form | ✅ Done | Sheet | 🔄 In Progress |
| Hover Card | ✅ Done | Sidebar | 🔄 In Progress |
| Input | ✅ Done | Skeleton | 🔄 In Progress |
| Input Group | ✅ Done | Slider | 🔄 In Progress |
| Input OTP | ✅ Done | Sonner | 🔄 In Progress |
| | | Toast | 🔄 In Progress |
| | | Toggle | 🔄 In Progress |
| | | Toggle Group | 🔄 In Progress |
| | | Tooltip | 🔄 In Progress |

> **~35 components done** · More being added regularly.

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB/KROS-UI.git
cd KROS-UI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Link font assets

```bash
npm run link-assets
```

### 4. iOS — Install Pods

```bash
cd ios && pod install && cd ..
```

### 5. Run the app

```bash
# Android
npm run android

# iOS
npm run ios
```

---

## 🧩 Using a Component in Your Project

KROS UI works like **shadcn/ui** — you don't install a package, you **copy the file**.

### Step 1 — Copy the component file

Copy `src/components/ui/button.js` into your project:

```
your-app/
└── src/
    └── components/
        └── ui/
            └── button.js  ← paste here
```

### Step 2 — Copy the style engine

Copy `src/style/style.js` into your project (required for `applyTw`):

```
your-app/
└── src/
    └── style/
        └── style.js  ← paste here
```

### Step 3 — Use the component

```jsx
import { Button } from './src/components/ui/button';

// Basic usage
<Button variant="default" onPress={() => console.log('pressed')}>
  Click Me
</Button>

// With icon
<Button variant="outline" icon={<MyIcon />} iconPosition="left">
  Download
</Button>

// Loading state
<Button variant="default" loading={true}>
  Processing...
</Button>

// Disabled
<Button variant="destructive" disabled={true}>
  Unavailable
</Button>
```

---

## 🎨 Style System — `applyTw`

KROS UI includes a custom Tailwind-to-React-Native style utility called `applyTw`. Use it just like Tailwind CSS — but in React Native.

```jsx
import { applyTw } from './src/style/style';

// Replaces StyleSheet.create()
<View style={applyTw('flex-1 bg-black px-4 py-6')}>
  <Text style={applyTw('text-white text-xl font-bold')}>
    Hello KROS UI
  </Text>
</View>
```

### Supported Classes

| Category | Examples |
|---|---|
| Layout | `flex-1`, `flex-row`, `items-center`, `justify-between` |
| Spacing | `p-4`, `px-6`, `py-2`, `m-3`, `mt-4`, `gap-2` |
| Typography | `text-sm`, `text-xl`, `font-bold`, `font-semibold`, `text-center` |
| Colors | `bg-black`, `text-white`, `bg-gray-900`, `text-red-500` |
| Borders | `border`, `border-2`, `rounded-lg`, `rounded-full` |
| Sizing | `w-full`, `h-10`, `w-1/2`, `h-screen` |
| Position | `absolute`, `relative`, `top-0`, `right-4` |
| Arbitrary | `bg-[#1a1a1a]`, `h-[48px]`, `w-[80%]`, `text-[#ffffff]/50` |
| Opacity | `opacity-50`, `bg-black/30` |

---

## 🅿️ Poppins Fonts

All 18 Poppins variants are pre-linked and available as utility classes:

```jsx
// Font weights
<Text style={applyTw('font-thin')}>Thin (100)</Text>
<Text style={applyTw('font-light')}>Light (300)</Text>
<Text style={applyTw('font-regular')}>Regular (400)</Text>
<Text style={applyTw('font-medium')}>Medium (500)</Text>
<Text style={applyTw('font-semibold')}>SemiBold (600)</Text>
<Text style={applyTw('font-bold')}>Bold (700)</Text>
<Text style={applyTw('font-extrabold')}>ExtraBold (800)</Text>
<Text style={applyTw('font-black')}>Black (900)</Text>
```

---

## 🌗 Theme System

Wrap your app in `ThemeProvider` and use `useTheme()` anywhere:

```jsx
// App.js
import { ThemeProvider } from './src/style/theme';

export default function App() {
  return (
    <ThemeProvider>
      {/* your app */}
    </ThemeProvider>
  );
}

// In any component
import { useTheme } from './src/style/theme';

const MyComponent = () => {
  const { theme, currentTheme, toggleTheme } = useTheme();

  return (
    <View style={{ backgroundColor: currentTheme.background }}>
      <Text style={{ color: currentTheme.text.primary }}>
        Current: {theme}
      </Text>
      <Button onPress={toggleTheme}>Toggle Theme</Button>
    </View>
  );
};
```

---

## 📁 Project Structure

```
src/
├── assest/
│   ├── font/         # Poppins font files (.ttf)
│   └── icon/         # Flaticon icon font
├── components/
│   └── ui/           # All UI components
│       ├── index.js  # Central exports
│       ├── button.js
│       ├── card.js
│       └── ...
├── functions/
│   ├── _fn.js        # Utility helpers
│   ├── _router.js    # Simple screen router
│   └── iconUtils.js  # Icon rendering helpers
├── screen/
│   ├── HomeScreen.js       # Component showcase list
│   └── ComponentDemo.js    # Individual component demo
└── style/
    ├── style.js      # applyTw — Tailwind utility engine
    └── theme.js      # Dark/light theme context
```

---

## 🔧 Dependencies

```json
{
  "react-native": "0.74.3",
  "react-native-reanimated": "~3.10.1",
  "react-native-safe-area-context": "^4.14.1",
  "react-native-linear-gradient": "^2.8.3",
  "react-native-svg": "^14.2.0",
  "react-native-video": "^6.18.0",
  "react-native-webview": "^13.16.0",
  "@react-native-community/slider": "^5.1.1",
  "class-variance-authority": "^0.7.1",
  "date-fns": "^3.0.0"
}
```

---

## 📜 Available Scripts

```bash
npm start              # Start Metro bundler
npm run android        # Run on Android
npm run ios            # Run on iOS
npm run lint           # Run ESLint
npm run link-assets    # Link Poppins font assets
```

---

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a PR.

### To add a new component:
1. Create `src/components/ui/your-component.js`
2. Export the component + a `YourComponentDemo` default export
3. Register in `src/components/ui/index.js`
4. Add to the list in `src/screen/HomeScreen.js`
5. Add to `COMPONENT_MAP` in `src/screen/ComponentDemo.js`

See [GUID.md](./GUID.md) for a full step-by-step component development guide.

---

## 📄 License

MIT © KROS UI Contributors

See [LICENSE](./LICENSE) for details.

---

## ⭐ Support

If KROS UI helps your project, give it a ⭐ on GitHub — it really helps!

> **Status**: 🚧 Active Development — ~35% complete, new components added regularly.
