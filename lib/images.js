/**
 * Centralized stock image URLs from Unsplash (free to use).
 * Replace these with your own hosted images over time.
 * 
 * Unsplash License: https://unsplash.com/license
 * Free to use for commercial and non-commercial purposes.
 */

const IMAGES = {
  // Hero section - Dubai skyline at dusk
  hero: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80&auto=format&fit=crop',

  // About section - modern office/team
  aboutTeam: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop',
  aboutOffice: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',

  // Leadership placeholders - professional headshots
  leaderMale: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop&crop=face',
  leaderFemale: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop&crop=face',

  // Services
  taxCompliance: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop',
  accounting: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop',
  corporate: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format&fit=crop',
  vatServices: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&q=80&auto=format&fit=crop',
  audit: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80&auto=format&fit=crop',
  bookkeeping: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
  companyReg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&q=80&auto=format&fit=crop',
  goldenVisa: 'https://images.unsplash.com/photo-1582407947092-87836d041ef5?w=800&q=80&auto=format&fit=crop',
  trademark: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80&auto=format&fit=crop',

  // Contact section - Dubai business district
  contact: 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&q=80&auto=format&fit=crop',

  // Blog/News fallback
  blogDefault: 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&q=80&auto=format&fit=crop',

  // CTA / general backgrounds
  dubaiBusiness: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1200&q=80&auto=format&fit=crop',
  dubaiAerial: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80&auto=format&fit=crop',

  // Testimonials background
  testimonials: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop',
};

// Map service slugs to images
export const SERVICE_IMAGES = {
  'vat': IMAGES.taxCompliance,
  'corporate-tax': IMAGES.taxCompliance,
  'excise-tax': IMAGES.taxCompliance,
  'accounting-services': IMAGES.accounting,
  'bookkeeping-services': IMAGES.bookkeeping,
  'internal-auditing': IMAGES.audit,
  'external-auditing': IMAGES.audit,
  'statutory-auditing': IMAGES.audit,
  'vat-auditing': IMAGES.vatServices,
  'corporate-tax-auditing': IMAGES.audit,
  'forensic-auditing': IMAGES.audit,
  'company-registration': IMAGES.companyReg,
  'trademark-registration': IMAGES.trademark,
  'business-bank-account': IMAGES.corporate,
  'pro-services': IMAGES.corporate,
  'golden-visa': IMAGES.goldenVisa,
  'company-reconstruction': IMAGES.corporate,
};

export default IMAGES;
