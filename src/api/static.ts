import request from '../utils/request';
import { AxiosPromise } from 'axios';

export function getStaticResource(url: string): AxiosPromise<any> {
  return request({
    url
  });
}
