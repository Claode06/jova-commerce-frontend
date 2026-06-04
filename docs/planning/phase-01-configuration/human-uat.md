## Manual Testing Scenarios

### TC-01: Dev Server Startup
1. Run `npm run dev`
2. Open `http://localhost:3000`
3. **Expected:** Homepage loads with daisyUI-styled navbar and footer

### TC-02: Mobile Responsive
1. Open browser DevTools, switch to mobile viewport (375px)
2. **Expected:** Navbar adapts — logo, cart icon, hamburger search visible
3. Click hamburger search button
4. **Expected:** Search input slides down

### TC-03: Production Build
1. Run `npm run build`
2. **Expected:** Exit code 0, no errors, output in `.output/`
