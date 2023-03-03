const repl = require('node:repl');
import env from "./src/utils/env";
import database from "./src/utils/database";
var $ = env
console.log("WelCome To Indigo spider REPL")
console.log('输入.help获取帮助')

const r = repl.start('> ');
Object.defineProperty(r.context, '$', {
    configurable: false,
    enumerable: true,
    value: $,
});
Object.defineProperty(r.context, 'database', {
    configurable: false,
    enumerable: true,
    value: database,
});