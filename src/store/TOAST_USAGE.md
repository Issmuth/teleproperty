# Toast System Usage

A global toast notification system built with Zustand and custom UI.

## Quick Start

```tsx
import { toast } from "@/store";

// Show different toast types
toast.success("Property saved successfully!");
toast.error("Failed to load data");
toast.info("New message received");
toast.warning("Your session is about to expire");

// Custom duration (default is 3000ms)
toast.success("Saved!", 2000);

// Dismiss a specific toast
const id = toast.info("Processing...");
toast.dismiss(id);

// Clear all toasts
toast.clear();
```

## Toast Types

### Success
```tsx
toast.success("Action completed successfully!");
```
- Green checkmark icon
- Use for successful operations

### Error
```tsx
toast.error("Something went wrong");
```
- Red X icon
- Use for errors and failures

### Info
```tsx
toast.info("New notification available");
```
- Blue info icon
- Use for general information

### Warning
```tsx
toast.warning("This action cannot be undone");
```
- Orange alert icon
- Use for warnings and cautions

## Real-World Examples

### Form Submission
```tsx
async function handleSubmit() {
  try {
    await submitForm(data);
    toast.success("Form submitted successfully!");
    router.back();
  } catch (error) {
    toast.error("Failed to submit form");
  }
}
```

### Save Property
```tsx
async function handleSave() {
  try {
    await toggleSaved(property);
    toast.success("Property saved to favorites");
  } catch (error) {
    toast.error("Could not save property");
  }
}
```

### Authentication
```tsx
async function handleSignOut() {
  await signOut();
  toast.info("You have been signed out");
  router.replace("/");
}
```

### Network Status
```tsx
useEffect(() => {
  if (!isOnline) {
    toast.warning("No internet connection");
  }
}, [isOnline]);
```

## Advanced Usage

### Manual Toast Management
```tsx
import { useToastStore } from "@/store";

function MyComponent() {
  const toasts = useToastStore((state) => state.toasts);
  const addToast = useToastStore((state) => state.addToast);
  
  // Custom toast with full control
  addToast("Custom message", "info", 5000);
  
  // Check active toasts
  console.log("Active toasts:", toasts.length);
}
```

### Persistent Toast (No Auto-Dismiss)
```tsx
// Set duration to 0 to disable auto-dismiss
const id = toast.info("Click to dismiss", 0);

// Later, manually dismiss
toast.dismiss(id);
```

## Features

- ✅ 4 toast types (success, error, info, warning)
- ✅ Auto-dismiss with configurable duration
- ✅ Manual dismiss with close button
- ✅ Smooth animations (fade + slide)
- ✅ Respects safe areas (notch, status bar)
- ✅ Multiple toasts stack nicely
- ✅ Dark mode support
- ✅ Global access - call from anywhere
- ✅ TypeScript support

## Customization

### Duration
```tsx
// Short (1 second)
toast.success("Done!", 1000);

// Long (5 seconds)
toast.info("Please read this carefully", 5000);

// Persistent (must manually dismiss)
toast.warning("Important!", 0);
```

### Programmatic Control
```tsx
// Store the toast ID
const loadingToast = toast.info("Loading...", 0);

// Later, replace it
toast.dismiss(loadingToast);
toast.success("Loaded!");
```

## Best Practices

1. **Keep messages short** - Toasts auto-dismiss, keep text under 50 characters
2. **Use appropriate types** - Match the toast type to the message intent
3. **Don't overuse** - Too many toasts can be annoying
4. **Provide context** - Be specific: "Property saved" not just "Saved"
5. **Handle errors gracefully** - Always show error toasts in catch blocks

## Architecture

- **State**: Managed by Zustand store (`toast-store.ts`)
- **UI**: Custom component (`toast-container.tsx`)
- **Rendering**: Added to root layout, always available
- **Position**: Top of screen, respects safe areas
- **Animation**: Fade in/out with slide

No setup required - just import and use `toast` anywhere in your app!
