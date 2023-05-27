import axios from "axios";
import router from "@/router";
import ConfigEnv from '@/utils/config';
import { getToken, removeToken } from '@/utils/auth';



const _headers = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json; charset=utf-8"
};

let request = axios.create({
  headers: _headers,
  // timeout: 5000, //超时设置
});


// 请求拦截器
request.interceptors.request.use(
  (config) => {
    console.log(config,'config');
    if (config.baseURL) return config;
    config.url = ConfigEnv.GetBaseUrl(config.url);
    if (config.url.indexOf('auth/token') === -1 && config.url.indexOf('account/register/user')===-1) {
      config.headers["Authorization"] = `Bearer ${getToken()}`;
      //   config.headers["Authorization"] = `Bearer b032386e366dd0e24c1bffcc355f3b456347857e`;
    }

    return config;

  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    let that = this;
    if (res.status === 200) {

      if (res.data.code === 0) {
        return Promise.resolve(res.data);
      } else if (res.data.code === 1001) {
        console.log("登录过期，请重新登录");
        setTimeout(() => {
          window.location.replace(location.origin);
        }, 1000);
        return Promise.resolve(res);
      } else if (res.data.code === 1000) {
        console.log("登录过期，请重新登录");
        setTimeout(() => {
          window.location.replace(location.origin);
        }, 1000);
        return Promise.resolve(res);
      }else {
        console.log("出错了："+ res.data.msg);
        return Promise.resolve(res.data);
      }
    } else {
      console.log("服务器异常："+res.data.msg);
      switch (res.data.code) {
        case 1000: {
          removeToken();
          setTimeout(() => {
            router.replace({
              path: ConfigEnv.loginPath,
              query: {
                redirect: router.currentRoute.fullPath,
              },
            });
          }, 1000);
          break;
        }
        default: {
          return Promise.reject(res);
        }
      }
    }
  },
  (error) => {
    console.log("出错了，error:"+error);
    return Promise.reject(error);
  }
);

/**
 * @method 请求get方法
 * @param {Sting} url
 * @param {Object} data
 */
const GET = (opt = {}) => {
  let option = {
    method: "get",
    url: opt.url,
    params: opt.data,
  };
  return REQUEST(option);
};

/**
 * @method 请求post方法
 * @param {Sting} url
 * @param {Object} data
 */
const POST = (opt = {}) => {

  let option = {
    method: "post",
    url: opt.url,
    data: opt.data,
    custom: opt.custom
  };
  return REQUEST(option);
};
/**
 * @method 请求put方法
 * @param {Sting} url
 * @param {Object} data
 */
const PUT = (opt = {}) => {
  let option = {
    method: "put",
    url: opt.url,
    data: opt.data
  };
  return REQUEST(option);
};

/**
 * @method 请求delete方法
 * @param {Sting} url
 * @param {Object} data
 */
const DELETE = (opt = {}) => {
  let option = {
    method: "delete",
    url: opt.url,
    data: opt.data,
  };
  return REQUEST(option);
};

const REQUEST = ({
  ...option
}) => {
  return new Promise((resolve, reject) => {
    request({
      ...option
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        // ElMessage .error("服务器跟别人私奔了");
        reject({
          error
        });
      });
  });
};

export {
  GET,
  POST,
  PUT,
  DELETE,
  request
};