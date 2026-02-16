# Seerd Energy — Industrial Supply Reliability

Static marketing website for **Seerd Energy**, built with vanilla HTML, CSS, and JavaScript. Hosted on **GitHub Pages** with a **Supabase** backend for contact form submissions and email notifications.

---

## 🏗 Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| Frontend     | HTML5, CSS3, Vanilla JS                         |
| Hosting      | GitHub Pages                                    |
| Backend      | Supabase Edge Functions (Deno)                  |
| Database     | Supabase (PostgreSQL)                           |
| Email        | Resend (`resend.com`)                           |
| Bot Control  | Google reCAPTCHA v3                             |

## 📁 Project Structure

```
seerd_energy/
├── index.html              # Home page
├── services.html           # Capabilities page
├── about.html              # About page
├── contact.html            # Contact form page
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── assets/
│   ├── css/
│   │   └── main.css        # Consolidated stylesheet
│   ├── js/
│   │   ├── main.js         # Menu toggle & utilities
│   │   ├── animations.js   # Scroll reveal animations
│   │   ├── contact.js      # Contact form handler
│   │   └── footer-animation.js  # Nuclear particle canvas
│   └── img/                # Images & logo
├── supabase/
│   ├── migrations/
│   │   └── 001_contact_submissions.sql
│   └── functions/
│       └── send-email/
│           └── index.ts    # Edge Function (form → DB + emails)
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages deploy action
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- A [Supabase](https://supabase.com) project
- A [Resend](https://resend.com) account (free tier: 100 emails/day)
- A [Google reCAPTCHA v3](https://www.google.com/recaptcha/admin) site key + secret

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/seerd-energy.git
cd seerd-energy
```

### 2. Set up Supabase

```bash
# Link to your Supabase project
supabase link --project-ref YOUR_PROJECT_REF

# Run the database migration
supabase db push

# Set Edge Function secrets
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx
supabase secrets set RECAPTCHA_SECRET=your_recaptcha_secret
supabase secrets set ADMIN_EMAIL=admin@seerdenergy.com

# Deploy the Edge Function
supabase functions deploy send-email
```

### 3. Configure the frontend

Edit `assets/js/contact.js` and update:

```js
const SUPABASE_URL = "https://YOUR_PROJECT_REF.supabase.co";
const SUPABASE_ANON_KEY = "your_anon_key_here";
```

Edit `contact.html` and replace `PLACEHOLDER_SITE_KEY` with your reCAPTCHA v3 site key.

### 4. Deploy to GitHub Pages

Push to the `main` branch. The GitHub Actions workflow at `.github/workflows/deploy.yml` will auto-deploy.

Or manually enable GitHub Pages under **Settings → Pages → Source: main branch / root**.

## 🔒 Security

| Concern                 | Mitigation                                                     |
| ----------------------- | -------------------------------------------------------------- |
| API keys on client      | Only the **anon key** is exposed (read-only, RLS-protected)    |
| Resend / reCAPTCHA keys | Stored as **Supabase Edge Function secrets** (server-side)     |
| Spam / bots             | reCAPTCHA v3 verified server-side; score threshold = 0.5       |
| Direct DB writes        | RLS enabled; inserts only via Edge Function (service role key) |

## 📧 Email Flow

```
User submits form
  └→ contact.js POSTs to Supabase Edge Function
       ├→ Verifies reCAPTCHA token
       ├→ Inserts row into contact_submissions table
       ├→ Sends admin notification email (Resend)
       └→ Sends user thank-you email (Resend)
```

## 📄 License

© 2026 Seerd Energy. All rights reserved.
