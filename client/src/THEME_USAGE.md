# 🎨 QueenB Theme Usage Guide

## **How to Use the Shared Theme in Your Components**

### **Option 1: Using the Shared Theme Hook (Recommended)**

```javascript
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSharedTheme } from '../contexts/ThemeContext';

function YourComponent() {
  const theme = useSharedTheme();
  
  return (
    <Box sx={{ 
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      padding: 3
    }}>
      <Typography 
        variant="h4" 
        sx={{ color: theme.palette.primary.main }}
      >
        Your Title
      </Typography>
      
      <Button 
        variant="contained"
        sx={{ 
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark
          }
        }}
      >
        Your Button
      </Button>
    </Box>
  );
}
```

### **Option 2: Direct Import of Theme Hook**

```javascript
import React from 'react';
import { useTheme } from '../hooks/useTheme';

function YourComponent() {
  const theme = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary 
    }}>
      {/* Your content */}
    </div>
  );
}
```

## **🎨 Available Theme Colors**

### **Primary Colors:**
- `theme.palette.primary.main` - #FF99AA (Rose Pink)
- `theme.palette.primary.light` - #FFC0CB (Soft Pink)
- `theme.palette.primary.dark` - #8B6B7B (Dusty Rose)

### **Secondary Colors:**
- `theme.palette.secondary.main` - #C8D8D0 (Light Green/Sage)
- `theme.palette.secondary.light` - #FCE8D6 (Creamy Peach)
- `theme.palette.secondary.dark` - #8B6B7B (Dusty Rose)

### **Background Colors:**
- `theme.palette.background.default` - #FCE8D6 (Creamy Peach)
- `theme.palette.background.paper` - #FFFFFF (Pure White)

### **Text Colors:**
- `theme.palette.text.primary` - #5D4E4E (Soft Dark Brown)
- `theme.palette.text.secondary` - #8B6B7B (Dusty Rose)

## **🚀 Quick Start Examples**

### **Styled Card:**
```javascript
<Card sx={{
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3]
}}>
  {/* Card content */}
</Card>
```

### **Gradient Background:**
```javascript
<Box sx={{
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.secondary.light} 50%, ${theme.palette.primary.light} 100%)`
}}>
  {/* Content */}
</Box>
```

### **Styled Button:**
```javascript
<Button sx={{
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}}>
  Click Me
</Button>
```

## **📁 File Structure**

```
client/src/
├── contexts/
│   └── ThemeContext.js      ← Shared theme context
├── hooks/
│   └── useTheme.js          ← Theme configuration
└── components/
    └── MentorDisplayExample.js ← Example usage
```

## **🔧 How It Works**

1. **Theme Hook** (`useTheme.js`) - Creates the Material-UI theme
2. **Theme Context** (`ThemeContext.js`) - Makes theme available to all components
3. **Your Component** - Uses `useSharedTheme()` to access the theme
4. **Consistent Styling** - All components automatically use the same colors and styles

## **💡 Tips**

- **Always use theme colors** instead of hardcoded values
- **Use theme.spacing()** for consistent margins/padding
- **Use theme.breakpoints** for responsive design
- **Use theme.shadows** for consistent elevation
- **Use theme.shape.borderRadius** for consistent rounded corners

## **🔄 Updating the Theme**

To change colors or styles, edit `client/src/hooks/useTheme.js`. All components using the theme will automatically update!
