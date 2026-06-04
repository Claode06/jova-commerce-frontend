# Phase 02 — API Layer & Authentication

## Goal

Users can register, login, manage profile, and authenticated pages are protected.

## Steps

- [x] Create `composables/useApi.ts` — `$fetch` wrapper with baseURL, Bearer token, 401 auto-redirect
- [x] Create `composables/useAuth.ts` — login, register, logout, fetchMe, updateProfile, token via `useCookie`
- [x] Create `middleware/auth.ts` — redirect guest to `/login`
- [x] Create `middleware/guest.ts` — redirect authenticated to `/`
- [x] Create `pages/login.vue` — login form (email + password) with error handling
- [x] Create `pages/register.vue` — register form (name, email, phone, password)
- [x] Create `pages/profile.vue` — edit profile form (name, email, phone)
