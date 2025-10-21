import type { Config } from 'tailwindcss';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightOrange: "#FCA99B",
        lightBlue: "#7688DB",
        darkBlue: "#6C7FD8",
        darkText: "#686E7D",
        lightBg: "#F8F8FB",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
          card: {
            DEFAULT: "hsl(var(--card))",
            hover: "hsl(var(--card-foreground))"
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            hover: "hsl(var(--popover-foreground))"
          },
          primary: {
            DEFAULT: "hsl(var(--primary))",
            hover: "hsl(var(--primary-foreground))"
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            hover: "hsl(var(--secondary-foreground))"
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            hover: "hsl(var(--muted-foreground))"
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            hover: "hsl(var(--accent-foreground))"
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            hover: "hsl(var(--destructive-foreground))"
          },
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
          chart: {
            '1': 'hsl(var(--chart-1))',
            '2': 'hsl(var(--chart-2))',
            '3': 'hsl(var(--chart-3))',
            '4': 'hsl(var(--chart-4))',
            '5': 'hsl(var(--chart-5))'
          },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;