# React (CRA) → Next.js App Router Migration Report

**Project:** `frontend/` only  
**Date:** June 4, 2026  
**Next.js version:** 15.5.x (App Router)  
**Status:** Build successful (`npm run build`)

---

## Summary

The Create React App (`react-scripts`) frontend was migrated to **Next.js 15 App Router** while preserving UI, API integrations, authentication, routing URLs, and business logic. The `backend/` and `admin/` folders were **not modified**.

---

## Files Migrated / Created

### New infrastructure

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js config, `terms&conditions` rewrite, image settings |
| `jsconfig.json` | `@/*` path alias to `src/*` |
| `.eslintrc.json` | `eslint-config-next` (relaxed rules matching CRA tolerance) |
| `.env.local` | `NEXT_PUBLIC_*` environment variables |
| `src/app/layout.js` | Root layout, fonts, Google Analytics, global metadata |
| `src/app/AppShell.js` | App shell (loader, scroll-to-top, zoom prevention) |
| `src/context/AuthContext.js` | Auth state (`localStorage` token) |
| `src/components/PageMeta.js` | Client SEO meta (replaces `react-helmet`) |
| `src/components/ProtectedRoute.js` | Protected route guard (client redirect) |
| `scripts/generate-pages.js` | App Router page generator |

### App Router pages (`src/app/**/page.js`)

All routes from `src/App.js` were mapped to individual `page.js` files (27 routes + catch-all).

### Components preserved (`src/components/`)

All existing components, CSS, and assets under `src/components/` and `src/assets/` were kept. Navigation and SEO imports were updated in place.

### Utilities & API (unchanged logic)

| Path | Notes |
|------|-------|
| `src/api/axios.js` | Uses `NEXT_PUBLIC_API_URL` (falls back to `REACT_APP_API_URL`) |
| `src/utils/storage.js` | Unchanged |

### Public assets

`public/` retained: `robots.txt`, `sitemap.xml`, `manifest.json`, `_redirects`, favicons, logos.

---

## Files Removed

| File | Reason |
|------|--------|
| `src/App.js` | Replaced by App Router + `AppShell` |
| `src/index.js` | Replaced by `src/app/layout.js` |
| `src/ProtectedRoute.js` | Moved to `src/components/ProtectedRoute.js` |
| `public/index.html` | CRA template (Next.js generates HTML) |
| `scripts/prerender.js` | CRA `react-snap` postbuild (replaced by Next.js SSG/SSR) |

---

## Routing Changes

| CRA (React Router) | Next.js App Router | URL preserved |
|--------------------|--------------------|---------------|
| `/` | `src/app/page.js` | Yes |
| `/exchange` | `src/app/exchange/page.js` | Yes |
| `/about-us` | `src/app/about-us/page.js` | Yes |
| `/contact-us` | `src/app/contact-us/page.js` | Yes |
| `/disclaimer` | `src/app/disclaimer/page.js` | Yes |
| `/refund-policy` | `src/app/refund-policy/page.js` | Yes |
| `/privacy-policy` | `src/app/privacy-policy/page.js` | Yes |
| `/terms&conditions` | Rewrite → `src/app/terms-conditions/page.js` | Yes (via `next.config.js` rewrite) |
| `/profile` | `src/app/profile/page.js` | Yes |
| `/login` | `src/app/login/page.js` | Yes |
| `/sell-usdt` | `src/app/sell-usdt/page.js` | Yes |
| `/add-bank-account` | `src/app/add-bank-account/page.js` | Yes |
| `/bank-card/list` | `src/app/bank-card/list/page.js` | Yes |
| `/exchange/list` | `src/app/exchange/list/page.js` | Yes |
| `/transaction-details` | `src/app/transaction-details/page.js` | Yes |
| `/deposit-usdt` | `src/app/deposit-usdt/page.js` | Yes |
| `/deposit/list` | `src/app/deposit/list/page.js` | Yes |
| `/recharge/detail` | `src/app/recharge/detail/page.js` | Yes |
| `/withdraw-usdt` | `src/app/withdraw-usdt/page.js` | Yes |
| `/withdraw-history` | `src/app/withdraw-history/page.js` | Yes |
| `/withdraw/bankCard/list` | `src/app/withdraw/bankCard/list/page.js` | Yes |
| `/withdraw/bind/bankCard` | `src/app/withdraw/bind/bankCard/page.js` | Yes |
| `/reset-transaction-password` | `src/app/reset-transaction-password/page.js` | Yes |
| `/setting` | `src/app/setting/page.js` | Yes |
| `/invite` | `src/app/invite/page.js` | Yes |
| `/referrel` | `src/app/referrel/page.js` | Yes |
| `/*` (fallback) | `src/app/[...slug]/page.js` → `<Home />` | Yes |

