import { AxiosResponse } from "axios";
import env from "../utils/env";
var $ = env;

const spiderconf = {
  url: "https://laplace.live/covers.xml",
  type: "rss",
  author: "snccn",
  date: "2023-02-23",
  save: "none",
};

$.get({
  url: spiderconf.url,
}).then((res: AxiosResponse<any, any>) => {
  var d: string = res.data;
  var rr = $.XML.parser.parse(d);
  $.log.info(rr.rss.channel.title);
  $.log.info(rr.rss.channel.link);
  $.log.info(rr.rss.channel.language);
  $.log.info(rr.rss.channel.description);
});