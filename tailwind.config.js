/** @type {import('tailwindcss').Config} */
export default {
  // shadcn/ui needs this to apply .dark class properly
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // ── Container (used by some shadcn primitives) ──────────────────────────
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      // ── Acmes Media brand colours (custom utilities: bg-bg, text-ink, etc.) ─
      colors: {
        // Site brand palette
        bg: {
          DEFAULT: '#080808',
          surface: '#0f0f0f',
          surface2: '#191919',
          hover: '#222222',
        },
        accent: {
          DEFAULT: '#C8A96E',
          light: '#DFC28F',
          dark: '#A88D54',
        },
        border: {
          DEFAULT: '#232323',
          light: '#2e2e2e',
        },
        ink: {
          DEFAULT: '#F2F2F2',
          muted: '#9A9A9A',
          faint: '#555555',
        },

        // ── shadcn/ui colour tokens (CSS-variable based) ───────────────────
        // These are read from the CSS variables defined in index.css.
        // shadcn components use these names; they are mapped to our brand.
        background:        'hsl(var(--background))',
        foreground:        'hsl(var(--foreground))',
        card: {
          DEFAULT:         'hsl(var(--card))',
          foreground:      'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT:         'hsl(var(--popover))',
          foreground:      'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT:         'hsl(var(--primary))',
          foreground:      'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:         'hsl(var(--secondary))',
          foreground:      'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:         'hsl(var(--muted))',
          foreground:      'hsl(var(--muted-foreground))',
        },
        // Note: 'accent' above is our brand gold (#C8A96E).
        // shadcn uses 'accent' as a CSS variable too — both point to the same
        // gold colour, so there is no conflict.
        destructive: {
          DEFAULT:         'hsl(var(--destructive))',
          foreground:      'hsl(var(--destructive-foreground))',
        },
        input:             'hsl(var(--input))',
        ring:              'hsl(var(--ring))',
        // Chart colours (used by shadcn chart primitives if added later)
        chart: {
          1:               'hsl(var(--chart-1))',
          2:               'hsl(var(--chart-2))',
          3:               'hsl(var(--chart-3))',
          4:               'hsl(var(--chart-4))',
          5:               'hsl(var(--chart-5))',
        },
      },

      // ── Border radius (CSS-variable driven so shadcn --radius works) ──────
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // ── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem,7vw,6.5rem)',   { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem,5vw,4.5rem)', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem,3.5vw,3rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.375rem,2.5vw,2rem)',{ lineHeight: '1.2',  letterSpacing: '-0.01em' }],
      },

      // ── Animations ─────────────────────────────────────────────────────────
      animation: {
        // Site brand
        marquee: 'marquee 35s linear infinite',
        // shadcn accordion primitives
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
