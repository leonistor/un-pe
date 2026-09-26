# DESIGN.md — un-pe-web Design System

Design system for the Understanding People assessment app. Tokens live in
`src/index.css` (`@theme inline` + `:root` / `.dark`). This file documents the
intent so components stay consistent.

## Color

Base palette is **zinc** (configured in `components.json`), with a **deep-blue
primary** and a **light-blue secondary** tint.

### Light (`:root`)

| Token | Value | Role |
| --- | --- | --- |
| `background` | `oklch(0.985 0 0)` (zinc-50) | page surface |
| `foreground` | `oklch(0.21 0.006 285.885)` (zinc-900) | body text |
| `card` | `oklch(1 0 0)` | raised surfaces |
| `primary` | `oklch(0.45 0.18 264)` | deep blue — CTAs, active state, progress |
| `primary-foreground` | `oklch(0.985 0 0)` | text on primary |
| `secondary` | `oklch(0.95 0.03 262)` | light-blue tint — badges, secondary buttons |
| `secondary-foreground` | `oklch(0.4 0.15 264)` | text on secondary |
| `muted` / `muted-foreground` | zinc-100 / zinc-500 | subtle surfaces / secondary text |
| `accent` | `oklch(0.95 0.03 262)` | hover tint |
| `border` / `input` | zinc-200 | borders |
| `ring` | `oklch(0.55 0.16 264)` | focus ring |

### Dark (`.dark`)

| Token | Value | Role |
| --- | --- | --- |
| `background` | `oklch(0.141 0.005 285.823)` (zinc-950) | page surface |
| `foreground` | `oklch(0.985 0 0)` | body text |
| `card` | `oklch(0.21 0.006 285.885)` (zinc-900) | raised surfaces |
| `primary` | `oklch(0.62 0.19 264)` | brighter blue for contrast on dark |
| `primary-foreground` | `oklch(0.141 0.005 285.823)` | text on primary |
| `secondary` | `oklch(0.27 0.03 264)` | deep blue tint |
| `secondary-foreground` | `oklch(0.92 0.03 262)` | text on secondary |
| `muted` / `muted-foreground` | zinc-800 / zinc-400 | subtle surfaces / secondary text |
| `border` / `input` | `oklch(1 0 0 / 10–15%)` | borders |

### Verified contrast (WCAG)

Measured with the oklch→sRGB→relative-luminance formula:

| Pair | Ratio | Grade |
| --- | --- | --- |
| foreground(zinc-900) on background(zinc-50) | 16.98 | AAA |
| foreground(zinc-50) on background(zinc-950) | 19.05 | AAA |
| `primary-foreground` on light `primary` | 7.77 | AAA |
| `primary-foreground` on dark `primary` | 5.30 | AA |
| `muted-foreground`(zinc-500) on zinc-50 | 4.62 | AA |
| `muted-foreground`(zinc-400) on zinc-950 | 7.56 | AAA |
| light `secondary-foreground` on `secondary` | 8.20 | AAA |
| dark `secondary-foreground` on `secondary` | 11.91 | AAA |

Body copy targets ≥ 7:1; secondary/muted copy ≥ 4.5:1. Re-check if tokens change.

## Radius

A single `--radius: 1rem` (16px) drives the whole scale via the multipliers in
`@theme inline` (`--radius-sm…4xl`). Uniform rounding:

- interactive controls → `rounded-lg` (= `--radius`, 16px)
- container surfaces → `rounded-xl`
- chips/pills → `rounded-full` (shadcn `Badge`)

## Typography

Fluid type tokens (named by intent, defined in `@theme inline`). They scale with
the viewport via `clamp()`, so no breakpoint variants are needed.

| Utility | Size | Use |
| --- | --- | --- |
| `text-hero` | `clamp(2rem, 1.5rem + 3vw, 3.25rem)` | intro H1, result style name |
| `text-title` | `clamp(1.25rem, 1.1rem + 1vw, 1.75rem)` | large section headings |
| `text-heading` | `clamp(1.0625rem, 1rem + 0.4vw, 1.25rem)` | section headings |
| `text-body` | `0.9375rem` / lh 1.6 | body copy |
| `text-eyebrow` | `0.75rem`, uppercase, `0.08em`, 500 | labels above headings |

Font is **Libre Franklin Variable** (`--font-sans`), set on `html`.

## Layout

- `.app-shell` — outer frame: centered, `max-w-3xl`, `min-h-dvh`, column.
- `.app-header` — sticky, `bg-background/80` + `backdrop-blur-md`, bottom border;
  holds the `<Logo />` lockup and `ThemeToggle`.
- `.app-main` — padded content area (`px-4 sm:px-6 lg:px-8`).
- Per-view widths: intro `max-w-prose`, test `max-w-xl`, results full `max-w-3xl`.

## Semantic classes (`@layer components`)

Small, intentional set. Prefer these over repeating utility strings:

| Class | Purpose |
| --- | --- |
| `.app-shell` | outer page frame |
| `.app-header` | sticky top bar |
| `.app-main` | padded main content |
| `.eyebrow` | uppercase label above a heading |
| `.prose-muted` | standard muted body copy |
| `.section-title` | results-section heading |

Prefer shadcn components for the rest (e.g. `Badge variant="secondary"` for
style keywords, `Button`, `Progress`, `Separator`) rather than new CSS classes.

## Conventions

- Never use raw colors or arbitrary values — use theme tokens
  (`shadcn/no-raw-colors`, `shadcn/no-arbitrary-values`).
- Compose classes with `cn()`.
- Keep the e2e structural selectors intact: statement buttons are
  `button:has(span.size-6)`, the progress counter is `span.tabular-nums`.
