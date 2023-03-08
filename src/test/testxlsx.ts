import XlsxUtils from '../utils/xlsx'

const filepath = './src/test/example.xlsx';


(async () => {
    try {
        // 读取Excel文件
        const workbook = await XlsxUtils.readWorkbook(filepath);
    
        // 获取工作簿中第一个工作表的数据
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XlsxUtils.getSheetData(sheet);
    
        // 打印输出数据
        console.log(data);
      } catch (error) {
        console.error(error);
      }
})()
