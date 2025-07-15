import { Page, Locator, expect } from '@playwright/test';
import { clickElement } from '../utils/ui-actions';

export class PopUp {
    readonly page: Page;
    popupCloseButton: Locator;
    loadingImage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.popupCloseButton = page.getByRole('img', { name: 'close icon' });
        this.loadingImage = page.getByRole('img', { name: 'Loading' });
    }

    //#region [REUSEABLE METHODS]

    async removePopupIfVisible() {
        try {
        // await this.page.waitForTimeout(2000); // wait for the poup if will appear
        if (await this.popupCloseButton.isVisible()) {
            await clickElement(this.popupCloseButton);
        }            
        } catch (error) {
            console.warn('Popup not visible or already closed:', error);
        }
    }

    async waitUntilLoadingComplete() {
        try {
            // wait until the loading image is not visible
            await this.loadingImage.waitFor({ state: 'hidden', timeout: 60000 });           
        } catch (ignore) {}
    }
    //#endregion
}



