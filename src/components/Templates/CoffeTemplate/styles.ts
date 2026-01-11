// ============================
// Global Styles for CoffeeTemplate
// ============================

export const globalStyles = `
  /* ============================
   Fonts
   ============================ */
  @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap");
  @import url("https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css");

  /* ============================
   Design Tokens
   ============================ */
  /* Scope everything to the Coffee template wrapper so globals.css doesn't override it */
  .coffee-template {
    /* =========================================================
       CoffeeTemplate local theme (GOLD) — independent from app purple theme
       We override the common shadcn/tailwind CSS variables INSIDE this wrapper
       ========================================================= */

    /* Coffee Gold (original style) */
    --coffee-gold: 43 74% 54%;
    --coffee-gold-2: 38 78% 52%;

    /* ---- Local shadcn/tailwind vars (scoped) ---- */
    --background: 30 22% 7%;
    --foreground: 38 25% 96%;

    --card: 30 22% 10%;
    --card-foreground: 38 25% 96%;

    --popover: 30 22% 10%;
    --popover-foreground: 38 25% 96%;

    --primary: var(--coffee-gold);
    --primary-foreground: 30 22% 10%;

    --secondary: 30 18% 14%;
    --secondary-foreground: 38 25% 96%;

    --muted: 30 16% 14%;
    --muted-foreground: 35 12% 72%;

    --accent: 30 18% 16%;
    --accent-foreground: var(--coffee-gold);

    --border: 32 18% 18%;
    --input: 32 18% 18%;
    --ring: var(--coffee-gold);

    /* Surfaces */
    --bg-main: hsl(var(--background));
    --bg-card: hsl(var(--card));
    --bg-card-2: hsl(var(--card));
    --border-main: hsl(var(--border) / 0.55);

    /* Text */
    --text-main: hsl(var(--foreground));
    --text-muted: hsl(var(--muted-foreground));

    /* Accents */
    --accent: hsl(var(--coffee-gold));
    --accent-2: hsl(var(--coffee-gold-2));
    --accent-soft: hsl(var(--coffee-gold) / 0.16);
    --accent-glow: hsl(var(--coffee-gold) / 0.28);

    /* Glass */
    --glass: hsl(var(--background) / 0.72);
    --glass-border: hsl(var(--border) / 0.45);

    /* Typography */
    --font-display: "Playfair Display", serif;
    --font-body: "Inter", sans-serif;
    
    --text-xs: clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem);
    --text-sm: clamp(0.8rem, 0.75rem + 0.25vw, 0.875rem);
    --text-base: clamp(0.9rem, 0.85rem + 0.25vw, 1rem);
    --text-lg: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
    --text-xl: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
    --text-2xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
    --text-3xl: clamp(1.5rem, 1.25rem + 1.25vw, 1.875rem);
    --text-4xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.25rem);
    --text-5xl: clamp(2.25rem, 1.75rem + 2.5vw, 3rem);
    --text-6xl: clamp(2.75rem, 2rem + 3.75vw, 3.75rem);

    /* Spacing */
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
    --space-3xl: 4rem;
  }

  /* ============================
   Base Reset
   ============================ */
  * {
    scroll-behavior: smooth;
  }

  .coffee-template {
    position: relative;
    background:
      radial-gradient(1100px 650px at 18% 10%, hsl(var(--coffee-gold) / 0.22) 0%, transparent 60%),
      radial-gradient(900px 600px at 85% 25%, hsl(var(--coffee-gold-2) / 0.14) 0%, transparent 55%),
      hsl(var(--background));
    color: var(--text-main);
    overflow-x: hidden;
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    line-height: 1.6;
    isolation: isolate;
  }

  /* Subtle texture + vignette */
  .coffee-template::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
  }

  .coffee-template::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(1200px 900px at 50% 20%, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.30) 70%, rgba(0,0,0,0.50) 100%);
  }

  /* Ensure template content sits above background overlays */
  .coffee-template > * {
    position: relative;
    z-index: 1;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    letter-spacing: -0.02em;
  }

  /* ============================
   Animations
   ============================ */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-18px);
    }
  }

  @keyframes shimmer {
    from {
      background-position: -200% 0;
    }
    to {
      background-position: 200% 0;
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-shimmer {
    animation: shimmer 2s linear infinite;
  }

  /* ============================
   Scrollbar
   ============================ */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.15);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--border-main);
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent);
  }

  /* Better focus ring */
  :focus-visible {
    outline: 2px solid hsl(var(--coffee-gold) / 0.65);
    outline-offset: 2px;
  }
`;
