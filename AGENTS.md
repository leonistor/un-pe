# AGENTS.md — un-pe-web

Personality assessment web app based on Dave Mitchell's *The Power of
Understanding People*. Users rank 12 sets of 4 statements; the two
lowest-scoring columns map to one of 12 personality styles.

- Public site: <https://parsedw.ink/un-pe/>
- Remote: `git@github.com:leonistor/un-pe.git`

## Commands

Package manager is **bun** (`bun@1.3.14`).

| Task        | Command                                  |
| ----------- | ---------------------------------------- |
| Dev server  | `bun dev`                                |
| Build       | `bun build` (`tsc -b && vite build`)     |
| Typecheck   | `bun typecheck` (`tsc --noEmit`)         |
| Lint        | `bun lint` (`oxlint`)                    |
| Format      | `bun format` (`oxfmt`)                   |
| E2E         | `bun e2e` (Playwright, bundled Chromium) |
| E2E install | `bun e2e:install`                        |
| E2E demo    | `bun e2e:demo` (headed, slow-mo, 1 worker) |

Run `bun lint`, `bun typecheck`, and `bun build` before committing.

## Tech stack

- **React 19** + **TypeScript 7**
- **Vite 8** — bundler + dev server (`server.host: "0.0.0.0"`)
- **Tailwind CSS 4** — `@theme inline` tokens in `src/index.css`
- **shadcn/ui** — `base-nova` style on **`@base-ui/react`** primitives
  (`components.json`); add components with the shadcn MCP/CLI
- **`@phosphor-icons/react`** — icons (NOT lucide)
- **Libre Franklin Variable** — app font (`@fontsource-variable/libre-franklin`)
- **vite-plugin-pwa** — manifest + Workbox service worker

## Architecture

**State machine, not a router.** `App.tsx` drives one `ViewState`
(`"intro" | "test" | "results"`) and conditionally renders each view.

```
App (ThemeProvider in main.tsx)
├── ThemeToggle (shadcn DropdownMenu)
├── Intro (Input + Button)
├── QuestionCard
│   ├── ProgressBar (shadcn Progress)
│   └── Statement (×4, click-to-rank)
└── ResultsView (Separator + Button)
```

- `useTestState` (`src/hooks/use-test-state.ts`) owns progress and syncs to
  `localStorage` under **`un-pe-test-state`**. On load it resumes any
  incomplete saved state.
- `ThemeProvider` (`src/components/theme-provider.tsx`) manages
  light/dark/system under the **`theme`** localStorage key; pressing **`d`**
  (outside inputs) toggles theme.
- `Logo` (`src/components/logo.tsx`) is **implemented but intentionally not
  wired into `App.tsx`** — the header still renders a plain label. Do not
  "fix" this unless asked.

### Data flow

1. Intro → enter/randomize name → `startTest()`
2. 12 question sets; each statement click assigns the next free rank (1–4)
3. Answers stored as `Record<questionSeq, Partial<Record<ColumnKey, Rank>>>`
4. On finish: `calculateScores()` sums ranks per column → `determineStyle()`
   finds the two lowest columns → `findStyle()` → `findDescription()`
5. `ResultsView` renders style name, description, and quickref cards

### Scoring algorithm (`src/lib/scoring.ts`)

Each column accumulates points equal to assigned rank (1 = best, 4 = worst).
Lowest total = **major type**; second-lowest = **secondary type**.

| Column | Type       |
| ------ | ---------- |
| `a`    | expert     |
| `b`    | romantic   |
| `c`    | mastermind |
| `d`    | warrior    |

The `(major, secondary)` pair maps to one of 12 styles in `people_styles`.
Ties are resolved by insertion order (`Object.entries` + stable sort on score).

### Test data (`src/lib/personality_data.json`)

- `people_types[]` — `{ name, minColumn, partner }`
- `items[]` — 12 sets, `{ seq, a, b, c, d }` (choice text per column)
- `people_styles[]` — `{ name, code, lowestScore, nextLowestScore, majorType, secondaryType }`
- `styles_descriptions[]` — prose per style `code` (`headline`, `short`,
  `words`, `leaders`, `sales`, `service`, `team`, `hollywood`, `quickref`)

Types mirror this in `src/types.ts`. When editing data, keep both in sync.

## Conventions

- **Imports**: alias `@/` → `src/` (`@/components`, `@/lib`, `@/hooks`).
- **Formatting**: `oxfmt` — no semicolons, double quotes, 2-space, 80 cols,
  Tailwind class sorting via `cn`/`cva`.
- **Linting**: `oxlint` + `@shadcn/lint`. Respect `shadcn/no-raw-colors` and
  `shadcn/no-arbitrary-values` (use theme tokens, not raw/arbitrary values).
- **Styling**: use existing shadcn components and CSS variables from
  `src/index.css`. Compose classes with `cn()`.
- **Types**: never use `as any` / `@ts-ignore`.
- **Docs**: add doc comments for design decisions and tricky logic.

## Testing (Playwright)

- Config: `playwright.config.ts`, tests in `e2e/`. Uses **bundled Chromium
  only** — never host Chrome. Blank `PLAYWRIGHT_BROWSERS_PATH=0`.
- `webServer` boots `bun run dev` on port 5173; reuses an existing server
  locally.
- Smoke suite (`e2e/smoke.spec.ts`) relies on structural selectors: statement
  buttons are `button:has(span.size-6)`; the progress counter is
  `span.tabular-nums`. Preserve these when editing `statement.tsx` /
  `progress-bar.tsx` or update the tests.

## PWA & deployment

- Service worker is auto-updating; Workbox precaches
  `js/css/html/woff2/png/svg` and caches Google Fonts (CacheFirst).
- Manifest: standalone display, 192/512 px icons,
  `navigateFallback: "/index.html"`.
- Static SPA hosting (Caddy) needs fallback: `try_files {path} /index.html`.

## Backlog

- [ ] Change theme (fonts & colors)
- [ ] Save user profile
