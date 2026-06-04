## Verification Checklist

- [x] Login page renders at `/login` with email + password inputs
- [x] Register page renders at `/register` with all fields
- [x] Profile page renders at `/profile` (requires auth)
- [x] Guest middleware redirects authenticated user away from `/login`, `/register`
- [x] Auth middleware redirects unauthenticated user away from `/profile`
- [x] `useApi.ts` includes `Authorization: Bearer` header when token exists
- [x] `useApi.ts` clears token and redirects on 401 response
- [x] Token stored as cookie (max 30 days)
- [x] Build passes without errors
