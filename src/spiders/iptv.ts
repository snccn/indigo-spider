import { AxiosResponse } from "axios";
import {PlainText,WriteFile} from "../utils/plaintext"
import { Spider, SpiderManifest } from "../indigo-sdk/spider"

class IPTVSpider extends Spider {
    constructor(){
        var spiderconf : SpiderManifest = {
            id: "IPTV_CU",
            name: "陕西联通直播源爬虫",
            url: "http://shanxiunicom.livehot.wasu.tv/weekhot_cs2/interfaces/liveChannel.do",
            type: "rss",
            author: "snccn",
            date: "2024-1-15",
            save: "plaintext",
            databaseuri: "./results/iptv.m3u8",
            table: "",
            proxy: "",
            headers: {
                
            }
        }
        super(spiderconf)
    }
    _run(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.$.get({
                url: this.manifest.url
            }).then((res: AxiosResponse<any,any>) => {
                var d:string = res.data.data.items
                var output = "#EXTM3U\n"
                
                res.data.data.items.forEach((element: any) => {
                    // console.log(element)
                    output += HandleM3u8(element)
                });

                var a : PlainText = {
                   path: this.manifest.databaseuri,
                   filename: ""
                }
                WriteFile(a, output ,() => {
                    console.log("Fetch IPTV data complete")
                })
                
                // var iptvlist  = JSON.parse(d)
                // console.log(iptvlist.data.channel)
            })
            resolve("#EXTM3U")
        })
    }
}

function HandleM3u8(element: any){
    var infoline = `#EXTINF:-1 tvg-name="${element.channelName}" tvg-id="${element.channelName}" group-title="${element.type}",${element.channelName}\n${element.playUrl}\n`
    return infoline
}

(async () => {
    var spi = new IPTVSpider()
    spi.Run()
})()