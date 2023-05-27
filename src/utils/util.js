const numeral = require('numeral');
// 处理价格分转换元
function dealPrice(value) {
    const priceNum = numeral(value * 0.01);
    return priceNum.format('0.00');
}

/**
 * 时间戳转日期时间
 * @param {Number} time: 时间戳
 * @param {String} format: 日期时间格式
 * 使用方式: timestampToTime(1557285692393, 'Y-M-D h:m:s') // 2019-05-08 11:21:32
 */
function timestampToTime(time, format) {
    console.log(time);
    const timestamp = time.length === 10 ? time * 1000 : time;
    if (!format) {
        format = 'Y-M-D h:m:s';
    }
    const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    const returnArr = [];
    const date = new Date(timestamp);
    returnArr.push(date.getFullYear());
    let m = date.getMonth() + 1;
    returnArr.push(m < 10 ? ('0' + m) : m);
    const d = date.getDate();
    returnArr.push(d < 10 ? ('0' + d) : d);
    const h = date.getHours();
    returnArr.push(h < 10 ? ('0' + h) : h);
    m = date.getMinutes();
    returnArr.push(m < 10 ? ('0' + m) : m);
    const s = date.getSeconds();
    returnArr.push(s < 10 ? ('0' + s) : s);
    for (const i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

/**
 * 时间戳转日期时间
 * @param {Number} time: 时间戳
 * @param {String} formatDay: 日期时间格式
 * 使用方式: formatDay(1557285692393, 'Y年M月D日') // 2019年5月8日
 */
function formatDay(time, day) {
    const timestamp = time.length === 10 ? time * 1000 : time;
    if (!day) {
        day = 'Y年M月D日';
    }
    const formateArr = ['Y', 'M', 'D'];
    const returnArr = [];
    const date = new Date(timestamp);
    returnArr.push(date.getFullYear());
    const m = date.getMonth() + 1;
    returnArr.push(m);
    const d = date.getDate();
    returnArr.push(d);
    for (const i in returnArr) {
        day = day.replace(formateArr[i], returnArr[i]);
    }
    return day;
}

// 辅助函数：格式化数字
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}

// 格式化时间戳为年月日时分
function timestampFormat(timestamp, time) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (time) {
        return [hour, minute].map(formatNumber).join(':');
    } else {
        return year + '年' + formatNumber(month) + '月' + formatNumber(day) + '日' + [hour, minute].map(formatNumber).join(':');
    }
}

function getCookie(key) {
    const objCookie = {};
    const arrCookie = document.cookie.split(';') || [];
    arrCookie.forEach(item => {
        const arrItem = item.split('=');
        objCookie[arrItem[0].trim()] = arrItem[1];
    });
    return `${key}=${objCookie[key]}`;
}

function getUrlParams() {
    try {
        const url = location.href.replace('#/','');
        let paramsArr = url.split('?');
        paramsArr.shift();
        let obj = {};
        if (paramsArr.length) {
            paramsArr = paramsArr.join('&');
            const arr = paramsArr.split('&');
            
            for (let i = 0; i < arr.length; i++) {
                obj[arr[i].split('=')[0]] = arr[i].split('=')[1];
            }
        }
        return obj; // {articleId: "1", articleNum: "1", opt: "edit"}
    } catch (error) {
        return error;
    }
}

/**
* list转换为map
*/
function genMap(arr, key) {
    const map = {};
    for (let i = 0; i < arr.length; i++) {
        const k = arr[i][key];
        const v = arr[i];
        map[k] = v;
    }
    return map;
  }


function strNumSize(tempNum) {
    var stringNum = tempNum.toString();
    var index = stringNum.indexOf(".");
    var newNum = stringNum;
    if (index != -1) {
      newNum = stringNum.substring(0, index);
    }
    return newNum.length;
  }
  
function unitConvert(num) {
    var moneyUnits = ["元", "w", "亿", "万亿"];
    var dividend = 10000;
    var curentNum = num;
    //转换数字
    var curentUnit = moneyUnits[0];
    //转换单位
    for (var i = 0; i < 4; i++) {
      curentUnit = moneyUnits[i];
      if (strNumSize(curentNum) < 5) {
        break;
      }
      curentNum = curentNum / dividend;
    }
    var m = { num: 0, unit: "" };
    m.num = curentNum.toFixed(2);
    m.unit = curentUnit;
    return m;
  }
  
  
// 对外暴露方法和内容
module.exports = {
    timestampToTime: timestampToTime, // 时间戳转日期时间
    formatDay, // 时间戳转换日期格式（年月日）
    formatNumber: formatNumber,
    timestampFormat: timestampFormat,
    getCookie: getCookie,
    dealPrice,
    getUrlParams,
    genMap,
    unitConvert
};
