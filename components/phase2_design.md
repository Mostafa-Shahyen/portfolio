# Phase 2 UX Design: About Me and Skills Sections

## 1. Intent & Theme
- **Target Audience:** Recruiters, hiring managers, and academic peers looking for AI/ML talent.
- **Vibe:** Tech-oriented, dark theme, sleek, and highly modern.
- **Core Elements:** Glassmorphism, smooth micro-interactions, clean typography, and responsive grid structures.

---

## 2. About Me Section

### 2.1. Typography for the Bio
The biography needs to balance readability with a technical aesthetic.

- **Primary Body Font:** `Inter` or `Roboto` (sans-serif) for high legibility on screens.
- **Highlight/Technical Font:** `Fira Code` or `JetBrains Mono` for tech terms (e.g., *Cybersecurity*, *AI*).
- **Properties:**
  - **Font Size (Desktop):** `1.125rem` (18px)
  - **Font Size (Mobile):** `1rem` (16px)
  - **Line Height:** `1.7` (generous spacing for readability)
  - **Color:** `--text-secondary` (e.g., `rgba(255, 255, 255, 0.8)`) for the main text.
  - **Accent Color:** `--primary-color` (e.g., a neon cyan or tech green) for keywords to draw the eye to core competencies (Cybersecurity, Solar Energy, Electrical Maintenance, Helwan International Technology University).

### 2.2. Content Structure
- **Heading:** "About Me" (Styled with an accent color underline or glowing dot).
- **Paragraph 1:** Introduction and current status at Helwan International Technology University.
- **Paragraph 2:** Cross-disciplinary background (Cybersecurity, Solar Energy, Electrical Maintenance) and how it informs an engineering approach.

---

## 3. Skills Section

### 3.1. Responsive Grid Layout
To display the categories (Programming, AI/ML, GUI, Other) efficiently across all devices, a CSS Grid is utilized.

```css
.skills-grid {
  display: grid;
  /* Automatically fits as many columns as possible with a minimum width of 300px */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}
```

- **Mobile (< 768px):** 1 Column.
- **Tablet (768px - 1024px):** 2 Columns.
- **Desktop (> 1024px):** 3 or 4 Columns based on container max-width.

### 3.2. Glassmorphism Styling for Skill Cards
Each category (Programming, AI/ML, GUI, Other) will be housed in a glassmorphic card. Individual skills within the card will be styled as pills/tags.

#### Card CSS Base (Glassmorphism)
```css
.skill-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Safari support */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              border-color 0.3s ease, 
              box-shadow 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5);
  background: rgba(255, 255, 255, 0.05);
}
```

### 3.3. Internal Card Layout (Tags)
Inside each card, skills are listed as flexible tags.

```css
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.skill-tag {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

/* Subtle glowing hover effect for tags */
.skill-tag:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--primary-accent); /* e.g., neon blue/green */
  box-shadow: 0 0 10px rgba(var(--primary-accent-rgb), 0.3);
}
```

## 4. Animation & Micro-Interactions
- **Scroll Reveal:** Use `IntersectionObserver` to fade and slide up the bio text and skill cards sequentially as they enter the viewport.
- **Staggered Entry:** Skill tags inside the card should animate in with a slight delay (`nth-child` delays) once the card itself is visible.
