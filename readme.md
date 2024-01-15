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
|laplace_live_v2|RSS|https://laplace.live/covers.xml|excel|
|iptv.ts|json|http://shanxiunicom.livehot.wasu.tv|m3u8|

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


### 自定义爬虫 v1
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

### 自定义爬虫 v2
为了方便后期将爬虫统一放入固定上下文中,目前升级使用javascript class的方式进行爬虫新增以及维护

以使用浏览器进行爬虫的laplace rss为例
```typescript
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
```
全新爬虫通过集成sdk中的爬虫类进行扩充, 执行逻辑为
1. 调用prepare方法,为当前爬虫准备上下文 这个方法可以被继承后重载. 例如示例中的初始化浏览器方法.
2. 调用_run方法,为爬虫准备好的上下文进行处理, 此处可以重新定义新爬虫对象等.
3. 调用_clean方法,对爬虫创建的上下文进行清理,例如示例中的关闭浏览器对象操作

### TODO
1. 爬虫编写文档
2. 数据库相关参数采用环境变量导入方式进行处理
3. 使用rabbitmq或redis进行任务分发以及调度
4. 爬虫扩充以及维护
5. 针对于无头浏览器以及调试中的浏览器进行反爬虫策略对抗