import { test } from '@playwright/test';
import { HomePage } from '../pages/home.fixture';
import testData from '../data/testData.json';
import { ProductPage } from '../pages/product.fixture';
import { CartPage } from '../pages/cart.fixture';
import { checkElementVisibility } from '../utils/ui-actions';
import { BASE_URL } from '../utils/env';
import { PopUp } from '../pages/popup.fixture';

/**
 * Regression test
 */
test(`@regression attempt to add and remove a product to cart: ${testData.validInput.searchQuery}`, async ({ page }) => {
  const homePage = new HomePage(page);
  const popup = new PopUp(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.navigateHomepage();
  await homePage.removeHomeBanner();
  await homePage.searchQuery(testData.validInput.searchQuery);
  await homePage.selectResult(3); // Selects the 3rd result
  
  await productPage.selectHeight(testData.validInput.height);
  await popup.removePopupIfVisible(); // <-- popup dialog promo that randomly appears
  await productPage.selectProductLights(testData.validInput.lights);
  await popup.removePopupIfVisible(); // <-- popup dialog promo that randomly appears

  //GET THE PRODUCT NAME AND PRICE
  //STORE PRODUCT DETAILS IN JSON FILE IF STILL HAVE TIME--------
  const productPrice = productPage.priceLabel;
  const productQuantity = productPage.quantityLabel;

  const price = await productPrice.innerText();
  const quantity = await productQuantity.innerText();
  console.log('Price:', price);
  console.log('Quantity:', quantity);
  
  await popup.removePopupIfVisible(); // <-- popup dialog promo that randomly appears
  await productPage.clickAddToCart();
  await popup.removePopupIfVisible(); // <-- popup dialog promo that randomly appears
  await productPage.viewCart();

  //VALIDATE PRICE AND QUANTITY
  await cartPage.checkProductPriceIsDisplayed(price);
  await cartPage.checkProductQuantityIsDisplayed("quantity"); // TODO: ADD QUANTITY
  
  await popup.removePopupIfVisible(); // <-- popup dialog promo that randomly appears
  
  await cartPage.removeProduct(testData.validInput.productName);
  await page.pause();
  await popup.removePopupIfVisible(); // <-- popup dialog promo that randomly appears
  await page.pause();
  await checkElementVisibility(cartPage.hasBeenRemovedLabel(testData.validInput.productName), { checks: 3, timeout: 30000 });
});