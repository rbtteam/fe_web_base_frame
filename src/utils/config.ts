

function GetBaseUrl(url:string){
    console.log(url,'url');
    const paths = url.split('/');
    let baseURL = '';
    let toPath = '';
    switch(paths[1]){
        case "web":
            baseURL =  import.meta.env.VITE_Api_Global;
            break;
        case "dcc":
            baseURL =  import.meta.env.VITE_Api_DCC;
            break;
    }
    toPath = [].concat([''], paths.slice(2)).join('/');

    return baseURL + toPath;   
}

let qrHost = import.meta.env.VITE_qrHost;
const loginPath = '/login';                         // 登陆页面地址      
export default {
    GetBaseUrl,
    loginPath,
};