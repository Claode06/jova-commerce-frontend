## Manual Testing Scenarios

### TC-01: Register Flow
1. Navigate to `/register`
2. Fill in name, email, phone, password (min 8 chars)
3. Click "Daftar"
4. **Expected:** Redirected to homepage, navbar shows user name + dropdown

### TC-02: Login Flow
1. Navigate to `/login`
2. Enter registered email + correct password
3. Click "Masuk"
4. **Expected:** Redirected to homepage, navbar shows user name

### TC-03: Failed Login
1. Enter wrong email/password
2. **Expected:** Error alert displayed, no redirect

### TC-04: Auth Guard
1. While logged out, navigate to `/profile`
2. **Expected:** Redirected to `/login`

### TC-05: Guest Guard
1. While logged in, navigate to `/login`
2. **Expected:** Redirected to `/`

### TC-06: Update Profile
1. Login, go to `/profile`
2. Change name, click "Simpan Perubahan"
3. **Expected:** Success toast, navbar updates with new name
