# AGENTS.md

## Core Rules
- Use Next.js App Router (`src/app`). Do not use `pages/`.
- Default to Server Components. Add `"use client"` only when required for interactivity.
- Do not fetch data in client components. Fetch in server components or server actions.
- Use TypeScript exclusively.

## Data Fetching
- Use async server components with `fetch`.
- Use Next.js caching (`cache`, `revalidate`) intentionally.
- Centralize API calls in `/lib` or `/services`.

## Styling
- Use Tailwind only. No CSS-in-JS libraries.

## Components
- Separate UI components (`/components/ui`) from domain components (`/components/features`).
- Player logic must be isolated; do not mix with UI rendering.

## Routing
- Use route segments (`/app/movie/[id]`, `/app/profile`).
- Co-locate data logic with route.

## State
- Prefer server state over client state.
- Use client state only for UI interaction (modals, hover, playback controls).

## Anti-Patterns (Disallowed)
- `useEffect` for initial data fetch
- Global state for server data
- Mixing server/client logic in same component