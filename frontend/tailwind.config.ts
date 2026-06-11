import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base':        '#080810',
        'bg-card':        '#0f0f1a',
        'bg-elevated':    '#13131f',
        'border-dim':     '#1a1a2e',
        'border-default': '#252538',
        'border-bright':  '#342f55',
        'text-primary':   '#f0eeff',
        'text-secondary': '#9b94b8',
        'text-muted':     '#4a4568',
        'accent':         '#7c3aed',
        'accent-light':   '#a78bfa',
        'accent-glow':    'rgba(124,58,237,0.3)',
        'pink-accent':    '#ec4899',
        'cyan-accent':    '#06b6d4',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-sm':  '0 0 16px rgba(124,58,237,0.25)',
        'glow-md':  '0 0 32px rgba(124,58,237,0.3)',
        'glow-lg':  '0 0 64px rgba(124,58,237,0.2)',
        'card':     '0 4px 32px rgba(0,0,0,0.5)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.6), 0 0 32px rgba(124,58,237,0.15)',
        'inner-glow': 'inset 0 1px 0 rgba(167,139,250,0.1)',
      },
      backgroundImage: {
        'grid-dark': 'linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg,#080810 0%,#0d0b1a 50%,#080810 100%)',
        'shimmer': 'linear-gradient(90deg,transparent,rgba(167,139,250,0.06),transparent)',
      },
      backgroundSize: { 'grid': '48px 48px' },
      animation: {
        'fade-up':     'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':     'fadeIn 0.5s ease both',
        'glow-pulse':  'glowPulse 3s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'blink':       'blink 1.1s step-end infinite',
        'spin-slow':   'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp:    { from:{opacity:'0',transform:'translateY(24px)'}, to:{opacity:'1',transform:'translateY(0)'} },
        fadeIn:    { from:{opacity:'0'}, to:{opacity:'1'} },
        glowPulse: { '0%,100%':{opacity:'0.4'}, '50%':{opacity:'1'} },
        float:     { '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(-12px)'} },
        shimmer:   { from:{backgroundPosition:'200% 0'}, to:{backgroundPosition:'-200% 0'} },
        blink:     { '0%,100%':{opacity:'1'}, '50%':{opacity:'0'} },
      },
    },
  },
  plugins: [],
}
export default config
