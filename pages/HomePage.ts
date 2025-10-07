import {Page, Locator} from "@playwright/test";

export class HomePage {

    page: Page;
    logo: Locator;
    activitiesTab: Locator;
    closeBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('.emt_header');
        this.activitiesTab = page.locator("//span[text()='Activities']");
        this.closeBtn = page.locator('.close_o_pp2');
    }

    async openApplication() {
        await this.page.goto('https://www.easemytrip.com/');
    }

    async isHomePageDisplayed(): Promise<any> {
        await this.closeBtn.click();
        (await this.page.waitForSelector('.emt_header')).isVisible();
        const visible = await this.logo.isVisible();
        return visible;
    }

    async clickOnActivitiesTab() {
        await this.activitiesTab.click();
    }

}