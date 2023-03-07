import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useUserStoreHook } from '../store/modules/user';
import { formatResponse } from './response';
import { RawResponse } from '../api/types';
import { RESPONSE_CODE } from './CONSTANT';
import router from "../router"
import i18n from '../lang/index'

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    // set response type if it's a image
    if (config.url?.endsWith('.jpg') || config.url?.endsWith('.png')) {
      config.responseType = 'arraybuffer'
    }

    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    const user = useUserStoreHook();
    if (user.token) {
      (config.headers as any).Authorization = user.token;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message } = formatResponse(response.data as RawResponse);

    // business layer is success
    if (code === RESPONSE_CODE.SUCCESS) {
      return response.data;
    } else {
      // maybe it's a file/html/json
      if (response.data instanceof ArrayBuffer || typeof response.data === "string" || typeof response.data === "object") {
        return response.data;
      }

      // token is invalid
      if (code === RESPONSE_CODE.UNAUTHENTICATED) {
        ElMessageBox.confirm(i18n.global.t('token.content'), i18n.global.t('token.title'), {
          confirmButtonText: i18n.global.t('token.confirmBtn'),
          type: 'warning'
        }).then(() => {
          localStorage.clear();
          router.push('/login');
        });

        return Promise.reject(new Error(message || 'Error'));
      }

      // system error
      ElMessage({
        message: message || i18n.global.t('systemError'),
        type: 'error'
      });
      return Promise.reject(new Error(message || 'Error'));
    }
  },
  (error: any) => {
    if (error.response?.data) {
      const { code, message } = formatResponse(error.response.data as RawResponse);

      // token is invalid
      if (code === RESPONSE_CODE.UNAUTHENTICATED) {
        ElMessageBox.confirm(i18n.global.t('token.content'), i18n.global.t('token.title'), {
          confirmButtonText: i18n.global.t('token.confirmBtn'),
          type: 'warning'
        }).then(() => {
          localStorage.clear();
          router.push('/login');
        });
      } else {
        ElMessage({
          message: message || i18n.global.t('systemError'),
          type: 'error'
        });
      }
    }
    return Promise.reject(error.message);
  }
);

export default service;
