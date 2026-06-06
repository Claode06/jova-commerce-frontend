# Phase 13 — Polish & Consistency

## Goal
Fix 5 polish issues: form consistency, language consistency, env example, checkout loading, payment page styling.

## Steps

- [x] Step 1: Rewrite `profile.vue` form — daisyUI `form-control`/`label`/`label-text` → raw Tailwind (consistent with login/register)
- [x] Step 2: Fix language — `login.vue` "Welcome Back" → "Selamat Datang", `register.vue` "Create Account" → "Buat Akun"
- [x] Step 3: Create `.env.example` with `NUXT_PUBLIC_API_BASE` and `NUXT_PUBLIC_APP_NAME` documentation
- [x] Step 4: Add loading skeleton for warehouse & points fetch in `checkout.vue`
- [x] Step 5: Rewrite `payment/[orderId].vue` — remove all daisyUI classes (`card`, `btn`, `btn-soft`, `btn-primary`, `alert`, `radio`, shadow, `text-primary`) → raw Tailwind Stella monochrome
- [x] Step 6: Build test — 0 errors ✅
