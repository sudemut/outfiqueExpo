// src/theme/fonts.js

/**
 * Font Definitions for OUTFIQUE App
 * Defines font families, sizes, and weights to maintain consistency throughout the app
 */

export const FONTS = {
    // Font families
    // Note: These should be replaced with your actual font files after installing them
    // For example, after running: npm install @expo-google-fonts/poppins
    families: {
      regular: 'Poppins_400Regular',
      medium: 'Poppins_500Medium',
      bold: 'Poppins_700Bold',
      light: 'Poppins_400Regular',
      italic: 'Poppins_400Regular',  // Will be replaced with actual font like 'Poppins-Italic'
    },
    
    // Font sizes for different UI elements
    sizes: {
      xxs: 10, // Very small text, badges, etc.
      xs: 12,  // Small captions, timestamps, etc.
      sm: 14,  // Secondary text, list items, etc.
      md: 16,  // Primary text, body content
      lg: 18,  // Section headers, emphasized text
      xl: 20,  // Headers, important text
      xxl: 24, // Screen titles, big headers
      xxxl: 30, // Hero text, very large headings
    },
    
    // Font weights (Note: For some fonts, these would be different font files)
    weights: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      black: '900',
    },
    
    // Line heights for better readability
    lineHeights: {
      tight: 1.2,   // For headings
      normal: 1.5,  // For body text
      loose: 1.8,   // For more readable paragraphs
    },
    
    // Letter spacing
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 0.5,
      extraWide: 1,
    },
    
    // Text transforms
    transform: {
      none: 'none',
      capitalize: 'capitalize',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
    },
    
    // Font styles specific to aesthetic types
    aesthetics: {
      softAesthetic: {
        primary: 'System', // Replace with a rounded, friendly font
        secondary: 'System',
        letterSpacing: 0.5,
      },
      cyberY2K: {
        primary: 'System', // Replace with a futuristic, tech font
        secondary: 'System',
        letterSpacing: 0,
      },
      minimalism: {
        primary: 'System', // Replace with a clean, sans-serif font
        secondary: 'System',
        letterSpacing: 0,
      },
      romantic: {
        primary: 'System', // Replace with an elegant, serif font
        secondary: 'System',
        letterSpacing: 0.2,
      },
      darkAcademia: {
        primary: 'System', // Replace with a traditional, serif font
        secondary: 'System',
        letterSpacing: 0.5,
      },
      vaporwave: {
        primary: 'System', // Replace with a retro digital font
        secondary: 'System',
        letterSpacing: 1,
      },
      // Add more aesthetic-specific font settings as needed
    },
  };
  
  // Helper functions for commonly used font styles
  export const getHeadingStyle = (size = 'lg', weight = 'bold') => {
    return {
      fontSize: FONTS.sizes[size],
      fontWeight: FONTS.weights[weight],
      fontFamily: FONTS.families.bold,
      lineHeight: FONTS.lineHeights.tight,
    };
  };
  
  export const getBodyStyle = (size = 'md', weight = 'regular') => {
    return {
      fontSize: FONTS.sizes[size],
      fontWeight: FONTS.weights[weight],
      fontFamily: FONTS.families.regular,
      lineHeight: FONTS.lineHeights.normal,
    };
  };
  
  export const getCaptionStyle = (size = 'xs', weight = 'regular') => {
    return {
      fontSize: FONTS.sizes[size],
      fontWeight: FONTS.weights[weight],
      fontFamily: FONTS.families.light,
      lineHeight: FONTS.lineHeights.normal,
    };
  };
  
  export default FONTS;