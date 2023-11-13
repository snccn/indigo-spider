import puppeteer, { Page } from "puppeteer";


class Browser {
    browserInstance : any
    headless: boolean = false
    constructor(headless: boolean) {
        this.headless = headless
    }
    async init_puppeteer() {
        if (this.headless) {
            this.browserInstance = await puppeteer.launch({ headless: "new" })
        } else {
            this.browserInstance = await puppeteer.launch({ headless: this.headless })
        }
    }
    async openPage(uri: string): Promise<Page> {
        return new Promise<Page>(async (resolve, reject) => {
            var page = await this.browserInstance.newPage()
            page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36").then(async () => {
                await page.goto(uri)
                await page.setViewport({ width: 1080, height: 1024 });
                resolve (page)
            })
        })
    }
    async closeBrowserInstance() {
    this.browserInstance.close()
}
}


export default Browser