# Sage Global Advisory — Website v3

Bilingual (English/Arabic, RTL) website for **Sage Global Advisory** (formerly Sage Advisory / Sage Tax Consultancy), a Dubai tax & business advisory firm — live at **https://sageglobaladvisory.com**.

Built with Next.js 15 (App Router), React 19, Tailwind CSS, next-intl 4 and Supabase, deployed on Vercel.

## The CMS — `/admin`

A conversational website editor designed for non-technical use:

- **Assistant (chat)** — describe a change in plain English or Arabic ("change the headline", "put this photo of Jay on the team section", "write a draft blog post about VAT"). Powered by OpenAI `gpt-6-luna` (text) and `gpt-image-2.5-flare-2026-09-08` (image generation/editing). The agent sees the whole site content, service pages, blog posts, image library, recent change history, saved preferences and summaries of past conversations; it always writes both languages. Upload/drag/paste images; it can edit them (remove background, relight, re-crop) and place them in the requested — or the obvious — spot. A live preview (EN/AR, desktop/mobile) refreshes after each change.
- **Edit pages** — every text and picture on the site as a form, English and Arabic side by side with one-click AI translation.
- **Pictures**, **Services**, **Blog posts**, **Enquiries** (contact-form inbox with PDPL-friendly delete) and **History & undo** (every change is recorded and reversible; also lists what the assistant remembers).

How content works: all editable content lives in one JSON tree (`lib/cms/defaults.js` = defaults/schema; table `cms_content` stores the edited version, deep-merged over the defaults at runtime). Services and blog posts stay in their own tables. Memory is kept compact: the last 14 messages verbatim + a rolling AI summary of each conversation + explicit "remember" facts.

Key code: `lib/cms/agent.js` (tools + system prompt + loop), `lib/cms/memory.js`, `lib/cms/store.js` (writes, validation, history/undo, cache revalidation), `lib/cms/media.js` (sharp re-encoding, Supabase Storage), `components/cms/*`, `app/admin/*`, `app/api/cms/*`.

### Admin access
Log in with a Supabase Auth user whose email is in `CMS_ADMIN_EMAILS`. Add users in Supabase → Authentication → Users, then add the email to `CMS_ADMIN_EMAILS` in Vercel and redeploy.

## Security & compliance
- Signed, httpOnly, SameSite=Strict session cookie (HMAC, 12 h), verified in middleware and in every CMS API route; Origin checks on all writes; login throttling (5 failures / 15 min per email and per IP).
- All writes go through server routes with the service-role key; Row Level Security blocks browser writes (legacy "any signed-in user can write" policies were removed).
- Uploads are decoded and re-encoded to WebP with sharp (strips EXIF/GPS, rejects non-images/SVG). Content writes are shape-validated; CMS links must be https.
- CSP, HSTS, X-Frame-Options, Permissions-Policy, COOP headers (`next.config.js`). Fonts self-hosted.
- UAE PDPL (Federal Decree-Law 45/2021): Privacy Policy, Terms and Cookie Policy (`lib/legal/*`, EN/AR), consent checkbox on the contact form (stored with policy version), granular cookie consent (necessary / analytics / external media) with equal-weight reject, withdrawal via "Cookie settings", Google Consent Mode v2, consent-gated Google Maps, no IP storage. Bump `PRIVACY_VERSION` in `lib/site.js` after material policy changes. Have UAE counsel review the legal text and fill in the trade-licence details (Edit pages → Company details).

## Development
```bash
npm install
cp .env.local.example .env.local   # fill in values
npm run cms:migrate                # one-off: creates CMS tables/bucket (idempotent)
npm run dev
```

## Environment variables
See `.env.local.example`. They must also be set in Vercel (they are read at build time).

## Domain
Production domain: `sageglobaladvisory.com` (DNS at Cloudflare → Vercel). Once it resolves, set `REDIRECT_LEGACY_DOMAINS=true` so `sagetaxconsultancy.com` 308-redirects to it.

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
