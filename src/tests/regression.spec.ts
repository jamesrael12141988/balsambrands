import { PopUp } from '../pages/popup.fixture';
import { BASE_URL } from '../utils/env';
import { CartPage } from '../pages/cart.fixture';
import { HomePage } from '../pages/home.fixture';
import { ProductPage } from '../pages/product.fixture';
import { test, expect } from '@playwright/test';
import { checkElementVisibility } from '../utils/ui-actions';

import testData from '../data/testData.json';

test(`@regression attempt to buy a product: ${testData.validInput.searchQuery}`, async ({ page }) => {
  const popup = new PopUp(page);
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const productPage = new ProductPage(page);
  
  await homePage.navigateHomepage();
  await homePage.removeHomeBanner();
  await homePage.searchQuery(testData.validInput.searchQuery);
  await homePage.selectResult(3); // Selects the 3rd result
  
  await productPage.selectHeight(testData.validInput.height);
  await productPage.selectProductLights(testData.validInput.lights);
  
  await popup.removePopupIfVisible(); // TODO: Popup Dialog appears randomly

  //GET THE PRICE AND QUANTITY----------------
  const productPrice = productPage.pricelabel;
  const price = await productPrice.innerText();
  console.log('Product Price:', price);

  const productQuantity = productPage.quantityLabel;
  const quantity = await productQuantity.innerText();
  console.log('Product Quantity:', quantity);

  //STORE THE PRICE AND QUANTITY INTO A JSON FILE IF STILL HAVE TIME 
  
  await productPage.clickAddToCart();
  await productPage.viewCart();

  //VALIDATE PRICE AND QUANTITY IN THE CART
  // const cartPrice = cartPage.cartPriceLabel; // TODO: Update locators
  // const cartPriceValue = await cartPrice.innerText(); // TODO: Update locators
  // console.log('Cart Price:', cartPriceValue); // TODO: Update locators

  // const cartQuantity = cartPage.cartQuantityLabel; // TODO: Update locators
  // const cartQuantityValue = await cartQuantity.innerText(); // TODO: Update locators
  // console.log('Cart Quantity:', cartQuantityValue); // TODO: Update locators

  // expect(price).toBe(cartPriceValue);
  // expect(quantity).toBe(cartQuantityValue);

  await page.waitForTimeout(3000);

  await cartPage.removeProduct(testData.validInput.productName);
  await checkElementVisibility(cartPage.hasBeenRemovedLabel(testData.validInput.productName), { checks: 3, timeout: 30000 });
});