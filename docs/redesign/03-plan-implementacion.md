# MotoFix Frontend – Plan de Implementación Redesign
## Fase 3: Roadmap de Ejecución

**Fecha:** Octubre 2026  
**Estado:** Plan Detallado — Listo para Ejecución  
**Objetivo:** Guiar la implementación del sistema visual moderno (dark/tech, cyan, SaaS) fase por fase.

---

## 1. Resumen Ejecutivo

### 1.1 Alcance

- **Archivos a modificar:** 12–15 archivos
- **Estimado de trabajo:** 40–60 horas (developer-days)
- **Riesgo:** Bajo (cambios visuales, no funcionales; repositorio de git disponible para revertir)
- **Ramificación:** `redesign-frontend` (branch existente)
- **Revisión:** Post-Phase 3 mediante diff visual en staging

### 1.2 Fases de Implementación

| Fase | Duración | Prioridad | Descripción |
|------|----------|-----------|------------|
| **3A – Core Visual System** | 10–12h | 🔴 Alta | Tokens, theme, tipografía, spacing base |
| **3B – Components** | 15–20h | 🔴 Alta | Botones, inputs, cards, tablas, navbars |
| **3C – Pages & Layouts** | 10–15h | 🟡 Media | Aplicar a páginas, refinements responsivos |
| **3D – Polish & Accessibility** | 5–8h | 🟡 Media | Micro-interacciones, focus, testing |
| **3E – Testing & QA** | 5–10h | 🟢 Baja | Visual testing, responsive, a11y, deployment |

**Total:** ~45–65 horas

---

## 2. Fase 3A – Core Visual System (10–12h)

### 2.1 Paso 1: Crear `theme.js` – Design Tokens

**Archivo:** `frontend/src/theme.js` (NUEVO)  
**Duración:** 1–2h

```javascript
// frontend/src/theme.js
export const designTokens = {
  colors: {
    // Primario
    primary: {
      main: '#00D9FF',     // Cyan
      light: '#4EFAFF',
      dark: '#00A8CC',
      lighter: 'rgba(0, 217, 255, 0.1)',
      border: 'rgba(0, 217, 255, 0.5)',
    },
    // Secundario
    secondary: {
      main: '#FF6B9D',
      light: '#FF9BC5',
      dark: '#E63E7F',
    },
    // Grays
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D0D0D0',
      400: '#999999',
      500: '#666666',
      600: '#404040',
      700: '#262626',
      800: '#1A1A1A',
      900: '#0F0F0F',
    },
    // Semánticos
    success: {
      main: '#10B981',
      light: '#6EE7B7',
      dark: '#059669',
      bg: 'rgba(16, 185, 129, 0.2)',
      border: 'rgba(16, 185, 129, 0.5)',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      bg: 'rgba(245, 158, 11, 0.2)',
      border: 'rgba(245, 158, 11, 0.5)',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      bg: 'rgba(239, 68, 68, 0.2)',
      border: 'rgba(239, 68, 68, 0.5)',
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#1D4ED8',
      bg: 'rgba(59, 130, 246, 0.1)',
      border: 'rgba(59, 130, 246, 0.5)',
    },
    // Backgrounds
    background: {
      default: '#0F0F0F',
      paper: '#1A1A1A',
      elevated: '#262626',
    },
    // Text
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      tertiary: '#808080',
      disabled: '#606060',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", system-ui, sans-serif',
    monoFamily: '"Fira Code", "JetBrains Mono", monospace',
    sizes: {
      h1: '32px',
      h2: '24px',
      h3: '20px',
      h4: '16px',
      bodyLarge: '16px',
      body: '14px',
      bodySmall: '12px',
      caption: '11px',
      button: '14px',
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      h1: '40px',
      h2: '32px',
      h3: '28px',
      h4: '24px',
      bodyLarge: '24px',
      body: '22px',
      bodySmall: '18px',
      caption: '16px',
      button: '20px',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  },
  borderRadius: {
    sm: '8px',
    md: '10px',
    lg: '12px',
    full: '50%',
  },
  transitions: {
    fast: '100ms ease-out',
    normal: '200ms ease-out',
    slow: '300ms ease-out',
  },
  breakpoints: {
    xs: '0px',
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
  },
  shadows: {
    sm: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0px 4px 12px rgba(0, 0, 0, 0.3)',
    lg: '0px 8px 24px rgba(0, 0, 0, 0.4)',
    xl: '0px 20px 60px rgba(0, 0, 0, 0.5)',
    cyan: '0px 0px 12px rgba(0, 217, 255, 0.2)',
  },
  orderStateColors: {
    'Recibida': {
      color: '#808080',
      bg: 'rgba(128, 128, 128, 0.2)',
      border: 'rgba(128, 128, 128, 0.5)',
    },
    'En diagnóstico': {
      color: '#00D9FF',
      bg: 'rgba(0, 217, 255, 0.2)',
      border: 'rgba(0, 217, 255, 0.5)',
    },
    'En reparación': {
      color: '#F59E0B',
      bg: 'rgba(245, 158, 11, 0.2)',
      border: 'rgba(245, 158, 11, 0.5)',
    },
    'Esperando repuesto': {
      color: '#EF4444',
      bg: 'rgba(239, 68, 68, 0.2)',
      border: 'rgba(239, 68, 68, 0.5)',
    },
    'En reparación retorno': {
      color: '#F59E0B',
      bg: 'rgba(245, 158, 11, 0.2)',
      border: 'rgba(245, 158, 11, 0.5)',
    },
    'Lista para entregar': {
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.2)',
      border: 'rgba(16, 185, 129, 0.5)',
    },
    'Entregada': {
      color: '#808080',
      bg: 'rgba(128, 128, 128, 0.15)',
      border: 'rgba(128, 128, 128, 0.4)',
    },
  },
};
```

