## indigo-spider 爬虫

### 描述

本仓库用于对目标站点进行数据爬取操作， 目前支持如下功能

1. 组装`Axios`(网络请求) 、 `fast-xml-parser`(XML解析)、`pino`(日志)库
2. 将Knex进行封装，用于将数据存储至关系型数据库
3. 使用`puppeteer`操作chrome浏览器,对需要的站点使用无头浏览器进行爬取
4. 使用`XLSX`库进行excel输出源支持

### 当前支持的爬虫
|爬虫名称|类型|URL|输出目标|
|:--|:--:|:--|:--|
|bilibili_monitor|XHR|https://www.bilibili.com/video/online.html|console|
|ithome|RSS|https://www.ithome.com/rss/|console|
|laplace_live|RSS|https://laplace.live/covers.xml|excel|
|microsoftsrc|XHR|https://msrc.microsoft.com/update-guide/vulnerability|mysql|

### 安装与使用
本仓库采用`ts-node`编写, 使用typescript进行编写, 可使用npm或yarn进行依赖管理以及爬虫启动。
```bash
yarn install
# npm install
```

启动爬虫
```bash
yarn go ./src/spider/bilibili_monitor.ts
# npm run go ./src/spider/bilibili_monitor.ts
```

进入爬虫交互式命令行
```bash
yarn go ./devcli.ts
# npm run go ./devcli.ts
```


### 自定义爬虫
自定义爬虫可将爬虫文件创建至`./src/spider/`目录下, 后缀名为`xxx.ts`

```typescript
import { AxiosResponse } from "axios";
import env from "../utils/env";
import * as XLSX from "xlsx";
import XlsxUtils from '../utils/xlsx'
var $ = env;
// 爬虫设置文件, 包含爬虫属性
// TODO 后续会将爬虫属性设置为ts interface以统一爬虫格式
const spiderconf = {
  url: "https://www.ithome.com/rss/",
  type: "rss",
  author: "snccn",
  date: "2023-02-23",
  save: "excel",
  filepath: "./results/ithome.xlsx"
};
// 爬虫功能入口
(async () => {
  $.get({
    url: spiderconf.url,
  }).then((res: AxiosResponse<any, any>) => {
    // 根据axios响应结果对数据进行处理
    var d: string = res.data;
    var rr = $.XML.parser.parse(d);
    $.log.info(rr.rss.channel.title);
    $.log.info(rr.rss.channel.link);
    $.log.info(rr.rss.channel.language);
    $.log.info(rr.rss.channel.description);
    $.log.info(rr.rss.channel.item)
  });
})();
```
*详细爬虫创建可参见document(建设中)或./src/test/目录下文件*

