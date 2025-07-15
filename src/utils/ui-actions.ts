import { Locator, expect } from '@playwright/test';
import { PopUp } from '../pages/popup.fixture';

/**
 * Robust click on an element, with support for multiple clicks.
 * @param locator Playwright Locator for the element to click
 * @param options Optional: number of clicks, timeout in ms
 * 
 *   For Click once
 *   await clickElement(page.locator('#submit-btn'));
 *
 *   For Double-click
 *   await clickElement(page.locator('#submit-btn'), { clicks: 2 });
 *
 *   For Triple-click with a timeout
 *   await clickElement(page.locator('#submit-btn'), { clicks: 3, timeout: 15000 });
 */
export async function clickElement(
locator: Locator, options?: {
  clicks?: number;
  timeout?: number;
}, p0?: { timeout: number; }) {
  const timeout = options?.timeout ?? 60000;
  const clicks = options?.clicks ?? 1;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await locator.scrollIntoViewIfNeeded();
      await expect(locator).toBeVisible({ timeout: 2000 });
      await expect(locator).toBeEnabled({ timeout: 2000 });

      for (let i = 0; i < clicks; i++) {
        const popup = new PopUp(locator.page());
        await popup.removePopupIfVisible();
        await popup.waitUntilLoadingComplete();
        await locator.click({ timeout });
      }

      return;
    } catch (error) {
      // if (attempt === 2) {
      //   throw new Error(`Failed to click element after 3 attempts: ${error}`);
      // }
      // await locator.page().waitForTimeout(1000); // Wait a bit before retrying
      console.warn(`Retrying click (${attempt + 1}/3)...`);
    }
  }
}

/**
 * Check if an element is visible, retrying up to 3 times if necessary.
 * @param locator Playwright Locator for the element to check
 * @param options Optional: timeout in ms
 * 
 *   For checking visibility
 *   await checkElementVisibility(page.locator('#submit-btn'));
 */
export async function checkElementVisibility(
locator: Locator, options?: {
  checks?: number;
  timeout?: number;
}, p0?: { timeout: number; }) {
  const timeout = options?.timeout ?? 60000;
  const checks = options?.checks ?? 1;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await locator.scrollIntoViewIfNeeded();
      await expect(locator).toBeVisible({ timeout: 2000 });

      for (let i = 0; i < checks; i++) {
        const popup = new PopUp(locator.page());
        await popup.removePopupIfVisible();
        await popup.waitUntilLoadingComplete();
        expect(locator).toBeVisible({ timeout });
      }

      return;
    } catch (error) {
      console.warn(`Retrying check element visibility (${attempt + 1}/${checks})...`);
    }
  }
}