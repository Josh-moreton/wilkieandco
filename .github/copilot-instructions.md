# Next.js Enterprise Boilerplate

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

Next.js Enterprise Boilerplate is a production-ready template built with Next.js 15, TypeScript, Tailwind CSS v4, and comprehensive testing/development tools. This repository provides a complete enterprise development environment with automated workflows, testing suites, and deployment configurations.

## Working Effectively

### Initial Setup

- Node.js 20+ is required (current version: v20.19.4)
- Enable corepack and install dependencies:
  ```bash
  corepack enable
  corepack prepare  # Sets up pnpm 10.0.0
  pnpm install      # Takes ~2 minutes. NEVER CANCEL. Set timeout to 5+ minutes.
  ```

### Build Commands

- **Build for production:** `pnpm run build`
  - Takes ~30-35 seconds. NEVER CANCEL. Set timeout to 3+ minutes.
  - Creates optimized production build in `.next/` directory
  - Includes automatic linting and type checking
- **Build with bundle analysis:** `pnpm run analyze`
  - Takes ~30 seconds. NEVER CANCEL. Set timeout to 3+ minutes.
  - Generates bundle reports in `.next/analyze/` directory
  - Use this to monitor bundle size impact of changes

### Development Server

- **Start development server:** `pnpm run dev`
  - Runs on http://localhost:3000
  - Uses Turbopack for fast compilation
  - Ready in ~2-3 seconds
  - Supports hot reloading and TypeScript compilation
- **Start production server:** `pnpm run start`
  - Requires `pnpm run build` first
  - Runs optimized production build
  - Ready in ~600ms

### Testing

- **Unit tests:** `pnpm run test`
  - Uses Vitest with React Testing Library
  - Takes ~2-3 seconds. Set timeout to 30+ seconds.
  - Tests located in `**/*.test.{ts,tsx}` files
- **End-to-end tests:** `pnpm run e2e:headless`
  - Uses Playwright for browser testing
  - **REQUIRES:** `npx playwright install` first (may fail due to network issues)
  - If Playwright install fails, document the limitation and skip E2E tests
- **Test with UI:** `pnpm run e2e:ui` (requires Playwright browsers)
- **Test coverage:** `pnpm run test:coverage`

### Code Quality

- **Linting:** `pnpm run lint`
  - Uses ESLint 9 with Next.js configuration
  - Takes ~2-3 seconds. Set timeout to 30+ seconds.
  - **ALWAYS run before committing**
- **Linting with auto-fix:** `pnpm run lint:fix`
- **Prettier check:** `pnpm run prettier`
  - Takes ~1-2 seconds. Set timeout to 30+ seconds.
- **Format code:** `pnpm run format`
  - Auto-formats TypeScript, TSX, and Markdown files
  - Takes ~2-3 seconds. Set timeout to 30+ seconds.
  - **ALWAYS run before committing**

### Storybook

- **Start Storybook:** `pnpm run storybook`
  - Runs on http://localhost:6006
  - Takes ~8 seconds to start. NEVER CANCEL. Set timeout to 2+ minutes.
  - Use for component development and documentation
- **Build Storybook:** `pnpm run build-storybook`

### Additional Tools

- **Component dependency graph:** `pnpm run coupling-graph`
  - **NOTE:** Requires Graphviz installation (will fail in sandboxed environments)
  - Generates `graph.svg` showing component relationships
- **Health check endpoint:** Available at `/api/health`, `/healthz`, `/health`, `/ping`
  - Returns `{"status":"ok"}` for Kubernetes health monitoring

## Validation

### Manual Testing Requirements

After making changes, **ALWAYS** perform these validation steps:

1. **Build validation:**

   ```bash
   pnpm run build  # Must complete successfully
   pnpm run start  # Must start without errors
   ```

2. **Development validation:**

   ```bash
   pnpm run dev    # Must start and be accessible at http://localhost:3000
   ```

3. **Code quality validation:**

   ```bash
   pnpm run lint   # Must pass with no errors
   pnpm run format # Must complete without changes
   pnpm run test   # Must pass all tests
   ```

4. **Functional validation:**
   - Navigate to http://localhost:3000 - homepage must load correctly
   - Test health endpoint: http://localhost:3000/api/health - must return `{"status":"ok"}`
   - Verify all navigation links work correctly
   - Test responsive design on different screen sizes

### Critical Validation Scenarios

When making changes to components or core functionality:

1. **Component changes:** Test the component in isolation via Storybook
2. **API changes:** Test all health check endpoint variations
3. **Build configuration changes:** Run full build and start cycle
4. **Styling changes:** Verify responsive design and dark mode compatibility

## Repository Structure

### Key Directories

- `app/` - Next.js 15 App Router pages and API routes
- `components/` - Reusable React components with tests and stories
- `e2e/` - Playwright end-to-end tests
- `.storybook/` - Storybook configuration
- `styles/` - Global CSS and Tailwind configuration

### Important Files

- `package.json` - Dependencies and scripts
- `next.config.ts` - Next.js configuration with bundle analyzer
- `tsconfig.json` - TypeScript configuration with strict settings
- `eslint.config.mjs` - ESLint 9 configuration
- `vitest.config.ts` - Test configuration
- `playwright.config.ts` - E2E test configuration
- `env.mjs` - Environment variable validation with T3 Env

### Configuration Files

- All config files use modern formats (ESM modules, TypeScript configs)
- Prettier, ESLint, and TypeScript are configured for maximum strictness
- Tailwind CSS v4 with design system integration
- Pre-commit hooks configured for conventional commits

## Common Issues and Workarounds

1. **Playwright browser installation fails:**

   - This is common in sandboxed environments due to network restrictions
   - Document as limitation: "E2E tests require manual browser installation"
   - Focus on unit tests which work reliably

2. **Coupling graph generation fails:**

   - Requires Graphviz system dependency (`gvpr` command)
   - Will fail in environments without Graphviz installed
   - Document as limitation for local development only

3. **Bundle analyzer in CI:**

   - May have different behavior in CI vs local due to caching
   - Always test both `pnpm run build` and `pnpm run analyze`

4. **Storybook component discovery:**
   - Stories must be in `**/*.stories.{ts,tsx}` format
   - No MDX stories found warning is normal for this setup

## Performance Expectations

- **Development server startup:** 2-3 seconds
- **Production build:** 30-35 seconds
- **Production server startup:** <1 second
- **Unit test suite:** 2-3 seconds
- **Linting:** 2-3 seconds
- **Code formatting:** 2-3 seconds
- **Storybook startup:** 8 seconds

**CRITICAL:** Always set timeouts 3-5x longer than expected times to account for CI/network variability.
