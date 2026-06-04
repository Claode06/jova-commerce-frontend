# AGENTS.md — Jova Mart Frontend

## Stack

- Nuxt 4, Vue 3, Pinia, daisyUI 5, Tailwind CSS v4
- Consumes jova-mart-backend API (Laravel 12, Sanctum auth)

## Development Commands

```bash
npm run dev       # Start Nuxt dev server
npm run build     # Production build
npm run generate  # Static generation
npm run preview   # Preview production build
```

## Development Workflow

Phase-based development tracked in `docs/planning/`. Each phase is planned, executed, verified, and tested before moving to the next.

### Workflow

PHASE PLANNING
  1. Review roadmap.md / todo.md / summary.md
  2. Discuss phase requirements with user
  3. Create `docs/planning/phase-XX-name` folder
  4. Write plan.md (step-by-step implementation)
  5. Write verification.md (testing checklist)
  6. Write human-uat.md (manual testing scenarios)

IMPLEMENTATION
  7. Execute plan.md steps ONE AT A TIME:
     a. Do one step fully
     b. Mark step [x] complete in plan.md
     c. STOP — wait for user confirmation before next step
  8. Update summary.md with progress

VERIFICATION & TESTING
  9. Run verification.md checklist
  10. Run human-uat.md scenarios
  11. Fix issues found
  12. User approval

PHASE COMPLETE
  13. Update summary.md, todo.md and roadmap.md (phase completed)
  14. Create COMPLETE.md as the phase summary
  15. Move to next phase
