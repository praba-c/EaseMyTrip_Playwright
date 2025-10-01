import { Before, setWorldConstructor } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "playwright"; 
import { HomePage } from "../pages/HomePage";
import { ActivitiesPage } from "../pages/ActivitiesPage";

export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext; 
    page!: Page;
    homePage!: HomePage;
    activitiesPage!: ActivitiesPage;

    async init() {
        this.browser = await chromium.launch({headless: false});
        this.context = await this.browser.newContext({
            permissions: []
        });
        this.page = await this.context.newPage();
    }

}

setWorldConstructor(CustomWorld);

Before(async function (this: CustomWorld) {
  await this.init();
});