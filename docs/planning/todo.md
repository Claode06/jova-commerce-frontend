# Jova Mart Frontend — Todo

## Phase 01 — Configuration & Project Structure

- [x] Create AGENTS.md
- [x] Create docs/planning/ (roadmap.md, todo.md, summary.md)
- [x] Install Tailwind v4 + daisyUI 5 + Pinia + Iconify
- [x] Configure nuxt.config.ts (runtimeConfig, PostCSS, modules, meta)
- [x] Create `.env` file
- [x] Create folder structure (layouts/, pages/, composables/, stores/, middleware/)
- [x] Create main.css with Tailwind + daisyUI
- [x] Create base layout (default.vue) with navbar + footer
- [x] Create app.vue with NuxtLayout

## Phase 02 — API Layer & Authentication

- [x] Create composables/useApi.ts
- [x] Create composables/useAuth.ts
- [x] Create middleware/auth.ts and middleware/guest.ts
- [x] Create pages/login.vue
- [x] Create pages/register.vue
- [x] Create pages/profile.vue

## Phase 03 — Catalog & Product Pages

- [x] Create composables/useCatalog.ts
- [x] Create components/ProductCard.vue
- [x] Create pages/index.vue (homepage)
- [x] Create pages/products.vue (listing + filter + pagination)
- [x] Create pages/products/[slug].vue (detail + gallery + variant + reviews)

## Phase 04 — Cart, Checkout, Orders & Payment

- [x] Create composables/useCart.ts
- [x] Create pages/cart.vue
- [x] Create pages/checkout.vue
- [x] Create pages/orders.vue
- [x] Create pages/orders/[id].vue
- [x] Create pages/payment/[orderId].vue
- [x] Create components/StatusBadge.vue

## Phase 05 — Integration & API Alignment Fix

- [x] Add GET /api/warehouses route for customer
- [x] Add POST /api/upload route for customer
- [x] Fix 7 response wrapping bugs (useCart, useAuth, orders/[id], payment)
- [x] Fix payment file upload flow (2-step: upload→ID→submit)
- [x] Fix checkout form (buyer fields, note)
- [x] Fix product detail (reviews, is_active check)
- [x] Fix homepage dead code (flash_sale removed)
- [x] Fix ProductCard (computed minPrice from variants)
- [x] Fix register password minlength
- [x] Remove warehouseId from addItem

## Phase 06 — Soft Cupcake Theme Redesign

- [x] Change daisyUI theme to cupcake
- [x] Navbar glass effect
- [x] Search rounded-full
- [x] Hero soft pastel gradients
- [x] Cards rounded-2xl with borders
- [x] All buttons btn-soft
- [x] All inputs rounded-xl
- [x] Footer responsive (stack vertical mobile, horizontal desktop)
- [x] Footer copyright bar + social icons

## Phase 07 — Auth Redesign & Icon Upgrade

- [x] Redesign login.vue (illustration, input icons, password toggle, divider)
- [x] Redesign register.vue (same treatment)
- [x] Upgrade navbar icons (search w-5, cart w-6, user w-6)
- [x] Upgrade footer social icons (w-5)
- [x] Upgrade empty state icons (products, orders)
- [x] Upgrade error icons (w-5)
- [x] Add leading icons to checkout inputs
- [x] Add leading icons to profile inputs

## Phase 08 — Stella Monochrome Redesign

- [x] Add Google Fonts (Playfair Display + Inter)
- [x] Rewrite main.css (monochrome, black primary, serif base)
- [x] Rewrite layout (solid white navbar, text nav, expandable search)
- [x] Rewrite homepage (85vh hero, horizontal categories, 3-col grid)
- [x] Rewrite ProductCard (portrait 3:4, rounded-3xl, no shadows)
- [x] Rewrite product listing (clean filter, black pagination)
- [x] Rewrite product detail (h-[600px] image, custom tabs, black pills)
- [x] Rewrite login + register (zero gradients, serif, black buttons)
- [x] Rewrite cart (rounded-3xl, gray-50 summary)
- [x] Rewrite checkout (clean form, gray-50 summary)
- [x] Strip all colored classes (text-primary, btn-primary, badge-*)
- [x] Rewrite StatusBadge (monochrome text labels)

## Phase 09 — Navbar Fix & Background Refinement

- [x] Fix A: Call fetchMe() in layout onMounted
- [x] Fix B: Change gate to `isLoggedIn || user`
- [x] Layout body bg-gradient → bg-white
- [x] Navbar bg-base-100/80 → bg-white/80
- [x] Footer bg-base-100 → bg-white
- [x] All cards bg-base-100 → bg-white (22 occurrences)
- [x] Auth pages gradient → bg-white

## Phase 10 — Post-Stella Refinements

