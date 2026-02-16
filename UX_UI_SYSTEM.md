# UX_UI_SYSTEM.md — Design & Interaction System

## 1. Design Principles

**Speed is the aesthetic.**
Visual design must communicate performance, clarity, and trust.

* No decorative excess.
* Every element must justify its paint cost.
* Prefer system fonts to reduce load time.
* Accessibility is a feature, not a requirement checkbox.

---

## 2. Layout System

### Grid

* Base: **4px spacing system**
* Max content width: **1120px**
* Gutters: 16px (mobile), 24px (tablet), 32px (desktop)

### Breakpoints

| Device  | Width   | Priority              |
| ------- | ------- | --------------------- |
| Mobile  | 375px+  | Primary Design Target |
| Tablet  | 768px+  | Adaptive              |
| Desktop | 1440px+ | Enhancement           |

Design must scale **up**, never shrink down.

---

## 3. Typography

### Font Stack (System First)

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
```

### Scale

| Role | Size        | Weight |
| ---- | ----------- | ------ |
| H1   | 2rem–2.4rem | 600    |
| H2   | 1.6rem      | 600    |
| Body | 1rem        | 400    |
| Meta | 0.875rem    | 400    |

* Line-height: **1.5 for readability**
* Avoid ultra-light fonts (performance + accessibility issue).

---

## 4. Color Philosophy

Use minimal palette to reduce CSS size and cognitive load.

| Element               | Color     | Use Case                             |
| --------------------- | --------- | ------------------------------------ |
| Primary Yellow        | `#F2C230` | Accent, highlights, CTAs             |
| Deep Navy             | `#2E3A59` | Headers, navigation, authority color |
| Slate Blue            | `#3F4E73` | Secondary surfaces                   |
| Light Gray Background | `#E6E6E6` | Page background                      |
| White                 | `#FFFFFF` | Content panels                       |


Contrast ratio must meet **WCAG AA minimum (4.5:1)**.

---

## 5. Component Guidelines

### Buttons

* Height: 44px minimum (thumb-friendly)
* Border-radius: 6px
* No heavy shadows (use subtle contrast instead)
* Transition: `150ms ease-out`

### Forms

* Labels always visible (no placeholder-only inputs).
* Error messaging inline.
* Use `aria-live="polite"` for validation feedback.

### Cards / Sections

* Avoid nested containers.
* Use spacing, not borders, to create hierarchy.

---

## 6. Motion & Micro-Interactions

Motion must communicate state, not decoration.

| Interaction | Behavior                                           |
| ----------- | -------------------------------------------------- |
| Form Submit | Button enters loading state (spinner via CSS only) |
| Success     | Fade + slight upward translate (≤150ms)            |
| Error       | Brief shake (reduced-motion safe)                  |

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

## 7. Accessibility Requirements

* Semantic HTML only (no div soup).
* All interactive elements keyboard reachable.
* Focus states must be visible.
* Images require meaningful `alt`.
* Use `<section>`, `<nav>`, `<main>` landmarks.

---

## 8. Performance Rules for UI Code

* No layout-shifting animations.
* Avoid large SVG paths.
* Use CSS instead of JS whenever possible.
* Defer all non-critical JS.

---

## 9. Brand Tone Adaptation (Industrial Identity)

The interface should reflect:
- Strength
- Precision
- Stability
- Engineering confidence

Avoid soft, playful, or startup-like visuals.
Design should feel like infrastructure, not an app.

---

## 10. Brand Colors (Derived from Logo)

Primary Navy: #2E3A59
Secondary Steel Blue: #3F4E73
Energy Yellow (Accent Only): #F2C230
Light Background: #F4F5F7

### Usage Rules
- Yellow is used sparingly for CTAs and highlights.
- Large surfaces must remain neutral (white/gray).
- Avoid gradients — brand is industrial, not decorative.
- Use strong contrast blocks, not soft UI cards.

---

## UX Definition of Success

> The interface should feel instant, obvious, and calm.
> If a user has to “figure it out,” we failed.
