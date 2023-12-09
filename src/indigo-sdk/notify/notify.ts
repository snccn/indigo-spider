import env from "../../utils/env";

export interface NotifyMessage {
    Title: string;
    From: string;
    Date: string;
    Content: string;
    Icon: string | undefined;
    Group: string | undefined;
    Crypt: boolean | undefined;
    TimeSensitive: boolean | undefined;
    URL: string | undefined;
    Badge: number | undefined;
}

export class Notify {
    $ = env
    version = 1.0
    message: NotifyMessage
    constructor(msg: NotifyMessage) {
        this.message = msg
    }
    PushMessage(type: string): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            resolve(true)
        })
    }
    PackMessage(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve("")
        })
    }
}