import Browser from "../utils/browser";
import env from "../utils/env";
var $ = env;


(async () => {
    var a = new Browser(false)
    await a.init_puppeteer()
    var page = await a.openPage('https://www.baidu.com').then(async page => {
        var contents = await page.content()
        // $.log.info(page)
        var rr = $.XML.parser.parse(contents);
        $.log.info(rr.html.head);
        // a.closeBrowserInstance()
    })
})();

