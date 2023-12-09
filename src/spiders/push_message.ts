import {Notify} from "../indigo-sdk/notify/notify";
import {BarkNotify} from "../indigo-sdk/notify/bark";

(async () => {
    var notify: Notify = new BarkNotify({
        Title: process.argv.slice(2)[1],
        From: process.argv.slice(2)[0],
        Badge: undefined,
        Content: process.argv.slice(2)[2],
        Crypt: undefined,
        Date: "",
        Group: process.argv.slice(2)[0],
        Icon: undefined,
        TimeSensitive: undefined,
        URL: undefined
    })
    notify.PushMessage("default").then(res => {
    })
})()