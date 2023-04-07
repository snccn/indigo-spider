## Indigo-spider 爬虫框架

**indigo系列能力工具，爬虫系列**

本仓库用于对目标站点进行爬虫， 并将数据进行统一收纳。 使用typescript实现针对于站点的爬虫，当前爬虫列表如下

|爬虫名称|爬虫分类|站点地址|数据存放目标|
|:--:|:--:|:--:|:--:|
|it之家|RSS|http://www.ithome.com/rss|none|
|laplace直播站点|RSS|https://laplace.live/covers.xml|excel|
|MSRC微软应急响应中心|XHR|https://msrc.microsoft.com|mysql|


目前仓库支持mysql数据库、excel文件两种爬虫结果输出方式，具体使用方法参见`test`目录

### TODO

- [] chrome浏览器爬虫
- [] 爬虫编写文档
- [] 数据库相关参数采用环境变量导入方式进行处理
- [] 使用rabbitmq或redis进行任务分发以及调度
- [] 爬虫扩充以及维护