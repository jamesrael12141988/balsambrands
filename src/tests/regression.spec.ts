import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.fixture';
import testData from '../data/testData.json';
import { ProductPage } from '../pages/product.fixture';
import { CartPage } from '../pages/cart.fixture';
import { checkElementVisibility } from '../utils/ui-actions';
import { BASE_URL } from '../utils/env';
import { PopUp } from '../pages/popup.fixture';

test(`@regression attempt to buy a product: ${testData.validInput.searchQuery}`, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateHomepage();
  await homePage.removeHomeBanner();
  await homePage.searchQuery(testData.validInput.searchQuery);
  await homePage.selectResult(3); // Selects the 3rd result

  const productPage = new ProductPage(page);
  await productPage.selectHeight(testData.validInput.height);
  await productPage.selectProductLights(testData.validInput.lights);
  
  await page.waitForTimeout(3000);

  const popup = new PopUp(page);
  await popup.removePopupIfVisible();



  //GET THE PRODUCT DETAILS--------
  //STORE PRODUCT DETAILS IN JSON FILE IF STILL-------- 
  
  //GET THE QUANTITY--------
    
  // const productPrice = await productPricelabel.allTextContents();
  // console.log('Product Price:', productPrice);

  const productPrice = productPage.productPricelabel;
  const price = await productPrice.innerText();
  console.log('Product Price:', price);
  
  await productPage.clickAddToCart();
  await productPage.viewCart();

  // await popup.waitUntilLoadingComplete();
  await page.waitForTimeout(3000);

  const cartPage = new CartPage(page);
  await cartPage.removeProduct(testData.validInput.productName);
  await checkElementVisibility(cartPage.hasBeenRemoved(testData.validInput.productName), { checks: 3, timeout: 30000 });
});