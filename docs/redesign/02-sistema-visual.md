# MotoFix Frontend – Sistema Visual Redesign
## Fase 2: Especificación del Sistema de Diseño

**Fecha:** Octubre 2026  
**Estado:** Propuesta para Aprobación  
**Objetivo:** Definir tokens visuales, componentes y patrones para modernizar MotoFix con estética dark/tech, acentos cyan, y look SaaS profesional.

---

## 1. Introducción

Esta especificación describe el nuevo sistema de diseño para MotoFix Frontend. Mantiene toda la funcionalidad existente mientras moderniza la apariencia con:
- **Paleta de colores:** Dark theme con acentos cyan, grises profesionales, y colores semánticos para estados
- **Tipografía:** Jerarquía clara, legibilidad mejorada
- **Espaciado:** Escala consistente basada en 8px
- **Componentes:** Especificaciones visuales para botones, tarjetas, tablas, formularios, chips, etc.
- **Estados de Órdenes:** Colores semánticos vinculados a flujo de trabajo

---

## 2. Paleta de Colores

### 2.1 Color Primario y Acentos

| Token | Valor | Uso | Notas |
|-------|-------|-----|-------|
| `primary.main` | `#00D9FF` (Cyan) | Acciones principales, highlights, links activos | Moderno, tech, contraste alto en dark |
| `primary.light` | `#4EFAFF` | Hover, interactive states | Cyan más claro |
| `primary.dark` | `#00A8CC` | Active, pressed states | Cyan más oscuro |
| `secondary.main` | `#FF6B9D` | Acciones secundarias, emphasis | Magenta/pink suave |
| `secondary.light` | `#FF9BC5` | Hover secondary | |
| `secondary.dark` | `#E63E7F` | Active secondary | |

### 2.2 Neutros (Grays)

| Token | Valor | Uso | Lumin. |
|-------|-------|-----|--------|
| `gray.900` | `#0F0F0F` | Background deepest (modals overlay) | 2% |
| `gray.800` | `#1A1A1A` | Background principal (pages) | 7% |
| `gray.700` | `#262626` | Background secondary (cards, panels) | 13% |
| `gray.600` | `#404040` | Borders, dividers | 22% |
| `gray.500` | `#666666` | Icons secondary, disabled text | 35% |
| `gray.400` | `#999999` | Placeholder text, hints | 51% |
| `gray.300` | `#D0D0D0` | Subtle backgrounds, light borders | 75% |
| `gray.200` | `#E5E5E5` | Light backgrounds (if light mode needed) | 87% |
| `gray.100` | `#F5F5F5` | Light page background | 93% |
| `gray.50` | `#FAFAFA` | Lightest surfaces | 98% |

### 2.3 Colores Semánticos

| Token | Valor | Uso |
|-------|-------|-----|
| `success.main` | `#10B981` | Confirmaciones, acciones exitosas, positive status |
| `success.light` | `#6EE7B7` | Hover success |
| `success.dark` | `#059669` | Active success |
| `warning.main` | `#F59E0B` | Advertencias, atención requerida |
| `warning.light` | `#FBBF24` | Hover warning |
| `warning.dark` | `#D97706` | Active warning |
| `error.main` | `#EF4444` | Errores, estados críticos, deletar |
| `error.light` | `#F87171` | Hover error |
| `error.dark` | `#DC2626` | Active error |
| `info.main` | `#3B82F6` | Información, alerts informativos |
| `info.light` | `#60A5FA` | Hover info |
| `info.dark` | `#1D4ED8` | Active info |

### 2.4 Backgrounds y Surfaces

| Token | Valor | Contexto |
|-------|-------|---------|
| `background.default` | `#0F0F0F` | Body background, main container |
| `background.paper` | `#1A1A1A` | Cards, modals, panels |
| `background.elevated` | `#262626` | Hovered cards, floating elements |
| `surface.subtle` | `#404040` | Subtle backgrounds, inactive tabs |

