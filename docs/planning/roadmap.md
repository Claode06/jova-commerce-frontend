# Jova Mart Frontend — Roadmap

## Stack

- **Frontend:** Nuxt 4, Vue 3, Pinia, daisyUI 5, Tailwind CSS v4
- **Backend:** Laravel 12 API (Sanctum auth), MySQL

## Overview

Customer-facing e-commerce frontend yang mengonsumsi API jova-mart-backend. Meliputi katalog produk, cart, checkout, order, payment, dan tracking pengiriman.

---

## Milestones

### Phase 01 — Configuration & Project Structure     [x] DONE

**Goal:** Project scaffold, Tailwind + daisyUI installed, AGENTS.md & planning docs created.

### Phase 02 — API Layer & Authentication              [x] DONE

**Goal:** Users can register, login, manage profile.

### Phase 03 — Catalog & Product Pages                  [x] DONE

**Goal:** Browse products, filter by category/brand/gender, search, sort, view detail.

### Phase 04 — Cart, Checkout, Orders & Payment         [x] DONE

**Goal:** Users can add to cart, checkout, view orders, pay with proof upload.

### Phase 05 — Integration & API Alignment Fix         [x] DONE

**Goal:** Fix 17 critical/high bugs between frontend and real backend API responses.

### Phase 06 — Soft Cupcake Theme Redesign             [x] DONE

**Goal:** Change visual theme from indigo corporate to soft cupcake pastel.

### Phase 07 — Auth Redesign & Icon Upgrade            [x] DONE

**Goal:** Redesign login/register with illustrations, leading icons, password toggle. Upgrade icons across all pages.

### Phase 08 — Stella Monochrome Redesign              [x] DONE

**Goal:** Complete redesign to minimal editorial monochrome Stella aesthetic.

### Phase 09 — Navbar Fix & Background Refinement      [x] DONE

**Goal:** Fix navbar user menu after refresh, finalize pure white backgrounds.

### Phase 10 — Post-Stella Refinements                [x] DONE

**Goal:** Add to cart redirect to /cart, orders filter tabs, cart clear after checkout, user info dropdown, transaksi dibayar button, categories padding fix.

### Phase 11 — Critical Bug Fixes                     [x] DONE

**Goal:** Fix 3 critical bugs: shared cart state (Pinia store), profile error display, product search/filter URL sync.

### Phase 12 — UX Improvements                        [x] DONE

**Goal:** Fix 7 UX issues: dead links, category images, form indentation, remember me, toast notifications, filter URL sync.

### Phase 13 — Polish & Consistency                   [x] DONE

**Goal:** Fix 5 polish issues: form style consistency, language consistency, env example, checkout loading, payment page styling.

### Phase 14 — QA Bug Fixes                           [x] DONE

**Goal:** Fix 3 bugs found during QA: dropdown click-outside, search blur race condition, cart not cleared on logout.

### Phase 15 — Amber Gold Accent System                [x] DONE

**Goal:** Introduce amber gold (#D4A574) as a secondary accent color across the UI — ratings, filter chips, tabs, pagination, badges, form focus borders — while preserving the monochrome Stella foundation.

### Phase 16 — Bold Accent: Topbar & Hero               [x] DONE

**Goal:** Strengthen the amber gold accent on the topbar (glassmorphism header, gradient brand, accent icons/badge/buttons) and hero section (gradient overlay, accent CTA button).

### Phase 17 — Stronger Amber Palette                  [x] DONE

**Goal:** Replace accent palette with richer, more saturated golden amber shades for stronger visual impact while maintaining elegance.

### Phase 18 — Accent Expansion: All Sections            [x] DONE

**Goal:** Apply amber gold accent to all remaining sections — discount badges, CTA button hovers, gallery thumbnails, empty state icons, order cards, category overlays, quantity controls, and decorative elements.

---

## Dependency Graph

```
01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10
```

---

## Phase Status Summary

| Phase | Name | Status |
|:-----:|------|:------:|
| 01 | Configuration & Project Structure | ✅ DONE |
| 02 | API Layer & Authentication | ✅ DONE |
| 03 | Catalog & Product Pages | ✅ DONE |
| 04 | Cart, Checkout, Orders & Payment | ✅ DONE |
| 05 | Integration & API Alignment Fix | ✅ DONE |
| 06 | Soft Cupcake Theme Redesign | ✅ DONE |
| 07 | Auth Redesign & Icon Upgrade | ✅ DONE |
| 08 | Stella Monochrome Redesign | ✅ DONE |
| 09 | Navbar Fix & Background Refinement | ✅ DONE |
| 10 | Post-Stella Refinements | ✅ DONE |
| 11 | Critical Bug Fixes | ✅ DONE |
| 12 | UX Improvements | ✅ DONE |
| 13 | Polish & Consistency | ✅ DONE |
| 14 | QA Bug Fixes | ✅ DONE |
| 15 | Amber Gold Accent System | ✅ DONE |
| 16 | Bold Accent: Topbar & Hero | ✅ DONE |
| 17 | Stronger Amber Palette | ✅ DONE |
| 18 | Accent Expansion: All Sections | ✅ DONE |
