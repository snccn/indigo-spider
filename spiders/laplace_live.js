
const env  = require("./utils/env")
var $ = env.env

const spiderconf = {
    url: 'https://laplace.live/covers.xml',
    type: 'rss',
    author: 'snccn',
    date: '2023-02-23',
    save: 'none'
}


$.get({
    url: spiderconf.url,
}).then(res => {
    var rr = $.XML.parser.parse(res)
    // $.log.info(rr.rss.channel.title)
    // $.log.info(rr.rss.channel.link)
    // $.log.info(rr.rss.channel.language)
    // $.log.info(rr.rss.channel.description)
    var reg = new RegExp(`<enclosure type="audio/m4a" url="(.*?)" />`, 'gi')
    res.replaceAll(reg, ($, $1) => {
        console.log($1)
    })
    // console.log(d)
    // rr.rss.channel.item.forEach(element => {

    //     // $.log.info(element.title + ':' + element.description.replaceAll('<br />', '')+ ':'+element.enclosure.url)
    //     console.log(element)
    // });
})