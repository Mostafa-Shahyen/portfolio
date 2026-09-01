# Phase 1 UX Design Specification: Core Layout, Navigation, and Hero Section

## 1. Intent & Direction
**Who:** Recruiters, Technical Leads, and Hiring Managers evaluating an AI Engineering candidate.
**What:** A personal portfolio that immediately establishes technical competence, modern aesthetics, and specialization in AI (ML, CV, NLP).
**Feel:** "Obsidian & Neon" — Deep, premium dark mode with sharp tech-oriented accent colors. It should feel like a high-end IDE or an advanced AI terminal, utilizing glassmorphism for depth and clarity.

## 2. Design System Tokens

### 2.1. Color Palette (Dark Theme)
- `--bg-base`: `#09090b` (Deep Obsidian / Zinc-950)
- `--bg-surface`: `#18181b` (Zinc-900)
- `--accent-primary`: `#00e5ff` (Cyan - represents AI/Tech)
- `--accent-secondary`: `#8b5cf6` (Violet - for gradients/highlights)
- `--text-primary`: `#fafafa` (Zinc-50)
- `--text-secondary`: `#a1a1aa` (Zinc-400)
- `--text-muted`: `#52525b` (Zinc-600)

### 2.2. Glassmorphism Tokens
- `--glass-bg`: `rgba(9, 9, 11, 0.65)`
- `--glass-blur`: `blur(16px) saturate(180%)`
- `--glass-border`: `1px solid rgba(255, 255, 255, 0.08)`
- `--glass-border-hover`: `1px solid rgba(255, 255, 255, 0.15)`
- `--glass-shadow`: `0 8px 32px 0 rgba(0, 0, 0, 0.4)`

### 2.3. Typography
- **Headings (`font-family: 'Space Grotesk', sans-serif;`)**: Geometric, modern, tech-forward.
- **Body (`font-family: 'Inter', sans-serif;`)**: Highly readable, neutral, clean.
- **Data/Code (`font-family: 'JetBrains Mono', monospace;`)**: For labels, tags, and small tech details.

**Type Scale (Fluid/Clamp where applicable):**
- `--text-xs`: `0.75rem` (12px)
- `--text-sm`: `0.875rem` (14px)
- `--text-base`: `1rem` (16px)
- `--text-lg`: `1.125rem` (18px)
- `--text-xl`: `1.25rem` (20px)
- `--text-2xl`: `1.5rem` (24px)
- `--text-4xl`: `clamp(2rem, 5vw, 2.5rem)` (32-40px)
- `--text-hero`: `clamp(2.5rem, 8vw, 4.5rem)` (40-72px)

### 2.4. Spacing & Layout Base (8px scale)
- `--space-xs`: `4px`
- `--space-sm`: `8px`
- `--space-md`: `16px`
- `--space-lg`: `24px`
- `--space-xl`: `48px`
- `--space-2xl`: `96px`
- `--radius-sm`: `6px`
- `--radius-md`: `12px`
- `--radius-full`: `9999px`

## 3. Responsive Breakpoints (Mobile-First)

Default CSS targets mobile devices (down to 320px). Media queries are strictly `min-width` for scaling up.

1. **Mobile (Default)**: 320px and up
   - Container padding: `16px`
   - Section padding: `64px 0`
2. **Tablet (`min-width: 768px`)**
   - Container padding: `32px`
   - Section padding: `96px 0`
3. **Desktop (`min-width: 1024px`)**
   - Container padding: `48px`
   - Section padding: `128px 0`
   - Max container width: `1120px` (centered via `margin: 0 auto`)

## 4. Component Specifications

### 4.1. Core Layout Structure
```html
<body>
  <header class="navbar"></header>
  <main>
    <section id="hero" class="hero"></section>
    <!-- Future sections -->
  </main>
</body>
```
- The body has `--bg-base` background with a subtle noise or radial gradient overlay (`radial-gradient(circle at top right, rgba(0, 229, 255, 0.1), transparent 40%)`) to break the solid dark background.

### 4.2. Navigation (Header)
- **Positioning**: `fixed`, `top: 0`, `width: 100%`, `z-index: 100`.
- **Styling**: Applies `--glass-bg`, `--glass-blur`, and `--glass-border` on the bottom edge.
- **Height**: `72px` (Desktop) / `64px` (Mobile).
- **Content**: 
  - **Left**: Logo / Name signature ("M. Hassan") in `Space Grotesk`, `font-weight: 700`.
  - **Right (Desktop)**: Inline flex links (`gap: 32px`). Text is `--text-secondary`, transitioning to `--text-primary` on hover.
  - **Right (Mobile)**: Hamburger menu icon. When clicked, opens a full-screen glassmorphic overlay menu.

### 4.3. Hero Section
- **Layout**: 
  - `min-height: 100vh`
  - Flexbox, `flex-direction: column`, `justify-content: center`, `align-items: flex-start` (Desktop) or `align-items: center` (Mobile).
- **Content Elements**:
  1. **Eyebrow**: `<p class="mono-tag">` "Hello, I'm" - `JetBrains Mono`, `--accent-primary` color.
  2. **Headline**: `<h1 class="hero-title">` "Mustafa Hassan" - `Space Grotesk`, heavily weighted (800), white text or a subtle gradient (White to Light Gray).
  3. **Sub-headline**: `<h2 class="hero-subtitle">` "AI Engineering Student" - Size `--text-2xl` to `--text-4xl`, color `--text-secondary`.
  4. **Tags**: A small flex row of tags `[ML] [CV] [NLP]` using glassmorphism pills (`border-radius: --radius-full`, `--glass-bg`).
  5. **Description**: Max-width of `600px`, `--text-lg`, color `--text-secondary`, line-height `1.6`.
  6. **Call to Action (CTA) Group**: `flex`, `gap: 16px`, `margin-top: 32px`.

### 4.4. Buttons (CTAs)
- **Primary Button ("View Projects")**:
  - Background: `--accent-primary`
  - Text: `#09090b` (Dark text for contrast), `font-weight: 600`.
  - Radius: `--radius-md`
  - Padding: `12px 24px`
  - Hover: `transform: translateY(-2px)`, subtle glow `box-shadow: 0 4px 15px rgba(0, 229, 255, 0.4)`.
- **Secondary Button ("Download CV")**:
  - Background: `--glass-bg`
  - Border: `--glass-border`
  - Text: `--text-primary`
  - Radius: `--radius-md`
  - Padding: `12px 24px`
  - Hover: Border color shifts to `--glass-border-hover`, background slightly lightens.

## 5. Micro-Interactions & Animation (IntersectionObserver)
- **Load Animation**: On initial page load, the Hero section elements should stagger in.
  - Initial state: `opacity: 0; transform: translateY(20px);`
  - Animation: `transition: opacity 0.6s ease-out, transform 0.6s ease-out;`
  - Delays: Eyebrow (0ms), Headline (100ms), Sub-headline (200ms), Tags (300ms), CTAs (400ms).
- **Scroll Reveal**: Apply a `.reveal` class to sections. The IntersectionObserver will add a `.visible` class when elements enter 15% of the viewport (as per `ui_ux.md` rules).
