import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [['list'], ['html'], ['allure-playwright']],
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium',
        viewport: null,
       },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
  ],
});
