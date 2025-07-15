import { Page, Locator } from '@playwright/test';
import { PopUp } from './popup.fixture';
import { checkElementVisibility, clickElement } from '../utils/ui-actions';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  deleteProductButton(product: String) {
    return this.page.locator(`//button[@aria-label='Remove ${product}']`);
  }

  hasBeenRemoved(product: String) {
    return this.page.locator(`//ul[contains(@class, 'cartProductDetailItem_removed-product-list')]//span[text()='${product} has been removed.']`);
  }

  async removeProduct(product: String) {
    const popup = new PopUp(this.page);
    await popup.removePopupIfVisible();
    await checkElementVisibility(this.deleteProductButton(product), { checks: 3, timeout: 60000 });
    await clickElement(this.deleteProductButton(product));
    await popup.waitUntilLoadingComplete();
  }
}
