import { AxiosResponse } from "axios";
import env from "../utils/env";
import * as XLSX from "xlsx";
import XlsxUtils from '../utils/xlsx'
var $ = env;

const spiderconf = {
  url: "https://www.ithome.com/rss/",
  type: "rss",
  author: "snccn",
  date: "2023-02-23",
  save: "excel",
  filepath: "./results/ithome.xlsx"
};

(async () => {
  $.get({
    url: spiderconf.url,
  }).then((res: AxiosResponse<any, any>) => {
    var d: string = res.data;
    var rr = $.XML.parser.parse(d);
    $.log.info(rr.rss.channel.title);
    $.log.info(rr.rss.channel.link);
    $.log.info(rr.rss.channel.language);
    $.log.info(rr.rss.channel.description);
    $.log.info(rr.rss.channel.item)
  });
})();
