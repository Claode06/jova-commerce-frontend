## Verification Checklist

- [x] `GET /api/warehouses` returns active warehouses without admin auth
- [x] `POST /api/upload` accepts file upload for authenticated users
- [x] Cart items array renders correctly (not wrapped object)
- [x] User profile loads after page refresh (fetchMe fixed)
- [x] Orders list shows actual orders from API
- [x] Order detail shows items, shipments, payments
- [x] Payment upload: file → upload → get ID → submit proof
- [x] Checkout submits only valid fields to backend
- [x] Product reviews render from API
- [x] Inactive variant cannot be added to cart
- [x] Build passes with 0 errors
