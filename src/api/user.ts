import { GET, POST, PUT, DELETE,request } from '@/utils/request';

// 用户登陆
function Login (data:any) { 
  const transformRequest = [function(data:any) {
    let ret = '';
    for (let it in data) {
        if (ret) {
          ret +='&';
        }

        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]);
    }
    return ret;
  }];

  const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':  'Basic cmJ0dnYybmEzemgzYnQzZDpkMWZjMXN1Y2dseWc0cWU2ZXIzcGZlMzF6aXlvc3czag==',
  };
  console.log(data,'data');
  data.grant_type ='password';
  return request({
      url: '/web/account/auth/token',
      method: 'post',
      headers,
      transformRequest,
      validateStatus: function() {
          return true;
      },
      data: data
  });
};

export default {
  Login,
};