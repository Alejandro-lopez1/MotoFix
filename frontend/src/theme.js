/**
 * MotoFix Design Tokens
 * Centralized design system for dark/tech aesthetic with cyan accents
 * 
 * Usage:
 * import { designTokens } from '../theme';
 * const color = designTokens.colors.primary.main; // #00D9FF
 */

export const designTokens = {
  // ==================== COLORS ====================
  colors: {
    // Primary Cyan
    primary: {
      main: '#00D9FF',
      light: '#4EFAFF',
      dark: '#00A8CC',
      lighter: 'rgba(0, 217, 255, 0.1)',
      border: 'rgba(0, 217, 255, 0.5)',
    },

    // Secondary Magenta/Pink
    secondary: {
      main: '#FF6B9D',
      light: '#FF9BC5',
      dark: '#E63E7F',
    },

    // Grayscale (dark theme optimized)
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

    // Semantic Colors
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

    // Text/Foreground
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      tertiary: '#808080',
      disabled: '#606060',
    },
  },

  // ==================== TYPOGRAPHY ====================
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

  // ==================== SPACING ====================
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  },

  // ==================== BORDER RADIUS ====================
  borderRadius: {
    sm: '8px',
    md: '10px',
    lg: '12px',
    full: '50%',
  },

  // ==================== TRANSITIONS ====================
  transitions: {
    fast: '100ms ease-out',
    normal: '200ms ease-out',
    slow: '300ms ease-out',
  },

  // ==================== BREAKPOINTS ====================
  breakpoints: {
    xs: '0px',
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
  },

  // ==================== SHADOWS ====================
  shadows: {
    sm: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0px 4px 12px rgba(0, 0, 0, 0.3)',
    lg: '0px 8px 24px rgba(0, 0, 0, 0.4)',
    xl: '0px 20px 60px rgba(0, 0, 0, 0.5)',
    cyan: '0px 0px 12px rgba(0, 217, 255, 0.2)',
  },

  // ==================== ORDER STATE COLORS ====================
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

export default designTokens;
