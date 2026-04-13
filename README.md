# Sage Tax Consultancy — Website v2.0

A modern, bilingual (English/Arabic), SEO-optimized website for Sage Tax Consultancy, built with Next.js 14, Tailwind CSS, and Supabase.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (for CMS admin panel)
- **i18n:** next-intl (English + Arabic with RTL)
- **Deployment:** Vercel
- **Analytics:** Google Analytics 4

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in values
cp .env.local.example .env.local

# 3. Run development server
npm run dev
```

The site will run at `http://localhost:3000`.

---

## Environment Variables

These MUST be set in **Vercel Dashboard → Settings → Environment Variables**:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-only) |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://sageconsultancy.ae` |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 Measurement ID |
| `REVALIDATION_SECRET` | No | Secret for on-demand ISR revalidation |
| `ADMIN_EMAIL` | No | Admin email for CMS login |

---

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Note your **Project URL** and **anon key** from Settings → API

### 2. Run the Database Schema

Go to **SQL Editor** in your Supabase dashboard and run these files in order:

1. `supabase/schema.sql` — Creates all tables, indexes, RLS policies, and triggers
2. `supabase/seed.sql` — Populates the database with all service data, testimonials, FAQs, and site content

### 3. Create an Admin User

In Supabase Dashboard → Authentication → Users → Add User:
- Email: `admin@sageconsultancy.ae` (or your preferred email)
- Password: Choose a strong password
- This is used to log into the CMS at `/admin`

### 4. Enable Email Auth

In Supabase Dashboard → Authentication → Providers:
- Ensure **Email** provider is enabled
- Disable "Confirm email" for simplicity (or keep it and confirm via dashboard)

---

## Deployment on Vercel

### 1. Connect Repository

1. Push this project to a GitHub/GitLab repository
2. Go to [vercel.com](https://vercel.com) → Import Project → Select your repo
3. Vercel will auto-detect Next.js

### 2. Configure Environment Variables

Add ALL variables from the table above in Vercel Dashboard → Settings → Environment Variables.

### 3. Configure Build Settings

Vercel should auto-detect these, but verify:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

### 4. Custom Domain

In Vercel → Settings → Domains:
- Add `sageconsultancy.ae`
- Add `www.sageconsultancy.ae`
- Update your domain registrar's DNS to point to Vercel

### 5. Deploy

Push to main branch → Vercel auto-deploys.

---

## CMS Admin Panel

Access the admin panel at: `https://sageconsultancy.ae/admin`

### Features:
- **Site Content** — Edit all text on the website (hero, about, counters, contact info)
- **Services** — Edit service names, descriptions, features, and process steps
- **Blog Posts** — Create, edit, publish/unpublish blog posts
- **Testimonials** — Manage client testimonials
- **FAQs** — Add, edit, reorder frequently asked questions
- **Messages** — View and manage contact form submissions

### How it Works:
1. Log in with the admin email/password created in Supabase
2. Edit any content in English and Arabic
3. Click "Save" to update
4. Changes appear on the live site within seconds (ISR revalidation)

---

## Daily News Section

The website automatically fetches the latest UAE tax and business news from regional RSS feeds:
- Gulf News Business
- Khaleej Times Business
- Arabian Business
- The National UAE
- Zawya

News articles appear on the home page and the `/blog` (Insights) page. The feed refreshes every hour.

You can also create custom blog posts through the CMS admin panel.

---

## SEO Features

- Server-side rendering for all pages
- Dynamic meta tags per page (title, description, OG, Twitter cards)
- JSON-LD structured data (LocalBusiness, ProfessionalService, Organization)
- Auto-generated sitemap at `/sitemap.xml`
- robots.txt at `/robots.txt`
- Bilingual alternate URLs (hreflang tags)
- Semantic HTML with proper heading hierarchy
- Optimized for keywords: tax consultancy UAE, VAT consultant Dubai, corporate tax UAE, etc.

---

## Project Structure

```
├── app/
│   ├── [locale]/           # Locale-based routing (en, ar)
│   │   ├── page.js         # Home page
│   │   ├── about/          # About page
│   │   ├── blog/           # Blog listing + [slug]
│   │   ├── contact/        # Contact page
│   │   ├── services/       # Services listing + [slug]
│   │   ├── privacy-policy/ # Privacy policy
│   │   └── terms/          # Terms & conditions
│   ├── admin/              # CMS admin panel
│   │   ├── blog/           # Blog manager
│   │   ├── content/        # Site content editor
│   │   ├── faqs/           # FAQ manager
│   │   ├── messages/       # Contact messages
│   │   ├── services/       # Services manager
│   │   └── testimonials/   # Testimonials manager
│   ├── api/                # API routes
│   │   ├── contact/        # Contact form handler
│   │   ├── news/           # News feed aggregator
│   │   └── revalidate/     # ISR revalidation
│   ├── globals.css         # Global styles + Tailwind
│   ├── layout.js           # Root layout
│   ├── robots.js           # Robots.txt generator
│   └── sitemap.js          # Sitemap generator
├── components/             # React components
│   ├── admin/              # Admin panel components
│   └── ...                 # Site components (Hero, About, etc.)
├── lib/                    # Utilities
│   ├── content.js          # Data fetching with fallbacks
│   ├── news.js             # RSS feed aggregation
│   ├── supabase.js         # Supabase client
│   └── supabase-admin.js   # Admin Supabase client
├── messages/               # i18n translations
│   ├── en.json             # English
│   └── ar.json             # Arabic
├── public/assets/          # Static assets (images, logos)
├── supabase/               # Database setup
│   ├── schema.sql          # Table definitions + RLS
│   └── seed.sql            # Initial data
└── ...config files
```

---

## Old CRA Project

The previous Create React App source code is preserved in the `src/` directory and `_backup/` folder. These are no longer used by the Next.js build and can be safely removed once the new site is verified.

To clean up: delete the `src/`, `_backup/`, `build.zip`, and `package-lock.json` files, then run `npm install` to generate a fresh lock file.