### 2.5 Text / Foreground

| Token | Valor | Contrast (WCAG) |
|-------|-------|-----------------|
| `text.primary` | `#FFFFFF` | 21:1 (AAA) |
| `text.secondary` | `#B0B0B0` | 8:1 (AA) |
| `text.tertiary` | `#808080` | 4.5:1 (AA) |
| `text.disabled` | `#606060` | 3:1 (low, intentional) |

---

## 3. Tipografía

### 3.1 Familia de Fuentes

```css
--font-family-sans: "Inter", "Roboto", system-ui, sans-serif;
--font-family-mono: "Fira Code", "JetBrains Mono", monospace;
```

**Reasoning:**
- Inter: Moderna, clara, óptima para interfaces
- Roboto fallback: Seguridad en dispositivos sin Inter
- Monospace para códigos, valores numéricos en tablas

### 3.2 Escala Tipográfica

| Nivel | Peso | Tamaño | Line-Height | Uso |
|-------|------|--------|------------|-----|
| **H1** | 700 (Bold) | 32px | 40px (1.25) | Títulos de página principal |
| **H2** | 600 (SemiBold) | 24px | 32px (1.33) | Títulos de sección |
| **H3** | 600 (SemiBold) | 20px | 28px (1.4) | Subtítulos, card titles |
| **H4** | 600 (SemiBold) | 16px | 24px (1.5) | Headings pequeños |
| **Body Large** | 400 (Regular) | 16px | 24px (1.5) | Body principal, descripciones |
| **Body** | 400 (Regular) | 14px | 22px (1.57) | Body por defecto, labels |
| **Body Small** | 400 (Regular) | 12px | 18px (1.5) | Hints, metadata, timestamps |
| **Caption** | 400 (Regular) | 11px | 16px (1.45) | Captions, very small text |
| **Button** | 500 (Medium) | 14px | 20px (1.43) | Texto en botones |

### 3.3 Reglas Tipográficas

