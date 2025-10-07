import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "../support/World";
import { ActivitiesPage } from "../pages/ActivitiesPage";
import { expect } from "playwright/test";

setDefaultTimeout(60000);

Then('verify activities page is displayed', async function (this: CustomWorld) {
    this.activitiesPage = new ActivitiesPage(this.page, this.context);
    expect(await this.activitiesPage.isActivitiesPageDisplayed()).toBeTruthy();
});

When('user selects the {string}', async function (this: CustomWorld, location: string) {
    await this.activitiesPage.selectPlace(location);
});

Then('verify activities related to the location where displayed', async function (this: CustomWorld) {
    expect(await this.activitiesPage.verifyActivitiesRelatedToTheLocationWhereDisplayed()).toBeTruthy();
});

Then('apply filter {string} and {string}', async function (this: CustomWorld, duration: string, special: string) {
    await this.activitiesPage.applyFilterAnd(duration, special);
});

When('user clicks on book now button on a package that contains {string}', async function (this: CustomWorld, keyword: string) {
    await this.activitiesPage.selectActivity(keyword);
    this.page = this.activitiesPage.page;
});

Then('sort the suggestions by {string}', async function (this: CustomWorld, sortOption) {
    await this.activitiesPage.sort(sortOption);
});

Then('verify suggestions are sorted based on {string}', async function (this: CustomWorld, sortOption) {
    await this.activitiesPage.validateSort(sortOption);
});