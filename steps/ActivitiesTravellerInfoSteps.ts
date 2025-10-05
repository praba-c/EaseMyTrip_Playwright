import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/World";
import { expect } from "playwright/test";
import { ActivityTravellerInfoPage } from "../pages/ActivityTravellerInfoPage";

Then('verify user is on user information page', async function (this: CustomWorld) {
    this.activityTravellerInfoPage = new ActivityTravellerInfoPage(this.page);
    expect(await this.activityTravellerInfoPage.isActitvityTravelerInfoPageDisplayed()).toBeTruthy();
});

When('user fills the details:', async function (this: CustomWorld, dataTable) {
    await this.activityTravellerInfoPage.fillDetails(dataTable);
});

Then('print the price details', async function (this: CustomWorld) {
    await this.activityTravellerInfoPage.printPriceDetails();
});