# Security Audit Report

**Project**: Sage Tax Consultancy (Next.js 14 Web Application)
**Date**: 2026-04-18
**Auditor**: Claude (AI-assisted security audit)

## Executive Summary

12 security issues were identified across 5 severity levels. The most critical finding is a placeholder revalidation secret that would allow unauthenticated cache purging. Multiple API endpoints had overly permissive CORS policies (`Access-Control-Allow-Origin: *`), and the application was missing essential HTTP security headers (HSTS, CSP, Permissions-Policy). All fixable issues have been remediated in code. One issue (credential rotation) requires manual action by the project owner.

---

## High

### [VULN-001] Wildcard CORS on All API OPTIONS Handlers
- **CWE**: CWE-942 (Overly Permissive Cross-domain Whitelist)
- **CVSS Score**: 7.5
- **Location**: `app/api/contact/route.js:161`, `app/api/revalidate/route.js:84`, `app/api/news/route.js:138`
- **Description**: All three API endpoints returned `Access-Control-Allow-Origin: *` in their OPTIONS preflight responses. This allows any website to make cross-origin requests to these endpoints, which is especially dangerous for the contact form (spam/abuse) and revalidation endpoint (cache manipulation).
- **Proof of Concept**: An attacker could embed a form on any malicious site that POSTs to `/api/contact` or `/api/revalidate`, bypassing same-origin protections.
- **Remediation**: Restricted CORS origin to `process.env.NEXT_PUBLIC_SITE_URL` (defaults to `https://sageconsultancy.ae`).
- **Status**: ✅ Fixed

