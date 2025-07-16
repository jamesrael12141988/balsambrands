# Playwright Test Automation Framework

# Setup
npm install
npm install --save-dev @playwright/test
npm install --save-dev @types/dotenv
npm install dotenv --save-dev

npm install
cp .env.example .env
npx allure serve
npx allure open

# To Run Tests
npx playwright test --grep "@regression" --headed

# Run by Tag (for CI pipelines)
npx playwright test --grep "@regression"

# Structure
- `/pages`: Page Object classes
- `/tests`: Test specs
- `/data`: Test data in JSON
- `/utils`: Helpers (env, reporting)
- `.env`: Configurable base URL

# Running test
- product Name of 3rd result may changes depends on the update of the app, 
- please update the testData.json file with the updated product name
    SAMPLE CHOICES: 
        "Denali White Christmas Tree"
        "BH Balsam Fir® Trees"
        etc..

# Reporting
- Allure is supported via `allure-playwright`
- HTML reports are auto-generated