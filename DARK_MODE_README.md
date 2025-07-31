# Dark Mode Implementation

This project has been configured with a comprehensive dark mode system using Next.js, Tailwind CSS v4, and `next-themes`.

## Features

- 🌙 **Automatic Theme Detection**: Automatically detects and applies the user's system preference
- 🎨 **Three Theme Options**: Light, Dark, and System (follows OS preference)
- 💾 **Persistent Storage**: Theme preference is saved in localStorage
- ⚡ **No Flash**: Prevents flash of unstyled content during theme switching
- 🎯 **Accessible**: Proper ARIA labels and keyboard navigation
- 🔧 **Customizable**: Easy to extend with additional themes

## Components

### ThemeProvider
Located at `src/components/theme-provider.tsx`
- Wraps the entire application
- Manages theme state and persistence
- Handles system theme detection

### ThemeToggle
Located at `src/components/theme-toggle.tsx`
- Simple three-button toggle (Light/Dark/System)
- Visual indicators for active theme
- Accessible with screen reader support

### ThemeToggleDropdown
Located at `src/components/theme-toggle-dropdown.tsx`
- Dropdown-style theme selector
- More compact UI option
- Shows current theme with icon and label

### useTheme Hook
Located at `src/hooks/use-theme.ts`
- Custom hook for theme management
- Handles hydration safely
- Provides theme state and setter functions

## Usage

### Basic Theme Toggle
```tsx
import { ThemeToggle } from "@/components/theme-toggle"

export default function MyComponent() {
  return (
    <div>
      <ThemeToggle />
    </div>
  )
}
```

### Dropdown Theme Toggle
```tsx
import { ThemeToggleDropdown } from "@/components/theme-toggle-dropdown"

export default function MyComponent() {
  return (
    <div>
      <ThemeToggleDropdown />
    </div>
  )
}
```

### Custom Theme Logic
```tsx
import { useTheme } from "@/hooks/use-theme"

export default function MyComponent() {
  const { theme, setTheme, mounted } = useTheme()

  if (!mounted) return null

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Current theme: {theme}
    </button>
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

The theme provider is configured in `src/app/layout.tsx`:

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

### Options
- `attribute="class"` - Uses CSS classes for theme switching
- `defaultTheme="system"` - Defaults to system preference
- `enableSystem` - Enables system theme detection
- `disableTransitionOnChange` - Prevents transition flash

## Adding New Themes

To add a new theme:

1. Add CSS variables to `globals.css`:
```css
.theme-custom {
  --background: your-color;
  --foreground: your-color;
  /* ... other variables */
}
```

2. Update theme toggle components to include the new option

3. Add the theme to the ThemeProvider configuration

## Best Practices

1. **Always use theme-aware classes**: Use `bg-background` instead of `bg-white`
2. **Test both themes**: Ensure your components look good in both light and dark modes
3. **Handle loading states**: Use the `mounted` state from `useTheme` to prevent hydration issues
4. **Accessibility**: Include proper ARIA labels and keyboard navigation
5. **Performance**: Use CSS variables for smooth transitions

## Troubleshooting

### Flash of Unstyled Content (FOUC)
- Ensure `suppressHydrationWarning` is set on the `<html>` element
- Use the `mounted` state from `useTheme` hook

### Theme Not Persisting
- Check that `next-themes` is properly installed
- Verify localStorage is available in the browser

### Styling Issues
- Ensure all colors use theme-aware CSS variables
- Check that Tailwind classes are using the correct semantic names 