**Checklist:**
- [ ] Crear archivo `theme.js`
- [ ] Copiar código de tokens
- [ ] Validar sintaxis (npm run lint)

---

### 2.2 Paso 2: Actualizar `index.css` – Global Styles

**Archivo:** `frontend/src/index.css` (MODIFICAR)  
**Duración:** 1–2h

**Cambios:**

1. **Reset global:**
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
  font-family: "Inter", "Roboto", system-ui, sans-serif;
  background-color: #0F0F0F;
  color: #FFFFFF;
}

/* Smooth transitions global */
* {
  transition: background-color 200ms ease-out, border-color 200ms ease-out,
              color 200ms ease-out, box-shadow 200ms ease-out,
              transform 100ms ease-out;
}

/* Prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
```

2. **Focus visible global:**
```css
*:focus-visible {
  outline: 2px solid #00D9FF;
  outline-offset: 2px;
}

button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
a:focus-visible {
  outline: 2px solid #00D9FF;
  outline-offset: 2px;
}
```

3. **Typography defaults:**
```css
h1 {
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  color: #FFFFFF;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: #FFFFFF;
}

h3 {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #FFFFFF;
}

h4 {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #FFFFFF;
}

p, body {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #FFFFFF;
}

small, .small {
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: #B0B0B0;
}

a {
  color: #00D9FF;
  text-decoration: none;
  transition: color 200ms ease-out, text-decoration 200ms ease-out;
}

a:hover {
  text-decoration: underline;
}

a:active {
  color: #00A8CC;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #1A1A1A;
}

::-webkit-scrollbar-thumb {
  background: #404040;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #666666;
}
```

**Checklist:**
- [ ] Reemplazar/extender `index.css` existente
- [ ] Validar que no haya conflictos con estilos existentes
- [ ] Probar página en navegador (debe verse dark)

---

### 2.3 Paso 3: Refactor `ThemeContext.jsx`

**Archivo:** `frontend/src/context/ThemeContext.jsx` (MODIFICAR)  
**Duración:** 2–3h

**Cambios:**

Importar `designTokens` y actualizar `createTheme()`:

```jsx
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { designTokens } from '../theme';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: designTokens.colors.primary.main,
      light: designTokens.colors.primary.light,
      dark: designTokens.colors.primary.dark,
    },
    secondary: {
      main: designTokens.colors.secondary.main,
      light: designTokens.colors.secondary.light,
      dark: designTokens.colors.secondary.dark,
    },
    success: {
      main: designTokens.colors.success.main,
      light: designTokens.colors.success.light,
      dark: designTokens.colors.success.dark,
    },
    warning: {
      main: designTokens.colors.warning.main,
      light: designTokens.colors.warning.light,
      dark: designTokens.colors.warning.dark,
    },
    error: {
      main: designTokens.colors.error.main,
      light: designTokens.colors.error.light,
      dark: designTokens.colors.error.dark,
    },
    info: {
      main: designTokens.colors.info.main,
      light: designTokens.colors.info.light,
      dark: designTokens.colors.info.dark,
    },
    background: {
      default: designTokens.colors.background.default,
      paper: designTokens.colors.background.paper,
    },
    text: {
      primary: designTokens.colors.text.primary,
      secondary: designTokens.colors.text.secondary,
      disabled: designTokens.colors.text.disabled,
    },
    divider: designTokens.colors.gray[600],
  },
  typography: {
    fontFamily: designTokens.typography.fontFamily,
    h1: {
      fontSize: designTokens.typography.sizes.h1,
      fontWeight: designTokens.typography.weights.bold,
      lineHeight: designTokens.typography.lineHeights.h1,
    },
    h2: {
      fontSize: designTokens.typography.sizes.h2,
      fontWeight: designTokens.typography.weights.semibold,
      lineHeight: designTokens.typography.lineHeights.h2,
    },
    h3: {
      fontSize: designTokens.typography.sizes.h3,
      fontWeight: designTokens.typography.weights.semibold,
      lineHeight: designTokens.typography.lineHeights.h3,
    },
    h4: {
      fontSize: designTokens.typography.sizes.h4,
      fontWeight: designTokens.typography.weights.semibold,
      lineHeight: designTokens.typography.lineHeights.h4,
    },
    body1: {
      fontSize: designTokens.typography.sizes.bodyLarge,
      fontWeight: designTokens.typography.weights.regular,
      lineHeight: designTokens.typography.lineHeights.bodyLarge,
    },
    body2: {
      fontSize: designTokens.typography.sizes.body,
      fontWeight: designTokens.typography.weights.regular,
      lineHeight: designTokens.typography.lineHeights.body,
    },
    caption: {
      fontSize: designTokens.typography.sizes.caption,
      fontWeight: designTokens.typography.weights.regular,
      lineHeight: designTokens.typography.lineHeights.caption,
    },
    button: {
      fontSize: designTokens.typography.sizes.button,
      fontWeight: designTokens.typography.weights.medium,
      lineHeight: designTokens.typography.lineHeights.button,
      textTransform: 'none', // Evitar uppercase default MUI
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
          padding: `${designTokens.spacing.sm} ${designTokens.spacing.lg}`,
          textTransform: 'none',
          fontWeight: 500,
          transition: `all ${designTokens.transitions.normal}`,
          '&:hover': {
            transform: 'scale(1.02)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
        containedPrimary: {
          backgroundColor: designTokens.colors.primary.main,
          color: designTokens.colors.gray[900],
          '&:hover': {
            backgroundColor: designTokens.colors.primary.light,
          },
          '&:active': {
            backgroundColor: designTokens.colors.primary.dark,
          },
        },
        containedSecondary: {
          backgroundColor: designTokens.colors.secondary.main,
          '&:hover': {
            backgroundColor: designTokens.colors.secondary.light,
          },
          '&:active': {
            backgroundColor: designTokens.colors.secondary.dark,
          },
        },
        outlined: {
          borderColor: designTokens.colors.primary.main,
          color: designTokens.colors.primary.main,
          '&:hover': {
            borderColor: designTokens.colors.primary.light,
            backgroundColor: `rgba(0, 217, 255, 0.05)`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: designTokens.colors.background.paper,
            borderRadius: designTokens.borderRadius.sm,
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: designTokens.colors.gray[600],
            },
            '&:hover fieldset': {
              borderColor: designTokens.colors.gray[500],
            },
            '&.Mui-focused fieldset': {
              borderColor: designTokens.colors.primary.main,
              boxShadow: `0 0 0 3px rgba(0, 217, 255, 0.1)`,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: designTokens.colors.background.paper,
          backgroundImage: 'none', // Disable default elevation images
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: designTokens.colors.background.paper,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: designTokens.colors.background.elevated,
          '& .MuiTableCell-head': {
            borderColor: designTokens.colors.gray[600],
            color: designTokens.colors.text.secondary,
            fontWeight: 600,
            fontSize: designTokens.typography.sizes.bodySmall,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: designTokens.colors.gray[600],
          padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: designTokens.colors.background.elevated,
          },
        },
      },
    },
  },
});

export const ThemeContext = createContext();

export const ThemeProvider_Custom = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeContext;
```

**Checklist:**
- [ ] Actualizar `ThemeContext.jsx` con tokens
- [ ] Validar que MUI componentes importan tema correctamente
- [ ] Verificar no hay errores de compilación

---

### 2.4 Paso 4: Actualizar `App.jsx` – Aplicar ThemeProvider

**Archivo:** `frontend/src/App.jsx` (VERIFICAR/MODIFICAR MÍNIMO)  
**Duración:** 0.5–1h

Verificar que `ThemeProvider` esté envolviendo la app:

```jsx
import { ThemeProvider } from '@mui/material/styles';
import { ThemeContext } from './context/ThemeContext';
// o usar la custom provider:
import { ThemeProvider_Custom } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider_Custom>
      {/* Router, layouts, etc. */}
    </ThemeProvider_Custom>
  );
}
```

**Checklist:**
- [ ] Confirmar ThemeProvider está configurado
- [ ] Probar app inicia sin errores
- [ ] Verificar colores se aplican globalmente

---

### 2.5 Punto de Control – Fase 3A

**Verificaciones obligatorias:**

1. ✅ App compila sin errores
2. ✅ Colores dark theme visibles en todas las páginas
3. ✅ Tipografía renderiza correctamente (Inter fallback a Roboto)
4. ✅ Focus rings visibles (cyan) en inputs/botones
5. ✅ Scrollbars dark theme
6. ✅ Sin inconsistencias de color

**Si hay problemas:**
- Ejecutar `npm run lint` para detectar errores de sintaxis
- Verificar imports en `theme.js`
- Comprobar `ThemeContext.jsx` sintaxis

---

## 3. Fase 3B – Componentes (15–20h)

### 3.1 Paso 5: Botones – Material UI Button Refactor

**Archivos a revisar:**
- `frontend/src/pages/*/` (todos los que usan Button)
- `frontend/src/components/ConfirmDialog.jsx`

**Duración:** 2–3h

**Cambios en componentes:**

```jsx
import { Button, Box } from '@mui/material';
import { designTokens } from '../theme';

// Usar Button variants: "contained", "outlined", "text"
// Variant "contained" automáticamente usa primary.main

// Ejemplo en OrdenFormPage:
<Button
  variant="contained"
  color="primary"
  size="medium"
  onClick={handleSubmit}
>
  Guardar Orden
</Button>

<Button
  variant="outlined"
  color="primary"
  size="medium"
  onClick={handleCancel}
>
  Cancelar
</Button>

// Para botones peligrosos (delete):
<Button
  variant="contained"
  color="error"
  onClick={handleDelete}
>
  Eliminar
</Button>
```

**Checklist:**
- [ ] Revisar todos los botones en pages/
- [ ] Cambiar color hardcoded a `color="primary"` o `color="error"`, etc.
- [ ] Probar hover states (cyan glow expected)

---

### 3.2 Paso 6: Inputs/Textfields – MUI TextField Refactor

**Archivos a modificar:**
- `frontend/src/pages/OrdenFormPage.jsx`
- `frontend/src/pages/ClientesPage.jsx`
- `frontend/src/pages/RepuestoDetailPage.jsx`
- Otros formularios

**Duración:** 3–4h

**Cambios:**

```jsx
import { TextField, FormControl, FormHelperText } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { designTokens } from '../theme';

// Dentro del form:
<Controller
  name="nombre"
  control={control}
  render={({ field, fieldState: { error } }) => (
    <FormControl fullWidth error={!!error}>
      <TextField
        {...field}
        label="Nombre Clienta"
        placeholder="Ej. María García"
        variant="outlined"
        fullWidth
        error={!!error}
        helperText={error?.message}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: designTokens.colors.background.paper,
            '&.Mui-focused fieldset': {
              borderColor: designTokens.colors.primary.main,
              boxShadow: `0 0 0 3px ${designTokens.colors.primary.lighter}`,
            },
          },
          '& .MuiFormHelperText-root': {
            color: designTokens.colors.error.main,
            marginTop: designTokens.spacing.xs,
          },
        }}
      />
    </FormControl>
  )}
/>
```

**Checklist:**
- [ ] Revisar todos los formularios (OrdenFormPage, ClientesPage, etc.)
- [ ] Cambiar a MUI TextField con styling custom
- [ ] Probar focus state (cyan border + shadow)
- [ ] Probar error state (red border)

---

### 3.3 Paso 7: Tarjetas – Card Refactor

**Archivos a modificar:**
- `frontend/src/pages/DashboardPage.jsx` (KPI cards)
- Cualquier componente que use Card MUI

**Duración:** 2–3h

```jsx
import { Card, CardContent, Box, Typography } from '@mui/material';
import { designTokens } from '../theme';

<Card
  sx={{
    backgroundColor: designTokens.colors.background.elevated,
    border: `1px solid ${designTokens.colors.gray[600]}`,
    borderRadius: designTokens.borderRadius.lg,
    padding: designTokens.spacing.lg,
    boxShadow: designTokens.shadows.md,
    transition: `all ${designTokens.transitions.normal}`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: designTokens.colors.gray[700],
      boxShadow: `${designTokens.shadows.lg}, ${designTokens.shadows.cyan}`,
      transform: 'translateY(-2px)',
    },
  }}
>
  <CardContent sx={{ padding: 0 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing.md }}>
      <Box sx={{ fontSize: '32px' }}>📊</Box>
      <Box>
        <Typography variant="caption" sx={{ color: designTokens.colors.text.secondary }}>
          Órdenes Pendientes
        </Typography>
        <Typography variant="h3" sx={{ color: designTokens.colors.text.primary }}>
          12
        </Typography>
        <Typography variant="caption" sx={{ color: designTokens.colors.success.main }}>
          ↑ 3 vs semana pasada
        </Typography>
      </Box>
    </Box>
  </CardContent>
</Card>
```

**Checklist:**
- [ ] Aplicar styling Card a DashboardPage KPIs
- [ ] Probar hover animation (translateY)
- [ ] Verificar sombras (md base, cyan on hover)

---

### 3.4 Paso 8: Tablas – Table Refactor

**Archivos a modificar:**
- `frontend/src/pages/ClientesPage.jsx`
- `frontend/src/pages/OrdenesListPage.jsx`
- `frontend/src/pages/RepuestosListPage.jsx`
- `frontend/src/pages/StockPage.jsx`

**Duración:** 3–4h

```jsx
import { 
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Box 
} from '@mui/material';
import { designTokens } from '../theme';

<TableContainer
  sx={{
    backgroundColor: designTokens.colors.background.paper,
    border: `1px solid ${designTokens.colors.gray[600]}`,
    borderRadius: designTokens.borderRadius.lg,
    overflow: 'auto',
    maxHeight: '600px',
  }}
>
  <Table stickyHeader>
    <TableHead>
      <TableRow sx={{ backgroundColor: designTokens.colors.background.elevated }}>
        <TableCell
          sx={{
            backgroundColor: designTokens.colors.background.elevated,
            color: designTokens.colors.text.secondary,
            fontWeight: 600,
            fontSize: designTokens.typography.sizes.bodySmall,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            borderColor: designTokens.colors.gray[600],
          }}
        >
          Nombre
        </TableCell>
        <TableCell sx={{ borderColor: designTokens.colors.gray[600] }}>Estado</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row) => (
        <TableRow
          key={row.id}
          sx={{
            '&:hover': {
              backgroundColor: designTokens.colors.background.elevated,
            },
            '&:last-child td': {
              borderBottom: 'none',
            },
          }}
        >
          <TableCell sx={{ borderColor: designTokens.colors.gray[600] }}>
            {row.nombre}
          </TableCell>
          <TableCell sx={{ borderColor: designTokens.colors.gray[600] }}>
            {row.estado}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

**Responsive Mobile (add to TableContainer sx):**
```jsx
sx={{
  // ... existing styles
  overflowX: 'auto',
  '& table': {
    minWidth: '600px',
  },
  '@media (max-width: 768px)': {
    '& table': {
      minWidth: '800px',
    },
  },
}}
```

**Checklist:**
- [ ] Aplicar styling a todas las tablas
- [ ] Probar sticky header scroll
- [ ] Validar responsive (horizontal scroll mobile)
- [ ] Verificar hover states

---

### 3.5 Paso 9: Navbars – Sidebar + TopBar

**Archivo:** `frontend/src/layouts/MainLayout.jsx` (MODIFICAR EXTENSO)  
**Duración:** 3–4h

**Cambios en Sidebar:**

```jsx
import { Box, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { designTokens } from '../theme';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box
        component="aside"
        sx={{
          width: '280px',
          backgroundColor: designTokens.colors.gray[900],
          borderRight: `1px solid ${designTokens.colors.gray[600]}`,
          padding: designTokens.spacing.lg,
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          '@media (max-width: 1024px)': {
            display: 'none', // Hide on mobile
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ marginBottom: designTokens.spacing['3xl'], display: 'flex', alignItems: 'center', gap: designTokens.spacing.md }}>
          <Box sx={{ fontSize: '24px' }}>🏍️</Box>
          <Typography variant="h4" sx={{ color: designTokens.colors.primary.main, fontWeight: 700 }}>
            MotoFix
          </Typography>
        </Box>

        {/* Nav Items */}
        <List sx={{ gap: 0 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.id} disablePadding sx={{ marginBottom: designTokens.spacing.sm }}>
                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    borderRadius: designTokens.borderRadius.sm,
                    padding: `10px ${designTokens.spacing.md}`,
                    color: isActive ? designTokens.colors.primary.main : designTokens.colors.text.secondary,
                    backgroundColor: isActive ? designTokens.colors.background.elevated : 'transparent',
                    borderLeft: isActive ? `3px solid ${designTokens.colors.primary.main}` : 'none',
                    paddingLeft: isActive ? '13px' : designTokens.spacing.md,
                    transition: `all ${designTokens.transitions.normal}`,
                    '&:hover': {
                      backgroundColor: designTokens.colors.background.elevated,
                      color: designTokens.colors.primary.main,
                    },
                  }}
                >
                  <Typography variant="body2">{item.label}</Typography>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* TopBar */}
        <Box
          component="nav"
          sx={{
            backgroundColor: designTokens.colors.background.paper,
            borderBottom: `1px solid ${designTokens.colors.gray[600]}`,
            padding: `${designTokens.spacing.md} ${designTokens.spacing.xl}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            height: '60px',
          }}
        >
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* User Menu */}
          <UserMenu />
        </Box>

        {/* Page Content */}
        <Box sx={{ flex: 1, overflow: 'auto', padding: designTokens.spacing['2xl'] }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
```

**Checklist:**
- [ ] Actualizar Sidebar con colores y transiciones
- [ ] Updatear TopBar styling
- [ ] Probar hover/active states (nav items)
- [ ] Validar responsive (hamburger menu mobile – Paso 3C)

---

### 3.6 Paso 10: Order Status Chips

**Archivo:** `frontend/src/components/OrderStatusChip.jsx` (NUEVO o REFACTOR)  
**Duración:** 1–2h

```jsx
import { Chip, Box } from '@mui/material';
import { designTokens } from '../theme';

const statusIcons = {
  'Recibida': '📥',
  'En diagnóstico': '🔍',
  'En reparación': '🔧',
  'Esperando repuesto': '⏸️',
  'En reparación retorno': '🔄',
  'Lista para entregar': '✅',
  'Entregada': '📤',
};

export const OrderStatusChip = ({ status, size = 'medium' }) => {
  const statusColor = designTokens.orderStateColors[status];

  if (!statusColor) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: designTokens.spacing.xs,
        padding: `${designTokens.spacing.xs} ${designTokens.spacing.sm}`,
        backgroundColor: statusColor.bg,
        border: `1px solid ${statusColor.border}`,
        color: statusColor.color,
        borderRadius: '16px',
        fontSize: designTokens.typography.sizes.bodySmall,
        fontWeight: designTokens.typography.weights.medium,
        whiteSpace: 'nowrap',
      }}
    >
      <span>{statusIcons[status]}</span>
      <span>{status}</span>
    </Box>
  );
};
```

**Uso:**
```jsx
import { OrderStatusChip } from '../components/OrderStatusChip';

// En tablas, cards:
<OrderStatusChip status={orden.estado} />
```

**Checklist:**
- [ ] Crear componente OrderStatusChip
- [ ] Verificar colores de estados coinciden con especificación
- [ ] Aplicar a OrdenesListPage, OrdenDetailPage, DashboardPage

---

### 3.7 Punto de Control – Fase 3B

**Verificaciones obligatorias:**

1. ✅ Todos los botones con colores tema
2. ✅ Todos los inputs con border cyan en focus
3. ✅ Tarjetas hover con glow cyan
4. ✅ Tablas con header oscuro + hover rows
5. ✅ Sidebar con nav items activos destacados
6. ✅ Order status chips con colores correctos
7. ✅ Sin estilos hardcoded (usar `designTokens`)

---

## 4. Fase 3C – Layouts & Pages (10–15h)

### 4.1 Paso 11: Dashboard – Layout Refinement

**Archivo:** `frontend/src/pages/DashboardPage.jsx`  
**Duración:** 2–3h

**Cambios:**

```jsx
import { Box, Grid, Typography, Container } from '@mui/material';
import { designTokens } from '../theme';

export const DashboardPage = () => {
  return (
    <Container maxWidth={false}>
      {/* Page Title */}
      <Box sx={{ marginBottom: designTokens.spacing['3xl'] }}>
        <Typography variant="h1">Dashboard</Typography>
        <Typography variant="body2" sx={{ color: designTokens.colors.text.secondary, marginTop: designTokens.spacing.sm }}>
          Resumen de operaciones
        </Typography>
      </Box>

      {/* KPI Cards Grid */}
      <Grid container spacing={designTokens.spacing.lg} sx={{ marginBottom: designTokens.spacing['3xl'] }}>
        {kpis.map((kpi) => (
          <Grid item xs={12} sm={6} md={3} key={kpi.id}>
            <KPICard {...kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Chart Section */}
      <Box
        sx={{
          backgroundColor: designTokens.colors.background.elevated,
          border: `1px solid ${designTokens.colors.gray[600]}`,
          borderRadius: designTokens.borderRadius.lg,
          padding: designTokens.spacing.xl,
          marginBottom: designTokens.spacing['3xl'],
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: designTokens.spacing.lg }}>
          Tendencia de Órdenes
        </Typography>
        {/* Chart component */}
      </Box>

      {/* Recent Orders Table */}
      <Box
        sx={{
          backgroundColor: designTokens.colors.background.elevated,
          border: `1px solid ${designTokens.colors.gray[600]}`,
          borderRadius: designTokens.borderRadius.lg,
          padding: designTokens.spacing.xl,
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: designTokens.spacing.lg }}>
          Órdenes Recientes
        </Typography>
        {/* Table component */}
      </Box>
    </Container>
  );
};
```

**Checklist:**
- [ ] Layout con KPI cards 4-column grid (desktop)
- [ ] Responsive: 1 column (mobile), 2 columns (tablet)
- [ ] Charts + table con padding/border consistentes

---

### 4.2 Paso 12: Páginas – Aplicar a Todos los Pages

**Archivos a aplicar:**
- `frontend/src/pages/ClientesPage.jsx`
- `frontend/src/pages/MotocicletasPage.jsx`
- `frontend/src/pages/OrdenesListPage.jsx`
- `frontend/src/pages/OrdenDetailPage.jsx`
- `frontend/src/pages/RepuestosListPage.jsx`
- `frontend/src/pages/RepuestoDetailPage.jsx`
- `frontend/src/pages/StockPage.jsx`
- `frontend/src/pages/CobrosPage.jsx`
- `frontend/src/pages/ProveedoresPage.jsx`
- `frontend/src/pages/ReportesPage.jsx`

**Duración:** 4–6h

**Cambios genéricos a aplicar:**

1. Page title + subtitle
2. Grid de tarjetas con consistent spacing
3. Tablas con styling nuevo
4. Modales/dialogs con nuevo styling
5. Reemplazar hardcoded colors con `designTokens`

**Template genérico:**
```jsx
import { Box, Typography, Container } from '@mui/material';
import { designTokens } from '../theme';

export const SomePage = () => {
  return (
    <Container maxWidth={false}>
      {/* Title */}
      <Box sx={{ marginBottom: designTokens.spacing['3xl'] }}>
        <Typography variant="h1">Página Nombre</Typography>
      </Box>

      {/* Content */}
      <Box sx={{ 
        backgroundColor: designTokens.colors.background.elevated,
        borderRadius: designTokens.borderRadius.lg,
        padding: designTokens.spacing.xl,
      }}>
        {/* Content */}
      </Box>
    </Container>
  );
};
```

**Checklist:**
- [ ] Aplicar a todas las 10 páginas
- [ ] Remover colores hardcoded
- [ ] Validar componentes hijos (tablas, forms) usen tema

---

### 4.3 Paso 13: Responsive Mobile – Hamburger Menu

**Archivo:** `frontend/src/layouts/MainLayout.jsx` (EXTENDER)  
**Duración:** 2–3h

**Cambios:**

```jsx
import { Box, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { designTokens } from '../theme';

export const MainLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar Desktop */}
      <Box
        component="aside"
        sx={{
          display: { xs: 'none', lg: 'block' }, // Hide on mobile/tablet
          width: '280px',
          backgroundColor: designTokens.colors.gray[900],
          // ... rest of styles
        }}
      >
        {/* Sidebar content */}
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            backgroundColor: designTokens.colors.gray[900],
            width: '280px',
          },
        }}
      >
        {/* Sidebar content (same as desktop) */}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* TopBar */}
        <Box
          component="nav"
          sx={{
            backgroundColor: designTokens.colors.background.paper,
            borderBottom: `1px solid ${designTokens.colors.gray[600]}`,
            padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Hamburger menu (mobile only) */}
          <IconButton
            onClick={() => setMobileMenuOpen(true)}
            sx={{
              display: { xs: 'block', lg: 'none' },
              color: designTokens.colors.primary.main,
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Breadcrumb */}
          <Breadcrumb />

          {/* User Menu */}
          <UserMenu />
        </Box>

        {/* Page Content */}
        <Box sx={{ flex: 1, overflow: 'auto', padding: designTokens.spacing['2xl'] }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
```

**Checklist:**
- [ ] Hamburger menu visible on mobile (< 1024px)
- [ ] Menu closes on item click
- [ ] Drawer overlay animates smoothly

---

### 4.4 Punto de Control – Fase 3C

**Verificaciones obligatorias:**

1. ✅ Todas las páginas tienen título + padding consistente
2. ✅ Tablas en todas las páginas con nuevo styling
3. ✅ Responsive layouts (mobile hamburger, grid columns)
4. ✅ Sin colores hardcoded
5. ✅ Espaciado consistente en toda la app

---

## 5. Fase 3D – Polish & Accessibility (5–8h)

### 5.1 Paso 14: Micro-interacciones

**Duración:** 2–3h

**Agregaciones a `index.css`:**

```css
/* Button interactions */
button {
  transition: all 200ms ease-out;
}

button:hover {
  transform: scale(1.02);
}

button:active {
  transform: scale(0.98);
}

/* Card hover */
.card, [role="region"] {
  transition: all 200ms ease-out;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 
              0 0 12px rgba(0, 217, 255, 0.2);
}

/* Link hover */
a:hover {
  text-decoration: underline;
}

/* Input focus animation */
input:focus,
textarea:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.1);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Loading animation */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

**Checklist:**
- [ ] Botones escalan al hover/click
- [ ] Cards levantan con sombra en hover
- [ ] Inputs tienen glow en focus
- [ ] Transiciones smooth (no jarring)

---

### 5.2 Paso 15: Accesibilidad – Focus Indicators & WCAG

**Duración:** 2–3h

**Verificaciones:**

1. **Focus visible global:**
```css
*:focus-visible {
  outline: 2px solid #00D9FF;
  outline-offset: 2px;
}
```

2. **Form labels:**
```jsx
// Todos los inputs deben tener <label>
<label htmlFor="nombre">Nombre *</label>
<input id="nombre" name="nombre" {...props} />
```

3. **Color contrast:**
- [ ] Validar con WebAIM Contrast Checker
  - Text primary (#FFFFFF on #1A1A1A): 21:1 ✅
  - Text secondary (#B0B0B0 on #1A1A1A): 8:1 ✅
  - Primary button (#0F0F0F on #00D9FF): 11:1 ✅

4. **ARIA labels:**
```jsx
// Buttons sin texto visible
<IconButton aria-label="close" onClick={handleClose}>
  <CloseIcon />
</IconButton>

// Alerts
<Alert role="alert" severity="error">
  Error message
</Alert>
```

5. **Prefers reduced motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Checklist:**
- [ ] Focus visible en todos los elementos
- [ ] Labels asociados con inputs
- [ ] Contrast ratios validados
- [ ] ARIA labels en iconos
- [ ] `prefers-reduced-motion` respetado

---

### 5.3 Paso 16: Testing Visual – Checklist

**Duración:** 1–2h

**Verificaciones manuales:**

| Elemento | Desktop | Tablet | Mobile | Estado |
|----------|---------|--------|--------|--------|
| Buttons | Cyan, hover scale | ✓ | ✓ | ⬜ |
| Inputs | Focus cyan ring | ✓ | ✓ | ⬜ |
| Cards | Hover glow | ✓ | ✓ | ⬜ |
| Tables | Sortable, scroll | ✓ | Horizontal | ⬜ |
| Sidebar | Sticky, active | Hidden | Hidden | ⬜ |
| Modals | Centered, closed | ✓ | ✓ | ⬜ |
| Status chips | Colors correct | ✓ | ✓ | ⬜ |
| Forms | Labels, errors | ✓ | ✓ | ⬜ |
| Links | Cyan, underline | ✓ | ✓ | ⬜ |
| Scrollbars | Dark theme | ✓ | ✓ | ⬜ |

**Herramientas:**
- Chrome DevTools: Lighthouse (Accessibility)
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Browser screenshots a múltiples resoluciones

**Checklist:**
- [ ] Lighthouse Accessibility > 90
- [ ] Contrast ratios > 4.5:1 (AA)
- [ ] Focus indicators visible
- [ ] Mobile responsive (320px–1920px)

---

### 5.4 Punto de Control – Fase 3D

**Verificaciones obligatorias:**

1. ✅ Micro-interacciones funcionales
2. ✅ Focus indicators visibles
3. ✅ Contrast ratios WCAG AA
4. ✅ Responsive en todas las resoluciones
5. ✅ Lighthouse score > 85 (Performance + Accessibility)

---

## 6. Fase 3E – Testing & Deployment (5–10h)

### 6.1 Paso 17: Build & Test

**Duración:** 1–2h

```bash
# Install dependencies
npm install

# Linting
npm run lint

# Build production
npm run build

# Serve production build locally
npm run preview
```

**Verificaciones:**

- ✅ Compilation sin warnings
- ✅ Bundle size razonable (< 500KB gzipped)
- ✅ No console errors
- ✅ Production preview funciona

---

### 6.2 Paso 18: Git Commit & PR

**Duración:** 1h

```bash
# Stage all changes
git add .

# Commit con mensaje descriptivo
git commit -m "feat: modernize frontend with dark/tech aesthetic, cyan accents

- Update color palette (cyan primary, professional grays)
- Refactor typography hierarchy (Inter font stack)
- Implement design tokens system (theme.js)
- Style buttons, inputs, cards, tables with new visual system
- Add micro-interactions (hover states, focus rings)
- Improve accessibility (WCAG AA contrast, aria labels)
- Enhance responsive design (mobile hamburger menu)
- Apply to all pages and layouts
- No functional changes, visual redesign only"

# Push to redesign-frontend
git push -u origin redesign-frontend
```

**Crear Pull Request:**

```
Title: Redesign Frontend – Phase 1-3 Visual System Implementation

Description:
This PR implements the comprehensive frontend redesign with modern dark/tech aesthetic.

## Changes
- New design token system (theme.js) with color palette, typography, spacing
- Updated Material UI theme in ThemeContext.jsx
- Refactored all components (buttons, inputs, cards, tables, navbars)
- Applied new visual system to all 10+ pages
- Enhanced responsive design (mobile hamburger, grid layouts)
- Improved accessibility (WCAG AA, focus indicators, aria labels)
- Added micro-interactions (hover states, transitions)

## Testing
- Visual tested on desktop, tablet, mobile (320px–1920px)
- Lighthouse Accessibility > 90
- No functional changes, feature parity maintained
- API contracts unchanged

## Related Docs
- Audit: docs/redesign/01-auditoria.md
- Visual Spec: docs/redesign/02-sistema-visual.md
- Implementation Plan: docs/redesign/03-plan-implementacion.md
```

**Checklist:**
- [ ] All changes committed
- [ ] PR description completa
- [ ] Referencia a documentos de fase anterior
- [ ] CI/CD checks pasadas (si aplica)

---

### 6.3 Paso 19: Revisión & Merge

**Duración:** 2–3h

**Revisiones necesarias:**

1. **Code review:** (self-review ok)
   - ✅ Cambios visuales consistentes
   - ✅ Tokens utilizados en lugar de hardcoding
   - ✅ Sin funcionalidad alterada
   - ✅ Responsive correcto

2. **Visual review:**
   - ✅ Colores coinciden especificación
   - ✅ Spacing consistente
   - ✅ Typography legible
   - ✅ Transiciones smooth

3. **Accessibility review:**
   - ✅ Focus visible
   - ✅ Contrast ratios WCAG AA
   - ✅ Aria labels donde corresponda

**Merge a main:**

```bash
# Switch to main
git checkout main

# Pull latest
git pull origin main

# Merge redesign-frontend
git merge redesign-frontend

# Push
git push origin main
```

**Checklist:**
- [ ] Code review pasada
- [ ] Visual review aprobada
- [ ] Accessibility check completa
- [ ] Merged a main
- [ ] Preparado para deployment

---

### 6.4 Paso 20: Deployment a Render

**Duración:** 1–2h

Render detectará cambios en main y redeploy automáticamente.

**Verificaciones post-deployment:**

1. Acceder a https://motofix-frontend.onrender.com (o URL actual)
2. Verificar cambios visuales en vivo
3. Probar en múltiples navegadores (Chrome, Firefox, Safari, Edge)
4. Verificar responsive (mobile DevTools)
5. Probar APIs (login, crear orden, etc.)

**Checklist:**
- [ ] Deployment completado sin errores
- [ ] Frontend se carga en navegador
- [ ] Colores, tipografía visibles correctamente
- [ ] APIs funcionando (datos cargando)
- [ ] Mobile responsive

---

### 6.5 Punto de Control Final – Fase 3E

**Verificaciones obligatorias:**

1. ✅ Build compila sin warnings
2. ✅ Code review pasada
3. ✅ Visual testing completa
4. ✅ Accessibility WCAG AA validada
5. ✅ Desplegado a producción
6. ✅ Funcionando en vivo

---

## 7. Matriz de Cambios por Archivo

| Archivo | Acción | Prioridad | Fase |
|---------|--------|-----------|------|
| `src/theme.js` | CREAR | 🔴 | 3A |
| `src/index.css` | MODIFICAR (extender) | 🔴 | 3A |
| `src/context/ThemeContext.jsx` | MODIFICAR (refactor theme) | 🔴 | 3A |
| `src/App.jsx` | VERIFICAR (ThemeProvider) | 🟡 | 3A |
| `src/pages/DashboardPage.jsx` | MODIFICAR (layout KPI) | 🔴 | 3B–3C |
| `src/pages/ClientesPage.jsx` | MODIFICAR (tabla styling) | 🔴 | 3B–3C |
| `src/pages/OrdenesListPage.jsx` | MODIFICAR (tabla + buttons) | 🔴 | 3B–3C |
| `src/pages/OrdenDetailPage.jsx` | MODIFICAR (form styling) | 🔴 | 3B–3C |
| `src/pages/OrdenFormPage.jsx` | MODIFICAR (form inputs) | 🔴 | 3B–3C |
| `src/pages/RepuestosListPage.jsx` | MODIFICAR (tabla styling) | 🔴 | 3B–3C |
| `src/pages/RepuestoDetailPage.jsx` | MODIFICAR (form styling) | 🔴 | 3B–3C |
| `src/pages/StockPage.jsx` | MODIFICAR (tabla styling) | 🟡 | 3B–3C |
| `src/pages/CobrosPage.jsx` | MODIFICAR (tabla + form) | 🟡 | 3B–3C |
| `src/pages/ProveedoresPage.jsx` | MODIFICAR (tabla + form) | 🟡 | 3B–3C |
| `src/pages/ReportesPage.jsx` | MODIFICAR (charts + tabla) | 🟡 | 3B–3C |
| `src/layouts/MainLayout.jsx` | MODIFICAR (navbar + sidebar) | 🔴 | 3B–3C |
| `src/layouts/AuthLayout.jsx` | MODIFICAR (login page styling) | 🟡 | 3B–3C |
| `src/components/ConfirmDialog.jsx` | MODIFICAR (dialog styling) | 🟡 | 3B |
| `src/components/OrderStatusChip.jsx` | CREAR | 🔴 | 3B |
| `src/services/api.js` | NO MODIFICAR | ✅ | – |
| `src/hooks/*` | NO MODIFICAR | ✅ | – |
| `vite.config.js` | NO MODIFICAR | ✅ | – |
| `package.json` | NO MODIFICAR (no deps) | ✅ | – |

---

## 8. Riesgos & Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|--------|-----------|
| Cambios visuales rompen responsive | Media | Medio | Testing en múltiples resoluciones (Paso 5.3) |
| Performance degradation | Baja | Medio | Validar bundle size, Lighthouse > 85 |
| Accesibilidad no cumple WCAG AA | Media | Alto | Focus testing, contrast checker, Lighthouse a11y |
| Conflictos de merge con main | Baja | Bajo | Branch `redesign-frontend` isolado |
| Colores no coinciden especificación | Baja | Bajo | Token system centralizado (theme.js) |
| API integration rompe | Muy baja | Alto | No modificar services/api.js, solo styling |

---

## 9. Resumen de Estimación

| Fase | Tareas | Horas | Especialidad |
|------|--------|-------|--------------|
| 3A – Core System | theme.js, index.css, ThemeContext, App | 10–12h | Frontend/Design Tokens |
| 3B – Components | Buttons, inputs, cards, tables, navbars, chips | 15–20h | React/MUI Styling |
| 3C – Pages & Layouts | Dashboard, pages, responsive mobile | 10–15h | React Layout Design |
| 3D – Polish & A11y | Micro-interactions, accessibility testing | 5–8h | UX/Accessibility |
| 3E – Testing & Deploy | Build, testing, PR, merge, deployment | 5–10h | QA/DevOps |
| **TOTAL** | **20 tasks** | **45–65h** | **Full-stack Frontend** |

---

## 10. Definición de "Listo"

✅ **Fase 3 se considera COMPLETA cuando:**

1. Todos los tokens de diseño implementados en `theme.js`
2. Todos los componentes refactorizados con nuevo styling
3. Todas las páginas aplicadas con nuevo visual system
4. Responsive design validado (xs–xl breakpoints)
5. Accesibilidad WCAG AA confirmada (Lighthouse > 90)
6. Micro-interacciones funcionales (hover, focus, active)
7. Build producción sin warnings
8. PR mergeado a main
9. Desplegado a producción
10. Funcionando sin errores en vivo

---

## 11. Próximos Pasos Post-Fase 3

- **Fase 4 (Futuro):** Light mode toggle (ThemeContext soporta, UI no expone)
- **Fase 5 (Futuro):** Dark mode refinement basado en feedback usuario
- **Fase 6 (Futuro):** Componentes adicionales (datepickers, advanced tables, etc.)

---

**Documento generado:** Octubre 2026 | MotoFix Frontend Redesign Phase 3  
**Estado:** Listo para Ejecución  
**Rama:** redesign-frontend  
**Aprobación requerida:** Tech Lead (antes de iniciar Paso 5)
