import { UrlWithParsedQuery } from "url"
const urlparser = require('node:url')
const { logger } = require('./logger')
const knex  = require("knex")

interface DataBaseoptions {
  client: any,
  host: any,
  port: any,
  user: any,
  password: any,
  database: any,
  socketPath: any
}
interface URIPARAMS {
  user: any,
  password: any,
  unix_socket: any
}
class database {
  options: { client: any; host: any; port: any; user: any; password: any; database: any; socketPath: any }
  KnexInstence: any
  constructor(uri:string) {
    logger.debug(uri)
    const uriobj:UrlWithParsedQuery = urlparser.parse(uri, true)
    const uriquery = this.geturiquery(uriobj)
    this.options = {
      client: uriobj.protocol !== null ? uriobj.protocol.split(':')[0]:'',
      host: uriobj.hostname,
      port: uriobj.port === null ? 3306 : uriobj.port,
      user: uriobj.auth === null ? uriquery['user'] : uriobj.auth.split(':')[0],
      password: uriobj.auth === null ? uriquery['password'] : uriobj.auth.split(':')[1],
      database: uriobj.pathname !== null? uriobj.pathname.split('/')[1]: '',
      socketPath: uriquery['unix_socket']
    }
    this.KnexInstence = knex({
      // log: logger,
      client: this.options.client,
      connection: {
        host: this.options.host,
        port: this.options.port,
        user: this.options.user,
        password: this.options.password,
        database: this.options.database,
        socketPath: this.options.socketPath
      }
    })
  }
  geturiquery(uriobj:UrlWithParsedQuery) {
    var op:URIPARAMS = {
      user: '',
      password: '',
      unix_socket: ''
    }
    if (typeof uriobj.query === null) {
      return op
    } else {
      var v = uriobj.query || ''
      op.user = v['user']
      op.password = v['password']
      op.unix_socket = v['unix_socket']
      return op
    } 
  }
}

export default database
