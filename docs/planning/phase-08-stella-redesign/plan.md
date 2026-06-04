# Phase 08 — Stella Monochrome Redesign

## Goal
Complete visual redesign from cupcake pastel to minimal editorial Stella aesthetic: monochrome palette, serif + sans typography, portrait product cards, full-bleed hero.

## Steps

- [x] Add Google Fonts (Playfair Display + Inter) to `nuxt.config.ts`
- [x] Rewrite `main.css` — light theme only, no dark, black primary, serif base layer
- [x] Rewrite `layouts/default.vue` — solid white navbar, text-only nav links, expandable search icon, black outline CTA, clean footer
- [x] Rewrite `pages/index.vue` — 85vh full-bleed editorial hero, horizontal scroll categories w/ images, 3-column product grid with gap-6
- [x] Rewrite `components/ProductCard.vue` — portrait aspect-[3/4], rounded-3xl, no shadows, monochrome rating
- [x] Rewrite `pages/products/index.vue` — clean filter sidebar, accent-black radios, rounded-full sort, black pagination
- [x] Rewrite `pages/products/[slug].vue` — large image h-[600px], custom tabs, black variant pills, black add-to-cart
- [x] Rewrite `pages/login.vue` + `register.vue` — zero gradients, serif headings, black buttons, clean forms
- [x] Rewrite `pages/cart.vue` — rounded-3xl cards, bg-gray-50 summary, black checkout button
- [x] Rewrite `pages/checkout.vue` — clean form, bg-gray-50 summary, black submit button
- [x] Strip all `text-primary`, `text-secondary`, `btn-primary`, `btn-secondary`, `badge-*` across all pages
- [x] Rewrite `components/StatusBadge.vue` — monochrome text labels instead of colored badges
