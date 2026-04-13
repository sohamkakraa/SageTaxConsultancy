# Sage Tax Consultancy - App Router Structure

## Overview

This document describes the Next.js 14 App Router structure for the Sage Tax Consultancy website. The site features a modern, professional design with support for both English and Arabic (RTL) languages.

## Directory Structure

```
app/
├── globals.css                 # Global styles (Tailwind + custom components)
├── layout.js                   # Root layout (metadata, fonts setup)
├── robots.js                   # SEO robots configuration
├── sitemap.js                  # Dynamic XML sitemap generator
└── [locale]/
    ├── layout.js               # Locale-specific layout with i18n
    ├── page.js                 # Home page (hero, stats, services)
    └── not-found.js            # Custom 404 page

components/
├── Header.js                   # Navigation header (desktop & mobile)
├── Footer.js                   # Footer with links and contact info
└── CookieConsent.js            # Cookie consent banner

i18n.js                        # i18n configuration and locale setup
messages/
├── en.json                     # English translations
└── ar.json                     # Arabic translations (RTL)
```

## Core Files

### 1. `app/globals.css`

Global stylesheet with:
- Tailwind CSS directives (@tailwind)
- Custom Google Fonts imports (Inter, Plus Jakarta Sans, Cairo)
- Custom components (.btn-primary, .card, .badge, etc.)
- Smooth animations and transitions
- Custom scrollbar styling
- RTL support for Arabic

