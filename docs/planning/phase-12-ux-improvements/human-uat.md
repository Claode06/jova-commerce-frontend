## Manual Testing Scenarios

### TC-01: Toast Notifications
1. Login, go to product detail
2. Add item to cart
3. **Expected:** Toast notification "Item ditambahkan ke keranjang" appears, then redirects to /cart

### TC-02: Filter URL Sync
1. Go to /products
2. Select category "Wanita" filter
3. **Expected:** URL changes to /products?category=wanita
4. Select brand filter
5. **Expected:** URL shows both category and brand params

### TC-03: Category Images
1. Go to homepage
2. **Expected:** Category cards have real images (not placeholder icons) if API provides them
