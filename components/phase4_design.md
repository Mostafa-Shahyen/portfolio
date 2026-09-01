# Phase 4 UX Design: Contact Section & Footer

## 1. Intent & Direction
- **Theme:** Lime & Obsidian (Dark mode default).
- **Vibe:** Sleek, high-contrast, technical, and trustworthy.
- **Palette:** 
  - Backgrounds: Obsidian darks (`#0a0a0a`, `#121212`, `#1a1a1a`).
  - Accents: Neon Lime (`#ccff00`, `#aaff00`).
  - Text: Primary `#ffffff`, Secondary `rgba(255, 255, 255, 0.7)`.
- **Glassmorphism:** Used for the form container to create layered depth without heavy shadows.
- **Typography:** Sans-serif (e.g., Inter or Roboto) for clean readability, monospace accents for technical data.

## 2. Layout Structure
- **Section Container:** `max-width: 1200px`, centered, `padding: 5rem 2rem`.
- **Responsive Grid:** 
  - Desktop (`min-width: 768px`): 2-column layout (Contact Info on the left, Form on the right).
  - Mobile (`< 768px`): 1-column layout, stacking Contact Info above the Form.

## 3. Contact Information (Left Column)
- **Section Title:** `<h2>Let's Connect</h2>` with a glowing lime dot or subtle underline.
- **Description:** A brief welcoming text encouraging recruiters and collaborators to reach out.
- **Contact Details List:**
  - **Email:** `mostafa.shaheen04019@gmail.com`
  - **Phone:** `01152175104`
  - **Location:** Cairo, Egypt
  - **Visuals:** Use minimal SVG icons (e.g., Lucide icons) colored in lime or white-with-lime-hover.
  - **Interaction:** Hovering over the email or phone number should apply a slight `translateX(5px)` and color shift to lime.

## 4. Form UI (Right Column)
- **Glassmorphism Container:**
  - Background: `rgba(255, 255, 255, 0.03)`
  - Border: `1px solid rgba(255, 255, 255, 0.08)`
  - Backdrop-filter: `blur(16px)`
  - Border-radius: `12px`
  - Padding: `2rem`
- **Inputs & Textarea:**
  - Fields: Name, Email, Subject, Message (Textarea).
  - Background: `rgba(0, 0, 0, 0.4)` (inset feel).
  - Border: `1px solid rgba(255, 255, 255, 0.15)`.
  - Text Color: `#ffffff`, Placeholder: `rgba(255, 255, 255, 0.4)`.
  - Padding: `12px 16px`.
  - Border-radius: `8px`.
- **Interaction & Focus States:**
  - On Focus: `border-color: #ccff00`, `box-shadow: 0 0 0 3px rgba(204, 255, 0, 0.15)`.
  - Transition: `all 0.3s ease`.
- **Submit Button:**
  - Background: `#ccff00` (Solid Neon).
  - Text Color: `#0a0a0a` (Deep black for contrast).
  - Font-weight: `600`.
  - Hover State: Background shifts to a slightly brighter lime (`#d4ff33`), button lifts `transform: translateY(-2px)`, shadow increases.
  - Active State: `transform: translateY(0)`.

## 5. Validation & Feedback States
- **Invalid State:** Input border turns Red (`#ff4444`). A small red text error appears below the input (e.g., "Valid email required").
- **Valid State:** Input border turns subtly Green (`#00cc66`) when correctly filled.
- **Loading/Sending State:** Submit button text changes to "Sending...", accompanied by a small spinner icon. Button becomes disabled and opacity drops to `0.8`.
- **Success Feedback:** Form fades out or is replaced by a glassmorphic success message ("Message sent successfully! I'll get back to you soon.") to confirm EmailJS submission.

## 6. Footer UI
- **Container:** Full width, background `#050505` (darker than the main body for visual grounding).
- **Padding:** `2rem 0`.
- **Border-top:** `1px solid rgba(255, 255, 255, 0.05)`.
- **Content Layout:** Flexbox `justify-between`, `align-center`.
- **Elements:**
  - **Brand Name:** "Mustafa Hassan" with a lime accent dot `.`
  - **Copyright:** `&copy; 2026 Mustafa Hassan. All rights reserved.` in muted text (`rgba(255, 255, 255, 0.5)`).
  - **Social Links:** LinkedIn and GitHub icons.
    - Style: Opacity `0.7`, transition `0.3s`.
    - Hover: Opacity `1`, color `#ccff00`, slight scale up `transform: scale(1.1)`.
- **Scroll to Top:** A small floating or inline button (chevron up icon) that smoothly scrolls the user back to the Hero section.

## 7. Animations (Scroll Reveal)
- **Intersection Observer:** Both the Contact Info column and Form column should fade in and slide up slightly (`opacity: 0`, `transform: translateY(20px)` to `opacity: 1`, `transform: translateY(0)`) when scrolled into view.
- **Staggered Entry:** The Left column appears first, followed by the Form column with a `150ms` delay.
