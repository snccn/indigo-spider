import { AxiosResponse } from "axios";
import * as XLSX from "xlsx";
import XlsxUtils from "../utils/xlsx";
import { Spider, SpiderManifest } from "../indigo-sdk/spider"

import Browser from "../utils/browser";

class laplaceSpider extends Spider {
  contents = ""
  browser: Browser | undefined
  constructor() {
    var spiderconf: SpiderManifest = {
      id: "Laplace_spider_v2",
      name: "Laplace_spider",
      url: "https://laplace.live/covers.xml",
      type: "rss",
      author: "snccn",
      date: "2023-11-13",
      save: "excel",
      databaseuri: "./results/laplace.xlsx",
      table: "",
      proxy: "",
      headers: {

      }
    }
    super(spiderconf)
  }
  prepare(): Promise<Boolean> {
    return new Promise<Boolean>(async (resolve, reject) => {
      try {
        this.browser = new Browser(false)
        await this.browser.init_puppeteer()
        var page = await this.browser.openPage(this.manifest.url)
        var contents = await page.content()
        this.contents = contents
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })
  }
  _run(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      var d: string = this.contents
      var op = [["标题", "描述", "发布时间", "作者", "URL"]];
      const workbook = XLSX.utils.book_new();
      var rr = this.$.XML.parser.parse(d);
      // console.log(rr.html.body.div[0].rss.channel)
      // this.$.log.info(rr.html.body.div[0].rss.channel.item);
      // this.$.log.info(rr.rss.channel.link);
      // this.$.log.info(rr.rss.channel.language);
      // this.$.log.info(rr.rss.channel.description);

      rr.html.body.div[0].rss.channel.item.forEach((ele: any) => {
        op.push([
          ele.title,
          ele.description,
          ele.pubDate,
          ele.author,
          ele.enclosure["@_url"],
        ]);
      });

      this.$.log.info("保存到EXCEL文件: filename: " + this.manifest.databaseuri);
      const sheet = XLSX.utils.aoa_to_sheet(op);
      XlsxUtils.setSheetData(sheet, op);
      XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");

      // 将工作簿保存为Excel文件并下载到本地
      const filename = this.manifest.databaseuri;
      XlsxUtils.writeWorkbook(workbook, filename);
      this.$.log.info("保存到EXCEL文件完成: filename: " + this.manifest.databaseuri);
      resolve("success")
    })
  }
  _clean() {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        await this.browser?.browserInstance.close()
        resolve(true)
      } catch (e){
        console.log(e)
        reject(false)
      }
    })
  }
}


(async () => {
  var spi = new laplaceSpider()
  spi.Run()
})()