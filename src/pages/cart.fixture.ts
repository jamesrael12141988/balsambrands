import { Page, expect } from '@playwright/test';
import { checkElementVisibility, clickElement } from '../utils/ui-actions';

export class CartPage {
  readonly page: Page;
  productPricelabel: any;

  constructor(page: Page) {
    this.page = page;
  }

  //#region [REUSEABLE LOCATORS]
  deleteProductButton(product: String) {
    return this.page.locator(`(//*[@aria-label="${product}"])[2]/ancestor::*[contains(@class, 'position-relative')]//button[contains(@class, 'delete')]`);
  }

  hasBeenRemovedLabel(product: String) {
    return this.page.locator(`//ul[contains(@class, 'cartProductDetailItem_removed-product-list')]//span[contains(normalize-space(), '${product}')]`);
  }
  //#endregion

  //#region [REUSEABLE METHODS]
  async removeProduct(product: String) {
    await checkElementVisibility(this.deleteProductButton(product));
    await clickElement(this.deleteProductButton(product));
  }

  async checkProductPriceIsDisplayed(price: string) {
        const priceLabel = this.productPricelabel;
        const priceValue = priceLabel.innerText();
        expect(priceValue).toEqual(price);
    }

    async checkProductQuantityIsDisplayed(price: string) {
        const priceLabel = this.productPricelabel;
        const priceValue = priceLabel.innerText();
        expect(priceValue).toEqual(price);
    }
    //#endregion
}
