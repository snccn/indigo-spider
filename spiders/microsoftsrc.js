const env = require("./utils/env")
var { database } = require('./utils/database')
var $ = env.env

const spiderconf = {
  url: 'https://api.msrc.microsoft.com/sug/v2.0/zh-CN/vulnerability',
  type: 'xhr',
  author: 'snccn',
  date: '2023-02-24',
  save: 'mysql',
  mysqluri: 'mysql://192.168.199.222:3306/spiders?user=pi&password=4dmin029',
  tablename: 'microsoft_src',
  proxy: 'socks5://127.0.0.1:6153', // support socks5 proxy
  headers: {
    'authority': 'api.msrc.microsoft.com',
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7',
    'access-control-allow-origin': '*',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'dnt': '1',
    'origin': 'https://msrc.microsoft.com',
    'pragma': 'no-cache',
    'referer': 'https://msrc.microsoft.com/',
    'sec-ch-ua': `"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"`,
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': `"macOS"`,
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
  }
}

const init_database = () => {
  return new Promise((resolve, reject) => {
    var db = new database(spiderconf.mysqluri)
    db.then(res => {
      res.schema.createTableIfNotExists(spiderconf.tablename, (table) => {
        table.string('id').primary();
        table.string('cveTitle').notNullable();
        table.string('cveNumber').notNullable();
        table.string('vulnType');
        table.string('mitreText');
        table.string('mitreUrl');
        table.string('publiclyDisclosed');
        table.string('exploited');
        table.string('latestSoftwareRelease');
        table.string('olderSoftwareRelease');
        table.string('denialOfService');
        table.string('tag');
        table.string('issuingCna');
        table.string('severity');
        table.string('impact');
        table.string('baseScore');
        table.string('temporalScore');
        table.string('vectorString');
        table.string('releaseDate')
      }).then(res => {
        $.log.info('数据表microsoft_src创建完毕')
        resolve(db)
      })
    })
  })
}

const basicHttpRequets = (url) => {
  return $.get({
    url: url,
    headers: spiderconf.headers,
  })
}
function GetData(s, e, db) {
  uri_query = (s, e) => `?%24orderBy=cveNumber+desc&%24filter=%28releaseDate+gt+${s}T00%3A00%3A00%2B08%3A00+or+latestRevisionDate+gt+${s}T00%3A00%3A00%2B08%3A00%29+and+%28releaseDate+lt+${e}T23%3A59%3A59%2B08%3A00+or+latestRevisionDate+lt+${e}T23%3A59%3A59%2B08%3A00%29`
  basicHttpRequets(`${spiderconf.url}${uri_query(s, e)}`).then(res => {
    // console.log(res.value)
    res.value.forEach(async element => {
      try {
        await db(spiderconf.tablename).insert([
          {
            id: element.id,
            cveTitle: element.cveTitle,
            cveNumber: element.cveNumber,
            vulnType: element.vulnType,
            mitreText: element.mitreText,
            mitreUrl: element.mitreUrl,
            publiclyDisclosed: element.publiclyDisclosed,
            exploited: element.exploited,
            latestSoftwareRelease: element.latestSoftwareRelease,
            olderSoftwareRelease: element.olderSoftwareRelease,
            denialOfService: element.olderSoftwareRelease,
            tag: element.tag,
            issuingCna: element.issuingCna,
            severity: element.severity,
            impact: element.impact,
            baseScore: element.baseScore,
            temporalScore: element.temporalScore,
            vectorString: element.vectorString,
            releaseDate: element.releaseDate
          }
        ]
        )
        $.log.info(`获取数据 title: ${element.cveTitle} - ${element.cveNumber}`)
      } catch (e) {
        $.log.debug(`数据存在 title: ${element.cveTitle} - ${element.cveNumber} 跳过`)
      }
    });
    db.client.destroy()
    $.log.info(`任务完成数据库连接断开`)
  })
}
init_database().then(db => {
  GetData('2022-12-28', '2023-02-24', db)
})