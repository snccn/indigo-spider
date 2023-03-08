import puppeteer from "puppeteer";


class Browser{
    browserInstance: any
    headless: boolean = true
    constructor(headless: boolean) {
        this.headless = headless
    }
    async init_puppeteer() {
        this.browserInstance = await puppeteer.launch({headless: this.headless})
    }
    async openPage(uri: string) {
        var page = await this.browserInstance.newPage()
        await page.goto(uri)
        await page.setViewport({width: 1080, height: 1024});
        return page
    }
    async closeBrowserInstance() {
        this.browserInstance.close()
    }
}


export default Browser