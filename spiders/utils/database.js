
const knex = require('knex')
const urlparser = require('node:url')
const { logger } = require('./logger')

class database {
  constructor(uri) {
    logger.info(uri)
    const uriobj = urlparser.parse(uri)
    const uriquery = this.geturiquery(uriobj)
    const options = {
      client: uriobj.protocol.split(':')[0],
      host: uriobj.hostname,
      port: uriobj.port === null ? 3306 : uriobj.port,
      user: uriobj.auth === null ? uriquery['user'] : uriobj.auth.split(':')[0],
      password: uriobj.auth === null ? uriquery['password'] : uriobj.auth.split(':')[1],
      database: uriobj.pathname.split('/')[1],
      socketPath: uriquery['unix_socket']
    }
    return this.init_database(options)
  }
  geturiquery(uriobj) {
    var op = {}
    var v = uriobj.query.split('&')
    v.forEach(element => {
      op[element.split('=')[0]] = element.split("=")[1]
    })
    return op
  }
  init_database(options) {
    return new Promise((resolve, reject) => {
      try {
        const database = knex({
          // log: logger,
          client: options.client,
          connection: {
            host: options.host,
            port: options.port,
            user: options.user,
            password: options.password,
            database: options.database,
            socketPath: options.socketPath
          }
        })
        resolve(database)
      } catch(e){
        logger.error(e)
        reject(e)
      }
    })

  }
}

exports.database = database
