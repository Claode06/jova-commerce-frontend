## Manual Testing Scenarios

### TC-01: Add to Cart Redirect
1. On product detail page, select variant, click "Tambah ke Keranjang"
2. **Expected:** After API call, redirected to `/cart` page (not stay on product page)

### TC-02: Orders Filter
1. Login with account that has orders, go to `/orders`
2. **Expected:** Tabs show: Semua, Menunggu Bayar, Diproses, Selesai, Dibatalkan
3. Click "Diproses" — only paid/processing/shipped orders shown
4. Click "Menunggu Bayar" — only pending payment orders shown

### TC-03: Transaksi Dibayar
1. From navbar dropdown, click "Transaksi Dibayar"
2. **Expected:** Navigated to `/orders?tab=paid` with "Diproses" tab active

### TC-04: User Info Dropdown
1. Click user avatar in navbar
2. **Expected:** Dropdown shows user avatar initial, name, email at top

### TC-05: Cart Clear After Checkout
1. Add items to cart, proceed to checkout
2. Complete checkout
3. **Expected:** Cart badge immediately shows 0