**Design System Colors:**
- Sage: Primary greens (#047857 - #10b981)
- Gold: Warm accent golds (#eab308 - #ca8a04)
- Navy: Deep blues (#030712 - #1e293b)
- Grays: Neutral palette

### 2. `app/layout.js`

Root layout that:
- Imports globals.css
- Sets up comprehensive metadata (title, description, OG tags)
- Configures robots and verification
- Sets up canonical URLs and alternate language links
- Returns children (delegating locale-specific layout to [locale]/layout.js)

**Metadata includes:**
- Title templates for auto-generation
- OpenGraph tags for social sharing
- Twitter card configuration
- Structured robots directives
- Language alternates for SEO

### 3. `app/[locale]/layout.js`

Locale-specific root layout that:
- Uses NextIntlClientProvider for translations
- Sets HTML lang and dir attributes (rtl for Arabic)
- Includes comprehensive JSON-LD structured data:
  - LocalBusiness schema
  - ProfessionalService schema
  - Organization schema
  - BreadcrumbList schema
- Integrates Header and Footer components
- Adds CookieConsent component
- Conditionally includes Google Analytics

**Features:**
- 'use client' directive for client-side rendering
- Dynamic locale validation
- Static params generation for prebuilding
- Proper Hydration handling with suppressHydrationWarning
- Security headers and meta tags

### 4. `app/[locale]/page.js`

Home page featuring:
- Hero section with gradient background
- Trust/credibility indicators
- Stats section (clients, years, satisfaction, support)
- Services preview (6 featured services with icons)
- Call-to-action section
- Fully responsive design
- Translation support via next-intl

**Sections:**
1. Hero: Main value proposition with CTAs
2. Stats: Key metrics
3. Services: 6 featured services from 17 total
4. CTA: Encouraging consultation scheduling

### 5. `app/[locale]/not-found.js`

Custom 404 page with:
- Clean design with large 404 heading
- Helpful error message
- Navigation back to home
- Contact page link
- Decorative icon

### 6. `app/robots.js`

Robots configuration that:
- Allows crawling of public pages
- Disallows admin, private, and API routes
- Specifies sitemap location
- Sets canonical host

### 7. `app/sitemap.js`

Dynamic sitemap generator that includes:
- Home pages (en + ar)
- Static pages: about, services, blog, contact, privacy, terms
- All 17 service pages (en + ar variants)
- Proper lastModified dates
- Priority values (1.0 for home, 0.6-0.9 for others)
- Weekly refresh for blog, monthly for others

## Component Files

### 1. `components/Header.js`

Sticky navigation header with:
- Logo/brand link
- Desktop navigation menu
- Mobile hamburger menu
- Language switcher (en/ar)
- CTA button (Contact)
- Scroll-aware styling
- Smooth animations

**Features:**
- useTranslations hook for i18n
- Mobile responsiveness
- Animated underline on nav links
- Sticky positioning with blur effect

### 2. `components/Footer.js`

Comprehensive footer with:
- Brand/logo section with social links
- Quick links navigation
- Service categories breakdown
- Contact information (email, phone)
- Copyright and legal links
- Social media integration

**Features:**
- 5-column layout on desktop
- Responsive grid for mobile
- Service category organization
- LinkedIn and Twitter links
- Terms and Privacy links

### 3. `components/CookieConsent.js`

GDPR-compliant cookie banner with:
- Delayed appearance (1s)
- Accept/Decline buttons
- LocalStorage persistence
- Privacy policy link
- Backdrop blur effect
- Smooth animations

**Features:**
- Shows only once per user
- Dark overlay with blur
- Translatable text
- Privacy-first approach

## Configuration Files

### `i18n.js`

Exports:
- `locales`: ['en', 'ar']
- `defaultLocale`: 'en'
- getRequestConfig for next-intl

### `next.config.js`

Configured with:
- next-intl plugin
- Image optimization for Supabase
- Security headers (X-Frame-Options, X-Content-Type-Options)
- Referrer Policy

### `middleware.js`

Handles locale routing (if configured)

## Key Features

### 1. Multi-Language Support
- English (LTR) and Arabic (RTL)
- Automatic language detection in URL: `/`, `/ar`
- Language switcher in header
- Automatic text direction switching

### 2. SEO Optimization
- Comprehensive metadata
- Canonical URLs with language alternates
- Structured data (JSON-LD)
- Sitemap generation
- Robots configuration
- OG tags for social sharing

### 3. Design System
- Consistent color palette
- Tailwind CSS utilities
- Custom component classes (.btn-primary, .card, etc.)
- Smooth animations and transitions
- Professional typography

### 4. Accessibility
- Proper semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Mobile responsive design

### 5. Performance
- CSS-in-JS via Tailwind
- Optimized Google Fonts
- Static generation where possible
- Image optimization

## Translation Keys (i18n)

The app expects these translation keys in `messages/en.json` and `messages/ar.json`:

```javascript
// Navigation
navigation.home
navigation.about
navigation.services
navigation.blog
navigation.contact

// Home page
home.badge
home.heroTitle
home.heroDescription
home.trustPoint1/2/3
home.stat1/2/3/4
home.servicesTitle
home.servicesDescription
home.service1Title/Desc through home.service6Title/Desc
home.ctaTitle
home.ctaDescription

// Buttons/CTAs
cta.getInTouch
cta.exploreServices
cta.viewAllServices
cta.scheduleConsult
cta.learnMore
cta.contact

// Footer
footer.brandDescription
footer.quickLinks
footer.services
footer.taxServices
footer.accountingServices
footer.businessServices
footer.contact
footer.privacyPolicy
footer.terms
footer.copyright

// Cookies
cookies.title
cookies.description
cookies.privacyLink
cookies.accept
cookies.decline

// Errors
errors.notFound
errors.notFoundDescription
```

## Styling Classes

### Layout Classes
- `.section-padding`: Vertical padding (py-20 md:py-28)
- `.container-narrow`: Max-width container (max-w-6xl)

### Button Classes
- `.btn-primary`: Sage green button
- `.btn-secondary`: White button with border
- `.btn-gold`: Gold accent button

### Component Classes
- `.badge`: Small pill badge
- `.card`: Hover-animated card
- `.section-heading`: Large section headings
- `.section-subheading`: Section subtitles
- `.gradient-text`: Gradient text effect
- `.link-underline`: Animated underline links

### Animations
- `.reveal`: Fade-in animation (used with JS)
- Custom scrollbar styling

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://sageconsultancy.ae
NEXT_PUBLIC_GA_ID=your-google-analytics-id (optional)
```

## Building and Deployment

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Generate sitemap and robots
# These are generated automatically at build time
```

## Service Pages

The sitemap includes these 17 services (to be implemented):
1. VAT Registration Advisory
2. VAT Compliance & Returns
3. Corporate Income Tax
4. Corporate Tax Planning
5. Transfer Pricing
6. Excise Tax Advisory
7. Accounting & Bookkeeping
8. Financial Statement Preparation
9. Audit & Assurance
10. Forensic Accounting
11. Internal Audit
12. Business Setup & Formation
13. Golden Visa Support
14. Payroll & HR Compliance
15. UAE Regulations & Compliance
16. Financial Advisory & Planning
17. Tax Controversy & Resolution

## Next Steps

1. Create individual service pages in `app/[locale]/services/[slug]/page.js`
2. Create about page in `app/[locale]/about/page.js`
3. Create contact form page in `app/[locale]/contact/page.js`
4. Create blog listing and post pages in `app/[locale]/blog/`
5. Add translation keys to `messages/en.json` and `messages/ar.json`
6. Configure Google Analytics with proper ID
7. Add company logo to `public/logo.png`
8. Add OG image to `public/og-image.jpg`
9. Configure contact form backend
10. Add team/about images and content

## Design Principles

- **Modern & Minimal**: Lots of whitespace, clean layouts
- **Professional & Warm**: Professional tone with approachable personality
- **Accessible**: WCAG compliant, keyboard navigable
- **Responsive**: Mobile-first design
- **Fast**: Optimized assets and efficient CSS
- **Semantic**: Proper HTML structure for SEO
