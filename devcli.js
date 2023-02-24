const repl = require('node:repl');
const env = require("./spiders/utils/env")
var { database } = require('./spiders/utils/database')
var $ = env.env
console.log("WelCome To Indigo spider REPL")
console.log('输入.help获取帮助')

const r = repl.start('> ');
Object.defineProperty(r.context, '$', {
    configurable: false,
    enumerable: true,
    value: $,
});
Object.defineProperty(r.context, 'd', {
    configurable: false,
    enumerable: true,
    value: database,
});