## Verification Checklist

- [x] Add to cart redirects to `/cart` (not toast + stay on page)
- [x] Orders page has filter tabs: Semua, Menunggu Bayar, Diproses, Selesai, Dibatalkan
- [x] "Transaksi Dibayar" link navigates to `/orders?tab=paid` with Diproses tab active
- [x] Navbar dropdown shows user avatar, name, email
- [x] `clearCart()` sets cart to empty array immediately
- [x] Cart badge shows 0 after checkout immediately
- [x] Categories section has same padding as Featured Products section
- [x] ProductCard uses `aspect-square` instead of `aspect-[3/4]`
- [x] Build passes with 0 errors
