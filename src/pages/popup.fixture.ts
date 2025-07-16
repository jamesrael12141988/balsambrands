import { Page, Locator, expect } from '@playwright/test';
import { clickElement } from '../utils/ui-actions';

export class PopUp {
    readonly page: Page;
    popupCloseButton: Locator;
    loadingImage: Locator;
    popupCloseButton2: any;

    constructor(page: Page) {
        this.page = page;
        this.popupCloseButton = page.getByRole('img', { name: 'close icon' });
        this.popupCloseButton2 = page.getByRole('button', { name: '' });
        this.loadingImage = page.getByRole('img', { name: 'Loading' });
    }

    //#region [REUSEABLE METHODS]
    async removePopupIfVisible() {
        try {
            // if popup close button is display click it
            if (await this.popupCloseButton.isVisible()) {
                await clickElement(this.popupCloseButton);
                console.log('Popup closed.');
            }     
            
            if (await this.popupCloseButton2.isVisible()) {
                await clickElement(this.popupCloseButton2);
                console.log('Popup closed.');
            }
        } catch (ignored) {}
    }
    //#endregion
}



