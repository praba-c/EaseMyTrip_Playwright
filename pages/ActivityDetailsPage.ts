import { Locator, Page } from "playwright/test";

export class ActivityDetailsPage {

    page: Page;
    bookNowBtn: Locator;
    dateTab: Locator;
    dateBtn: Locator;
    adultTab: Locator;
    adultCount: Locator;
    addBtn: Locator;
    removeBtn: Locator;
    doneBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bookNowBtn = page.locator('.bkng_b');
        this.dateTab = page.locator('#traveldateTxt');
        this.dateBtn = page.locator('td span');
        this.adultTab = page.locator('#timeSlotSelected');
        this.adultCount = page.locator('#_adultCnt');
        this.addBtn = page.locator('#adultadd');
        this.removeBtn = page.locator('#adultsub');
        this.doneBtn = page.locator('.dn_btn');
    }

    async isActivityDetailsPageDisplayed() {
        (await this.page.waitForSelector('.bkng_b')).isVisible();
        const visiblity = await this.bookNowBtn.isVisible();
        return visiblity;
    }

    async selectDate(date: string) {
        await this.dateTab.click();

        for (let i = 0; i < await this.dateBtn.count(); ++i) {
            const dateValue = await this.dateBtn.nth(i).textContent() || "";
            if (date == dateValue) {
                await this.dateBtn.nth(i).click();
                break;
            }
        }
    }
    async addTravelers(count: string) {
        await this.adultTab.click();
        for (let i = 1; i < Number(count); ++i) {
            await this.addBtn.click();
        }
        await this.doneBtn.click();
    }

    async clickOnBookNowBtn() {
        await this.bookNowBtn.click();
    }
}