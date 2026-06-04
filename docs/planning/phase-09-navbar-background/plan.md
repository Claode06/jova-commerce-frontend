# Phase 09 — Navbar User Menu Fix & Background Refinement

## Goal
Fix navbar user menu not showing after page refresh, and finalize all background/card colors to pure white.

## Steps

- [x] Fix A: Add `fetchMe()` call in `layouts/default.vue onMounted` when token exists
- [x] Fix B: Change template gate from `v-if="user"` to `v-if="isLoggedIn || user"`
- [x] Destructure `isLoggedIn` from `useAuth()` in layout script
- [x] Change layout body background from `bg-gradient-to-b from-base-100 to-base-200` to `bg-white`
- [x] Change navbar from `bg-base-100/80` to `bg-white/80`
- [x] Change footer from `bg-base-100` to `bg-white`
- [x] Change all card `bg-base-100` → `bg-white` across 12 page files
- [x] Change login/register auth pages gradient background to `bg-white`
- [x] Replace all remaining `bg-base-100` with `bg-white` (22 occurrences)