- [x] Add to cart redirect to /cart (instead of toast)
- [x] Orders filter tabs: Semua, Menunggu Bayar, Diproses, Selesai, Dibatalkan
- [x] Clear cart immediately after checkout (clearCart function)
- [x] User info card in navbar dropdown (avatar, name, email)
- [x] "Transaksi Dibayar" button → /orders?tab=paid
- [x] Categories section padding aligned with other sections
- [x] Product images changed to square aspect-ratio

## Phase 11 — Critical Bug Fixes

- [x] Create `stores/cart.ts` Pinia store with shared cart state
- [x] Refactor `useCart.ts` to delegate to Pinia store (`storeToRefs` + methods)
- [x] Update `default.vue` — use shared cart state for badge, fetch cart on mount
- [x] Fix `products/index.vue` — add route query watcher + URL sync for filters
- [x] Build passes with 0 errors

## Phase 12 — UX Improvements

- [x] Remove dead link "Lupa kata sandi?" from `login.vue`
- [x] Fix footer dead links in `default.vue` (info → span, email/tel → proper hrefs)
- [x] Render category image in `index.vue` if API provides it (fallback to icon)
- [x] Fix indentation in `profile.vue` form-control third block
- [x] Remove non-functional "Remember me" checkbox from `login.vue`
- [x] Create `composables/useToast.ts` + renderer in layout
- [x] Inject toast into add-to-cart, profile save, cart remove
- [x] Build passes with 0 errors

## Phase 13 — Polish & Consistency

- [x] Rewrite `profile.vue` form (daisyUI → raw Tailwind)
- [x] Fix language inconsistency (english headings → Bahasa Indonesia)
- [x] Create `.env.example` file
- [x] Add loading skeleton for checkout warehouse/points fetch
- [x] Rewrite `payment/[orderId].vue` (remove daisyUI classes → Stella monochrome)
- [x] Build passes with 0 errors

## Phase 14 — QA Bug Fixes

- [x] Fix `default.vue` — replace `@click.outside` with manual `document.addEventListener('click')` + `dropdownRef`
- [x] Fix `default.vue` — fix search `@blur` race condition with `closeSearch()` using `setTimeout(150ms)`
- [x] Fix `useAuth.ts` — add `useCartStore().clearCart()` in `logout()`
- [x] Build passes with 0 errors

## Phase 15 — Amber Gold Accent System

- [x] Add `@theme` accent color tokens in `main.css` (50, 100, 200, 400, 600)
- [x] Update `ProductCard.vue` — rating stars to `text-accent-400`
- [x] Update `index.vue` — "Lihat Semua" hover to accent
- [x] Update `products/index.vue` — filter chips (bg-accent-50), radio (accent-accent-400), pagination active (bg-accent-400), sort focus (border-accent-400)
- [x] Update `products/[slug].vue` — tab underline, variant selected, rating stars to accent
- [x] Update `orders/index.vue` — tab active underline to accent
- [x] Update `default.vue` — social icon footer hover to accent
- [x] Update focus borders on all form pages (login, register, checkout, profile) — `focus:border-accent-400`
- [x] Update `payment/[orderId].vue` — selected account border, upload hover to accent
- [x] Update `StatusBadge.vue` — pill badges with background tinted variants (accent-50/accent-100/gray-100/red-50)
- [x] Build passes with 0 errors

## Phase 16 — Bold Accent: Topbar & Hero

- [x] Add `.text-gradient-accent` utility in `main.css`
- [x] Update `default.vue` — topbar: glassmorphism (`bg-white/90 backdrop-blur-md`), accent border, gradient brand, icon hover accent, cart badge accent, avatar ring, login/register accent, mobile search accent
- [x] Update `index.vue` — hero: accent gradient overlay (`from-accent-600/15 via-transparent to-black`), accent CTA button, text subtitle opacity
- [x] Build passes with 0 errors

## Phase 17 — Stronger Amber Palette

- [x] Updated accent token values in `main.css` @theme block to richer shades
- [x] Build passes with 0 errors

## Phase 18 — Accent Expansion: All Sections

- [x] ProductCard.vue — discount badge to `bg-accent-400`, hover ring `ring-accent-200`
- [x] index.vue — category gradient with `via-accent-600/10`
- [x] products/[slug].vue — gallery thumbnails accent, quantity hover accent, add-to-cart button hover accent
- [x] cart.vue — checkout button hover accent, continue link hover accent, empty icon accent
- [x] checkout.vue — order button hover accent, point checkbox accent
- [x] login.vue — submit button hover accent
- [x] register.vue — submit button hover accent
- [x] profile.vue — submit button hover accent
- [x] payment/[orderId].vue — submit button hover accent
- [x] orders/index.vue — card hover border accent, empty state icon accent, empty CTA hover accent
- [x] products/index.vue — empty search icon accent
- [x] products/[slug].vue — not found icon accent
- [x] Build passes with 0 errors
