# Phase 3 UX Design Specification: Education & Projects

## 1. Overview & Intent
- **Intent**: Showcase Mustafa's academic background and hands-on AI projects. The user (recruiters, tech leads) should feel a sense of technical competence and modern engineering through a sleek, data-driven aesthetic.
- **Vibe**: Tech-oriented, terminal-like precision with Obsidian darks and Lime neon accents.
- **Key Elements**: Vertical timeline for chronological progression (Education & Training) and a Glassmorphism grid for AI projects.

## 2. Theme Tokens (Obsidian & Neon)
```css
:root {
  /* Obsidian Dark Base */
  --bg-primary: #0a0a0a;
  --bg-secondary: #121212;
  --bg-tertiary: #1a1a1a;
  
  /* Neon Lime Accents */
  --accent-lime: #a3e635; /* Primary interaction color */
  --accent-lime-dim: rgba(163, 230, 53, 0.2); /* Glow & Hover states */
  
  /* Text */
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --text-muted: #4b5563;

  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-glow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  --glass-blur: blur(12px);
}
```

## 3. Education & Experience (Timeline UI)
**Layout Strategy**: A vertical timeline running down the left side (or center on desktop) to illustrate progression.

### Content Structure
1. **Helwan International Technology University**
   - *Role*: AI Department Student
   - *Type*: Education
2. **Omal Misr Complex**
   - *Role*: Trainee (ML & CV)
   - *Date*: Dec 2024 - Jan 2025
3. **Tech Expo, Mark Academy & Cairo ICT**
   - *Role*: Participant / Attendee
   - *Date*: 2024 - 2025

### UI Components
- **Timeline Line**: A 2px vertical line colored `var(--bg-tertiary)` with a glowing lime gradient fading at the edges.
- **Timeline Nodes**: Glowing circular nodes (`width: 16px; height: 16px;`) using `var(--accent-lime)` placed along the timeline.
- **Timeline Cards**: 
  - Subtle borders (`var(--glass-border)`), dark background (`var(--bg-secondary)`), padding: `1.5rem`.
  - Title: `var(--text-primary)`, Font-weight 600, 1.25rem.
  - Subtitle/Date: `var(--accent-lime)`, Font-weight 500, 0.875rem.

## 4. AI Projects (Glassmorphism Cards)
**Layout Strategy**: CSS Grid (1 column on mobile, 2 on tablet, up to 3 on desktop) for 3-4 project placeholders showcasing ML, CV, and NLP tasks.

### Project Content
- Placeholder 1: Machine Learning (e.g., Predictive Model)
- Placeholder 2: Computer Vision (e.g., Object Detection)
- Placeholder 3: NLP (e.g., Sentiment Analysis)
- Placeholder 4: AI Integration (e.g., Data Pipeline)

### Glassmorphism Card Specs
- **Background**: `var(--glass-bg)`
- **Backdrop Filter**: `var(--glass-blur)`
- **Border**: 1px solid `var(--glass-border)`
- **Border Radius**: 16px
- **Shadow**: `var(--glass-glow)`
- **Hover State**: 
  - Transform: `translateY(-6px)`
  - Border: 1px solid `var(--accent-lime-dim)`
  - Box-shadow: `0 8px 32px 0 rgba(163, 230, 53, 0.15)`
  - Transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### Card Internal Layout
1. **Header**: Abstract tech visual placeholder or a subtle gradient mesh.
2. **Tags**: Small pill-shaped badges (e.g., `TensorFlow`, `PyTorch`, `Python`) using `var(--bg-tertiary)` background and `var(--text-secondary)` text.
3. **Title**: 1.25rem, bold, `var(--text-primary)`.
4. **Description**: 0.95rem, `var(--text-secondary)`, line-height 1.6.
5. **Action Link**: "View on GitHub" text with an external link icon, colored `var(--accent-lime)`, pushing to the bottom using `margin-top: auto`.

## 5. Micro-interactions & Animations
- **Scroll Reveal**: Use `IntersectionObserver` to add `.visible` class to `.reveal` elements.
  - Timeline cards slide in from the side (`transform: translateX(-20px); opacity: 0;`).
  - Project cards fade and scale up (`transform: translateY(30px) scale(0.95); opacity: 0;`) with staggered delays (`0.1s`, `0.2s`, `0.3s`).
  - Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for a smooth, premium feel.

## 6. Responsive Breakpoints
- **Mobile (320px - 767px)**: Timeline line on the far left. Timeline cards occupy remaining width. Project grid is 1 column.
- **Tablet (768px - 1023px)**: Project grid expands to 2 columns.
- **Desktop (1024px+)**: Timeline line centered with alternating left/right layout for cards. Project grid displays up to 3 columns.
