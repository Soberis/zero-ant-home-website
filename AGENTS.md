# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vue 3 + TypeScript marketing site built with Vite. In `src/`, `views/` holds pages, `components/` shared UI, `router/` routes, `locales/` translations, and `utils/`, `composables/`, `types/`, and `data/` shared logic. Static assets live in `public/`; generated responsive media is written to `public/responsive/`, so do not edit that folder manually. Build output goes to `dist/`. Deployment templates live in `config/`, and helper scripts live in `scripts/`.

## Build, Test, and Development Commands
Use `yarn` only; the repo is pinned to Yarn 1 and Node `>=20.16.0`.

- `yarn dev`: generate responsive images, then start the Vite dev server.
- `yarn build`: generate images, build production assets, then generate site artifacts.
- `yarn preview`: serve the built site locally for verification.
- `yarn lint` / `yarn lint:fix`: run ESLint, optionally auto-fixing issues.
- `yarn type-check`: run `vue-tsc --noEmit`.
- `yarn test:node`: run Node-side Vitest checks such as SSG artifact tests.
- `yarn test:browser`: run browser Vitest tests; install Chromium first with `yarn test:browser:install`.
- `yarn smoke`: run the post-build smoke check.
- `yarn validate`: full local gate: lint, type-check, build, and smoke.

## Coding Style & Naming Conventions
Follow the existing Prettier config: 2-space indentation, semicolons, double quotes, trailing commas where valid, and 100-column wrap. Use TypeScript and Vue SFCs consistently. Prefer PascalCase for Vue components, camelCase for utilities/composables, and kebab-case for route-facing files. Keep changes small and aligned with the current structure; do not introduce new dependencies without a clear need.

## Testing Guidelines
Tests live under `tests/node` and `tests/browser`. Name new files `*.test.ts`; browser tests commonly use `*.browser.test.ts`. No coverage threshold is enforced, so focus on regression tests for routing, SEO, generated artifacts, and page rendering. When UI behavior changes, update or add browser tests and verify screenshots under `tests/browser/__screenshots__/` only when changed.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commit prefixes such as `feat:`, `fix:`, and `refactor:`. Keep subjects short and imperative, for example: `fix: correct mobile nav aria labels`. PRs should include a concise summary, linked issue if applicable, and screenshots or preview notes for visible UI changes. Call out changes to locales, routing, SEO artifacts, or generated assets so reviewers know what to verify.

## Configuration & Deployment Notes
Do not edit `dist/` directly. Update `config/nginx.conf.template` instead of server-side config. Keep secrets out of the repo and use CI/CD variables for environment-specific values.


<claude-mem-context>
# Memory Context

# claude-mem status

This project has no memory yet. The current session will seed it; subsequent sessions will receive auto-injected context for relevant past work.

Memory injection starts on your second session in a project.

`/learn-codebase` is available if the user wants to front-load the entire repo into memory in a single pass (~5 minutes on a typical repo, optional). Otherwise memory builds passively as work happens.

Live activity: http://localhost:37777
How it works: `/how-it-works`

This message disappears once the first observation lands.
</claude-mem-context>