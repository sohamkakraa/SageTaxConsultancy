# Sage Tax Consultancy - Setup Guide

## What Has Been Created

A complete, production-ready Next.js 14 App Router foundation for the Sage Tax Consultancy website with support for English and Arabic (RTL).

### Core Files (1,139 lines of code)

#### App Router Structure
- **`app/globals.css`** (98 lines) - Global Tailwind styles with custom design components
- **`app/layout.js`** (69 lines) - Root layout with SEO metadata
- **`app/[locale]/layout.js`** (198 lines) - Locale-specific layout with i18n, JSON-LD structured data
- **`app/[locale]/page.js`** (178 lines) - Home page with hero, stats, services, CTAs
- **`app/[locale]/not-found.js`** (55 lines) - Custom 404 error page
- **`app/robots.js`** (19 lines) - SEO robots configuration
- **`app/sitemap.js`** (85 lines) - Dynamic XML sitemap generator

#### Components
- **`components/Header.js`** (153 lines) - Sticky navigation with mobile menu & language switcher
- **`components/Footer.js`** (198 lines) - Comprehensive footer with services, contact, social
- **`components/CookieConsent.js`** (86 lines) - GDPR-compliant cookie banner

## Design System

### Colors (Tailwind)
- **Sage**: Primary greens for CTAs and accents
- **Gold**: Warm accent for premium/special elements
- **Navy**: Deep blues for text and backgrounds
- **Grays**: Neutral palette for text and borders

### Typography
- **Inter**: Body text (weights: 300, 400, 500, 600, 700)
- **Plus Jakarta Sans**: Headings/display (weights: 500, 600, 700, 800)
- **Cairo**: Arabic text (weights: 300-700)

### Layout
- Tailwind CSS with custom utility components
- Responsive grid system
- Whitespace-driven, minimal aesthetic
- Professional but warm tone

## Language Support

### Built-in Internationalization
- **English** (LTR): Default language
- **Arabic** (RTL): Full text direction support
- URL routing: `/` (English) and `/ar` (Arabic)
- Automatic direction switching via `dir` attribute
- Uses `next-intl` for translation management

### Required Translation Keys
All translation keys are documented in `APP_STRUCTURE.md`. Create translations in:
- `messages/en.json` - English strings
- `messages/ar.json` - Arabic strings

## SEO Features

### Implemented
- ✓ Comprehensive metadata (title, description, OG tags)
- ✓ Structured data (JSON-LD for LocalBusiness, Organization, ProfessionalService)
- ✓ Sitemap generation (includes all 17 services + main pages)
- ✓ Robots.txt configuration
- ✓ Canonical URLs with language alternates
- ✓ Open Graph social sharing tags
- ✓ Twitter card tags
- ✓ Mobile-friendly viewport
- ✓ Security headers (X-Frame-Options, X-Content-Type-Options)

### To Configure
1. Update `NEXT_PUBLIC_SITE_URL` in `.env.local`
2. Add `NEXT_PUBLIC_GA_ID` for Google Analytics
3. Generate Google Search Console verification code
4. Create OG image at `public/og-image.jpg` (1200x630px)
5. Add company logo at `public/logo.png`

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Create .env.local from example
cp .env.local.example .env.local

# Add your configuration
NEXT_PUBLIC_SITE_URL=https://sageconsultancy.ae
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Your Google Analytics ID
```

### 3. Add Translations
Create the following files:

**`messages/en.json`** - English translations
```json
{
  "navigation": {
    "home": "Home",
    "about": "About Us",
    "services": "Services",
    "blog": "Blog",
    "contact": "Contact"
  },
  "home": {
    "badge": "Welcome to Sage Tax Consultancy",
    "heroTitle": "Expert Tax Advisory for UAE Businesses",
    ...
  }
}
```

**`messages/ar.json`** - Arabic translations (with RTL text)
```json
{
  "navigation": {
    "home": "الرئيسية",
    "about": "من نحن",
    ...
  }
}
```

### 4. Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` (English) or `http://localhost:3000/ar` (Arabic)

### 5. Build for Production
```bash
npm run build
npm start
```

## File Structure Overview

```
SageTaxConsultancy/
├── app/
│   ├── globals.css                 # Global styles
│   ├── layout.js                   # Root layout
│   ├── robots.js                   # Robots config
│   ├── sitemap.js                  # Sitemap generator
│   └── [locale]/
│       ├── layout.js               # Locale layout
│       ├── page.js                 # Home page
│       └── not-found.js            # 404 page
├── components/
│   ├── Header.js                   # Navigation
│   ├── Footer.js                   # Footer
│   └── CookieConsent.js            # Consent banner
├── messages/
│   ├── en.json                     # English translations (to create)
│   └── ar.json                     # Arabic translations (to create)
├── public/
│   ├── logo.png                    # Company logo (to add)
│   ├── og-image.jpg                # Social sharing image (to add)
│   └── ...
├── i18n.js                         # i18n config (already exists)
├── middleware.js                   # Locale middleware (already exists)
├── next.config.js                  # Next.js config (already exists)
├── tailwind.config.js              # Tailwind config (already exists)
└── package.json                    # Dependencies (already exists)
```

