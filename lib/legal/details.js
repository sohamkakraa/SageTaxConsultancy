import { SITE_HOST } from '@/lib/site';

/** Company particulars for legal pages, taken from the CMS content tree. */
export function legalDetails(c) {
  const l = c.site.legal;
  return {
    company: l.companyName,
    licenseNumber: String(l.licenseNumber || '').trim(),
    authority: l.licensingAuthority,
    address: l.registeredAddress,
    privacyEmail: l.privacyEmail || c.site.contact.email,
    email: c.site.contact.email,
    phone: c.site.contact.phone,
    site: SITE_HOST,
  };
}
