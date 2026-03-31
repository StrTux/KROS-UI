Viewed GUID.md:1-324
Viewed metro.config.js:1-23
Viewed style.js:1-800
Viewed style.js:800-1000
Viewed style.js:1100-1260

Ab main clearly explain karta hun dono concepts ko — Fonts aur `applyTw`.

---

## 🔤 Fonts Kaise Kaam Karte Hain

### 1. Font Files (Assets)

Tumhare project mein **Poppins** font family ke saare weights registered hain `style.js` ke andar:

```js
// src/style/style.js (line 11-30)
const fonts = {
  thin: 'Poppins-Thin',
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  // ... aur bhi
};
```

Yeh **string names** wahi font file names hain jo physically tumhare `assets/fonts/` folder mein honi chahiye (e.g. `Poppins-Bold.ttf`).

### 2. Font Weights Map

```js
const fontWeights = {
  thin: '100', light: '300', regular: '400',
  medium: '500', semiBold: '600', bold: '700',
  extraBold: '800', black: '900',
};
```

### 3. Font Classes applyTw ke through

```js
// line 611-619 mein yeh classes banti hain:
styles['font-medium']   = { fontFamily: 'Poppins-Medium',  fontWeight: '500' };
styles['font-bold']     = { fontFamily: 'Poppins-Bold',    fontWeight: '700' };
styles['font-semibold'] = { fontFamily: 'Poppins-SemiBold',fontWeight: '600' };
```

### 4. Usage

```jsx
<Text style={applyTw('text-white text-3xl font-bold')}>
  Hello
</Text>
// Result:
// { color: '#ffffff', fontSize: 30, fontFamily: 'Poppins-Bold', fontWeight: '700' }
```

---

## ⚡ `applyTw` Kya Hai aur Kaise Kaam Karta Hai

`applyTw` ek **custom TailwindCSS-to-React Native style converter** hai — yani **web ka Tailwind** React Native ke liye manually implement kiya gaya hai bina kisi library ke!

### Flow

```
applyTw('flex-1 bg-black text-white font-bold')
         ↓
  String split → ['flex-1', 'bg-black', 'text-white', 'font-bold']
         ↓
  Har class ke liye tw[className] lookup
         ↓
  { flex: 1, backgroundColor: '#000', color: '#fff', fontFamily: 'Poppins-Bold', fontWeight: '700' }
         ↓
  React Native style object return
```

### 3 Types ke Classes Handle Karta Hai

| Type | Example | Kaise Handle Hota Hai |
|---|---|---|
| **Predefined** | `bg-black`, `flex-1`, `font-bold` | `tw[className]` lookup |
| **Arbitrary values** | `h-[5rem]`, `w-[200px]`, `bg-[#ff0000]` | `parseArbitraryValue()` function |
| **Opacity modifier** | `bg-black/50`, `text-white/80` | `hexToRgba()` conversion |

### Example

```jsx
// Component mein aise use karo
<TouchableOpacity
  style={applyTw('bg-white border border-gray-300 h-10 px-4 rounded-md')}
>
  <Text style={applyTw('text-black font-medium text-sm')}>
    Click me
  </Text>
</TouchableOpacity>
```

**No `StyleSheet.create()` — sirf `applyTw()` use karo** — yahi is project ka rule hai (GUID.md checklist mein bhi likha hai).

---

## 📌 Key Points Summary

- **Fonts** = Poppins family, automatically apply hoti hai jab `font-bold`, `font-medium` etc. use karo
- **`applyTw`** = `style.js` ka custom function jo Tailwind class strings ko RN style object mein convert karta hai
- **No external library** — sab kuch manually `style.js` mein 1200+ lines mein define hai
- **Arbitrary values** bhi support hain: `bg-[#111]`, `h-[5rem]`, `w-[300px]`