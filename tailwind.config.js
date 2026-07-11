/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}",
  ],
  theme: {
    extend: {
      // --- Phase 1: design tokens (design/tokens.css) mapped for Astro pages ---
      // Semantic aliases resolve to CSS custom properties (theme-aware, dark-first).
      colors: {
        bg: 'var(--bg)',
        'bg-elev': 'var(--bg-elev)',
        'bg-card': 'var(--bg-card)',
        border: 'var(--border)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        'text-faint': 'var(--text-faint)',
        accent: 'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
        'on-accent': 'var(--on-accent)',
        neutral: {
          0: '#ffffff', 50: '#f7f8f9', 100: '#eceef1', 200: '#d9dde2',
          300: '#b6bcc6', 400: '#8b93a1', 500: '#646c7c', 600: '#454b58',
          700: '#2c313b', 800: '#1a1d24', 900: '#101216', 950: '#0a0b0e',
        },
        iris: {
          300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
        },
        success: '#34d399', warning: '#fbbf24', danger: '#f87171',
        // --- legacy SPA palette (kept until React parity reached, Phase 3) ---
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'monospace'],
      },
      fontSize: {
        // 1.250 major-third scale (design/tokens.css)
        'fs-xs': '0.75rem', 'fs-sm': '0.875rem', 'fs-base': '1rem', 'fs-lg': '1.25rem',
        'fs-xl': '1.563rem', 'fs-2xl': '1.953rem', 'fs-3xl': '2.441rem',
        'fs-4xl': '3.052rem', 'fs-5xl': '3.815rem',
      },
      letterSpacing: { tightish: '-0.02em', mono: '0.02em', eyebrow: '0.12em' },
      borderRadius: {
        sm: '0.375rem', md: '0.625rem', lg: '1rem', xl: '1.5rem', full: '999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,.24)',
        md: '0 4px 16px rgba(0,0,0,.28)',
        lg: '0 12px 40px rgba(0,0,0,.40)',
        glow: '0 0 0 1px var(--c-accent-500), 0 8px 30px rgba(99,102,241,.25)',
      },
      maxWidth: { container: '72rem' },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out infinite 1.5s',
        'typewriter': 'typewriter 3s steps(40) 1s forwards',
        'blink': 'blink 1s infinite',
        'particle-float': 'particleFloat 20s linear infinite',
        'particle-float-delayed': 'particleFloat 25s linear infinite 5s',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 50%': { borderColor: 'transparent' },
          '51%, 100%': { borderColor: 'currentColor' },
        },
        particleFloat: {
          '0%': { transform: 'translateY(100vh) translateX(0px)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100px) translateX(100px)', opacity: '0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
