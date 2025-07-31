# System-Only Dark Mode Implementation

This project has been configured with a simplified dark mode system that automatically follows the user's system preference using Next.js, Tailwind CSS v4, and `next-themes`.

## Features

- 🌙 **Automatic System Detection**: Automatically detects and applies the user's system preference
- ⚡ **No Manual Controls**: Seamlessly follows OS theme without user intervention
- 💾 **No Flash**: Prevents flash of unstyled content during theme switching
- 🎯 **Accessible**: Proper theme-aware styling throughout the application
- 🔧 **Simple**: Minimal configuration with maximum compatibility

## Components

### ThemeProvider
Located at `src/components/theme-provider.tsx`
- Wraps the entire application
- Automatically detects system theme preference
- Forces system theme mode (no manual switching)

### useTheme Hook
Located at `src/hooks/use-theme.ts`
- Provides current resolved theme (light/dark)
- Handles hydration safely
- Read-only theme information

## Usage

### Get Current Theme
```tsx
import { useTheme } from "@/hooks/use-theme"

export default function MyComponent() {
  const { theme, mounted } = useTheme()

  if (!mounted) return null

  return (
    <div>
      Current theme: {theme}
    </div>
  )
}
```

### Conditional Styling
```tsx
import { useTheme } from "@/hooks/use-theme"

export default function MyComponent() {
  const { theme, mounted } = useTheme()

  if (!mounted) return null

  return (
    <div className={theme === 'dark' ? 'dark-specific-class' : 'light-specific-class'}>
      Content
    </div>
  )
}
```

## CSS Variables

The project uses CSS custom properties for theming. All colors are defined in `src/app/globals.css`:

### Light Theme Variables
```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  /* ... more variables */
}
```

### Dark Theme Variables
```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  /* ... more variables */
}
```

## Tailwind Classes

Use these Tailwind classes for theme-aware styling:

- `bg-background` - Background color
- `text-foreground` - Text color
- `bg-card` - Card background
- `text-card-foreground` - Card text
- `border-border` - Border color
- `bg-muted` - Muted background
- `text-muted-foreground` - Muted text

## Configuration

The theme provider is configured in `src/components/theme-provider.tsx`:

```tsx
<NextThemesProvider 
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
  forcedTheme="system"
>
  {children}
</NextThemesProvider>
```

### Options
- `attribute="class"` - Uses CSS classes for theme switching
- `defaultTheme="system"` - Defaults to system preference
- `enableSystem` - Enables system theme detection
- `disableTransitionOnChange` - Prevents transition flash
- `forcedTheme="system"` - Forces system theme only

## Best Practices

1. **Always use theme-aware classes**: Use `bg-background` instead of `bg-white`
2. **Test both themes**: Ensure your components look good in both light and dark modes
3. **Handle loading states**: Use the `mounted` state from `useTheme` to prevent hydration issues
4. **Accessibility**: Ensure proper contrast ratios in both themes
5. **Performance**: Use CSS variables for smooth transitions

## Troubleshooting

### Flash of Unstyled Content (FOUC)
- Ensure `suppressHydrationWarning` is set on the `<html>` element
- Use the `mounted` state from `useTheme` hook

### Theme Not Following System
- Check that `next-themes` is properly installed
- Verify the system theme detection is working in your OS

### Styling Issues
- Ensure all colors use theme-aware CSS variables
- Check that Tailwind classes are using the correct semantic names

## Migration from Manual Theme Controls

If you previously had manual theme controls and want to switch to system-only:

1. Remove theme toggle components
2. Update ThemeProvider to use `forcedTheme="system"`
3. Simplify useTheme hook to only provide read-only theme information
4. Remove any manual theme switching logic from your components

The system will now automatically follow the user's OS preference without any manual intervention required. 