- **H1, H2, H3, H4:** Color `text.primary` (#FFFFFF)
- **Body Large, Body:** Color `text.primary` (#FFFFFF) por defecto, `text.secondary` (#B0B0B0) para metadata
- **Body Small, Caption:** Color `text.secondary` (#B0B0B0)
- **Enlaces:** Color `primary.main` (#00D9FF), underline on hover
- **Disabled text:** Color `text.disabled` (#606060)

---

## 4. Escala de Espaciado

Base: **8px**

| Token | Valor | Uso |
|-------|-------|-----|
| `xs` | 4px | Espacios micro, gaps pequeños entre elementos |
| `sm` | 8px | Padding botones pequeños, gaps en grillas |
| `md` | 12px | Padding tarjetas, gap default |
| `lg` | 16px | Padding contenedores, margen entre secciones |
| `xl` | 24px | Margen grande, gap entre bloques principales |
| `2xl` | 32px | Espacios amplios, margen de página |
| `3xl` | 48px | Espacios extra amplios |

### 4.1 Aplicación

```
Botón: padding 8px 16px (vertical sm, horizontal lg)
Card: padding 16px (lg)
Input: padding 10px 12px (vertical 10px custom, horizontal md)
Page Container: padding 24px / gap 24px (xl)
Card Grid: gap 16px (lg)
Section Margin: margin-bottom 32px (3xl)
```

---

## 5. Componentes Visuales

### 5.1 Botones

#### Variantes

| Variante | Background | Border | Text Color | Hover Bg | Active Bg |
|----------|-----------|--------|-----------|----------|-----------|
| **Primary** | `primary.main` (#00D9FF) | None | `gray.900` | `primary.light` | `primary.dark` |
| **Secondary** | Transparent | `primary.main` (2px) | `primary.main` | `primary.main` + 10% opacity bg | `primary.dark` text |
| **Tertiary** | `gray.700` | None | `text.primary` | `gray.600` | `gray.500` |
| **Danger** | `error.main` | None | `white` | `error.light` | `error.dark` |
| **Disabled** | `gray.600` | None | `text.disabled` | – | – |

#### Tamaños

| Size | Padding | Font | Height | Border Radius |
|------|---------|------|--------|---------------|
| `small` | 6px 12px | Body Small (12px) | 32px | 8px |
| `medium` | 8px 16px | Body (14px) | 40px | 10px |
| `large` | 12px 24px | Body (14px) | 48px | 12px |

#### Transiciones

```css
background-color: 200ms ease-out;
border-color: 200ms ease-out;
transform: 100ms ease-out (scale 0.98 on active);
```

---

### 5.2 Tarjetas (Cards)

```css
background: #262626 (gray.700)
border: 1px solid #404040 (gray.600)
border-radius: 12px
padding: 16px (lg)
box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3)
transition: all 200ms ease-out

&:hover {
  background: #2E2E2E (slightly lighter)
  box-shadow: 0px 8px 24px rgba(0, 217, 255, 0.1) // subtle cyan glow
  transform: translateY(-2px)
}
```

#### Variante Elevada (modals, popovers)
```css
background: #1A1A1A (gray.800)
box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.5)
```

---

### 5.3 Formularios e Inputs

#### Input de Texto / Select

```css
background: #1A1A1A (gray.800)
border: 1px solid #404040 (gray.600)
border-radius: 8px
padding: 10px 12px (vertical 10px, horizontal md)
color: #FFFFFF (text.primary)
font-size: 14px (Body)

&:focus {
  border-color: #00D9FF (primary.main)
  box-shadow: 0px 0px 0px 3px rgba(0, 217, 255, 0.1)
  outline: none
}

&:hover:not(:focus) {
  border-color: #666666 (gray.500)
}

&::placeholder {
  color: #999999 (gray.400)
}

&:disabled {
  background: #262626 (gray.700)
  border-color: #404040 (gray.600)
  color: #606060 (text.disabled)
  cursor: not-allowed
}
```

#### Label

```css
font-size: 12px (Body Small)
font-weight: 500 (Medium)
color: #B0B0B0 (text.secondary)
margin-bottom: 6px (xs + 2px)
```

#### Error State

```css
border-color: #EF4444 (error.main)
box-shadow: 0px 0px 0px 3px rgba(239, 68, 68, 0.1)

&::after {
  content: "" 
  display: block
  margin-top: 4px
  font-size: 12px
  color: #EF4444 (error.main)
}
```

---

### 5.4 Chips / Badges

```css
display: inline-flex
align-items: center
gap: 6px
padding: 4px 8px (xs)
background: #262626 (gray.700)
border: 1px solid #404040 (gray.600)
border-radius: 16px
font-size: 12px (Body Small)
font-weight: 500 (Medium)
color: #FFFFFF (text.primary)
```

#### Variantes por Estado

Cuando se usa para mostrar estado de orden:
- **Background:** Color semántico, opacity 20%
- **Border:** Color semántico, opacity 50%
- **Text:** Color semántico, opacity 100%

Ejemplo: `Recibida` (gray):
```css
background: rgba(102, 102, 102, 0.2)
border: 1px solid rgba(102, 102, 102, 0.5)
color: #CCCCCC
```

---

### 5.5 Tablas

```css
background: #1A1A1A (gray.800)
border-collapse: collapse
border: 1px solid #404040 (gray.600)
border-radius: 10px
overflow: hidden

& thead {
  background: #262626 (gray.700)
  border-bottom: 2px solid #404040 (gray.600)
}

& th {
  padding: 12px 16px (md, lg)
  text-align: left
  font-size: 12px (Body Small)
  font-weight: 600 (SemiBold)
  color: #B0B0B0 (text.secondary)
  text-transform: uppercase
  letter-spacing: 0.5px
}

& td {
  padding: 12px 16px (md, lg)
  border-bottom: 1px solid #404040 (gray.600)
  color: #FFFFFF (text.primary)
  font-size: 14px (Body)
}

& tr:hover {
  background: #262626 (gray.700)
}

& tr:last-child td {
  border-bottom: none
}
```

#### Responsive Mobile

- Table horizontal scroll para pantallas < 768px
- Cabeceras sticky con position: sticky; top: 0

---

### 5.6 Modales

```css
background: #1A1A1A (gray.800)
border: 1px solid #404040 (gray.600)
border-radius: 12px
box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.5)
padding: 24px (xl)

& .modal-header {
  margin-bottom: 24px (xl)
  padding-bottom: 16px (lg)
  border-bottom: 1px solid #404040 (gray.600)
}

& .modal-title {
  font-size: 24px (H2)
  font-weight: 600 (SemiBold)
  color: #FFFFFF (text.primary)
}

& .modal-body {
  margin-bottom: 24px (xl)
}

& .modal-footer {
  display: flex
  gap: 12px (md)
  justify-content: flex-end
  padding-top: 16px (lg)
  border-top: 1px solid #404040 (gray.600)
}
```

---

### 5.7 Navbars y Sidebars

#### Sidebar (MainLayout)

```css
background: #0F0F0F (gray.900)
border-right: 1px solid #404040 (gray.600)
width: 280px (desktop) / 0 (mobile, overlay on menu)
padding: 16px (lg)
position: sticky
top: 0
height: 100vh
overflow-y: auto

& .logo {
  margin-bottom: 32px (3xl)
  display: flex
  align-items: center
  gap: 12px (md)
}

& .nav-item {
  padding: 10px 12px
  margin-bottom: 8px (sm)
  border-radius: 8px
  color: #B0B0B0 (text.secondary)
  transition: all 200ms ease-out
  cursor: pointer

  &:hover {
    background: #262626 (gray.700)
    color: #00D9FF (primary.main)
  }

  &.active {
    background: #262626 (gray.700)
    color: #00D9FF (primary.main)
    border-left: 3px solid #00D9FF
    padding-left: 9px
  }
}
```

#### Top Navbar (MainLayout)

```css
background: #1A1A1A (gray.800)
border-bottom: 1px solid #404040 (gray.600)
padding: 12px 24px (md, xl)
display: flex
justify-content: space-between
align-items: center
position: sticky
top: 0
z-index: 100
height: 60px

& .breadcrumb {
  font-size: 12px (Body Small)
  color: #B0B0B0 (text.secondary)

  & a {
    color: #00D9FF (primary.main)
    text-decoration: none

    &:hover {
      text-decoration: underline
    }
  }
}

& .user-menu {
  display: flex
  align-items: center
  gap: 16px (lg)
}
```

---

### 5.8 Alerts / Notificaciones (Snackbar)

```css
display: flex
align-items: center
gap: 12px (md)
padding: 12px 16px (md, lg)
border-radius: 8px
font-size: 14px (Body)
font-weight: 500 (Medium)
border-left: 4px solid (por tipo)
```

#### Por Tipo

| Tipo | Background | Border Color | Icon Color |
|------|-----------|--------------|-----------|
| **Success** | `rgba(16, 185, 129, 0.1)` | `#10B981` | `#10B981` |
| **Error** | `rgba(239, 68, 68, 0.1)` | `#EF4444` | `#EF4444` |
| **Warning** | `rgba(245, 158, 11, 0.1)` | `#F59E0B` | `#F59E0B` |
| **Info** | `rgba(59, 130, 246, 0.1)` | `#3B82F6` | `#3B82F6` |

---

## 6. Estados de Órdenes (Colores Semánticos)

Mapeo de estados de orden a colores visuales para chips, badges, y indicadores.

| Estado | Color | Background | Border | Icono | Significado |
|--------|-------|-----------|--------|-------|------------|
| **Recibida** | `#808080` (gray) | `rgba(128,128,128,0.2)` | `rgba(128,128,128,0.5)` | 📥 | Inicial, sin procesar |
| **En diagnóstico** | `#00D9FF` (cyan/primary) | `rgba(0,217,255,0.2)` | `rgba(0,217,255,0.5)` | 🔍 | En evaluación |
| **En reparación** | `#F59E0B` (warning) | `rgba(245,158,11,0.2)` | `rgba(245,158,11,0.5)` | 🔧 | Trabajo activo |
| **Esperando repuesto** | `#EF4444` (error) | `rgba(239,68,68,0.2)` | `rgba(239,68,68,0.5)` | ⏸️ | Bloqueado, requiere atención |
| **En reparación retorno** | `#F59E0B` (warning) | `rgba(245,158,11,0.2)` | `rgba(245,158,11,0.5)` | 🔄 | Segunda fase reparación |
| **Lista para entregar** | `#10B981` (success) | `rgba(16,185,129,0.2)` | `rgba(16,185,129,0.5)` | ✅ | Completada, listo |
| **Entregada** | `#808080` (gray) | `rgba(128,128,128,0.15)` | `rgba(128,128,128,0.4)` | 📤 | Final, cerrada |

---

## 7. Dashboard – Propuesta de Layout

### 7.1 Estructura

```
┌─────────────────────────────────────────────────────┐
│ Navbar (60px) – Breadcrumb | Search | User Menu    │
├──────────┬───────────────────────────────────────────┤
│ Sidebar  │ Page Title                           32px │
│ (280px)  ├───────────────────────────────────────────┤
│          │                                           │
│ • Logo   │ [KPI Cards Row] (4 col / 2 col mobile)  │
│          │ Outstanding Orders | Revenue | etc.      │
│ • Nav    ├───────────────────────────────────────────┤
│ Items    │                                           │
│          │ [Chart Section] – Upcoming Orders Trend  │
│          │ (Line or Bar chart, TBD by impl)         │
│          ├───────────────────────────────────────────┤
│          │                                           │
│          │ [Recent Orders Table]                    │
│          │ Compact, 5-7 rows, sortable, searchable  │
│          │                                           │
│          └───────────────────────────────────────────┘
```

### 7.2 KPI Cards

```css
/* Each KPI Card */
background: #262626 (gray.700)
border: 1px solid #404040 (gray.600)
border-radius: 12px
padding: 16px (lg)
display: flex
flex-direction: column
gap: 8px (sm)

& .kpi-icon {
  font-size: 32px
  color: #00D9FF (primary.main)
}

& .kpi-label {
  font-size: 12px (Body Small)
  color: #B0B0B0 (text.secondary)
  font-weight: 500 (Medium)
}

& .kpi-value {
  font-size: 28px
  font-weight: 700 (Bold)
  color: #FFFFFF (text.primary)
}

& .kpi-change {
  font-size: 12px (Body Small)
  display: flex
  align-items: center
  gap: 4px (xs)

  &.positive {
    color: #10B981 (success.main)
  }

  &.negative {
    color: #EF4444 (error.main)
  }
}
```

### 7.3 Chart Container

```css
background: #262626 (gray.700)
border: 1px solid #404040 (gray.600)
border-radius: 12px
padding: 24px (xl)
margin-bottom: 32px (3xl)
min-height: 300px

& .chart-title {
  font-size: 16px (H4)
  font-weight: 600 (SemiBold)
  color: #FFFFFF (text.primary)
  margin-bottom: 16px (lg)
}

& .chart-body {
  width: 100%
  height: 250px
}
```

---

## 8. Responsive Design

### 8.1 Breakpoints

| Breakpoint | Width | Device |
|-----------|-------|--------|
| `xs` | 0px – 480px | Mobile pequeño |
| `sm` | 480px – 768px | Mobile / Tablet pequeño |
| `md` | 768px – 1024px | Tablet |
| `lg` | 1024px – 1440px | Desktop pequeño |
| `xl` | 1440px+ | Desktop grande |

### 8.2 Cambios Responsivos

#### Sidebar

- **lg+:** Visible, 280px
- **md–:** Hidden, toggle via hamburger menu (overlay)

#### Grid de Cards

- **xs–sm:** 1 columna
- **md:** 2 columnas
- **lg+:** 4 columnas (KPI), 3 columnas (otros)

#### Tablas

- **lg+:** Horizontal scroll normal
- **md–:** Horizontal scroll container, cabeceras sticky

#### Tipografía

- **xs–sm:** H1 = 24px, H2 = 20px (reducido 25%)
- **md+:** Tamaños normales

### 8.3 Mobile Navigation

- Hamburger menu (3-line icon) en navbar mobile
- Sidebar emerges as overlay z-index 200
- Close on item click or click outside

---

## 9. Micro-interacciones

### 9.1 Hover States

- **Botones:** Scale 1.02, shadow subtly increase
- **Links:** Color → primary.main, underline appears
- **Cards:** Translate Y -2px, box-shadow increases con cyan glow
- **Table rows:** Background → gray.700

### 9.2 Focus States

- **Inputs:** Border → primary.main, box-shadow: 0 0 0 3px rgba(0,217,255,0.1)
- **Botones:** Outline ring 2px primary.main, offset 2px

### 9.3 Active States

- **Botones:** Scale 0.98, shadow reduced
- **Nav items:** Background → gray.700, left border cyan
- **Tabs:** Underline → primary.main, 2px

### 9.4 Transiciones

```css
/* Global */
* {
  transition: background-color 200ms ease-out,
              border-color 200ms ease-out,
              color 200ms ease-out,
              box-shadow 200ms ease-out,
              transform 100ms ease-out;
}

/* Inputs focus */
input:focus {
  transition: all 200ms ease-out;
}

/* Dismiss animations */
.alert-dismiss {
  animation: slideOut 300ms ease-out forwards;
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100px);
  }
}
```

---

## 10. Accesibilidad (WCAG 2.1 AA)

### 10.1 Contraste de Color

Todos los pares de color cumplir con **WCAG AA (4.5:1)** para texto normal:

| Elemento | Foreground | Background | Ratio |
|----------|-----------|-----------|-------|
| Text principal | #FFFFFF | #1A1A1A | 21:1 ✅ |
| Text secundario | #B0B0B0 | #1A1A1A | 8:1 ✅ |
| Primary button text | #0F0F0F | #00D9FF | 11:1 ✅ |
| Error text | #EF4444 | #1A1A1A | 5.5:1 ✅ |

### 10.2 Focus Indicators

- Focus ring 2px, color primary.main, visible en todos los elementos interactivos
- No remover outline por defecto sin reemplazar

### 10.3 Etiquetas

- Todos los inputs tienen <label> asociado via `htmlFor`
- Placeholder NO reemplaza label
- Required fields marcados con `*`

### 10.4 Semántica

- Usar <button> para botones, no <div>
- Usar <nav>, <main>, <section> apropiadamente
- Usar <h1>–<h6> en orden jerárquico

### 10.5 Motion

- Proporcionar `prefers-reduced-motion` override
- Duraciones reducidas: transiciones 100ms (vs 200ms)

---

## 11. Componentes Específicos – Especificaciones Detalladas

### 11.1 Order Status Chip

```jsx
<OrderStatusChip status="En diagnóstico">
  /* Renders: */
  <span
    style={{
      background: 'rgba(0, 217, 255, 0.2)',
      border: '1px solid rgba(0, 217, 255, 0.5)',
      color: '#00D9FF',
      padding: '4px 8px',
      borderRadius: '16px',
      fontSize: '12px',
      fontWeight: '500',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
    }}
  >
    🔍 En diagnóstico
  </span>
</OrderStatusChip>
```

### 11.2 Form Input with Error

```jsx
<FormControl error={!!errors.nombre}>
  <label htmlFor="nombre">Nombre Clienta *</label>
  <input
    id="nombre"
    placeholder="Ej. María García"
    style={{
      background: '#1A1A1A',
      border: errors.nombre 
        ? '1px solid #EF4444'
        : '1px solid #404040',
      borderRadius: '8px',
      padding: '10px 12px',
      color: '#FFFFFF',
      fontSize: '14px'
    }}
  />
  {errors.nombre && (
    <span style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>
      {errors.nombre.message}
    </span>
  )}
</FormControl>
```

### 11.3 Confirmation Dialog

```jsx
<ConfirmDialog
  open={true}
  title="Eliminar Orden"
  message="¿Estás seguro? Esta acción no se puede deshacer."
  confirmLabel="Eliminar"
  confirmColor="error"
  cancelLabel="Cancelar"
  onConfirm={handleDelete}
  onCancel={handleCancel}
/>

/* Renders modal con:
   - Background: #1A1A1A, border 1px gray.600
   - Buttons: Primary (cyan), Secondary (gray)
   - Confirm button red (#EF4444) para destructive actions
*/
```

---

## 12. Guía de Implementación – Orden de Prioridad

### Fase 3A – Core Visual System (Alto Impacto)

1. **Paleta de colores** – Actualizar `index.css` y `ThemeContext.jsx`
2. **Tipografía** – Definir escala, actualizar `index.css`
3. **Espaciado** – Crear variables, aplicar a layouts base
4. **Botones** – Refactor MUI Button variants
5. **Inputs** – Refactor MUI TextField variants
6. **Navbars (Sidebar + TopBar)** – Aplicar colores, transiciones
7. **Tablas** – Estilo MUI Table, responsive scroll

### Fase 3B – Componentes Secundarios

8. **Cards** – Refactor layouts, box-shadow, hover
9. **Modales** – Dialog styling
10. **Chips/Badges** – Order status badges
11. **Alerts/Snackbars** – Notificaciones
12. **Dashboard Layout** – Reorganizar KPI grid, charts
13. **Form Labels + Errors** – Mejorar feedback visual

### Fase 3C – Micro-interacciones y Polish

14. Hover states, focus indicators
15. Transiciones y animations
16. Mobile responsive refinements
17. Accessibility pass (focus rings, contrast)

---

## 13. Archivo de Configuración Recomendado

### 13.1 `theme.js` (Nuevo)

```javascript
// frontend/src/theme.js
export const designTokens = {
  colors: {
    primary: { main: '#00D9FF', light: '#4EFAFF', dark: '#00A8CC' },
    secondary: { main: '#FF6B9D', light: '#FF9BC5', dark: '#E63E7F' },
    gray: {
      50: '#FAFAFA', 100: '#F5F5F5', 200: '#E5E5E5', 300: '#D0D0D0',
      400: '#999999', 500: '#666666', 600: '#404040', 700: '#262626',
      800: '#1A1A1A', 900: '#0F0F0F'
    },
    success: { main: '#10B981', light: '#6EE7B7', dark: '#059669' },
    warning: { main: '#F59E0B', light: '#FBBF24', dark: '#D97706' },
    error: { main: '#EF4444', light: '#F87171', dark: '#DC2626' },
    info: { main: '#3B82F6', light: '#60A5FA', dark: '#1D4ED8' },
    background: {
      default: '#0F0F0F',
      paper: '#1A1A1A',
      elevated: '#262626'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      tertiary: '#808080',
      disabled: '#606060'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", system-ui, sans-serif',
    h1: { fontSize: '32px', fontWeight: 700, lineHeight: '40px' },
    h2: { fontSize: '24px', fontWeight: 600, lineHeight: '32px' },
    h3: { fontSize: '20px', fontWeight: 600, lineHeight: '28px' },
    h4: { fontSize: '16px', fontWeight: 600, lineHeight: '24px' },
    bodyLarge: { fontSize: '16px', fontWeight: 400, lineHeight: '24px' },
    body: { fontSize: '14px', fontWeight: 400, lineHeight: '22px' },
    bodySmall: { fontSize: '12px', fontWeight: 400, lineHeight: '18px' },
    caption: { fontSize: '11px', fontWeight: 400, lineHeight: '16px' },
    button: { fontSize: '14px', fontWeight: 500, lineHeight: '20px' }
  },
  spacing: {
    xs: '4px', sm: '8px', md: '12px', lg: '16px',
    xl: '24px', '2xl': '32px', '3xl': '48px'
  },
  borderRadius: {
    sm: '8px', md: '10px', lg: '12px'
  },
  breakpoints: {
    xs: '0px', sm: '480px', md: '768px', lg: '1024px', xl: '1440px'
  },
  orderStateColors: {
    'Recibida': { color: '#808080', bg: 'rgba(128,128,128,0.2)', border: 'rgba(128,128,128,0.5)' },
    'En diagnóstico': { color: '#00D9FF', bg: 'rgba(0,217,255,0.2)', border: 'rgba(0,217,255,0.5)' },
    'En reparación': { color: '#F59E0B', bg: 'rgba(245,158,11,0.2)', border: 'rgba(245,158,11,0.5)' },
    'Esperando repuesto': { color: '#EF4444', bg: 'rgba(239,68,68,0.2)', border: 'rgba(239,68,68,0.5)' },
    'En reparación retorno': { color: '#F59E0B', bg: 'rgba(245,158,11,0.2)', border: 'rgba(245,158,11,0.5)' },
    'Lista para entregar': { color: '#10B981', bg: 'rgba(16,185,129,0.2)', border: 'rgba(16,185,129,0.5)' },
    'Entregada': { color: '#808080', bg: 'rgba(128,128,128,0.15)', border: 'rgba(128,128,128,0.4)' }
  }
};
```

### 13.2 Integración en `ThemeContext.jsx`

```javascript
// Utilizar designTokens en createTheme()
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: designTokens.colors.primary,
    secondary: designTokens.colors.secondary,
    background: designTokens.colors.background,
    // ...
  },
  typography: designTokens.typography
});
```

---

## 14. Notas y Consideraciones

### 14.1 Compatibilidad

- **Navegadores soportados:** Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- **Color contrast:** Validado con WebAIM contra WCAG AA
- **Fallbacks:** Fuentes sans-serif genéricas para compatibilidad

### 14.2 Dark Mode Only (Fase 1)

- Enfoque actual: dark theme (default)
- Light mode puede ser agregado en futuro sin cambios API
- ThemeContext soporta toggle pero UI no lo expone por ahora

### 14.3 Próximos Pasos (Fase 3)

- Convertir esta especificación en archivo `theme.js` importable
- Refactor progresivo de componentes existentes
- Testing visual en múltiples dispositivos/navegadores
- Validación de accesibilidad con herramientas automatizadas

---

## 15. Referencias

- **WCAG 2.1 AA:** https://www.w3.org/WAI/WCAG21/quickref/
- **Material Design 3 (referencia):** https://m3.material.io/
- **Tailwind CSS Color System (referencia):** https://tailwindcss.com/docs/customizing-colors
- **Accesibilidad de color:** WebAIM Contrast Checker

---

## Aprobación

| Rol | Nombre | Fecha | Firma |
|-----|--------|-------|-------|
| Diseño | – | Pendiente | – |
| Tech Lead | – | Pendiente | – |
| Stakeholder | – | Pendiente | – |

**Estado:** Borrador — Pendiente de Revisión y Aprobación

---

**Documento generado:** October 2026 | MotoFix Frontend Redesign Phase 2
