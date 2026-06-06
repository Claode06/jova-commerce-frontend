# Phase 17 — Stronger Amber Palette

## Goal
Replace the accent color values with a richer, more saturated golden amber palette for stronger visual impact while maintaining elegance.

## Changes
Only 1 file: `app/assets/css/main.css` — update 5 hex values in `@theme` block.

| Token | Before (Soft) | After (Stronger) |
|-------|---------------|------------------|
| `accent-50` | `#FDF8F3` | `#FDF4E8` |
| `accent-100` | `#FAEBD9` | `#FCE6CC` |
| `accent-200` | `#F2D1AC` | `#F5C68A` |
| `accent-400` | `#D4A574` | `#C7893F` |
| `accent-600` | `#B8895C` | `#9E6B2E` |

All components automatically inherit because they use `accent-*` tokens.

## Steps

- [x] Step 1: Create planning docs
- [x] Step 2: Update `main.css` accent token values
- [x] Step 3: Build test — 0 errors
- [x] Step 4: Update roadmap.md, todo.md, summary.md
