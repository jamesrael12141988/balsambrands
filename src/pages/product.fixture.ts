import { Page, Locator } from '@playwright/test';
import { PopUp } from './popup.fixture';
import { clickElement } from '../utils/ui-actions';

export class ProductPage {
    readonly page: Page;
    addToCartButton: Locator;
    viewCartButton: Locator;
    popupCloseButton: Locator;
    productPricelabel: Locator;
    addToCartButtonproductQuantity: Locator;

    constructor(page: Page) {
        this.page = page;

        // Product detail locators
        this.addToCartButton = page.getByTestId('produt-detail-container').getByTestId('pdc-btn-addtocart');
        this.productPricelabel = page.locator("//span[contains(@class, 'productPrice_new-price')]/span");
        this.addToCartButtonproductQuantity = page.getByTestId('pdc-input-totalquantity');

        // Dialog window locators
        this.viewCartButton = page.getByTestId('pdc-add-to-cart-modal-btn-viewcart');
        this.popupCloseButton = page.getByRole('img', { name: 'close icon' });
    }

    //#region [REUSEABLE LOCATORS] for christmas tree results
    productHeightFilter(height: number): Locator {
        return this.page.locator(`//*[@aria-labelledby='product_filter_height']//span[contains(@class, 'text-break renderSelectBoxFilterItem_attribute-name')][contains(normalize-space(), '${height}')]`);
    }

    productLights(light: string): Locator {
        return this.page.locator(`//*[@aria-labelledby='product_filter_lights']//span[contains(@class, 'text-break renderSelectBoxFilterItem_attribute-name')][contains(normalize-space(), '${light}')]`);
    }
    //#endregion

    //#region [REUSEABLE METHODS] for christmas tree results
    async selectHeight(height: number) {
        await clickElement(this.productHeightFilter(height));
    }

    async selectProductLights(lights: string) {
        await clickElement(this.productLights(lights));
    }

    async clickAddToCart() {
        const popup = new PopUp(this.page);
        await popup.removePopupIfVisible();
        await clickElement(this.addToCartButton);
    }

    async viewCart() {
        const popup = new PopUp(this.page);
        await popup.removePopupIfVisible();
        await clickElement(this.viewCartButton);
    }
    //#endregion

    //#region [REUSEABLE METHODS] for Wreath Filters
    //#endregion

    //#region [REUSEABLE METHODS] for Garland Filters
    //#endregion
}



