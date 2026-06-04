## Manual Testing Scenarios

### TC-01: Homepage Hero
1. Open `http://localhost:3000`
2. **Expected:** Full-bleed black hero with white serif text overlay + "Belanja Sekarang" CTA
3. Categories section scrolls horizontally with large images
4. Product grid shows 6 items in 3 columns with portrait cards

### TC-02: Navbar
1. Verify solid white navbar with border-gray-100
2. Click search icon — search bar expands with animation
3. Verify "Daftar" button is `rounded-full` with black border
4. Verify "Masuk" is text-only gray link

### TC-03: Color Check
1. Navigate to all pages
2. **Expected:** No pink, purple, amber, or teal colors — only black, white, gray
3. All buttons consistent black with white text

### TC-04: Product Detail
1. Click any product
2. **Expected:** Large hero image (h-[600px]), tabs are text-based, variant selectors are rounded-full pills, price in black
