import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "hsla(var(--background),1)",
          secondary: "hsla(var(--secondary-background),1)",
        },
        foreground: "hsla(var(--foreground),1)",
        card: {
          DEFAULT: "hsla(var(--card),1)",
          foreground: "hsla(var(--card-foreground),1)",
        },
        popover: {
          DEFAULT: "hsla(var(--popover),1)",
          foreground: "hsla(var(--popover-foreground),1)",
        },
        primary: {
          DEFAULT: "hsla(var(--primary),1)",
          foreground: "hsla(var(--primary-foreground),1)",
        },
        secondary: {
          DEFAULT: "hsla(var(--secondary),1)",
          foreground: "hsla(var(--secondary-foreground),1)",
        },
        muted: {
          DEFAULT: "hsla(var(--muted),1)",
          foreground: "hsla(var(--muted-foreground),1)",
          secondary: "hsla(var(--muted-foreground-secondary),1)",
        },
        accent: {
          DEFAULT: "hsla(var(--accent),1)",
          foreground: "hsla(var(--accent-foreground),1)",
        },
        destructive: {
          DEFAULT: "hsla(var(--destructive),1)",
          foreground: "hsla(var(--destructive-foreground),1)",
        },
        border: "hsla(var(--border),1)",
        input: "hsla(var(--input),1)",
        ring: "hsla(var(--ring),1)",
        chart: {
          "1": "hsla(var(--chart-1),1)",
          "2": "hsla(var(--chart-2),1)",
          "3": "hsla(var(--chart-3),1)",
          "4": "hsla(var(--chart-4),1)",
          "5": "hsla(var(--chart-5),1)",
        },
        sidebar: {
          DEFAULT: "hsla(var(--sidebar-background),1)",
          foreground: "hsla(var(--sidebar-foreground),1)",
          primary: "hsla(var(--sidebar-primary),1)",
          "primary-foreground": "hsla(var(--sidebar-primary-foreground),1)",
          accent: "hsla(var(--sidebar-accent),1)",
          "accent-foreground": "hsla(var(--sidebar-accent-foreground),1)",
          border: "hsla(var(--sidebar-border),1)",
          ring: "hsla(var(--sidebar-ring),1)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
