import { BrowserContext, Locator, Page } from "playwright/test";

export class ActivitiesPage {

    page: Page;
    banner: Locator;
    availablePlaces: Locator;
    title: Locator;
    durationOptions: Locator;
    specialOptions: Locator;
    activities: Locator;
    context: any;
    sortOptions: Locator;
    price: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.banner = page.locator('.banner-home');
        this.availablePlaces = page.locator("//div[@class='owl-item active']//a/div[@class='citynm']");
        this.title = page.locator('#citynamesec');
        this.durationOptions = page.locator('#duration label');
        this.specialOptions = page.locator('#vspecial span');
        this.activities = page.locator('._cityname');
        this.sortOptions = page.locator('#srt_slct li');
        this.price = page.locator('._P_Price');
    }

    async isActivitiesPageDisplayed(): Promise<any> {
        await this.page.waitForSelector('.banner-home');
        const visible = await this.banner.isVisible();
        return visible;
    }

    async selectPlace(location: string) {
        for (let i = 0; i < await this.availablePlaces.count(); ++i) {
            const name = await this.availablePlaces.nth(i).textContent() || "";
            console.log('name ', name);
            if (location === name.toString().trim()) {
                await this.availablePlaces.nth(i).click();
                break;
            }
        }
    }

    async verifyActivitiesRelatedToTheLocationWhereDisplayed() {
        (await this.page.waitForSelector('#citynamesec')).isVisible();
        const visible = await this.title.isVisible();
        return visible;
    }

    async applyFilterAnd(duration: string, special: string) {
        for (let i = 0; i < await this.durationOptions.count(); ++i) {
            const option = await this.durationOptions.nth(i).textContent() || "";
            if (duration == option.toString().trim()) {
                await this.durationOptions.nth(i).click();
                break;
            }
        }

        for (let i = 0; i < await this.specialOptions.count(); i += 2) {
            const option = await this.specialOptions.nth(i).textContent() || "";
            if (special == option.toString().trim()) {
                await this.specialOptions.nth(i).click();
                break;
            }
        }
    }

    async selectActivity(keyword: string) {
        for (let i = 0; i < await this.activities.count(); ++i) {
            const name = await this.activities.nth(i).textContent() || "";
            if (keyword === name.toString().trim()) {
                const [newPage] = await Promise.all([
                    this.context.waitForEvent('page'),
                    this.activities.nth(i).locator('..').locator('..').locator('._bookhBtn').click()
                ]);
                await newPage.waitForLoadState("domcontentloaded");
                this.page = newPage;
                return;
            }
        }
    }

    async sort(option: string) {
        for (let i = 0; i < await this.sortOptions.count(); ++i) {
            
            const value = await this.sortOptions.nth(i).textContent() || "";
            if (value.toString().includes(option)) {
                await this.sortOptions.nth(i).click();
                break;
            }
        }
    }

    async validateSort(option: string) {
        if (option === 'Low to High') {
            for (let i = 1; i < 20; ++i) {
                const currvalue = await this.price.nth(i).textContent() || "";
                const currPriceValue = currvalue.toString().substring(2);

                const prevValue = await this.price.nth(i - 1).textContent() || "";
                const prevPriceValue = prevValue.toString().substring(2);

                if (Number(prevPriceValue) > Number(currPriceValue)) {
                    return false;
                }
            }
        } else {
            for (let i = 1; i < 20; ++i) {
                const currvalue = await this.price.nth(i).textContent() || "";
                const currPriceValue = currvalue.toString().substring(2);

                const prevValue = await this.price.nth(i - 1).textContent() || "";
                const prevPriceValue = prevValue.toString().substring(2);

                if (Number(prevPriceValue) < Number(currPriceValue)) {
                    return false;
                }
            }
        }
        return true;
    }
}