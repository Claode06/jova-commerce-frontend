## Manual Testing Scenarios

### TC-01: Payment Upload Flow
1. Login, create order via checkout
2. Go to payment page `/payment/{orderId}`
3. Select payment account, upload image file
4. Click "Kirim Pembayaran"
5. **Expected:** File uploads, payment submits, redirected to order detail

### TC-02: Order List
1. Login with account that has orders
2. Go to `/orders`
3. **Expected:** List renders with order numbers, status badges, dates, totals

### TC-03: Product Reviews
1. Go to product detail of a product with reviews
2. Click "Ulasan" tab
3. **Expected:** Reviews show with user name, rating, comment
