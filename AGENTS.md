# Repository Guidelines

## Project Structure & Module Organization
- Source: `src/ts` (engine utilities), `src/tsx` (React UI), `src/styles` (SCSS), `src/public` (assets).
- Packages: `packages/` contains engine modules (e.g., `orengine`, `maxpower`) and `packages/glpower` (git submodule).
- Plugins: `plugins/` holds build/runtime helpers.
- Tests: `tests/` with unit/integration specs and `tests/setup.ts`.
- Docs/Stories: `docs/` for architecture notes, `.storybook/` for Storybook.

## Build, Test, and Development Commands
- `npm run init`: initializes git submodules and installs deps (run once before dev/test/build).
- `npm run dev`: starts Vite dev server.
- `npm run build`: production build; bundles player and packs via `compeko.js`.
- `npm run build:dev`: production mode without shader minify; faster iteration.
- `npm run lint`: runs ESLint over `ts/tsx` sources.
- `npm run test`: runs Vitest specs in `tests/`.
- `npm run storybook`: launches Storybook; `npm run build:storybook` builds static stories.

## Coding Style & Naming Conventions
- Language: TypeScript, React in `.tsx`.
- Indentation: tabs (`indent: ["error", "tab"]`).
- Imports: grouped and alphabetized (`eslint-plugin-import`); prefer path aliases (`glpower`, `maxpower`, `orengine`, `~`).
- Naming: components `PascalCase` (e.g., `EditorPage`), variables/functions `camelCase`, constants `UPPER_SNAKE`.
- Files: feature `index.ts` per folder; tests end with `.test.ts`.

## Testing Guidelines
- Framework: Vitest (node env).
- Layout: place specs in `tests/` matching source feature (e.g., `entity.test.ts`).
- Setup: put globals/mocks in `tests/setup.ts`.
- Run: `npm run test`. Add focused units; integration under `tests/integration/`.

## Commit & Pull Request Guidelines
- Commits: concise, imperative subject; scope optional. Types like `docs:`, `feat:`, `fix:` are welcome but not required. Prefer English or clear Japanese.
- PRs: include purpose, summary of changes, screenshots for UI/visuals, linked issues (e.g., `Closes #123`), and notes on testing. Ensure `lint` and `test` pass.

## Security & Configuration Tips
- Environment: `.env` for local overrides; shader minifier can be skipped via `SKIP_SHADER_MINIFIER=true`.
- Submodules: run `npm run init` after cloning to fetch `packages/glpower`.
- Storybook base path: set `STORYBOOK_BASE_PATH` when serving from a subpath.

## References
- See `docs/` for architecture and engine internals. Start with `docs/architecture/README.md`.
