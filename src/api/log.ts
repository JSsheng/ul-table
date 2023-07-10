import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { GetLogTxt} from './types';

export function getLogTxt(data: GetLogTxt): AxiosPromise<any> {
  return request({
    url: '/api/v1/tower/log/get',
    method: 'post',
    data
  });
}