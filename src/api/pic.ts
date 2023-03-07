import request from '../utils/request';
import { AxiosPromise } from 'axios';

export function getImg(url: string): AxiosPromise<any> {
  return request({
    url
  });
}
