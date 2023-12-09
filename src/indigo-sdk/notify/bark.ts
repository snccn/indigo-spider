import {Notify, NotifyMessage} from "./notify";

interface BarkAPIServer {
    APIServer: string | undefined
    PushKey:string | undefined
}
export class BarkNotify extends Notify {
    ApiServer: BarkAPIServer
    constructor(msg:NotifyMessage) {
        super(msg);
        this.ApiServer = {
            APIServer: process.env.APISERVER,
            PushKey: process.env.PUSHKEY
        }
    }

    PackMessage(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            var res: string = `${encodeURI(this.message.Title)}/${encodeURI(this.message.From)}:${this.message.Content}`
            var params = []
            if (this.message.Badge != undefined) {
                params.push(`badge=${this.message.Badge}`)
            }
            if (this.message.Group != undefined) {
                params.push(`group=${this.message.Group}`)
            }
            if (this.message.TimeSensitive != undefined) {
                params.push(`level=timeSensitive`)
            }
            if (this.message.Icon != undefined) {
                params.push(`icon=${this.message.Icon}`)
            }
            if (this.message.URL != undefined) {
                params.push(`url=${this.message.URL}`)
            }
            if (params.length !== 0) {
                res += "?"
                res += params.join("&")
            }
            resolve(res)
        })
    }
    PushMessage(type: string): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject): void => {
            this.PackMessage().then(res => {
                var pushurl = `${this.ApiServer.APIServer}/${this.ApiServer.PushKey}/${res}`
                this.$.log.debug(pushurl)
                this.$.get({
                    url: pushurl
                }).then(res  => {
                    if (res.data.code == 200) {
                        this.$.log.info("Push Message Success")
                        resolve(true)
                    } else {
                        this.$.log.error("push failed" + res.data)
                        reject(false)
                    }
                })
            })
        })
    }
}

