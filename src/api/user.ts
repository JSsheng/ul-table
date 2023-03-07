import request from '../utils/request';
import { AxiosPromise } from 'axios';
import { LoginData  } from './types';

/**
 *
 * @param data {LoginForm}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<any> {
  return request({
    url: '/api/v1/auth',
    method: 'post',
    data
  });
}

