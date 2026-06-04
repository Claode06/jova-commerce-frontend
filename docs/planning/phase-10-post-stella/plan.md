# Phase 10 — Post-Stella Refinements

## Goal
UX improvements: add to cart redirect, orders filter tabs, cart clear after checkout, user info dropdown, transaksi dibayar button, categories padding fix.

## Steps

- [x] Change add to cart redirect from `/products` to `/cart`
- [x] Add filter tabs to orders page: Semua, Menunggu Bayar, Diproses, Selesai, Dibatalkan
- [x] Add support for query param `?tab=paid` in orders page
- [x] Add `clearCart()` function to `useCart` composable
- [x] Call `clearCart()` before `fetchCart()` after successful checkout
- [x] Add user info card in navbar dropdown (avatar, name, email)
- [x] Add "Transaksi Dibayar" button in navbar dropdown → `/orders?tab=paid`
- [x] Fix categories section padding alignment with other sections
- [x] Change product images to square aspect-ratio instead of portrait 3:4
