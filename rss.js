// basic spider of nodejs

require("./spiders/utils/env")

$.get($.process.argv[2]).then(res => {
    var rr = $.XML.parser.parse(res)
    // $.log.info(rr)
    $.log.info(rr)
})