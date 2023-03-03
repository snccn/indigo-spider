const logger = require('pino')({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  })
  
export {
    logger
}