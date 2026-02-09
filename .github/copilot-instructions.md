# AI Coding Guidelines for Mini Social Feed App

## Design Philosophy

**🎨 Aesthetic UI is Critical**: This is an interview test project where aesthetic design is the X factor to impress interviewers. Prioritize beautiful, modern UI design with attention to:

- Clean, minimal layouts with proper spacing and typography
- Smooth animations and micro-interactions
- Consistent visual hierarchy and color usage
- Polished component styling that feels professional and modern
- Intuitive user experience that delights users

## Architecture Overview

- **Navigation**: Expo Router with file-based routing (`app/` directory)
- **Layout Structure**: Root Stack → Tabs layout (Home/Explore) + Modal screens
- **State Management**: React hooks (no external state libraries yet)
- **Data**: Mock data in `constants/mockData.ts` (currently empty)

## Styling Patterns

- **Dual System**: Use NativeWind classes (`className="..."`) for simple styles, StyleSheet objects for complex layouts
- **Theming**: Always use `ThemedText`/`ThemedView` components instead of raw Text/View
- **Color Overrides**: Pass `lightColor`/`darkColor` props to themed components when needed
- **Example**: `<ThemedText type="title" lightColor="#custom">Text</ThemedText>`

## Component Conventions

- **Icons**: Use `expo/vector-icons` directly (e.g., `Ionicons`, `MaterialIcons`, `FontAwesome`) instead of the IconSymbol component
- **Haptics**: Use `HapticTab` for tab bar buttons (iOS-only feedback)
- **Reusable Components**: Place in `components/` directory, export from index if needed

## File Structure Patterns

- **Path Aliases**: Use `@/*` for imports (configured in `tsconfig.json`)
- **Hooks**: Custom hooks in `hooks/` directory with platform-specific versions (`.web.ts`)
- **Constants**: App-wide constants in `constants/` (theme, colors, fonts, mock data)
- **Assets**: Images in `assets/images/`, referenced via `require("@/assets/images/...")`

## Development Workflow

- **Start**: `npm start` (Expo dev server)
- **Platform Run**: `npm run ios` / `npm run android` / `npm run web`
- **Reset Project**: `npm run reset-project` (moves current code to `app-example/`)
- **Lint**: `npm run lint` (ESLint with Expo config)

## Key Files to Reference

- `app/_layout.tsx`: Root navigation setup
- `app/(tabs)/_layout.tsx`: Tab navigation configuration
- `constants/theme.ts`: Color schemes and font definitions
- `hooks/use-theme-color.ts`: Theme color resolution logic
- `components/themed-text.tsx`: Text component with theme support
- `components/ui/icon-symbol.tsx`: Cross-platform icon mapping

## TypeScript & Tooling

- **Strict Mode**: Enabled in `tsconfig.json`
- **ESLint**: Expo config with ignores for `dist/*`
- **NativeWind**: Configured in `tailwind.config.js`, `babel.config.js`, `metro.config.js`
- **Experiments**: Typed routes and React Compiler enabled in `app.json`

## Platform Considerations

- **Web**: Hydration handling in `use-color-scheme.web.ts`
- **iOS**: Haptic feedback, SF Symbols
- **Android/Web**: Material Icons fallback, edge-to-edge support
- **New Architecture**: Enabled in `app.json`</content>
  <parameter name="filePath">/Users/abulbasar/Desktop/EasyPost/.github/copilot-instructions.md
