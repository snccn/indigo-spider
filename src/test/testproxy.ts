import { AxiosResponse } from "axios";
import env from "../utils/env";
var $ = env;

const spiderconf = {
    url: "http://ip.sb",
    type: "rss",
    author: "snccn",
    date: "2023-02-23",
    save: "none",
    proxy: "socks5://127.0.0.1:6153"
  };
  
  (async () => {
    $.get({
      url: spiderconf.url,
      Headers: {
        'User-Agent': 'curl/7.86.0'
      },
      proxy: false,
      httpsAgent: $.proxy(spiderconf.proxy),
    }).then((res: AxiosResponse<any, any>) => {
      var d: string = res.data;
      $.log.info(d)
    });
  })();
  