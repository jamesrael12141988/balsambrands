import { Page, Locator, test } from '@playwright/test';
import { BASE_URL } from '../utils/env';
import { clickElement } from '../utils/ui-actions';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly bannerHomeCloseBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = this.page.locator('//*[@id="constructor-search-input"]');
    this.bannerHomeCloseBtn = this.page.getByTestId('close-cookie-banner');
  }

  //#region [REUSEABLE LOCATORS]
  result(number: number): Locator {
    return this.page.locator(`(//*[@data-cnstrc-item-section="Products"])[${number}]`);
  }
  //#endregion

  //#region [REUSEABLE METHODS]
  async navigateHomepage() {
    const url = BASE_URL || 'https://www.balsamhill.com/'; // TODO: url should be came from envi / To fix if still have time
    await this.page.goto(url);
  }

  async searchQuery(query: string) {
    await this.searchInput.fill(query);
  }

  async selectResult(index: number) {
    const resultItem = this.result(index);
    await clickElement(resultItem);
  }

  async removeHomeBanner() {
    await clickElement(this.bannerHomeCloseBtn);
  }

  //#endregion

}
