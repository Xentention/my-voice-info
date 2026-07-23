import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: { initialColorMode: 'light', useSystemColorMode: false },
  fonts: {
    heading: "'Unbounded', system-ui, -apple-system, sans-serif",
    body:    "'Open Sans', system-ui, -apple-system, sans-serif",
  },
  colors: {
    paper:  { 50: '#FCFBF7', 100: '#F5F2EA', 200: '#ECE7DB', 300: '#DFD8C8' },
    ink:    '#101319',    // cold, dark near-black accent
    muted:  '#564F3F',
    hair:   '#E7E0D2',
    brand: {
      50:  '#FFF2F2', 100: '#FEDADA', 200: '#FF9090', 300: '#FF5757',
      400: '#FF2626', 500: '#DC0000', 600: '#B30000', 700: '#920000',
      800: '#6A0000', 900: '#490000',
    },
  },
  radii: { md: '10px', lg: '10px', xl: '10px', '2xl': '10px', '3xl': '10px' },
  shadows: {
    card:      '0 1px 2px rgba(11,13,16,0.04)',      
    cardHover: '0 22px 44px -28px rgba(11,13,16,0.3)', 
    cta:       '0 16px 30px -14px rgba(166,55,26,0.5)', 
    redPanel:  '0 30px 70px -46px rgba(166,55,26,0.6)', 
  },
  styles: {
    global: {
      'html': { scrollBehavior: 'smooth', background: '#D8CFBC' },
      'body': {
        color: '#1E1913',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FCFBF7 0%, #F1ECE0 45%, #E2DAC9 78%, #D2C8B2 100%)',
        backgroundRepeat: 'no-repeat',
      },
      '*::selection': { background: '#F6D2CC' },
      '@keyframes mvRise': {
        from: { transform: 'translateY(18px)' },
        to:   { transform: 'translateY(0)' },
      },
      '.mv-rise': { opacity: 1 },
      '@media (prefers-reduced-motion: no-preference)': {
        '.mv-rise': { animation: 'mvRise 0.7s cubic-bezier(0.22,1,0.36,1) backwards' },
      },
      '@media (prefers-reduced-motion: reduce)': {
        'html': { scrollBehavior: 'auto' },
        '*': { animationDuration: '0.001ms !important', transitionDuration: '0.001ms !important' },
        '.mv-rise': { animation: 'none !important', opacity: 1 },
      },
    },
  },
  components: {
    Heading: { baseStyle: { fontWeight: 600, letterSpacing: '-0.005em', lineHeight: 1.16 } },
    Button: {
      baseStyle: {
        fontWeight: 700,
        borderRadius: 'xl',
        transition: 'all 0.2s ease',
        _focusVisible: { outline: '3px solid', outlineColor: 'brand.700', outlineOffset: '2px', boxShadow: 'none' },
      },
      variants: {
        solid: {
          bg: 'brand.500', color: 'white',
          _hover: { bg: 'brand.600', transform: 'translateY(-2px)', boxShadow: 'cta', textDecoration: 'none' },
          _active: { bg: 'brand.700', transform: 'translateY(0)' },
        },
        outline: {
          borderColor: 'hair', color: 'ink', bg: 'transparent',
          _hover: { bg: 'paper.100', borderColor: 'ink', transform: 'translateY(-2px)', textDecoration: 'none' },
          _active: { transform: 'translateY(0)' },
        },
        onBrand: {
          bg: 'white', color: 'brand.600', boxShadow: '0 12px 28px -10px rgba(65,21,10,0.4)',
          _hover: { bg: 'brand.50', transform: 'translateY(-2px)', textDecoration: 'none' },
          _active: { transform: 'translateY(0)' },
        },
      },
    },
  },
});

export default theme;
