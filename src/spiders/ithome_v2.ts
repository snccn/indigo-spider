import { AxiosResponse } from "axios";
import * as XLSX from "xlsx";
import XlsxUtils from "../utils/xlsx";
import { Spider, SpiderManifest } from "../indigo-sdk/spider"

class laplaceSpider extends Spider {
    constructor(){
        var spiderconf : SpiderManifest = {
            id: "Laplace_spider_v2",
            name: "Laplace_spider",
            url: "https://www.ithome.com/rss/",
            type: "rss",
            author: "snccn",
            date: "2023-11-13",
            save: "excel",
            databaseuri: "./results/ithome.xlsx",
            table: "",
            proxy: "",
            headers: {
                
            }
        }
        super(spiderconf)
    }
    _run(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.$.get({
                url: this.manifest.url
            }).then((res: AxiosResponse<any,any>) => {
                var d:string = res.data
                var op = [["标题", "描述", "发布时间", "作者", "URL"]];
                const workbook = XLSX.utils.book_new();
                var rr = this.$.XML.parser.parse(d);
                this.$.log.info(rr.rss.channel.title);
                this.$.log.info(rr.rss.channel.link);
                this.$.log.info(rr.rss.channel.language);
                this.$.log.info(rr.rss.channel.description);

                rr.rss.channel.item.forEach((ele: any) => {
                    op.push([
                      ele.title,
                      ele.description,
                      ele.pubDate,
                      "ithome",
                      ele.guid,
                    ]);
                });

                this.$.log.info("保存到EXCEL文件: filename: "+ this.manifest.databaseuri);
                const sheet = XLSX.utils.aoa_to_sheet(op);
                XlsxUtils.setSheetData(sheet, op);
                XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");

                // 将工作簿保存为Excel文件并下载到本地
                const filename = this.manifest.databaseuri;
                XlsxUtils.writeWorkbook(workbook, filename);
                this.$.log.info("保存到EXCEL文件完成: filename: "+ this.manifest.databaseuri);
            })
            resolve("success")
        })
    }
}


(async () => {
    var spi = new laplaceSpider()
    spi.Run()
})()