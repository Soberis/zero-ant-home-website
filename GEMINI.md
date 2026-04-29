# Project Overview

**ZeroAnt Home Website** is the official frontend website for ZeroAnt. It is a modern single-page application (SPA) built using Vue 3, TypeScript, and Vite. The project supports internationalization, optimized responsive image generation, and multi-environment automated deployment via GitLab CI/CD.

**Key Technologies & Libraries:**
- **Framework:** Vue 3 (Composition API), Vue Router
- **Language:** TypeScript
- **Build Tool:** Vite
- **Internationalization:** Vue I18n
- **Testing:** Vitest, Playwright (for browser testing)
- **Code Quality:** ESLint, Prettier, Vue-TSC
- **Package Manager:** Yarn (strictly enforced)

## Building and Running

The project strictly relies on `yarn` as the package manager. **Do not use `npm install` or `pnpm`** to avoid lockfile conflicts.

- **Install Dependencies:**
  ```bash
  yarn install
  ```

- **Start Development Server:**
  ```bash
  yarn dev
  ```

- **Type Checking:**
  ```bash
  yarn type-check
  ```

- **Lint and Format:**
  ```bash
  yarn lint        # Check for lint errors
  yarn lint:fix    # Fix lint errors
  yarn format      # Format code with Prettier
  ```

- **Run Tests:**
  ```bash
  yarn test:node             # Run Node-based tests
  yarn test:browser:install  # Install Playwright browser dependencies
  yarn test:browser          # Run browser-based tests
  ```

- **Build for Production:**
  ```bash
  yarn build
  ```
  *(Note: Output is generated in the `dist/` directory. Do not manually edit files in `dist/`.)*

- **Preview Production Build Locally:**
  ```bash
  yarn preview
  ```

- **Full Validation (Lint, Type Check, Build, Smoke Test):**
  ```bash
  yarn validate
  ```

## Development Conventions

1. **Package Management:** Always use `yarn` to add, remove, or update dependencies. Never commit `package-lock.json`.
2. **Code Formatting & Linting:** Adhere to the configured ESLint and Prettier rules. It's recommended to format and lint your code before committing.
3. **Nginx Configuration:** Any adjustments to the server configuration should be made in `config/nginx.conf.template`. The CI/CD pipeline dynamically handles environment-specific replacements.
4. **Environment Variables:** Do not hardcode sensitive information (like SSH keys) or environment variables in the repository; these are securely managed via GitLab CI/CD variables.
5. **Deployment Flow:** 
   - Commits to the `develop` branch automatically deploy to the test environment.
   - Pushing tags on the `main` branch automatically deploys to the production environment.
6. **Assets:** Generated responsive images and build outputs are managed via custom scripts (`scripts/`). Avoid placing heavy unoptimized assets in `public/` directly without utilizing the optimization pipelines.
