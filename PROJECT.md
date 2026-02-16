# PROJECT.md — The Vision & Architecture

## 1. Project Overview

**Project Name:** SEERD Energy
**Goal:** A high-performance, SEO-optimized static web application built with HTML5 and Vanilla JavaScript, featuring a secure, server-validated contact system.
**Core Philosophy:** *“Speed first, clean code, accessibility for all.”*
**Target Audience:** Industrial manufacturers, Energy and infrastructure companies, Procurement teams sourcing raw or engineered materials, Project developers requiring bulk supply or technical integration, B2B decision-makers (engineers, operations managers, buyers)

---

## 2. Reference Standards

**Note to Agent:**
Use the following references as *structural inspiration only*. The final implementation must improve upon them in performance, accessibility, and modern UX patterns.

* **Reference 1:** https://solidmaden.com/

  * *Focus:* Layout clarity, intuitive navigation flow.

* **Reference 2:** http://brenergyfz.com/

  * *Focus:* Content hierarchy, trust-building elements, and visual pacing.

---

## 3. Tech Stack & Integration

| Component         | Technology              | Service Provider                  |
| ----------------- | ----------------------- | --------------------------------- |
| **Frontend**      | HTML5, CSS3, Vanilla JS | Static Hosting (Github Pages) |
| **Database**      | PostgreSQL              | Supabase                          |
| **Backend Logic** | Edge Functions (Deno)   | Supabase Functions                |
| **Email Service** | SMTP / API              | Resend (via Supabase Trigger)     |
| **Security**      | Bot Protection          | Google reCAPTCHA v3               |

---

## 4. UI / UX Requirements

### Mobile-First Design

* All layouts **must be validated at 375px width** before scaling to desktop (1440px+).
* Responsive behavior is not optional — it is foundational.

### Performance Constraints

* **Zero heavy external libraries**

  * ❌ No jQuery
  * ❌ No Bootstrap
* Critical CSS must be **inlined inside `<head>`**.
* All imagery must be served as **`.webp`** (or AVIF where supported).
* JavaScript must be modular and minimal.

### Interaction Design

* Provide subtle **micro-interactions**:

  * Loading state on form submission
  * Accessible success/error feedback
  * Lightweight animation (CSS-driven where possible)

---

## 5. Directory Structure (The Blueprint)

```
/
├── index.html            # Main entry (SEO optimized)
├── /assets
│   ├── /css
│   │   └── main.css      # Guided by UX_UI_SYSTEM.md
│   ├── /js
│   │   ├── main.js       # Core UI logic
│   │   └── contact.js    # Supabase + reCAPTCHA handling
│   └── /img              # Optimized image assets (.webp)
│
├── /supabase
│   └── /functions
│       └── send-email    # Edge Function (Deno)
│
├── PROJECT.md            # This document
├── UX_UI_SYSTEM.md       # Visual + interaction guidelines
└── SEO_STRATEGY.md       # Metadata, schema, indexing plan
```

---

## 6. Definition of Done (DoD)

The project is considered **complete only when all conditions below are satisfied**:

* ✅ Contact form successfully inserts a record into Supabase.
* ✅ Edge Function triggers a transactional email to the administrator.
* ✅ reCAPTCHA v3 score is validated **server-side** (never client-only).
* ✅ Lighthouse scores:

  * Performance ≥ **90**
  * SEO ≥ **90**
  * Accessibility ≥ **90**
* ✅ No render-blocking scripts.
* ✅ Site is fully responsive and tested on:

  * Chrome (Mobile & Desktop)
  * Safari (iOS)
  * Firefox (Mobile & Desktop)

---

## 7. Brand Asset Handling

Source logo is provided in:
design_assets/logo.pdf

This file is NOT used directly on the website.

### Required Conversion
The logo must be extracted and exported into web-optimized formats:

1. Primary Format: SVG (for sharp scaling, preferred)
2. Fallback Format: WEBP (for raster usage)
3. Optional: PNG (only if transparency issues occur)

### Output Location
/assets/img/logo.svg
/assets/img/logo.webp

### Rules
- Do not embed PDF files in the website.
- SVG must be cleaned (no editor metadata, no inline raster images).
- File size must be under 100KB.
- Use inline SVG for header rendering when possible (performance gain).

---

## Guiding Principle

> Build less. Ship faster. Let performance be the feature.

Every decision — from CSS specificity to database calls — must reinforce **speed, clarity, and maintainability**.
