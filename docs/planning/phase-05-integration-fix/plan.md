# Phase 05 — Integration & API Alignment Fix

## Goal
Fix all 17 critical/high bugs found in gap analysis between frontend and backend API.

## Steps

- [x] Add `GET /api/warehouses` route for customer (non-admin)
- [x] Add `POST /api/upload` route for customer (auth:sanctum)
- [x] Create `listActive()` method in WarehouseController
- [x] Fix response wrapping in `useCart.ts fetchCart` — `data.value?.carts`
- [x] Fix response wrapping in `useAuth.ts fetchMe` — `data.value?.user`
- [x] Fix response wrapping in `useAuth.ts updateProfile`
- [x] Fix response wrapping in `orders.vue` — `data.value?.orders`
- [x] Fix response wrapping in `orders/[id].vue` — `data.value?.order`
- [x] Fix response wrapping in `payment/[orderId].vue` — order + accounts
- [x] Fix `payment/[orderId].vue` — 2-step upload flow (file → ID → submit)
- [x] Fix `payment/[orderId].vue` — add `amount` field
- [x] Fix `checkout.vue` — remove buyer fields, add `note`, fix warehouse/points parsing
- [x] Fix `products/[slug].vue` — fetch reviews API, canAddToCart is_active check
- [x] Fix `index.vue` — remove flash_sale dead code, fix sort link
- [x] Fix `components/ProductCard.vue` — computed minPrice from variants
- [x] Fix `register.vue` — align min password (8→6)
- [x] Fix `useCart.ts` — remove warehouseId from addItem()
