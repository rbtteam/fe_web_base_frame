import xlsx from 'xlsx';

/**
 * 数据list转换为表格
 * options: {
 *  sheetName: '', 工作簿名称
 *  fileName: '',  文件名
 *  cols: {id: {v: '订单编号', w: 100}},  表头对应关系
 *  width: [],      // 列宽
 * }
 * @param {Object} list 数据list
 * @param {Object} options 选项
 */
async function listToXlsx(list, options = {}) {
    // 替换表头
    let sheetOptions = {};
    let header = {};
    let sheetHeader = [];
    let cols = [];
    for (const key in options.cols) {
        if (Object.hasOwnProperty.call(options.cols, key)) {
            const info = options.cols[key];
            header[key] = info.v;
            sheetHeader.push(key);
            cols.push({
                wpx: info.w,
            });
        }
    }

    if (options.cols) {
        list = [header, ...list];
        sheetOptions = {
            header: sheetHeader,
            skipHeader:true,
        };
    }
    let sheet = xlsx.utils.json_to_sheet(list, sheetOptions);

    if (cols.length > 0) {
        sheet["!cols"] = cols;
    }

    const blob = sheet2blob(sheet, options.sheetName);
    openDownloadDialog(blob, options.fileName);
}

function sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    var wbout = xlsx.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}

/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }

    if (saveName && saveName.indexOf('.') < 0) {
        saveName += '.xlsx';
    }

    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

// 读取本地excel文件
function readLocalFile(file) {

    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result;
            const workbook = xlsx.read(data, {type: 'binary', cellDates: true});
            resolve(workbook);
        };
        reader.readAsBinaryString(file);
    });
}

/**
 * 表格转换为list
 * options: {
 *  cols: {
 *      id: { v: '订单编号' },
 *  }
 * }
 * @param {file} file 文件
 * @param {Object} options 
 */
async function xlsxToList(file, options) {
    const workBook = await readLocalFile(file);
    let result = [];

    let cols = {};
    if (options.cols) {
        for (const key in options.cols) {
            if (Object.hasOwnProperty.call(options.cols, key)) {
                const o = options.cols[key];
                cols[o.v] = key;
            }
        }
    }

    for (let index = 0; index < workBook.SheetNames.length; index++) {
        const sheetName = workBook.SheetNames[index];
        if (workBook.Sheets[sheetName]) {
            console.log(workBook.Sheets[sheetName], 'workBook.Sheets[sheetName]');
            let jsonData = xlsx.utils.sheet_to_json(workBook.Sheets[sheetName]);
            if (!jsonData || jsonData.length<=0 ) {
                continue;
            }
            if (Object.keys(cols).length > 0) {
                let tranJson = [];
                for (let i = 0; i < jsonData.length; i++) {
                    const info = jsonData[i];
                    let tranInfo = {};
                    for (const k in info) {
                        if (Object.hasOwnProperty.call(info, k)) {
                            tranInfo[cols[k]] = info[k];
                        }
                    }
                    tranJson.push(tranInfo);
                }
                jsonData = tranJson;
            }

            result.push(jsonData);
        }
    }
    return result;
}

export {
    listToXlsx,
    xlsxToList,
};