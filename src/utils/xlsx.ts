import * as XLSX from 'xlsx';
import { createReadStream, createWriteStream } from 'fs';
import * as path from 'path';

export default class XlsxUtils {
  static async readWorkbook(file: string | Buffer): Promise<XLSX.WorkBook> {
    const buffer = await XlsxUtils.getBufferFromInput(file);
    return XLSX.read(buffer, { type: 'buffer' });
  }

  static getSheetData(sheet: XLSX.WorkSheet): any[][] {
    return <any[][]>XLSX.utils.sheet_to_json(sheet, { header: 1 });
  }

  static setSheetData(sheet: XLSX.WorkSheet, data: any[][]): void {
    sheet['!ref'] = XLSX.utils.encode_range({ s: { c: 0, r: 0 }, e: { c: data[0].length - 1, r: data.length - 1 } });
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        const cell = XLSX.utils.encode_cell({ c: j, r: i });
        sheet[cell] = { t: typeof data[i][j] === 'undefined' ? 's' : 'v', v: data[i][j] };
      }
    }
  }

  static writeWorkbook(workbook: XLSX.WorkBook, filePath: string): void {
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // 使用fs模块创建可写流，并将工作簿数据写入其中
    const stream = createWriteStream(filePath);
    stream.write(buffer);
    stream.end();
  }

  private static async getBufferFromInput(input: string | Buffer): Promise<Uint8Array> {
    if (typeof input === 'string') {
      const chunks: Uint8Array[] = [];
  
      const stream = createReadStream(input);
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
  
      const buffer = Buffer.concat(chunks);
      return new Uint8Array(buffer);
    } else if (input instanceof Buffer) {
      return new Uint8Array(input);
    } else {
      throw new Error('Invalid input format');
    }
  }
  
}
