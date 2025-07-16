import { Page, Locator } from '@playwright/test';
import { BASE_URL } from '../utils/env';
import { clickElement } from '../utils/ui-actions';
import { PopUp } from './popup.fixture';

export class HomePage {
  
  readonly page: Page;
  readonly searchInput: Locator;
  readonly bannerHomeCloseBtn: Locator;

  
  constructor(page: Page) {
    this.page = page;
    this.searchInput = this.page.locator('//*[@id="constructor-search-input"]');
    this.bannerHomeCloseBtn = this.page.getByTestId('close-cookie-banner');
  }

  
  resultLabel(number: number): Locator {
    return this.page.locator(`(//*[@data-cnstrc-item-section="Products"])[${number}]`);
  }

  //#region [REUSEABLE METHODS]
  async navigateHomepage() {
    const url = BASE_URL || 'https://www.balsamhill.com/';
    await this.page.goto(url);
    // await this.page.maximizeWindow();
  }

  async searchQuery(query: string) {
    await this.searchInput.fill(query);
  }

  async selectResult(index: number) {
    const resultItem = this.resultLabel(index);
    await clickElement(resultItem);
  }

  async removeHomeBanner() {
    const popup = new PopUp(this.page);
    await popup.removePopupIfVisible();
    await clickElement(this.bannerHomeCloseBtn);
  }
  //#endregion

}