### [VULN-002] Placeholder Revalidation Secret Accepted
- **CWE**: CWE-798 (Use of Hard-Coded Credentials)
- **CVSS Score**: 7.3
- **Location**: `app/api/revalidate/route.js:7-8`, `.env.local:33`
- **Description**: The `REVALIDATE_SECRET` environment variable is set to the literal placeholder `your-random-secret-string-here`. Anyone who guesses or discovers this (it's visible in the `.env.local.example` pattern) can purge the application cache at will, causing performance degradation or serving stale content.
- **Proof of Concept**: `curl -X POST https://sageconsultancy.ae/api/revalidate -H "x-revalidate-secret: your-random-secret-string-here" -H "Content-Type: application/json" -d '{"paths":["/"]}' `
- **Remediation**: Added a check that rejects requests when the secret is unconfigured or matches the placeholder string. Returns 503 instead of accepting.
- **Status**: ✅ Fixed (endpoint now blocked until a real secret is set)

### [VULN-003] Missing Critical Security Headers
- **CWE**: CWE-693 (Protection Mechanism Failure)
- **CVSS Score**: 7.0
- **Location**: `next.config.js:12-23`
- **Description**: The application was missing three critical HTTP security headers: `Strict-Transport-Security` (HSTS) to enforce HTTPS, `Content-Security-Policy` (CSP) to mitigate XSS, and `Permissions-Policy` to restrict browser API access. While `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy` were present, the missing headers leave the site vulnerable to downgrade attacks, script injection, and feature abuse.
- **Remediation**: Added HSTS with 2-year max-age and preload, a restrictive CSP allowing only self/GA/Supabase origins, and a Permissions-Policy blocking camera/mic/geolocation/FLoC.
- **Status**: ✅ Fixed

---

## Medium

### [VULN-004] Admin Routes Lack Server-Side Authentication
- **CWE**: CWE-306 (Missing Authentication for Critical Function)
- **CVSS Score**: 6.5
- **Location**: `middleware.js:10-12`, `app/admin/` (all pages)
- **Description**: The Next.js middleware explicitly excludes `/admin` routes from processing (`matcher: ['/((?!api|_next|_vercel|admin|assets|.*\\..*).*)']`). Admin authentication is handled entirely client-side via Supabase `onAuthStateChange`. This means the server-rendered HTML for admin pages is sent to any requester before the client-side auth check redirects unauthenticated users. While the data itself is protected by Supabase RLS, the admin UI structure and JavaScript are exposed.
- **Remediation**: Recommend adding server-side auth middleware for `/admin` routes. This requires architectural changes (server-side Supabase session verification) and should be implemented manually.
- **Status**: ⚠️ Requires manual implementation

### [VULN-005] Script Injection via dangerouslySetInnerHTML
- **CWE**: CWE-79 (Cross-Site Scripting)
- **CVSS Score**: 5.3
- **Location**: `app/[locale]/layout.js:117-122, 124-130`
- **Description**: The GA tracking script and the lang/dir setter both use `dangerouslySetInnerHTML` with template literal interpolation of environment variables and URL-derived locale values. While `NEXT_PUBLIC_GA_ID` is a build-time env var (limiting runtime exploitation), a malicious value could inject arbitrary JavaScript. The `locale` parameter comes from the URL path and is validated against a whitelist in the layout, but the raw string interpolation into a script context using single quotes could be exploited if the validation were ever loosened.
- **Remediation**: Added regex validation (`/^G-[A-Z0-9]+$/i`) on GA ID before rendering. Changed locale/dir injection to use `JSON.stringify()` for proper escaping.
- **Status**: ✅ Fixed

### [VULN-006] Unrestricted Revalidation Path/Tag Inputs
- **CWE**: CWE-20 (Improper Input Validation)
- **CVSS Score**: 4.7
- **Location**: `app/api/revalidate/route.js:30-55`
- **Description**: The revalidation endpoint accepted unlimited arrays of paths and tags with minimal validation. An authenticated attacker could send thousands of revalidation requests in a single call, causing a denial-of-service on the caching layer. Paths were not validated for format, and tags accepted any string.
- **Remediation**: Added a maximum of 20 items per request, path validation (must start with `/`, no `..` traversal), and tag validation (alphanumeric, hyphens, underscores only).
- **Status**: ✅ Fixed

### [VULN-007] News API Category Parameter Not Validated
- **CWE**: CWE-20 (Improper Input Validation)
- **CVSS Score**: 4.3
- **Location**: `app/api/news/route.js:64`
- **Description**: The `category` query parameter was passed through without validation. While it's only used for client-side array filtering (not SQL), accepting arbitrary strings could cause unexpected behavior and the unvalidated parameter flows into the cached response object.
- **Remediation**: Added an allowlist of valid category values. Invalid categories are silently ignored.
- **Status**: ✅ Fixed

---

## Low

### [VULN-008] Blog Admin Page Spread Operator Bug
- **CWE**: CWE-471 (Modification of Assumed-Immutable Data)
- **CVSS Score**: 3.5
- **Location**: `app/admin/blog/page.js:90`
- **Description**: The `handleEditChange` function was using `prev,` instead of `...prev,` in the state updater. This caused all existing edit state to be overwritten when any field was changed, resulting in data loss during editing. While not a security vulnerability per se, it causes data integrity issues in the CMS.
- **Proof of Concept**: Edit title of a blog post, then edit the body — the title change is lost.
- **Remediation**: Added the missing spread operator (`...prev`).
- **Status**: ✅ Fixed

### [VULN-009] IP Address and User-Agent Stored in Contact Submissions
- **CWE**: CWE-359 (Exposure of Private Personal Information)
- **CVSS Score**: 3.1
- **Location**: `app/api/contact/route.js:125-126`
- **Description**: The contact form stores the submitter's IP address and full User-Agent string in the database. While useful for abuse prevention, this constitutes PII storage that may have implications under UAE data protection law (Federal Decree-Law No. 45 of 2021). There is no visible privacy notice or consent mechanism.
- **Remediation**: Consider adding a privacy notice to the contact form mentioning data collection practices. Implement data retention policies to purge IP addresses after a reasonable period.
- **Status**: ⚠️ Informational — requires policy decision

---

## Informational

### [VULN-010] In-Memory Rate Limiting Resets on Deployment
- **Location**: `app/api/contact/route.js:4-6`
- **Description**: Rate limiting uses an in-memory `Map`, which resets on every server restart or new deployment. In a serverless environment (Vercel), each function instance has its own memory, making the rate limiter ineffective across instances. Consider using a Redis-backed or edge-based rate limiter for production.

### [VULN-011] Service Role Key Used in API Routes
- **Location**: `app/api/contact/route.js:103`, `app/api/news/route.js:15`
- **Description**: API routes use `SUPABASE_SERVICE_ROLE_KEY` which bypasses Row-Level Security. This is necessary for server-side operations but means any vulnerability in these endpoints could lead to full database access. Ensure these routes are thoroughly hardened (rate limited, input validated) since they operate with elevated privileges.

### [VULN-012] Referrer-Policy Upgraded
- **Location**: `next.config.js`
- **Description**: Changed `Referrer-Policy` from `origin-when-cross-origin` to `strict-origin-when-cross-origin` for better privacy — this prevents sending referrer information over downgraded (HTTPS→HTTP) connections.

---

## Dependency Audit

| Package | Current | Latest Stable | Risk |
|---------|---------|---------------|------|
| next | ^14.2.15 | 14.2.35+ | ⚠️ Update recommended — CVE-2025-29927 (middleware bypass) patched in 14.2.25 |
| @supabase/supabase-js | ^2.45.0 | 2.49+ | Low — no known critical CVEs |
| react | ^18.3.1 | 18.3.1 | ✅ Current |
| next-intl | ^3.20.0 | 3.25+ | Low — no known CVEs |
| lucide-react | ^0.446.0 | 0.470+ | ✅ UI only, low risk |

**Recommendation**: Run `npm update next` to ensure you're on the latest 14.2.x patch with all security fixes.

---

## Action Items for Project Owner

1. **Generate a real revalidation secret** — run `openssl rand -hex 32` and set it as `REVALIDATE_SECRET` in both `.env.local` and your Vercel environment variables
2. **Rotate Supabase credentials** if they were ever committed to git history (check with `git log --all --oneline -- .env.local`)
3. **Update Next.js** to latest 14.2.x patch: `npm install next@14.2.35`
4. **Add server-side admin auth middleware** to protect `/admin` routes at the server level
5. **Add a privacy notice** to the contact form regarding IP/user-agent collection
6. **Consider Redis-based rate limiting** for production scale
