import env from "../utils/env";
export interface SpiderManifest {
    id: string // uuid
    name: string // spidername
    url: string // baseuri
    type: string // xhr json xml browser ... etc
    author: string // author
    date: string // date
    save: string // xlsx text mysql ... etc
    databaseuri: string // database uri only for database
    table: string // database table name
    proxy: string // use proxy
    headers: {} // for databases 
}

export class Spider {
    $ = env
    manifest: SpiderManifest
    constructor(spider: SpiderManifest) {
        this.manifest = spider
    }
    // overwrite
    prepare(): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            resolve(true)
        })
    }
    Run() {
        this.prepare().then((res) => {
            if (res) {
                this._run().then(res => {
                    if (res) {
                        console.log(res)
                    } else {
                        console.error(res)
                    }
                    this._clean().then(res => {
                    })
                })
            }
        })
        console.log(this.manifest.name)

    }
    // overwrite
    _run(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve("success")
        })
    }
    // overwrite
    _clean() {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true)
        })
    }
}