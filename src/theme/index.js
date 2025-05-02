// src/theme/index.js

/**
 * Main theme file for OUTFIQUE App
 * Exports all theme elements from a central location for easy imports
 */

import { COLORS } from './colors';
import { FONTS } from './fonts';

// Common spacing used throughout the app
const SPACING = {
  xxs: 2,   // Tiny spacing
  xs: 4,    // Extra small spacing
  sm: 8,    // Small spacing
  md: 16,   // Medium spacing (standard)
  lg: 24,   // Large spacing
  xl: 32,   // Extra large spacing
  xxl: 48,  // Double extra large spacing
  xxxl: 64, // Triple extra large spacing
};

// Border radius values for consistent rounding
const RADIUS = {
  xs: 4,      // Subtle rounding
  sm: 8,      // Standard rounding
  md: 12,     // Medium rounding
  lg: 16,     // Large rounding
  xl: 24,     // Extra large rounding
  xxl: 32,    // Very large rounding
  round: 999, // Fully rounded (for circles)
};

// Shadow styles for elevation effects
const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  xl: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
};

// Common z-index values
const Z_INDEX = {
  background: -1,
  base: 0,
  content: 1,
  overlay: 10,
  modal: 100,
  toast: 1000,
};

// Border styles
const BORDERS = {
  none: {
    borderWidth: 0,
  },
  thin: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  medium: {
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  thick: {
    borderWidth: 3,
    borderColor: COLORS.border,
  },
};

// Button styles
const BUTTONS = {
  primary: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  small: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
  },
  rounded: {
    borderRadius: RADIUS.round,
  },
  disabled: {
    opacity: 0.6,
  },
};

// Input field styles
const INPUTS = {
  default: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    fontSize: FONTS.sizes.md,
  },
  active: {
    borderColor: COLORS.primary,
  },
  error: {
    borderColor: COLORS.error,
  },
  disabled: {
    backgroundColor: COLORS.lighterGray,
    opacity: 0.8,
  },
};

// Card styles
const CARDS = {
  default: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  interactive: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  flat: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
};

// Aesthetic-based theme variations
// These can be applied based on user's selected aesthetic preferences
const AESTHETIC_THEMES = {
  softAesthetic: {
    backgroundColor: COLORS.aesthetics.softAesthetic.primary,
    textColor: COLORS.primary,
    fontFamily: FONTS.aesthetics.softAesthetic.primary,
    cardStyle: {
      borderRadius: RADIUS.xl,
      backgroundColor: COLORS.white,
      ...SHADOWS.sm,
    },
    buttonStyle: {
      borderRadius: RADIUS.xl,
      backgroundColor: COLORS.aesthetics.softAesthetic.secondary,
    },
  },
  
  cyberY2K: {
    backgroundColor: COLORS.aesthetics.cyberY2K.primary,
    textColor: COLORS.white,
    fontFamily: FONTS.aesthetics.cyberY2K.primary,
    cardStyle: {
      borderRadius: RADIUS.sm,
      backgroundColor: COLORS.black,
      borderWidth: 1,
      borderColor: COLORS.aesthetics.cyberY2K.secondary,
    },
    buttonStyle: {
      borderRadius: RADIUS.sm,
      backgroundColor: COLORS.aesthetics.cyberY2K.secondary,
    },
  },
  
  // Add more aesthetic themes as needed
};

// Export the complete theme
export const THEME = {
  COLORS,
  FONTS,
  SPACING,
  RADIUS,
  SHADOWS,
  Z_INDEX,
  BORDERS,
  BUTTONS,
  INPUTS,
  CARDS,
  AESTHETIC_THEMES,
};

export default THEME;