## Next Steps

### Phase 1: Translations & Assets
1. [ ] Create `messages/en.json` with all required keys
2. [ ] Create `messages/ar.json` with Arabic translations
3. [ ] Add company logo to `public/logo.png`
4. [ ] Add OG image to `public/og-image.jpg` (1200x630px)
5. [ ] Update contact email/phone in Footer.js

### Phase 2: Additional Pages
1. [ ] Create `/app/[locale]/about/page.js`
2. [ ] Create `/app/[locale]/services/page.js` (listing)
3. [ ] Create `/app/[locale]/services/[slug]/page.js` (individual services)
4. [ ] Create `/app/[locale]/blog/page.js` (blog listing)
5. [ ] Create `/app/[locale]/blog/[slug]/page.js` (blog posts)
6. [ ] Create `/app/[locale]/contact/page.js` (contact form)
7. [ ] Create `/app/[locale]/privacy-policy/page.js`
8. [ ] Create `/app/[locale]/terms/page.js`

### Phase 3: Contact & Analytics
1. [ ] Implement contact form backend (Supabase/email service)
2. [ ] Configure Google Analytics (add GA_ID)
3. [ ] Set up Google Search Console
4. [ ] Configure email notifications
5. [ ] Add WhatsApp/social media integration

### Phase 4: Content & Optimization
1. [ ] Add team member profiles
2. [ ] Create service content with case studies
3. [ ] Write blog posts
4. [ ] Add client testimonials
5. [ ] Optimize images for web
6. [ ] Implement meta tags per page

### Phase 5: Testing & Launch
1. [ ] Test on mobile devices
2. [ ] Test Arabic RTL layout
3. [ ] Run accessibility audit
4. [ ] Test form submissions
5. [ ] Performance testing (Lighthouse)
6. [ ] SEO audit
7. [ ] Deploy to production

## Key Features Already Implemented

### ✓ Performance
- Optimized CSS with Tailwind
- Image optimization ready
- Proper font loading
- Minimal JavaScript

### ✓ Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Mobile responsive

### ✓ SEO
- Structured data
- Sitemap & robots
- Canonical URLs
- OG tags
- Language alternates

### ✓ Responsive Design
- Mobile-first approach
- Desktop navigation
- Mobile hamburger menu
- Responsive grid system
- Touch-friendly buttons

### ✓ Internationalization
- English/Arabic support
- Automatic direction switching
- Language switcher
- next-intl integration
- URL-based locale routing

## Tailwind Configuration

The project uses the existing `tailwind.config.js` with custom color extensions for:
- `sage-*` colors (primary brand)
- `gold-*` colors (accent)
- `navy-*` colors (dark text/backgrounds)

## Styling Approach

All styling uses Tailwind CSS utility classes. Custom components are defined as Tailwind component classes in `globals.css`:

- `.btn-primary` - Main CTA button
- `.btn-secondary` - Secondary button
- `.btn-gold` - Gold accent button
- `.card` - Card component with hover effect
- `.badge` - Pill badge
- `.section-padding` - Standard section spacing
- `.container-narrow` - Max-width container
- `.section-heading` - Large headings
- `.section-subheading` - Subheadings
- `.gradient-text` - Gradient text effect

## Customization

### Colors
Edit `tailwind.config.js` to adjust the sage/gold/navy color palette:
```javascript
extend: {
  colors: {
    sage: { /* ... */ },
    gold: { /* ... */ },
    navy: { /* ... */ }
  }
}
```

### Fonts
Google Fonts are imported in `app/globals.css`. To change:
1. Update the @import URL
2. Update font-family declarations in tailwind config

### Layout
Adjust responsive breakpoints in `tailwind.config.js`:
```javascript
screens: {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}
```

## Support & Documentation

- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **next-intl**: https://next-intl-docs.vercel.app/
- **App Router**: https://nextjs.org/docs/app
- **JSON-LD Schema**: https://schema.org/

## Troubleshooting

### Hydration Errors
The layout uses `suppressHydrationWarning` on the HTML element. If you add client components that differ from server render, ensure they're wrapped with error boundaries.

### Arabic Text Not Showing
Ensure `messages/ar.json` exists with Arabic translations. The HTML `dir="rtl"` attribute is set automatically for Arabic.

### Sitemap Not Generating
The sitemap is generated at build time. Run `npm run build` to create `public/sitemap.xml`.

### Language Switcher Not Working
Ensure the language link format is correct:
- English: `/` or `/page`
- Arabic: `/ar` or `/ar/page`

## Production Checklist

- [ ] All translation keys completed
- [ ] Logo and images optimized
- [ ] Contact form functional
- [ ] Google Analytics configured
- [ ] SEO metadata reviewed
- [ ] Mobile testing passed
- [ ] Accessibility audit passed
- [ ] Performance optimized (Lighthouse >90)
- [ ] Security headers verified
- [ ] Sitemap submitted to search engines
- [ ] Robots.txt verified
- [ ] SSL certificate configured
- [ ] Domain/DNS setup
- [ ] Monitoring/alerts configured

---

**Built with:** Next.js 14 | Tailwind CSS | next-intl | React 18

**Status:** Ready for customization and content addition
