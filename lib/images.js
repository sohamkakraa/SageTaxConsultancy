/**
 * Centralized image URLs from Unsplash (free to use).
 *
 * IMAGE STRATEGY:
 * - Hero: Dubai skyline — establishes UAE location immediately
 * - About: Real team/office feel — builds trust for advisory firm
 * - Services: Specific to each service category — no generic stock
 * - Leadership: Professional headshots (replace with actual team photos ASAP)
 * - Blog/News: Clean editorial feel
 *
 * Replace with your own professional photography as you grow.
 * Unsplash License: https://unsplash.com/license
 */

const IMAGES = {
  // ─── Hero ───
  // Local hero image — no external dependency, faster load, no CSP issues
  hero: '/assets/hero-image.png',

  // ─── About Section ───
  // Business professionals in a meeting — shows collaboration, not generic office
  aboutTeam: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop',
  // Clean modern workspace with documents — implies organized, detail-oriented firm
  aboutOffice: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',

  // ─── Leadership ───
  // IMPORTANT: Replace these with actual partner headshots
  // For now: professional, business-formal portraits
  leaderMale: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop&crop=face',
  leaderFemale: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop&crop=face',

  // ─── Tax Services ───
  // Calculator, documents, tax forms — universally understood "tax work"
  taxCompliance: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop',
  // UAE dirham notes and financial documents — region-specific tax context
  vatServices: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&q=80&auto=format&fit=crop',

  // ─── Accounting & Auditing ───
  // Person working on financial spreadsheets — hands-on accounting work
  accounting: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop',
  // Clean desk with laptop showing data/analytics — modern bookkeeping
  bookkeeping: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
  // Professional reviewing documents — audit/review process
  audit: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80&auto=format&fit=crop',

  // ─── Corporate Services ───
  // Dubai skyline with modern towers — company formation in UAE
  corporate: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format&fit=crop',
  // Handshake / business deal — company registration
  companyReg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&q=80&auto=format&fit=crop',
  // UAE passport / visa imagery — Golden Visa context
  goldenVisa: 'https://images.unsplash.com/photo-1582407947092-87836d041ef5?w=800&q=80&auto=format&fit=crop',
  // Legal documents / stamp — trademark registration
  trademark: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80&auto=format&fit=crop',

  // ─── Contact ───
  // Dubai business district / Downtown — implies "we're based here, come visit"
  contact: 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&q=80&auto=format&fit=crop',

  // ─── Blog / News ───
  // Clean newspaper / editorial style — for articles without featured images
  blogDefault: 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&q=80&auto=format&fit=crop',

  // ─── Page Hero Backgrounds ───
  // Downtown Dubai at dusk — used for services/blog page heroes
  dubaiBusiness: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1200&q=80&auto=format&fit=crop',
  // Aerial view of Dubai — dramatic, premium feel
  dubaiAerial: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80&auto=format&fit=crop',

  // ─── Testimonials ───
  // Not used as visible image — only as subtle texture. Can remove.
  testimonials: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop',
};

// Map service slugs → specific images (no "one image fits all")
export const SERVICE_IMAGES = {
  // Tax
  'vat': IMAGES.taxCompliance,
  'corporate-tax': IMAGES.taxCompliance,
  'excise-tax': IMAGES.vatServices,
  // Accounting & Audit
  'accounting-services': IMAGES.accounting,
  'bookkeeping-services': IMAGES.bookkeeping,
  'internal-auditing': IMAGES.audit,
  'external-auditing': IMAGES.audit,
  'statutory-auditing': IMAGES.audit,
  'vat-auditing': IMAGES.vatServices,
  'corporate-tax-auditing': IMAGES.taxCompliance,
  'forensic-auditing': IMAGES.audit,
  // Corporate
  'company-registration': IMAGES.companyReg,
  'trademark-registration': IMAGES.trademark,
  'business-bank-account': IMAGES.corporate,
  'pro-services': IMAGES.corporate,
  'golden-visa': IMAGES.goldenVisa,
  'company-reconstruction': IMAGES.corporate,
};

// Fallback images for news/resource categories
export const CATEGORY_IMAGES = {
  'vat': IMAGES.taxCompliance,
  'corporate-tax': IMAGES.taxCompliance,
  'excise-tax': IMAGES.vatServices,
  'tax': IMAGES.taxCompliance,
  'accounting': IMAGES.accounting,
  'golden-visa': IMAGES.goldenVisa,
  'company-registration': IMAGES.companyReg,
  'trademark': IMAGES.trademark,
  'blog': IMAGES.blogDefault,
};

export default IMAGES;
