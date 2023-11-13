import Browser from "../utils/browser";
import env from "../utils/env";
var $ = env;


(async () => {
    var a = new Browser(true)
    await a.init_puppeteer()
    var page = await a.openPage('http://127.0.0.1:8000').then(async page => {
        var contents = await page.content()
        // $.log.info(page)
        var rr = $.XML.parser.parse(contents);
        $.log.info(rr.html.head.body.pre["#text"])
        a.closeBrowserInstance()
    })
})();

