# Playwright Test Automation Framework

## 🔧 Setup

```bash
npm install --save-dev @playwright/test
npm install --save-dev @types/dotenv
npm install dotenv --save-dev

npm install
cp .env.example .env
```

## 🚀 Run Tests

```bash
npx playwright test
```

## 🧪 Run by Tag (for CI pipelines)

```bash
npx playwright test --grep @smoke
```

## 🖥️ CI Simulation

GitHub Actions is used for CI integration. You can modify `.github/workflows/playwright.yml` to add Slack/email reports using webhook stubs in `utils/reporter.ts`.

## 📂 Structure

- `/pages`: Page Object classes
- `/tests`: Test specs
- `/data`: Test data in JSON
- `/utils`: Helpers (env, reporting)
- `.env`: Configurable base URL and secrets

## 📈 Reporting

- Allure is supported via `allure-playwright`
- HTML reports are auto-generated
