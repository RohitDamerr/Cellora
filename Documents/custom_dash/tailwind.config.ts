// tailwind.config.ts (simplified example)
import type { Config } from "tailwindcss"

const config = {
  // ... other config options (darkMode, content, prefix)
  theme: {
    container: {
      // ... container settings
    },
    extend: {
      colors: {
        border: "hsl(var(--border))", // Maps Tailwind 'border' color to CSS variable --border
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", // Maps Tailwind 'background' color to --background
        foreground: "hsl(var(--foreground))", // Maps Tailwind 'foreground' color to --foreground
        primary: {
          DEFAULT: "hsl(var(--primary))", // Maps Tailwind 'primary' to --primary
          foreground: "hsl(var(--primary-foreground))", // Maps 'primary-foreground' to --primary-foreground
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)", // Maps Tailwind 'rounded-lg' to --radius variable
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // ... keyframes for animations
      },
      animation: {
        // ... animation utilities
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Plugin for animations
} satisfies Config

export default config