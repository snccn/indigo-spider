import * as fs from 'fs' 

export interface PlainText {
    path: string,
    filename: string,
}

export function WriteFile(f:PlainText, data: string, callback:any) {
    fs.writeFile(f.path+f.filename, data, function(err){
        if (err) {
            return console.error(err);
        }
        callback()
    })
}

export function Readfile(f:PlainText,callback:any) {
    fs.readFile(f.path+f.filename, function(err,data) {
        if (err) {
            return console.error(err)
        }
        callback(data)
    })
}
