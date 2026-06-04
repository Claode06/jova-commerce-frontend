## Manual Testing Scenarios

### TC-01: Navbar After Refresh
1. Login with valid credentials
2. Refresh browser (F5)
3. **Expected:** Navbar still shows user dropdown with "Pesanan Saya", "Profil", "Keluar" (not "Masuk"/"Daftar")
4. Click "Pesanan Saya" — navigates to orders page

### TC-02: Background Check
1. Navigate to homepage, cart, checkout, products, orders, login, register
2. **Expected:** All pages have pure white background (no cream/gradient)

### TC-03: Logout
1. Click "Keluar" from user dropdown
2. **Expected:** User logged out, navbar shows "Masuk"/"Daftar", redirected to login
