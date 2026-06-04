## Manual Testing Scenarios

### TC-01: Homepage
1. Open `http://localhost:3000`
2. **Expected:** Hero carousel auto-rotates, category cards visible, product grid shows 8 items

### TC-02: Product Listing
1. Click "Lihat Semua" on homepage
2. **Expected:** Navigate to `/products`, grid shows 12 products, pagination at bottom

### TC-03: Filter by Category
1. On `/products`, click a category radio in sidebar
2. **Expected:** URL updates to `?category=xxx`, products reload, filter badge appears

### TC-04: Search from Navbar
1. Type in navbar search, press Enter
2. **Expected:** Navigate to `/products?search=xxx`, results filtered

### TC-05: Sort Products
1. Change sort dropdown to "Harga Terendah"
2. **Expected:** Products re-sorted by price ascending

### TC-06: Product Detail
1. Click any product card
2. **Expected:** Navigate to `/products/{slug}`
3. Verify: breadcrumb, image, price, variant buttons, description tab
4. Click variant button → button highlights
5. Click +/- → qty changes

### TC-07: Add to Cart (Logged Out)
1. On product detail, select variant, click "Tambah ke Keranjang"
2. **Expected:** Redirected to `/login`

### TC-08: Pagination
1. Go to `/products?per_page=1` to force pagination
2. **Expected:** Page 2 loads different products
