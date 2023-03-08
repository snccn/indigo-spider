import axios from "axios";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import {SocksProxyAgent} from 'socks-proxy-agent';
import url from 'url';
import moment from "moment";
import { logger } from "./logger";
export default {
  process,
  get(options: object) {
    return axios({
      method: "get",
      ...options,
    });
  },
  post(options: object) {
    return axios({
      method: "post",
      ...options,
    });
  },
  XML: {
    parser: new XMLParser(),
  },
  log: logger,
  time: moment,
  proxy(uri: string) {
    this.log.debug(uri);
    return new SocksProxyAgent(url.parse(uri));
  },
};
