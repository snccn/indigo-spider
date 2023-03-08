import { AxiosResponse } from "axios";
import env from "../utils/env";
import * as XLSX from "xlsx";
import XlsxUtils from "../utils/xlsx";
var $ = env;

const spiderconf = {
  url: "https://laplace.live/covers.xml",
  type: "rss",
  author: "snccn",
  date: "2023-02-23",
  save: "excel",
  filepath: "./results/laplace_live.xlsx",
};

(async () => {
  $.get({
    url: spiderconf.url,
  }).then((res: AxiosResponse<any, any>) => {
    var d: string = res.data;
    var op = [["标题", "描述", "发布时间", "作者", "URL"]];
    const workbook = XLSX.utils.book_new();
    var rr = $.XML.parser.parse(d);
    $.log.info(rr.rss.channel.title);
    $.log.info(rr.rss.channel.link);
    $.log.info(rr.rss.channel.language);
    $.log.info(rr.rss.channel.description);

    rr.rss.channel.item.forEach((ele: any) => {
      op.push([
        ele.title,
        ele.description,
        ele.pubDate,
        ele.author,
        ele.enclosure["@_url"],
      ]);
    });

    $.log.info("保存到EXCEL文件: filename: "+ spiderconf.filepath);
    const sheet = XLSX.utils.aoa_to_sheet(op);
    XlsxUtils.setSheetData(sheet, op);
    XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");

    // 将工作簿保存为Excel文件并下载到本地
    const filename = spiderconf.filepath;
    XlsxUtils.writeWorkbook(workbook, filename);
    $.log.info("保存到EXCEL文件完成: filename: "+ spiderconf.filepath);
  });
})();
