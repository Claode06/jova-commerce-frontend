## Manual Testing Scenarios

### TC-01: Add to Cart
1. Login, go to product detail, select variant
2. Click "Tambah ke Keranjang"
3. **Expected:** Toast notification "Ditambahkan ke keranjang!", cart badge updates count

### TC-02: Cart Management
1. Go to `/cart`
2. Change qty using +/- buttons
3. **Expected:** Subtotal updates in real-time per item and total
4. Click "Hapus" → confirm dialog → item removed

### TC-03: Checkout Flow
1. From cart, click "Lanjut Checkout"
2. Fill in shipping address form
3. Optional: toggle point redeem
4. Click "Buat Pesanan"
5. **Expected:** Redirected to `/orders/{id}` with order detail

### TC-04: Order Detail
1. From `/orders`, click any order
2. **Expected:** Shows order number, status badge, item list, shipment tracking timeline, payment section, cost breakdown

### TC-05: Payment Upload
1. From order detail, click "Bayar Sekarang" or "Upload Bukti Bayar"
2. Select a payment account (radio)
3. Click upload area → select image file
4. **Expected:** Preview shows uploaded image
5. Click "Kirim Pembayaran"
6. **Expected:** Redirected to order detail, payment status updates

### TC-06: Empty States
1. Logout, go to `/cart` → redirected to login
2. Login with new account, go to `/orders` → "Belum ada pesanan" with CTA
