import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { HomePage } from "../pages/HomePage";
import { CustomWorld } from "../support/World";
import {expect} from "@playwright/test";

setDefaultTimeout(60000);

Given('user opens application', async function (this: CustomWorld) {
    this.homePage = new HomePage(this.page);
    await this.homePage.openApplication();
});

Then('verify home page is displayed', async function (this: CustomWorld) {
    expect(await this.homePage.isHomePageDisplayed()).toBeTruthy();
});

When('user clicks on the activities tab', async function (this: CustomWorld) {
    await this.homePage.clickOnActivitiesTab();
});