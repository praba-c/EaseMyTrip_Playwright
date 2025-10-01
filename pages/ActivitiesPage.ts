import { Locator, Page } from "playwright/test";

export class ActivitiesPage {
    
    page: Page;
    banner: Locator;
    availablePlaces: Locator;
    title: Locator;
    durationOptions: Locator;
    specialOptions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.banner = page.locator('.banner-home');
        this.availablePlaces = page.locator("//div[@class='owl-item active']//a/div[@class='citynm']");
        this.title = page.locator('#citynamesec');
        this.durationOptions = page.locator('#duration label');
        this.specialOptions = page.locator('#vspecial span');
    }

    async isActivitiesPageDisplayed(): Promise<any> {
        await this.page.waitForSelector('.banner-home');
        const visible = await this.banner.isVisible();
        return visible;
    }

    async selectPlace(location: string) {
        for (let i = 0; i < await this.availablePlaces.count(); ++i) {
            const name = await this.availablePlaces.nth(i).textContent() || "";
            if (location === name.toString()) {
                await this.availablePlaces.nth(i).click();
                break;
            }
        }
    }

    async verifyActivitiesRelatedToTheLocationWhereDisplayed() {
        await this.page.waitForSelector('#citynamesec');
        const visible = await this.title.isVisible();
        return visible;
    }

    async applyFilterAnd(duration: string, special: string) {
        for (let i = 0; i < await this.durationOptions.count(); ++i) {
            const option = await this.durationOptions.nth(i).textContent() || "";
            if (duration == option.toString()) {
                await this.durationOptions.nth(i).click();
                break;
            }
        }

        for (let i = 1; i < await this.specialOptions.count(); i += 2) {
            const option = await this.specialOptions.nth(i).textContent() || "";
            if (duration == option.toString()) {
                await this.specialOptions.nth(i).click();
                break;
            }
        }
    }

    async selectActivity(keyword: any) {
        
    }
}