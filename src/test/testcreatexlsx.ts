import * as XLSX from "xlsx";
import XlsxUtils from '../utils/xlsx'
(async ()=> {
    // 创建一个空的工作簿对象
const workbook = XLSX.utils.book_new();

// 创建一个名为"Sheet1"的工作表，并向其中写入数据
const sheetData = [
  ['Name', 'Age', 'Gender'],
  ['Alice', 25, 'Female'],
  ['Bob', 30, 'Male'],
  ['Charlie', 35, 'Male']
];
const sheet = XLSX.utils.aoa_to_sheet(sheetData);
XlsxUtils.setSheetData(sheet, sheetData);
XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');

// 将工作簿保存为Excel文件并下载到本地
const filename = './src/test/example.xlsx';
XlsxUtils.writeWorkbook(workbook, filename);

})()