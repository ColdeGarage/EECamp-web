import * as user from './user.js';
import * as file from './file.js';
import * as web from './web.js';

const apis = {
  file,
  user,
  web
};

const insertApi = (controller, api) => {
  const output = {};
  const _controller = { ...controller };
  Object.getOwnPropertyNames(_controller).forEach((el) => {
    const fn = _controller[el];
    output[el] = async (data, headers = {}, params = {}) =>
      await fn(api, data, headers, params);
  });

  return output;
};

export default function ({ app }, inject) {
  const cookiz = app.$cookiz;
  const axios = app.$axios;

  const service = axios.create({
    baseURL: process.env.baseUrl,
    timeout: 30000
  });

  // request interceptor
  service.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      const token = cookiz.get('auth_token');

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['Access-Control-Allow-Origin'] = '*';
      }

      return config;
    },
    (error) => {
      // Do something with request error
      console.error('error:', error); // for debug
      Promise.reject(error);
    }
  );

  // response interceptor
  service.interceptors.response.use(
    (response) => response.data,
    (error) => {
      // console.log('err' + error);// for debug
      return Promise.reject(
        error.response ? error.response.data || error.response : error
      );
    }
  );

  const api = async (method = 'post', url, data, headers = {}, params = {}) => {
    const token = cookiz.get('auth_token');

    // headers['content-type'] = 'image/*';

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['Access-Control-Allow-Origin'] = '*';
    }

    try {
      const result = await service.request({
        method,
        url,
        data,
        params: method.toLowerCase() === 'get' ? data : params,
        headers
      });
      return result;
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') console.error(error);
      throw error;
    }
  };

  api.get = (url, data, params = {}) => api('get', url, data, params);
  api.post = (url, data, headers = {}, params = {}) =>
    api('post', url, data, headers, params);
  api.put = (url, data, params = {}) => api('put', url, data, params);
  api.delete = (url, data, params = {}) =>
    api('delete', url, data, (params = {}));

  Object.keys(apis).forEach((name) => {
    api[name] = insertApi(apis[name], api);
  });

  inject('api', api);
}
