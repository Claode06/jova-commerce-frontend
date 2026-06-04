# Phase 04 — Cart, Checkout, Orders & Payment

## Goal

Users can add items to cart, checkout with shipping info, view order history, see order detail with shipment tracking, and upload payment proof.

## Steps

- [x] Create `composables/useCart.ts` — fetchCart, addItem, updateQuantity, removeItem + computed totalItems, subtotal
- [x] Create `pages/cart.vue` — cart item rows (image, name, variant, price, qty control, subtotal, delete) + summary sidebar
- [x] Create `pages/checkout.vue` — shipping form (name, email, phone, address, note), warehouse select, point redeem toggle, order summary sidebar
- [x] Create `pages/orders.vue` — order list with order number, status badge, date, total
- [x] Create `pages/orders/[id].vue` — order items, shipment tracking timeline, payment info, cost breakdown
- [x] Create `pages/payment/[orderId].vue` — payment accounts list, file upload for proof, submit button
- [x] Create `components/StatusBadge.vue` — order/payment/shipment status labels with color coding
