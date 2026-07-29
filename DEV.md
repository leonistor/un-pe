# DEV

## SKILLS to test for AI design

- [ ] /grill-me skill: https://www.aihero.dev/things-people-get-wrong-with-grill-me-and-grill-with-docs, https://github.com/mattpocock/skills
- [ ] Daub: UI for AI: https://daub.dev/
- [ ] Taste Skill: the Anti-Slop Frontend Framework for AI Agents: https://www.tasteskill.dev/
- [ ] UI Prompt Library for Vibe Coders: https://vibeui.online/
- [ ] Impeccable strips the AI slop tells and bad defaults: https://impeccable.style/
- [ ] TypeUI AI coding tool - UI that actually makes sense: https://www.typeui.sh/
- [ ] design systems: https://github.com/VoltAgent/awesome-design-md
- [ ] High-quality DESIGN.md examples for AI agents: https://styles.refero.design/
- [ ] My AI Design Workflow That Doesn't Ship Slop: https://www.youtube.com/watch?v=oLu32YpiIJw

## Architecture

### Tech stack

- **React 19** + **TypeScript 5** — UI framework
- **Vite 8** — bundler and dev server
- **Tailwind CSS 4** — utility-first styling with `@theme inline` blocks
- **shadcn/ui (base-nova style)** — component library built on `@base-ui/react` primitives
- **lucide-react** — icons
- **Geist Variable** — app font
- **vite-plugin-pwa** — PWA manifest + Workbox service worker

### State management

The app uses a **state machine pattern** instead of a router. `App.tsx` drives a single `ViewState` (`"intro" | "test" | "results"`). Each view is a component rendered conditionally.

Test progress (answers, name, current question) lives in a `useTestState` hook that syncs to `localStorage` under the `un-pe-test-state` key. The hook provides setters and query helpers (`getRankedCount`, `getNextAvailableRank`).

### Data flow

1. User enters name on **Intro** screen (or gets a random nickname)
2. 12 question screensets, each with 4 click-to-rank statements
3. Answers collected as `Record<questionSeq, Partial<Record<ColumnKey, Rank>>>`
4. On completion, `calculateScores()` sums column scores, `determineStyle()` finds the two lowest columns, and `findStyle()` maps them to a `PeopleStyle` + `StyleDescription`
5. **ResultsView** displays the personality style, description, and quick reference cards

### Scoring algorithm

Each statement column (`a`, `b`, `c`, `d`) accumulates points equal to the rank the user assigns (1 = most preferred, 4 = least). The column with the lowest total is the **major type**; the second-lowest is the **secondary type**. The pair maps to one of 12 personality styles.

### Component tree

```
App
├── ThemeToggle (shadcn DropdownMenu)
├── Intro (shadcn Input + Button)
├── QuestionCard
│   ├── ProgressBar (shadcn Progress)
│   └── Statement (×4)
└── ResultsView (shadcn Separator + Button)
```

### PWA

The app is installable with a service worker (auto-updating, Workbox-generated) that precaches all static assets. Manifest provides 192 and 512 px icons. Caddy SPA fallback config: `try_files {path} /index.html`.
