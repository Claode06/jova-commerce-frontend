# Phase 11 — Critical Bug Fixes

## Goal
Fix 3 critical bugs that break core functionality: cart state sharing, profile error display, and product search/filter URL sync.

## Steps

- [x] Step 1: Create `stores/cart.ts` Pinia store with shared cart state
- [x] Step 2: Refactor `useCart.ts` to delegate to Pinia store (`storeToRefs` + methods)
- [x] Step 3: Update `default.vue` — use `totalItems` from shared store, fetch cart on mount
- [x] Step 4: Update `cart.vue`, `checkout.vue`, `products/[slug].vue` — no change needed (useCart auto-uses store)
- [x] Step 5: Fix `products/index.vue` — add `watch(() => route.query)`, `syncUrl()`, `router.replace` in filter methods
- [x] Step 6: Build test — 0 errors ✅
