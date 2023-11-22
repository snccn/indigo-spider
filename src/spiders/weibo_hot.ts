import { AxiosResponse } from "axios";
import env from "../utils/env";
import * as XLSX from "xlsx";
import XlsxUtils from "../utils/xlsx";
import {json} from "stream/consumers";
import DeferredKeySelection from "knex";
var $ = env;

const spiderconf = {
    url: "https://v2.api-m.com/api/weibohot",
    type: "json",
    author: "snccn",
    date: "2023-10-27",
    save: "excel",
};


(async () => {
    $.get({
        url: spiderconf.url,
    }).then((res: AxiosResponse<any, any>) => {
        var d: any = res.data;
        // var op = [["标题", "描述", "发布时间", "作者", "URL"]];
        // const workbook = XLSX.utils.book_new();
        var rr = d
        if (rr.code === 200) {
            rr.data.forEach((ele: any) => {
                console.log(`T:${ele.title}Hot:${ele.hot}`)
            })
        }


        // rr.rss.channel.item.forEach((ele: any) => {
        //     op.push([
        //         ele.title,
        //         ele.description,
        //         ele.pubDate,
        //         ele.author,
        //         ele.enclosure["@_url"],
        //     ]);
        // });
        //
        // $.log.info("保存到EXCEL文件: filename: "+ spiderconf.filepath);
        // const sheet = XLSX.utils.aoa_to_sheet(op);
        // XlsxUtils.setSheetData(sheet, op);
        // XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
        //
        // // 将工作簿保存为Excel文件并下载到本地
        // const filename = spiderconf.filepath;
        // XlsxUtils.writeWorkbook(workbook, filename);
        // $.log.info("保存到EXCEL文件完成: filename: "+ spiderconf.filepath);
    });
})();
