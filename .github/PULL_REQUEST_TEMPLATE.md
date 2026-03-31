## Description

<!-- What does this PR do? What problem does it solve? -->

## Type of Change

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New component
- [ ] 🔧 Enhancement to existing component
- [ ] 📚 Documentation update
- [ ] 🎨 Style/design improvement
- [ ] ♻️ Refactor (no functional changes)

## Component(s) Affected

<!-- List the component(s) this PR adds or modifies -->
- `ComponentName`

## PR Checklist

### Component Requirements
- [ ] Component renders correctly on **Android**
- [ ] Component renders correctly on **iOS**
- [ ] All styles use `applyTw()` (no raw `StyleSheet.create` or inline style objects)
- [ ] Named export for the reusable component
- [ ] Default export for the demo component
- [ ] JSDoc comment on the main component export

### Registration (for new components)
- [ ] Added to `src/components/ui/index.js`
- [ ] Added to `components` array in `src/screen/HomeScreen.js`
- [ ] Added to `COMPONENT_MAP` in `src/screen/ComponentDemo.js`
- [ ] Status set to `'done'` or `'progress'`

### Code Quality
- [ ] No `console.log` statements in production code
- [ ] No hardcoded colors (use `applyTw` classes)
- [ ] Follows existing component file structure
- [ ] No unnecessary dependencies added

### Documentation
- [ ] Updated `CHANGELOG.md` if adding a new component
- [ ] Updated component status in `HomeScreen.js`

## Screenshots / Demo

<!-- Add screenshots or screen recordings showing the component on Android and iOS -->

| Android | iOS |
|---|---|
| screenshot | screenshot |

## Related Issues

<!-- Link any related issues: Closes #123 -->
