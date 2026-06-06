## Manual Testing Scenarios

### TC-01: Dropdown Click Outside
1. Login as user
2. Click profile icon in navbar → dropdown opens
3. Click anywhere outside the dropdown
4. **Expected:** Dropdown closes

### TC-02: Search Button Click
1. On desktop, click search icon in navbar → search input appears
2. Type a term, click the magnifying glass icon next to the input
3. **Expected:** Search executes and navigates to /products?search=term

### TC-03: Logout Clears Cart
1. Login as user, add items to cart
2. Logout
3. Login as a different user
4. **Expected:** Cart is empty (no stale items from previous user)