### React Router → Next.js API mapping

| React Router | Next.js |
|--------------|---------|
| `useNavigate()` | `useRouter()` + `router.push()` / `router.back()` |
| `<Link to="...">` | `<Link href="...">` from `next/link` |
| `<NavLink>` | Custom `FooterLink` with `usePathname()` |
| `useLocation()` | `usePathname()` |
| `useSearchParams()` | `useSearchParams()` from `next/navigation` (with `<Suspense>` on pages) |
| `<Navigate to="...">` | `router.replace()` in `ProtectedRoute` |
| `<Helmet>` | `PageMeta` client component + root `metadata` export |

---

## Dependencies

### Added

- `next` (^15.1.7)
- `eslint-config-next` (^15.1.7)

### Removed

- `react-scripts`
- `react-router-dom`
- `react-helmet`
- `react-snap`
- `@testing-library/*` (removed from package.json; test files remain in repo)
- `web-vitals`, `baseline-browser-mapping`

### Kept

- `react`, `react-dom` (^18.3.1)
- `axios`, `qrcode.react`
- `@fontsource/manrope`, `@fontsource/outfit`
- `sitemap` (devDependency, for `npm run build:sitemap`)

---

## Environment Variables

| CRA | Next.js |
|-----|---------|
| `REACT_APP_API_URL` | `NEXT_PUBLIC_API_URL` |
| `REACT_APP_BASE_URL` | `NEXT_PUBLIC_BASE_URL` |

Configure in `.env.local` (or deployment platform). The axios layer still accepts legacy `REACT_APP_*` names as fallback.

---

## Manual Steps Required

1. **Install & run locally**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   App runs at `http://localhost:3000` (default Next.js port; was CRA `:3000` as well).

2. **Production**
   ```bash
   npm run build
   npm start
   ```

3. **Deployment env vars**  
   Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_BASE_URL` on Vercel/Netlify/your host.

4. **Netlify `_redirects`**  
   The file `public/_redirects` was kept for compatibility. For Next.js on Netlify, use the [Next.js runtime plugin](https://docs.netlify.com/frameworks/next-js/overview/) instead of SPA fallback rules.

5. **Sitemap**  
   Run `npm run build:sitemap` to regenerate `public/sitemap.xml` when routes change.

6. **Remove duplicate lockfile warning** (optional)  
   If you see a workspace root warning, ensure deploy builds from `frontend/` directory only.

7. **Verify auth flows**  
   Test login, protected routes, OTP, payments, and 401 logout redirect against your backend at `NEXT_PUBLIC_API_URL`.

8. **Terms URL**  
   Links should continue using `/terms&conditions`. Internal route is `/terms-conditions` with a rewrite in `next.config.js`.

---

## SEO

- **Before:** `react-helmet` + `react-snap` prerender on build (skipped on Vercel).
- **After:** Next.js static generation for public pages + `PageMeta` for per-page title/description/keywords/canonical at runtime. Root metadata in `layout.js`.

---

## Build Verification

```
npm run build  →  ✓ Compiled successfully
29 routes generated
```

ESLint: only pre-existing hook/a11y **warnings** remain (non-blocking). Rules aligned with CRA-era content pages.

---

## Images (Next.js)

Static imports (`import x from "../assets/foo.png"`) resolve to `{ src, width, height }` in Next.js, not a string URL like CRA. Using them in `<img src={x}>` produced `[object Object]` and broken images.

**Fix applied:**
- `src/utils/image.js` — `getImageSrc()` helper
- `src/components/AppImage.js` — wraps `next/image` for static imports; native `<img>` for string URLs
- All component `<img>` tags migrated to `<AppImage>`
- CSS `backgroundImage` inline styles use `getImageSrc()` where needed

---

## Not Changed

- `backend/` — untouched  
- `admin/` — untouched  
- API request/response shapes, headers (`x-platform`, `Authorization`), interceptors  
- Component UI/CSS structure (except required router/SEO import updates)
