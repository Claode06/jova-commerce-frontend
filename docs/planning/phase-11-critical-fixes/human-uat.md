## Manual Testing Scenarios

### TC-01: Cart Badge Consistency
1. Login as user
2. Go to product detail page
3. Select a variant, click "Tambah ke Keranjang"
4. **Expected:** Redirected to /cart, navbar badge shows correct item count
5. Navigate to homepage (click "Jova Mart" logo)
6. **Expected:** Badge still shows correct count

### TC-02: Profile Error Display
1. Login as user, go to /profile
2. Submit form with invalid data (e.g. empty name)
3. **Expected:** Red error alert appears with error message

### TC-03: Product Search & Filter
1. Go to /products
2. Type search term in navbar search, press Enter
3. **Expected:** Products page reloads with search results
4. Select a category filter
5. **Expected:** URL updates with category query parameter
6. Copy URL and open in new tab
7. **Expected:** Same filtered results load
