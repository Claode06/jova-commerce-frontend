# Phase 01 — Configuration & Project Structure

## Goal

Project scaffold, Tailwind + daisyUI installed, AGENTS.md & planning docs created.

## Steps

- [x] Install dependencies: `npm install tailwindcss @tailwindcss/postcss daisyui @pinia/nuxt @nuxt/icon`
- [x] Create `nuxt.config.ts` — runtimeConfig, PostCSS plugins, modules, app head
- [x] Create `.env` — `NUXT_PUBLIC_API_BASE`, `NUXT_PUBLIC_APP_NAME`
- [x] Create `app/assets/css/main.css` — `@import "tailwindcss"` + `@plugin "daisyui"`
- [x] Create folder structure: `layouts/`, `pages/`, `composables/`, `stores/`, `middleware/`, `components/`
- [x] Create `app/app.vue` — `<NuxtLayout>` + `<NuxtPage>`
- [x] Create `app/layouts/default.vue` — sticky navbar (logo, search, cart icon, auth buttons) + footer
