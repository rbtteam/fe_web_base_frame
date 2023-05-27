export default function(data, excelName) {
    var abc = new Uint8Array(data);
    const blob = new Blob([data]);
    console.log(blob, abc, 'blob');
    // 兼容不同浏览器的URL对象
    const url = window.URL || window.webkitURL || window.moxURL;
    // 创建下载链接
    const downloadHref = url.createObjectURL(blob);
    // 创建a标签并为其添加属性
    let downloadLink = window.document.createElement('a');
    downloadLink.href = downloadHref;
    downloadLink.download = `${excelName}.xlsx`;
    // 触发点击事件执行下载
    downloadLink.click();
}
