import request from '../utils/request';
import { AxiosPromise } from 'axios';
import { SubListReq } from './types';

export function getSubList(data: SubListReq): AxiosPromise<any> {
  return request({
    url: '/api/v1/subitems/get',
    method: 'post',
    data
  });
}

// export function getCSV(data: WorkerStateReq): AxiosPromise<any> {
//   return request({
//     url: `/api/v1/monitor/worker/get`,
//     method: 'post',
//     data
//   });
// }