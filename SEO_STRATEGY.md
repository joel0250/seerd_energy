# SEO_STRATEGY.md — Search Visibility & Metadata Architecture

## 1. SEO Philosophy

This project prioritizes **technical SEO over content bloat**.

* Fast sites rank.
* Clean markup ranks.
* Accessible sites rank.

We optimize for:
✅ Crawl efficiency
✅ Semantic clarity
✅ Performance signals (Core Web Vitals)

---

## 2. Page Structure Requirements

Each page must follow:

```html
<header>
<main>
<section>
<footer>
```

No skipped heading levels.
Only **one `<h1>` per page**.

---

## 3. Metadata Blueprint

### Required Tags (index.html)

```html
<title>Primary Keyword | Brand</title>
<meta name="description" content="Clear 150–160 character summary.">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="https:/seerdenergy.com/">
```

### Open Graph

```html
<meta property="og:title" content="">
<meta property="og:description" content="">
<meta property="og:type" content="website">
<meta property="og:url" content="">
<meta property="og:image" content="/assets/img/og.webp">
```

### Twitter Card

```html
<meta name="twitter:card" content="summary_large_image">
```

---

## 4. Structured Data (Schema)

Use **JSON-LD** only (no microdata).

Example:

```html
<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@type": "Organization",
 "name": "Google Antigravity",
 "url": "https://seerdenergy.com",
 "email": "info@seerdenergy.com"
}
</script>
```

Add schemas only if they reflect real content:

* Organization
* WebSite
* ContactPage

Avoid spammy over-markup.

---

## 5. Performance = Ranking Strategy

Target Core Web Vitals:

| Metric | Target  |
| ------ | ------- |
| LCP    | < 2.0s  |
| CLS    | < 0.05  |
| INP    | < 200ms |

How we achieve this:

* Inline critical CSS.
* Self-host assets.
* No render-blocking libraries.
* Use `loading="lazy"` on images.
* Preload hero image only.

---

## 6. URL Strategy

* Flat architecture preferred.
* Human-readable slugs.

Example:

```
/contact
/about
/vendors
```

Avoid:

```
/page?id=7
```

---

## 7. Content Signals

Each page must include:

* A clear intent-focused intro paragraph.
* At least one subheading explaining value.
* Trust indicators (credentials, guarantees, or proof).

No filler copy.

---

## 8. Crawl Control

### robots.txt

```
User-agent: *
Allow: /
Sitemap: https://seerdenergy.com/sitemap.xml
```

### sitemap.xml

Generated automatically during deployment.

---

## 9. Deployment Checklist (SEO Gate)

Before launch verify:

* Lighthouse SEO ≥ 90
* No console errors
* Canonical URL correct
* Structured data validates
* All images include dimensions
* No duplicate titles/descriptions

---

## 10. Audience & Market Positioning

### Target Audience
- Industrial and manufacturing companies
- Energy-sector operators
- Infrastructure and engineering firms
- Procurement and sourcing professionals
- B2B partnerships requiring bulk or technical supply

### Messaging Intent
Content must communicate:
- Operational strength
- Reliability at scale
- Technical credibility
- Long-term partnership value

Avoid consumer-style marketing language.
Use clear, confident, engineering-oriented tone.

### Core Keyword Themes
industrial supply, engineered materials, energy solutions, bulk sourcing,
infrastructure support, industrial partner, scalable production

---

## 11. Content Inspiration Sources (Do Not Copy — Interpret)

The following sites define industry tone and structure only.
All content must be rewritten, simplified, and performance-focused.

Reference 1: https://solidmaden.com/
Reference 2: http://brenergyfz.com/

### Observed Themes to Translate
- Industrial credibility over marketing language
- Clear statement of capability and sectors served
- Emphasis on logistics, supply reliability, and partnerships
- Minimal storytelling, maximum clarity
- Strong, declarative headings

### Our Adaptation Rule
We do not replicate wording.
We translate the message into:

"Fast, modern, technically credible presentation of industrial services."

### Voice Guidelines
Use:
- Direct language
- Short sentences
- Verifiable claims
- Engineering tone

Avoid:
- Buzzwords
- Sales-heavy paragraphs
- Generic sustainability clichés

---

## SEO Definition of Success

> If the site loads instantly, is understandable to a crawler, and satisfies intent, rankings follow naturally.
> We do not chase algorithms — we align with them.
