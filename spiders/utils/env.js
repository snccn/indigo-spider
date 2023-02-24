
const axios = require('axios').default
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser")
const SocksProxyAgent = require('socks-proxy-agent')
const { logger } = require('./logger')
const moment = require('moment')
const env =  {
    process,
    get(options) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                ...options
            }).then(res=> {
                resolve(res.data)
            }).catch((e) => {
                reject(e)
            })
        })
    },
    post(options) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                ...options
            }).then(res=> {
                resolve(res.data)
            }).catch((e) => {
                reject(e)
            })
        })
    },
    XML: {
        parser: new XMLParser(),
        builder: new XMLBuilder()
    },
    log:  logger,
    time: moment,
    proxy(uri){
        return new SocksProxyAgent.SocksProxyAgent(uri)
    }
}

exports.env = env