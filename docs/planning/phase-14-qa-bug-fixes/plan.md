# Phase 14 — QA Bug Fixes

## Goal
Fix 3 bugs found during QA review: dropdown click-outside not working, search blur preventing button click, and cart not cleared on logout.

## Steps

- [x] Step 1: Fix `default.vue` — replace `@click.outside` with manual `document.addEventListener('click')` handler, add `dropdownRef`
- [x] Step 2: Fix `default.vue` — fix search `@blur` race condition: replace with `closeSearch()` using `setTimeout(150ms)`
- [x] Step 3: Fix `useAuth.ts` — add `useCartStore().clearCart()` in `logout()`
- [x] Step 4: Create docs (plan.md, verification.md, human-uat.md)
- [x] Step 5: Build test — 0 errors ✅
- [x] Step 6: Update roadmap.md, todo.md, summary.md
