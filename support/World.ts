import { After, Before, setWorldConstructor } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "playwright"; 
import { HomePage } from "../pages/HomePage";
import { ActivitiesPage } from "../pages/ActivitiesPage";
import { ActivityDetailsPage } from "../pages/ActivityDetailsPage";
import { ActivityTravellerInfoPage } from "../pages/ActivityTravellerInfoPage";

export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext; 
    page!: Page;
    homePage!: HomePage;
    activitiesPage!: ActivitiesPage;
    activityDetailsPage!: ActivityDetailsPage;
    activityTravellerInfoPage!: ActivityTravellerInfoPage;

    async init() {
        this.browser = await chromium.launch({headless: false});
        this.context = await this.browser.newContext({
            permissions: []
        });
        this.page = await this.context.newPage();
        
        this.homePage = new HomePage(this.page);
    }

}

setWorldConstructor(CustomWorld);

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld) {
    await this.browser.close();
})