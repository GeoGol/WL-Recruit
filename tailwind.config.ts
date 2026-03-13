
const config = {
  darkMode: ["class", "[data-theme='dark']"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter Variable', 'sans-serif'],
    },
    container: {
      center: true,
      // padding: '.75rem',
      screens: {
        sm: '824px',
        md: '1034px',
        xl: '1440px',
      },
    },
    extend: {
      fontSize: {
        'xs':  ['8px',  '12px'],
        'sm':  ['10px', '14px'],
        'base':['12px', '16px'],
        'md':  ['14px', '22px'],
        'lg':  ['16px', '26px'],
        'xl':  ['20px', '32px'],
        '2xl': ['24px', '32px'],
      },
      maxWidth: {
        xlContainer: "1440px",
        mdContainer: "1034px",
        smContainer: "824px",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        quaternary: "var(--text-quaternary)",
        muted: "var(--text-muted)",
        inverse: "var(--text-inverse)",
        link: "var(--text-link)",
        'link-dark': "var(--text-link-dark)",
      },
      backgroundColor: {
        base: "var(--bg-primary)",
        primary: "var(--bg-main)",
        secondary: "var(--bg-secondary)",
        tertiary: "var(--bg-tertiary)",
        quaternary: "var(--bg-quaternary)",
        dark: "var(--bg-dark)",
        border: "var(--bg-border)",
        surface: "var(--bg-surface)",
        confirmation: "var(--bg-confirmation)",
        destructive: "var(--bg-destructive)",
        'destructive-dark': "var(--bg-destructive-dark)",
      },
      borderColor: {
        DEFAULT: "var(--border-default)",
        primary: "var(--border-main)",
        main: "var(--border-main)",
        light: "var(--border-light)",
        focus: "var(--border-focus)",
        link: "var(--border-link)",
        'link-dark': "var(--border-link-dark)",
      },
      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: "var(--primary)",
          focus: "var(--primary-focus)",
          hover: "var(--primary-focus-hover)",
          light: "var(--primary-light)",
          bg: "var(--primary-bg)",
        },

        // Secondary colors
        secondary: {
          DEFAULT: "var(--secondary)",
          hover: "var(--secondary-hover)",
        },

        // Accent colors
        "accent-blue": "var(--accent-blue)",
        "accent-aqua-green": "var(--accent-aqua-green)",
        "accent-green": "var(--accent-green)",
        "accent-purple": "var(--accent-purple)",
        "accent-yellow": "var(--accent-yellow)",
        "accent-orange": "var(--accent-orange)",
        "accent-magenta": "var(--accent-magenta)",
        "accent-grey": "var(--accent-grey)",

        // Utility colors
        "white": "var(--white)",
        "black": "var(--black)",
        "gray": "var(--gray)",
        "light-gray": "var(--light-gray)",
        "light-gray-2": "var(--light-gray-2)",
        "light-gray-focus": "var(--focus-ring-light-gray)",
        "dark-gray": "var(--dark-gray)",
        "ring": "var(--focus-ring)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'custom': '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        "bounceCustom": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounceCustom": "bounceCustom 1.4s infinite ease-in-out",
      },
    },
  },
  plugins: [
    require("flowbite/plugin")({
      charts: false,
      // This prevents Flowbite from overriding your container config
    }),
  ],
};

export default config;