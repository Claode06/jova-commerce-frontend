# Phase 12 — UX Improvements

## Goal
Fix 7 UX issues: dead links, URL sync, category images, indentation, remember me, toasts.

## Steps

- [x] Step 1: Hide dead link "Lupa kata sandi?" in `login.vue` — removed dead `<a>` tag
- [x] Step 2: Clean up footer dead links in `default.vue` — info links → `<span>`, email/tel → proper `mailto:`/`tel:` hrefs
- [x] Step 3: URL sync for filters — done in Phase 11 Step 7
- [x] Step 4: Render category image if available (`cat.file_storage?.link || cat.image_url`) — fallback to icon
- [x] Step 5: Fix indentation in `profile.vue` form-control third block
- [x] Step 6: Remove non-functional "Remember me" checkbox in `login.vue`
- [x] Step 7: Create `composables/useToast.ts` + renderer in `default.vue` layout
- [x] Step 8: Inject toast into add-to-cart (`products/[slug].vue`), profile save, cart remove
- [x] Step 9: Build test — 0 errors ✅
