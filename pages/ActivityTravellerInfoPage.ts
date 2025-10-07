import { DataTable } from "@cucumber/cucumber";
import { Locator, Page } from "playwright/test";

export class ActivityTravellerInfoPage {

    page: Page;
    titleTab: Locator;
    firstNameTab: Locator;
    lastNameTab: Locator;
    priceDetails: Locator;
    titleOptions: Locator;


    constructor(page: Page) {
        this.page = page;
        this.titleTab = page.locator("//div[text()='Title']");
        this.firstNameTab = page.getByPlaceholder('Enter Your First Name');
        this.lastNameTab = page.getByPlaceholder('Enter Your Last Name');
        this.priceDetails = page.locator('._dvsnglfre.flx.jsb.wt700.drkorg.f18');
        this.titleOptions = page.locator("//div[@class='drp_tmslct f14']//li");
    }

    async isActitvityTravelerInfoPageDisplayed() {
        (await this.page.waitForSelector('._nwfrdv')).isVisible();
        const visiblity = await this.priceDetails.isVisible();
        return visiblity;
    }

    async fillDetails(dataTable: DataTable) {
        const data = dataTable.hashes();

        for (let i = 0; i < await this.firstNameTab.count(); ++i) {
            let row = data[i];
            await this.titleTab.nth(0).click();
            for (let j = i * 3; j < await this.titleOptions.count(); ++j) {
                const titleValue = await this.titleOptions.nth(j).textContent() || "";
                if (row.prefix === titleValue.toString()) {
                    await this.titleOptions.nth(j).click();
                    break;
                }
            }
            await this.firstNameTab.nth(i).fill(row.firstName);
            await this.lastNameTab.nth(i).fill(row.lastName);
        }
    }

    async printPriceDetails() {
        //console.log(this.priceDetails.textContent());
    }
}