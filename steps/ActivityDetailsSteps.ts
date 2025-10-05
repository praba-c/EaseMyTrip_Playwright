import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "../support/World";
import { ActivityDetailsPage } from "../pages/ActivityDetailsPage";
import { expect } from "playwright/test";

setDefaultTimeout(60000);

Then('verify activity details page is displayed', async function (this: CustomWorld) {
    this.activityDetailsPage = new ActivityDetailsPage(this.page);
    expect(await this.activityDetailsPage.isActivityDetailsPageDisplayed()).toBeTruthy();
});

When('user selects the {string}, {string} and click on book now button', async function (this:CustomWorld, date, count) {
    await this.activityDetailsPage.selectDate(date);
    await this.activityDetailsPage.addTravelers(count);
    await this.activityDetailsPage.clickOnBookNowBtn();
});
