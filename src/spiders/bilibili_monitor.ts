import { AxiosResponse } from "axios";
import env from "../utils/env";
var $ = env;

const spiderconf = {
  url: "https://api.bilibili.com/x/web-interface/online/list",
  type: "xhr",
  author: "snccn",
  date: "2023-4-14",
  save: "excel",
  filepath: "./results/ithome.xlsx",
  headers: {
    accept: "*/*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7",
    "sec-ch-ua":
      '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    Referer: "https://www.bilibili.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
};

(async () => {
  $.get({
    url: spiderconf.url,
  }).then((res: AxiosResponse<any, any>) => {
    var allc:number = 0;
    $.log.info("=============")
    $.log.info("Date: "+ Date())
    if (!res.data.code) {
      res.data.data.forEach((ele: any) => {
        $.log.info("\t" + ele.bvid + "\t" + ele.online_count + "\t" + ele.title);
        allc += parseInt(ele.online_count)
      });
    }
    $.log.info("======RESULT=======")
    $.log.info("\tDate: "+ Date())
    $.log.info("\tAll count of top 20 is: " + allc)
    $.log.info("======RESULTEND=======")
  });
})();
