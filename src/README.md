# Playwright Test Automation Framework

## Project Description
- balsam brands assessment exam
- Playwright test automation framework
- Test data from JSON files
- CI pipeline

## Instruction To Clone
- open visual studio code
- clone the repo
- enter the git clone url https://github.com/jamesrael12141988/balsambrands.git
- create and folder
- start cloning the repo

## Expected Test Output
- Will fail if dialog popup promo window appear in an unexpected timming
- 3rd result is changing,
- PLEASE GET THE PRODUCT NAME OF 3RD RESULT FIRST 
    AND PUT IT TEMPORARILY IN tesdata.json FILE
- Dialog Popup still need to be fixed
- SINCE I HAVE LIMITED TIME BECAUSE I'M CURRENLTY ON SHIFT, SOME OF THE LOCATORS STILL NEED TO BE FIXED

## Setup
npm install
npm install --save-dev @playwright/test
npm install --save-dev @types/dotenv
npm install dotenv --save-dev

npm install
cp .env.example .env

## Test data
- JSON files in `/data` are used for test data
- 3rd result is changing, 
- PLEASE GET THE PRODUCT OF 3RD RESULT FIRST 
    AND PUT IT TEMPORARILY IN tesdata.json FILE

## Run Tests
npx playwright test

## Run by Tag (for CI pipelines)
npx playwright test --grep @regression

## Structure
- `/pages`: Page Object classes
- `/tests`: Test specs
- `/data`: Test data in JSON
- `/utils`: Helpers (env, reporting)
- `.env`: Configurable base URL and secrets

## Reporting
- Allure is supported via `allure-playwright`
- HTML reports are auto-generated [TODO]
