var { database } = require('./utils/database')
const env  = require("./utils/env")
var $ = env.env

var d = new database("mysql://192.168.199.222:3306/irp?user=pi&password=4dmin029")

d.then(res => {
    var connectstatus = res.raw('select @@version;')
    $.log.debug(connectstatus.sql)
    connectstatus.then(res => {
        // console.log(res[0])
        // console.log(res[1][0].name)
        $.log.info(`数据库连接成功-${JSON.stringify(res[0])}`)
        connectstatus.client.destroy()
        $.log.info(`数据库连接断开`)
    })
})