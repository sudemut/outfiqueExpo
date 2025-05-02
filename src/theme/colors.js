
// src/theme/colors.js

/**
 * Color Palette for OUTFIQUE App
 * Primary colors are used for main elements, actions, and branding
 * Secondary colors are used for highlights, accents, and special features
 * Background colors are used for different screen and card backgrounds
 * UI colors are used for various interface elements
 */

export const COLORS = {
    // Primary Colors
    primary: '#0A1E50',         // Navy blue - main brand color
    secondary: '#FF4B4B',       // Coral red - accent color
    tertiary: '#4ECDC4',        // Turquoise - additional accent
  
    // Background Colors
    background: '#FFF0F0',      // Light pink - main background
    lightPink: '#FFD7D7',       // Used for challenge cards and highlights
    lavender: '#D9DCFF',        // Used for outfit preview cards and badges
    mintGreen: '#E6F8F5',       // Soft mint green for eco/sustainable features
    cream: '#FFF5E6',           // Warm cream for vintage-themed content
  
    // Monochrome Colors
    white: '#FFFFFF',
    offWhite: '#FAFAFA',
    lighterGray: '#F0F0F0',
    lightGray: '#E0E0E0',
    gray: '#8A8A8A',
    darkGray: '#333333',
    black: '#000000',
  
    // UI Colors
    border: '#E0E0E0',          // Border color for cards and inputs
    input: '#F5F5F5',           // Background for input fields
    shadow: 'rgba(0, 0, 0, 0.1)', // Shadow color
    overlay: 'rgba(0, 0, 0, 0.5)', // Overlay for modals
  
    // Status Colors
    success: '#4CAF50',         // Success/Completed actions
    warning: '#FFAB40',         // Warning messages
    error: '#FF0000',           // Error messages
    info: '#2196F3',            // Information messages
  
    // Badge Colors
    badge: {
      sustainability: '#8BC34A',   // Sustainability badges
      trendsetter: '#9C27B0',      // Trendsetter badges
      challenge: '#FF9800',        // Challenge completion badges
    },
  
    // Aesthetic Colors (for filtering and theming)
    aesthetics: {
      softAesthetic: {
        primary: '#E4C1F9',
        secondary: '#FFD6EC',
        tertiary: '#B9E6FF',
      },
      cyberY2K: {
        primary: '#BB00EA',
        secondary: '#00FF84',
        tertiary: '#C7C7C7',
      },
      minimalism: {
        primary: '#FFFFFF',
        secondary: '#D1D1D6',
        tertiary: '#1C1C1E',
      },
      romantic: {
        primary: '#FFE6E6',
        secondary: '#E5D3B3',
        tertiary: '#9E2B25',
      },
      darkAcademia: {
        primary: '#0A1045',
        secondary: '#4F5D2F',
        tertiary: '#8B4513',
      },
      vaporwave: {
        primary: '#9900FF',
        secondary: '#0096FF',
        tertiary: '#FF00FF',
      },
      kidcore: {
        primary: '#FF0000',
        secondary: '#0000FF',
        tertiary: '#FFFF00',
      },
      grunge: {
        primary: '#A9A9A9',
        secondary: '#8B0000',
        tertiary: '#000000',
      },
      ecoAesthetic: {
        primary: '#708238',
        secondary: '#C19A6B',
        tertiary: '#A2A2A2',
      },
      baddie: {
        primary: '#FF69B4',
        secondary: '#DA70D6',
        tertiary: '#F5F5DC',
      },
      cottagecore: {
        primary: '#90EE90',
        secondary: '#F5F5DC',
        tertiary: '#FFA500',
      },
    },
  
    // Gradient Presets 
    gradients: {
      primary: ['#0A1E50', '#263C73'],        // Navy blue gradient
      secondary: ['#FF4B4B', '#FF7676'],      // Coral red gradient
      vaporwave: ['#9900FF', '#FF00FF'],      // Vaporwave gradient
      pastel: ['#B9E6FF', '#FFD6EC'],         // Pastel gradient
      sustainable: ['#708238', '#90EE90'],    // Eco gradient
    },
  };
  
  export default COLORS;